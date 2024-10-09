import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { add, formatDate, parseISO } from "date-fns";

interface IInputWithErrorProps {
  label: string;
  name: string;
  value: string;
  touched?: boolean;
  error?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
}

export const InputWithError = (props: IInputWithErrorProps) => {
  const { label, name, value, touched, error, type, placeholder, onChange, onBlur } = props;
  
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (name !== 'startDate') return;
    setEndDate(e);
  };

  const setEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    const startDate = parseISO(e.target.value);
    const endDate = add(startDate, { minutes: 30 });
    const formatEndDate = formatDate(endDate, "yyyy-MM-dd'T'HH:mm");
    onChange({
      target: {
        name: "endDate",
        value: formatEndDate,
      },
    });
  };

  return (
    <div className="mb-4">
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
