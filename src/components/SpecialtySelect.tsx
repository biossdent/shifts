import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { createSpecialty, getSpecialties } from "@/api/specialty.api";

import CreatableSelect from "react-select/creatable";
import { ISpecialtyCreated } from "@/interfaces/specialty.interface";
import { useField } from "formik";

interface ISelectProps {
  name: string;
}

const SpecialtySelect = (props: ISelectProps) => {
  const [field, meta, helpers] = useField(props);
  const [specialties, setSpecialties] = useState<ISpecialtyCreated[] | null>(
    null
  );

  useEffect(() => {
    const _getSpecialties = async () => {
      const _specialties = await getSpecialties();
      setSpecialties(_specialties);
    };
    _getSpecialties();
  }, []);

  const handleCreate = async (label: string) => {
    const newSpecialty = await createSpecialty({ label });
    setSpecialties([...specialties!, newSpecialty]);
  };

  return (
    <>
      <CreatableSelect
        {...props}
        isClearable
        options={specialties!}
        onCreateOption={handleCreate}
        placeholder="Especialidad"
        className="text-gray-700"
        {...field}
        value={specialties?.find(specialty => specialty.label === field.value)}
        onChange={(specialty) => helpers.setValue(specialty ? specialty.id : "")}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

export default SpecialtySelect;
