'use client';

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay, isSameDay } from 'date-fns';
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

const events = [
    {
        title: 'Reunión con equipo',
        start: new Date(2023, 9, 15, 10, 0),
        end: new Date(2023, 9, 15, 11, 0),
        allDay: false,
    },
    {
        title: 'Evento todo el día',
        start: new Date(2023, 9, 16),
        end: new Date(2023, 9, 16),
        allDay: true,
    },
];

export default function CalendarioPage() {
    const [myEvents] = useState(events);
    const today = new Date();

    const eventsToday = myEvents.filter(event =>
        isSameDay(event.start, today)
    );

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar para eventos del día */}
            <div className="w-1/5 p-4 space-y-4 bg-gray-800 text-white">
                <h2 className="text-2xl font-bold">Eventos del día</h2>
                {eventsToday.length > 0 ? (
                    eventsToday.map((event, index) => (
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
            <div className="w-4/5 p-4">
                <div className="bg-white rounded-lg shadow-lg" style={{ height: '100%' }}>
                    <Calendar
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        className="text-black"
                    />
                </div>
            </div>
        </div>
    );
}
