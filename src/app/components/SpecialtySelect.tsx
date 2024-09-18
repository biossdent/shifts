import React, { useEffect, useState } from 'react'
import { createSpecialty, getSpecialties } from '@/api/specialty.api';

import CreatableSelect from 'react-select/creatable';
import { ISpecialtyCreated } from '@/interfaces/specialty.interface';

const SpecialtySelect = () => {
  const [specialties, setSpecialties] = useState<ISpecialtyCreated[] | null>(null);

  useEffect(() => {
    const _getSpecialties = async () => {
      const _specialties = await getSpecialties();
      setSpecialties(_specialties);
    }
    _getSpecialties();
  }, [])

  const handleCreate = async (label: string) => {
    const newSpecialty = await createSpecialty({ label });
    setSpecialties([...specialties!, newSpecialty]);
  };

  return (
    <CreatableSelect
      isClearable
      options={specialties!}
      onCreateOption={handleCreate}
      placeholder="Especialidad"
      className='text-gray-700'
    />
  )
}

export default SpecialtySelect