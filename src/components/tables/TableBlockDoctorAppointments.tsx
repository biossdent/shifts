import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import { blockAppointmentStoreStore } from "@/stores/blockAppointment.store";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/utils/date.util";
import { tableHeadBlockDoctorAppointments } from "@/consts/table.conts";

const TableBlockDoctorAppointments = () => {
  const {
    blockAppointments,
    blockAppointmentSelected,
    setBlockAppointmentsIdForDelete,
    getBlockAppointments,
  } = blockAppointmentStoreStore();

  useEffect(() => {
    getBlockAppointments();
  }, []);

  const isBlockAppointmentSelected = (idSelected: number) =>
    idSelected === blockAppointmentSelected?.id;

  return (
    <div className="mb-6 p-4  w-full md:basis-3/5 order-1 md:order-2">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Bloqueos de citas creados
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              {tableHeadBlockDoctorAppointments.map((header) => (
                <th
                  className="px-4 py-2 border-b text-left font-bold bg-gray-800 text-white"
                  key={header.id}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blockAppointments && blockAppointments.length > 0 ? (
              blockAppointments.map((blockAppointment) => (
                <tr
                  key={blockAppointment.id}
                  className={`${
                    isBlockAppointmentSelected(blockAppointment.id!)
                      ? "bg-indigo-600 text-white"
                      : "even:bg-gray-50  text-gray-700"
                  }`}
                >
                  <td className="px-4 py-2 border-b">{`${blockAppointment.doctor?.name} ${blockAppointment.doctor?.lastName}`}</td>
                  <td className="px-4 py-2 border-b">{`${formatDate(
                    blockAppointment.startDate,
                    "DD/MM/YYYY"
                  )} - ${formatDate(
                    blockAppointment.startDate,
                    "hh:mm A"
                  )}`}</td>
                  <td className="px-4 py-2 border-b">{`${formatDate(
                    blockAppointment.endDate,
                    "DD/MM/YYYY"
                  )} - ${formatDate(blockAppointment.endDate, "hh:mm A")}`}</td>
                  <td className="px-4 py-2 border-b">
                    {blockAppointment.reason}
                  </td>
                  <td className="px-4 py-2 border-b flex justify-center">
                    <FontAwesomeIcon
                      data-tooltip-id="delete"
                      data-tooltip-content="Eliminar"
                      className="text-red-500 cursor-pointer outline-none"
                      icon={faTrash}
                      onClick={() =>
                        setBlockAppointmentsIdForDelete(blockAppointment.id!)
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

export default TableBlockDoctorAppointments;
