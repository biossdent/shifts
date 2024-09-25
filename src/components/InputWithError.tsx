import { useField } from "formik";

export const InputWithError = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        {...field}
        {...props}
        className={`w-full px-3 py-2 border ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        } rounded-md text-gray-700`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
