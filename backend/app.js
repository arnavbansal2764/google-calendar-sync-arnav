const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/passport');
const calendarRoutes = require('./routes/calendar');

dotenv.config();

const app = express();

const mongoStatus = mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
if(mongoStatus){
    console.log('MongoDB Connected');
}

app.use(cors({ origin: 'https://held-tariff-rather-physicians.trycloudflare.com/', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
    session({
        secret: 'arnaviscool',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/calendar'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('https://held-tariff-rather-physicians.trycloudflare.com/calendar');
    }
);

app.use('/api', calendarRoutes);

app.listen(4000, () => {
    console.log(`Server running on ${process.env.NGROK_BACKEND_TUNNEL_URL}`);
});


