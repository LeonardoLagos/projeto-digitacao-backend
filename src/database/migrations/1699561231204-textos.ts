import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Textos1699561231204 implements MigrationInterface {

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
                    type: "date",
                },
                {
                    name: "status",
                    type: "varchar",
                },
            ],
        }));

        await queryRunner.query(
            `alter table textos
            alter column data set default current_timestamp;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("textos");

    }
}