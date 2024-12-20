import React, { useEffect } from "react";

import { blockAppointmentStoreStore } from "@/stores/blockAppointment.store";
import { formatDate } from "@/utils/date.util";

interface IProps {
  date: string;
}

const BlockAppointmentsPreview = (props: IProps) => {
  const { date } = props;
  const { getBlockAppointmentsDaySelected, setBlockAppointmentsDaySelected,blockAppointmentsDaySelected } =
    blockAppointmentStoreStore();

  useEffect(() => {
    if (!date) return;
    getBlockAppointmentsDaySelected(date);
    return () => {
      setBlockAppointmentsDaySelected([]);
    };
  }, [date]);

  return (
    <div className="flex flex-col gap-2 mb-4">
      {blockAppointmentsDaySelected && blockAppointmentsDaySelected.length > 0
        ? blockAppointmentsDaySelected.map((blockAppointment) => (
            <div
              key={blockAppointment.id}
              className="flex flex-row items-center gap-2 bg-orange-400 rounded-lg py-1 px-2 text-center"
            >
              <p className="font-semibold">
                El doctor{" "}
                {blockAppointment?.doctor?.name +
                  " " +
                  blockAppointment?.doctor?.lastName}{" "}
                no podrá atender citas de{" "}
                {formatDate(blockAppointment?.startDate, "DD/MM/YYYY")}{" "}
                {formatDate(blockAppointment?.startDate, "hh:mm:A")} a{" "}
                {formatDate(blockAppointment?.endDate, "DD/MM/YYYY")}{" "}
                {formatDate(blockAppointment?.endDate, "hh:mm:A")}
              </p>
            </div>
          ))
        : null}
    </div>
  );
};

export default BlockAppointmentsPreview;
