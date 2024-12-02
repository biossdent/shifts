import React, { useEffect, useState } from "react";
import { createSpecialty, getSpecialties } from "@/api/specialty.api";

import CreatableSelect from "react-select/creatable";
import { ISpecialty } from "@/interfaces/specialty.interface";
import { SingleValue } from "react-select";
import { toast } from "react-toastify";

interface ISelectProps {
  name: string;
  touched?: boolean;
  error?: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
}

const errorBorder = "!border-red-500";
const normalBorder = "!border-gray-300";

const SpecialtySelect = (props: ISelectProps) => {
  const { onChange, onBlur, touched, error, name } = props;
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const _specialties = await getSpecialties();
        setSpecialties(_specialties);
      } catch (error) {
        toast.error(
          "Error al cargar las especialidades, la página se recargará en unos instantes"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    };
    fetchSpecialties();
  }, []);

  const handleCreate = async (label: string) => {
    try {
      const newSpecialty = await createSpecialty({ label });
      setSpecialties((prev) => [...prev, newSpecialty]);
    } catch (error) {
      toast.error("Error creansetSpecialtySelecteddo la especialidad");
    }
  };

  const handleChange = (selectedOption: SingleValue<ISpecialty>) => {
    onChange &&
      onChange({
        target: {
          name,
          value: selectedOption?.id,
        },
      });
  };

  const handleBlur = () => {
    onBlur &&
      onBlur({
        target: {
          name,
        },
      });
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">
        Especialidad
      </label>
      <CreatableSelect
        isClearable
        options={specialties}
        name={name}
        onCreateOption={handleCreate}
        placeholder="Especialidad"
        classNames={{
          container: () => "text-gray-700",
          control: () =>
            touched && error ? `!border-2 ${errorBorder}` : normalBorder,
          indicatorSeparator: () =>
            touched && error ? `!border ${errorBorder}` : normalBorder,
          indicatorsContainer: () => (touched && error ? "!bg-red-500" : ""),
        }}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched && error ? <div className="text-red-500">{error}</div> : null}
    </div>
  );
};

export default SpecialtySelect;
