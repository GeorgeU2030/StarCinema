import { Entity, Column } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Employee extends User {

    @Column()
    name: string;
  
    @Column()
    lastname: string;

    @Column()
    location: string;

    @Column()
    timeContract: string;

    constructor() {
        super();
        this.role = 'employee';
    }
}