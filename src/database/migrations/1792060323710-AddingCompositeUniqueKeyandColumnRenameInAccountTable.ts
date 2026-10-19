import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCompositeUniqueKeyandColumnRenameInAccountTable1792060323710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "role" TO "type"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "CU_USER_ACCOUNT_TYPE" UNIQUE ("user_id", "type")`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
