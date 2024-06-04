import { Function } from '../functions/functions.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	seats: number;

	@Column({ default: true })
	isAvailable: boolean;
    
	@OneToMany(()=> Function, func => func.room)
	functions: Function[];
}
