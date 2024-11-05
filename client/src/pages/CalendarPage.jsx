import { useEffect, useState } from 'react';
import EventForm from '../components/EventForm';
import EventsTable from '../components/EventsTable';
import axios from 'axios';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    const addEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const updateEvent = async (updatedEvent) => {
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_BACKEND_TUNNEL_URL}/api/update-event/${updatedEvent.id}`,
                updatedEvent,
                { withCredentials: true }
            );
            setEvents(events.map(event => (event.id === updatedEvent.id ? data : event)));
            setEditingEvent(null);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_TUNNEL_URL}/api/delete-event/${eventId}`, { withCredentials: true });
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_TUNNEL_URL}/api/events`, { withCredentials: true });
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
        const interval = setInterval(fetchEvents, 60000); // Fetch events every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl w-full">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                    {editingEvent ? 'Edit Calendar Event' : 'Create Calendar Event'}
                </h2>
                <EventForm
                    onAddEvent={addEvent}
                    onUpdateEvent={updateEvent}
                    editingEvent={editingEvent}
                    buttonStyle="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                />
            </div>

            <div className="mt-8 w-full max-w-4xl">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Upcoming Events</h3>
                <EventsTable
                    events={events}
                    onUpdateEvent={setEditingEvent}
                    onDeleteEvent={deleteEvent}
                    tableStyle="bg-white rounded-lg shadow-lg p-4"
                    rowStyle="hover:bg-gray-100"
                />
            </div>
        </div>
    );
};

export default CalendarPage;
