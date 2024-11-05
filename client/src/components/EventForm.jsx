import { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ onAddEvent, editingEvent, onUpdateEvent }) => {
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (editingEvent) {
            setEventName(editingEvent.summary);
            setDate(editingEvent.start.dateTime.split('T')[0]);
            setTime(editingEvent.start.dateTime.split('T')[1].substring(0, 5));
        }
    }, [editingEvent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEvent = {
                summary: eventName,
                start: {
                    dateTime: `${date}T${time}:00`,
                },
                end: {
                    dateTime: `${date}T${time}:00`,
                },
            };

            if (editingEvent) {
                await onUpdateEvent(newEvent);
            } else {
                await onAddEvent(newEvent);
            }

            setEventName('');
            setDate('');
            setTime('');
        } catch (error) {
            console.error('Error submitting event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Event Name:</label>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Time:</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{editingEvent ? 'Update Event' : 'Add Event'}</button>
        </form>
    );
};

export default EventForm;
