import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Texts1700511802966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "texts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "text",
                    type: "varchar",
                },
                {
                    name: "category",
                    type: "varchar",
                },
                {
                    name: "date",
                    type: "timestamp with time zone",
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
        await queryRunner.dropTable("texts");

    }
}