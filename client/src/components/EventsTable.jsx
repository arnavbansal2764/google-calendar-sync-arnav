import { FaEdit, FaTrash, FaLink } from 'react-icons/fa';

const EventsTable = ({ events, onUpdateEvent, onDeleteEvent }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Event Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Start</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">End</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Description</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Location</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                    <tr key={event.id} className="border-t border-gray-300">
                        <td className="py-3 px-4 text-sm">{event.summary}</td>
                        <td className="py-3 px-4 text-sm">{new Date(event.start.dateTime).toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm">{new Date(event.end.dateTime).toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm">{event.description}</td>
                        <td className="py-3 px-4 text-sm">{event.location}</td>
                        <td className="py-3 px-4 text-sm">
                            <button onClick={() => onUpdateEvent(event)} className="mr-2 text-blue-600 hover:text-blue-800">
                                <FaEdit />
                            </button>
                            <button onClick={() => onDeleteEvent(event.id)} className="mr-2 text-red-600 hover:text-red-800">
                                <FaTrash />
                            </button>
                            <a href={event.htmlLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                                <FaLink />
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default EventsTable;