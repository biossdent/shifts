import { EVENTS_TYPE } from "@/enums/events.enum"
import { IEvent } from "./event.interface"
import { IPatient } from "./patient.interface"
import { ISpecialty } from "./specialty.interface"
import { IUserCreated } from "./user.interface"

export interface IAppointment {
    diagnostic: string
    startDate: string
    endDate: string
    specialtyId?: number
    patientId: number
    doctorId?: number
}

export interface IAppointmentNew {
    appointment: Omit<IAppointment, 'patientId'>
    patient: IPatient
}

export interface IAppointmentCreated extends IAppointment {
    id?: number
    createdAt: string
    patient: IPatient,
    doctor: IUserCreated
    specialty: ISpecialty
    event?: IEvent
    eventId?: number
    type: EVENTS_TYPE
}