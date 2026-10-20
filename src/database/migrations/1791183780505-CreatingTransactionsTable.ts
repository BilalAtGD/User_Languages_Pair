import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingTransactionsTable1791183780505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "transactions" (
        "id" SERIAL NOT NULL,
        "amount" integer NOT NULL,
        "from_account_id" integer NOT NULL,
        "to_account_id" integer NOT NULL,
        "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
        
        CONSTRAINT "PK_transaction_id"
          PRIMARY KEY ("id"),

        CONSTRAINT "FK_from_account_id"
          FOREIGN KEY ("from_account_id")
          REFERENCES "accounts"("id")
          ON DELETE CASCADE,

        CONSTRAINT "FK_to_account_id"
          FOREIGN KEY ("to_account_id")
          REFERENCES "accounts"("id")
          ON DELETE CASCADE
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "idx_on_transaction_has_from_account_id"
   ON "transactions" ("from_account_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_on_tranaction_has_to_account_id" ON "transactions" ("to_account_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
