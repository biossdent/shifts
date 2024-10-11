import { IPatientCreated } from "./patient.interface"
import { ISpecialty } from "./specialty.interface"
import { IUserCreated } from "./user.interface"

export interface IAppointment {
    diagnostic: string
    startDate: string
    endDate: string
    specialtyId: number
    patientId: number
    doctorId: number
}

export interface IAppointmentCreated extends IAppointment {
    id: string
    createdAt: string
    patient: IPatientCreated,
    doctor: IUserCreated
    specialty: ISpecialty
}