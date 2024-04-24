import { Entity } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Admin extends User {
  constructor() {
    super();
    this.role = 'admin';
  }
}