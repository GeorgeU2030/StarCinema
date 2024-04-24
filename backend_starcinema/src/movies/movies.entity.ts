import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	year: number;

	@Column()
	duration: number;

	@Column('text', {array: true, default: '{}'})
	genres: string[];
    functions: any;
}
