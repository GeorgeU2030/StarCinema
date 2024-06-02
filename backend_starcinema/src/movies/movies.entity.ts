import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Function } from '../functions/functions.entity';

@Entity()
export class Movie {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	year: number;

	@Column()
	premiereDate: Date;

	@Column()
	rating: string;

	@Column()
	isprox: boolean;

	@Column()
	cover: string;

	@Column()
	duration: number;

	@Column()
	trailer: string;

	@Column('text', {array: true, default: '{}'})
	genres: string[];
    
	@OneToMany(() => Function, (func)=> func.movie)
	functions: Function[];
}
