import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('historico_teclas_digitadas')
export class HistoricoTeclasDigitadas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_usuario: string;

    @Column()
    caractere_correto: string;

    @Column()
    caractere_digitado: string;

    @Column()
    data: Date;
}