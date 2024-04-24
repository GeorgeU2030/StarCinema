import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    functions: any;
}
