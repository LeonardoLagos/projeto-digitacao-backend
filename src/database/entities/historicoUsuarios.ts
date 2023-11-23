import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('historico_usuarios')
export class HistoricoUsuarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_usuario: string;

    @Column()
    texto: string;

    @Column()
    numero_acertos: number;

    @Column()
    numero_erros: number;

    @Column()
    tempo_total: number;

    @Column()
    data: Date;

    @Column()
    status: string;
}
