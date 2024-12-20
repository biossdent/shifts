"use client";

import * as Yup from "yup";

import React, { useEffect } from "react";

import { IReminder } from "@/interfaces/reminder.interface";
import { InputWithError } from "../InputWithError";
import { appointmentsStore } from "@/stores/appointments.store";
import { createReminder } from "@/api/reminder.api";
import moment from "moment";
import { reminderStore } from "@/stores/reminder.store";
import { sessionStore } from "@/stores/session.store";
import { toast } from "react-toastify";
import { useFormik } from "formik";

interface IReminderFormProps {
  isDisabled: boolean;
  date: string;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'El título debe tener al menos 3 caracteres').required("Título obligatorio"),
  reminder: Yup.string().min(3, 'El recordatorio debe tener al menos 3 caracteres').required("Texto obligatorio"),
  date: Yup.date().required("Fecha obligatoria"),
  userId: Yup.number().required(),
});

export default function ReminderForm(props: IReminderFormProps) {
  const { date, isDisabled } = props;
  const { setShoModalForNew} = appointmentsStore();
  const { reminders, setReminders } = reminderStore();
  const { user } = sessionStore();

  useEffect(() => {
    formik.setFieldValue("date", date);
  }, [date]);
  
  const formik = useFormik({
    initialValues: {
      title: "",
      reminder: "",
      userId: user?.id,
      date: date,
    },
    validationSchema,
    onSubmit: async (reminder) => {
      const reminderCreated = await createReminder(reminder as IReminder);
      if (reminderCreated.error)
        return toast.error(reminderCreated.error);
      toast.success("Recordatorio creado con éxito");
      setReminders([...reminders, reminderCreated]);
      formik.resetForm();
      setShoModalForNew(false);
    },
  });

  if (isDisabled) return null;

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6 flex flex-col md:flex-row gap-6">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-700">
              Información de el Recordatorio
            </h2>
            <InputWithError
              label="Titulo"
              placeholder="Ingresa un titulo"
              {...formik.getFieldProps("title")}
              {...formik.getFieldMeta("title")}
              type="textarea"
            />
            <InputWithError
              label="Recordatorio"
              placeholder="Ingresa lo que quieres recordar"
              {...formik.getFieldProps("reminder")}
              {...formik.getFieldMeta("reminder")}
              type="textarea"
            />
            <div className="flex w-full">
              <p className="text-gray-600 text-sm">
                <b>Fecha:</b> {moment(date).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Guardar Recordatorio
        </button>
      </form>
    </div>
  );
}
