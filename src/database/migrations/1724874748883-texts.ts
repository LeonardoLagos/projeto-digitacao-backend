import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Texts1724874748883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "texts",
        columns: [
          {
            name: "id",
            type: "uuid",
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
            name: "created_at",
            type: "timestamp with time zone",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "status",
            type: "int",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("texts");
  }
}
