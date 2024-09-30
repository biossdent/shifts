import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { createSpecialty, getSpecialties } from "@/api/specialty.api";

import CreatableSelect from "react-select/creatable";
import { ISpecialtyCreated } from "@/interfaces/specialty.interface";
import { SingleValue } from "react-select";

interface ISelectProps {
  name: string;
  touched?: boolean;
  error?: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
}

const SpecialtySelect = (props: ISelectProps) => {
  const { onChange, onBlur, touched, error, name } = props;
  //const [field, meta, helpers] = useField(props);
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

  const handleChange = (e: SingleValue<ISpecialtyCreated>) => {
    const value = {
      target: {
        name,
        value: e?.id,
      },
    }
    onChange && onChange(value);
  };

  const handleBlur = (e: any) => {
    console.log({ blur: e });
    onBlur && onBlur(e);
  };

  return (
    <>
      <CreatableSelect
        isClearable
        options={specialties!}
        name={name}
        onCreateOption={handleCreate}
        placeholder="Especialidad"
        className={`text-gray-700 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error ? <div className="text-red-500">{error}</div> : null}
    </>
  );
};

export default SpecialtySelect;
