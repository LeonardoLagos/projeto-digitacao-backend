import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('historico_textos')
export class HistoricoTextos {
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
    numero_correcoes: number;

    @Column()
    tempo_total: number;

    @Column()
    palavras_por_minuto: number;

    @Column()
    data: Date;

    @Column()
    status: string;
}
