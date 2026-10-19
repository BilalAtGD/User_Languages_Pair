import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingTransactionsTable1791183780505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "transactions" (
        "transactionId" SERIAL NOT NULL,
        "amount" integer NOT NULL,
        "from_account_id" integer NOT NULL,
        "to_account_id" integer NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        
        CONSTRAINT "PK_transaction_id"
          PRIMARY KEY ("transactionId"),

        CONSTRAINT "FK_from_account_id"
          FOREIGN KEY ("from_account_id")
          REFERENCES "accounts"("accountId")
          ON DELETE CASCADE,

        CONSTRAINT "FK_to_account_id"
          FOREIGN KEY ("to_account_id")
          REFERENCES "accounts"("accountId")
          ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
