import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingAccountsTable1791182878805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "balance" integer NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_account_id" PRIMARY KEY ("id")) `)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE DROP CONSTRAINT "PK_account_id"`)
        await queryRunner.query(`DROP TABLE "accounts"`)

    }

}
