import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingAccountsTable1791182878805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("accountId" SERIAL NOT NULL, "balance" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_account_id" PRIMARY KEY ("accountId")) `)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE DROP CONSTRAINT "PK_account_id"`)
        await queryRunner.query(`DROP TABLE "accounts"`)

    }

}
