import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingWrongIndexesInUsersandAccounts1791263742276 implements MigrationInterface {
    name = 'FixingWrongIndexesInUsersandAccounts1791263742276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_user_account"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_user_account" `)
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account_id" `)

        await queryRunner.query(`ALTER TABLE "accounts" ADD "user_id" integer`)
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_user_account" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_user_account" UNIQUE ("user_id")`);
        
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
