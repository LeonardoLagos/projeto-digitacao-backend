import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Historic1724875607403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "historic",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "full_text",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "hit_count",
            type: "int",
            isNullable: false,
          },
          {
            name: "miss_count",
            type: "int",
            isNullable: false,
          },
          {
            name: "correction_count",
            type: "int",
            isNullable: false,
          },
          {
            name: "duration",
            type: "int",
            isNullable: false,
          },
          {
            name: "wpm",
            type: "numeric(10,2)",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("historic");
  }
}
