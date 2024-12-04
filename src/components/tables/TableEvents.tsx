import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import { eventStore } from "@/stores/event.store";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { tableHeadEvents } from "@/consts/table.conts";

const TableEvents = () => {
  const { events, eventSelected, setEventForDelete, getEvents } = eventStore();

  useEffect(() => {
    getEvents();
  }, []);

  const isEventSelected = (idSelected: number) =>
    idSelected === eventSelected?.id;

  return (
    <div className="mb-6 p-4  w-full md:basis-3/5 order-1 md:order-2">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Eventos creados
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              {tableHeadEvents.map((header) => (
                <th
                  className="px-4 py-2 border-b text-center font-bold bg-gray-800 text-white"
                  key={header.id}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events && events.length > 0 ? (
              events.map((event) => (
                <tr
                  key={event.id}
                  className={`${
                    isEventSelected(event.id!)
                      ? "bg-indigo-600 text-white"
                      : "even:bg-gray-50  text-gray-700"
                  }`}
                >
                  <td className="px-4 py-2 border-b text-center">{event.title}</td>
                  <td className="px-4 py-2 border-b text-center" style={{ backgroundColor: event.color }}>{event.color}</td>
                  <td className="px-4 py-2 border-b flex justify-center">
                    <FontAwesomeIcon
                      data-tooltip-id="delete"
                      data-tooltip-content="Eliminar"
                      className="text-red-500 cursor-pointer outline-none"
                      icon={faTrash}
                      onClick={() =>
                        setEventForDelete(event)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-700">
                  No hay bloqueo de citas creados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Tooltip id="delete" place="top" />
    </div>
  );
};

export default TableEvents;
