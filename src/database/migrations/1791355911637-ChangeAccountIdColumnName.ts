import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAccountIdColumnName1791355911637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_user_account"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_from_account_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_to_account_id"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "accountId" TO "account_id"`);
        await queryRunner.query(`ALTER SEQUENCE "accounts_accountId_seq" RENAME TO "accounts_account_id_seq"`);



        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_user_account" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_from_account_id" FOREIGN KEY ("from_account_id") REFERENCES "accounts"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_to_account_id" FOREIGN KEY ("to_account_id") REFERENCES "accounts"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
