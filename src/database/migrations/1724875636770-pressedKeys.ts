import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PressedKeys1724875636770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "pressed_keys",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "user_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "pressed_key",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "correct_key",
            type: "varchar",
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
    queryRunner.dropTable("pressed_keys");
  }
}
