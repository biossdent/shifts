'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import React, { useState } from 'react';
import { addHours, format, getDay, isSameDay, parse, startOfWeek } from 'date-fns';

import ModalShiftForm from '@/app/components/ModalShiftForm';
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
            
                <ModalShiftForm showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}
