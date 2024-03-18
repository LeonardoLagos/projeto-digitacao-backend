import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("texts")
export class Texts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    category: string;

    @Column()
    date: Date;

    @Column()
    status: string;
}