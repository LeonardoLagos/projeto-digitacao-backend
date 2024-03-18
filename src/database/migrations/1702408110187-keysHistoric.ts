import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class HistoricoTeclasDigitadas1702408110187
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "keys_historic",
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
          },
          {
            name: "text_id",
            type: "int",
          },
          {
            name: "right_key",
            type: "varchar",
          },
          {
            name: "pressed_key",
            type: "varchar",
          },
          {
            name: "data",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("keys_historic");
  }
}
