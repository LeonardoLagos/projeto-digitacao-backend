import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class HistoricoTextos1700741588754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: "historico_textos",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "id_usuario",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "texto",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "numero_acertos",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "numero_erros",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "numero_correcoes",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "tempo_total",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "palavras_por_minuto",
                    type: "numeric(10,2)",
                    isNullable: false,
                },
                {
                    name: "data",
                    type: "timestamp with time zone",
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: "status",
                    type: "varchar",
                    isNullable: false,
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("historico_textos")
    }

}
