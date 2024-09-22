export interface IAppointment {
    diagnostic: string
    specialty: string
    startDate: string
    endDate: string
}

export interface IAppointmentCreated extends IAppointment {
    id: string
    createdAt: string
}