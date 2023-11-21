import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("textos")
export class Textos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    texto: string;

    @Column()
    categoria: string;

    @Column()
    data: Date;

    @Column()
    status: string;
}