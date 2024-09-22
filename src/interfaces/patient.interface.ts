export interface IPatient {
    fullName: string
    ci: string
    phone: string
}

export interface IPatientCreated extends IPatient {
    id: string,
    createdAt: string
}