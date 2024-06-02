// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png' })
    image: string;

    @Column()
    @Unique(["email"])
    email: string;

    @Column()
    password: string;

    @Column()
    role: string; 
}
