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
}