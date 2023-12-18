import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Textos1700511802966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "textos",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "texto",
                    type: "varchar",
                },
                {
                    name: "categoria",
                    type: "varchar",
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
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("textos");

    }
}