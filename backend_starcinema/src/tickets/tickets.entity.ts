import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../roles/customer.entity';
import { Movie } from '../movies/movies.entity';
import { Room } from '../rooms/rooms.entity';
import { Function } from '../functions/functions.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purchaseDate: Date;

  @Column()
  functionDate: Date;

  @ManyToOne(() => Movie)
  movie: Movie;

  @ManyToOne(() => Room)
  room: Room;

  @Column()
  seat: string;

  @Column()
  price: number;

  @ManyToOne(() => Customer, customer => customer.tickets)
  customer: Customer;

  @ManyToOne(() => Function)
  function: Function;
}