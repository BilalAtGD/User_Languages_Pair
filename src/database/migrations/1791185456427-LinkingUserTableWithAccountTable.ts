import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkingUserTableWithAccountTable1791185456427 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "account_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_user_account" UNIQUE ("account_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_user_account" FOREIGN KEY ("account_id") REFERENCES "accounts"("accountId") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP "account_id"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT FK_user_account`,
    );
  }
}
