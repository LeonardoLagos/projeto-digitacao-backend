import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class HistoricoTeclasDigitadas1702408110187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'historico_teclas_digitadas',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'id_usuario',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'caractere_correto',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'caractere_digitado',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'data',
                    type: 'timestamp with time zone',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('historico_teclas_digitadas')
    }

}
