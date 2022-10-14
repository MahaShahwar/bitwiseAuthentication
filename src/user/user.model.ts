import { Permissions } from '@root/permissions/permissions.schema';
import { Roles } from '@root/roles/roles.schema';
import * as mongoose from 'mongoose';
// import { Role } from '@Auth/enums/role.enum';

//Schema define in db
export const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles',
        unique: true,
      },
    ],
  },
});

//Type Checking
export interface user {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Roles;
}
