import * as mongoose from 'mongoose';
// import { Role } from '@Auth/enums/role.enum';

//Schema define in db
export const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  //   roles: { type: String, enum: Role },
  roles: [],
});

//Type Checking
export interface user {
  id: number;
  name: string;
  email: string;
  password: string;
  //   roles: Role[];
  roles: [];
}
