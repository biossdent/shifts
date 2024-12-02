import { ChangeEvent, FocusEventHandler, HTMLInputTypeAttribute } from "react";

import { doctorsStore } from "@/stores/doctors.store";
import moment from "moment";

interface IInputWithErrorProps {
  label: string;
  name: string;
  value: string;
  touched?: boolean;
  error?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange: (e: any) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const InputWithError = (props: IInputWithErrorProps) => {
  const { label, name, value, touched, error, type, placeholder, onChange, onBlur } = props;
  const { getAvailableDoctors } = doctorsStore();
  
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (name !== "appointment.startDate") return;
    setEndDate(e);
  };

  const setEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    const startDate = moment(e.target.value);
    const endDate = startDate.clone().add(30, "minutes");
    const formatEndDate = endDate.format("YYYY-MM-DDTHH:mm");
    onChange({
      target: {
        name: "appointment.endDate",
        value: formatEndDate,
      },
    });
    getAvailableDoctors(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
  };

  return (
    <div className="mb-4 w-full">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        value={value}
        name={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        onChange={_onChange}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border ${
          touched && error ? "border-red-500" : "border-gray-300"
        } rounded-md text-gray-700`}
      />
      {touched && error ? <div className="text-red-500">{error}</div> : null}
    </div>
  );
};
