import { IUserCreated } from "./user.interface";

export interface IBlockAppointment {
  id?: number;
  doctorId: number;
  startDate: string;
  endDate: string;
  reason?: string;
  doctor?: IUserCreated;
}
