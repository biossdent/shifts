'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import React, { useEffect, useState } from 'react';
import { addHours, format, getDay, isSameDay, parse, startOfWeek } from 'date-fns';

import Modal from 'react-modal';
import { enUS } from 'date-fns/locale';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const initialEvents = [
    {
        title: 'Reunión con equipo',
        start: new Date(2024, 8, 15, 10, 0),
        end: new Date(2024, 8, 15, 11, 0),
        allDay: false,
    },
    {
        title: 'Evento todo el día',
        start: new Date(2024, 9, 16),
        end: new Date(2024, 9, 16),
        allDay: true,
    },
];

export default function CalendarPage() {
    const [myEvents, setMyEvents] = useState(initialEvents);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date() });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        Modal.setAppElement('body'); // Asegúrate de que el selector sea correcto
    }, []);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setNewEvent({
            title: '',
            start: date,
            end: addHours(date, 1),
        });
        setShowModal(true);
    };

    const handleEventSubmit = () => {
        if (newEvent.title && selectedDate) {
            setMyEvents([...myEvents, { ...newEvent, start: selectedDate, end: newEvent.end, allDay: false }]);
            setShowModal(false);
            setSelectedDate(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar para eventos del día */}
            <div className="w-1/5 p-4 space-y-4 bg-gray-800 text-white">
                <h2 className="text-2xl font-bold">Eventos del día</h2>
                {myEvents.filter(event => isSameDay(event.start, new Date())).length > 0 ? (
                    myEvents.filter(event => isSameDay(event.start, new Date())).map((event, index) => (
                        <div key={index} className="p-3 bg-gray-700 rounded-lg shadow-md">
                            <h3 className="font-semibold">{event.title}</h3>
                            <p>{format(event.start, 'hh:mm a')} - {format(event.end, 'hh:mm a')}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay eventos para hoy.</p>
                )}
            </div>

            {/* Calendario */}
            <div className="w-4/5">
                <div className="bg-white rounded-lg shadow-lg" style={{ height: '100%' }}>
                    <Calendar
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        className="text-black"
                        selectable
                        onSelectSlot={({ start }) => handleDateClick(start)}
                    />
                </div>
            </div>

            {/* Modal para añadir evento */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Añadir Nuevo Evento"
                className="absolute inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <h2 className="text-xl font-bold mb-4">Añadir Nuevo Evento</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título del evento"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleEventSubmit}
                        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                    >
                        Guardar Evento
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="w-full mt-2 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
}
