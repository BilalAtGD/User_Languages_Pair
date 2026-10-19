import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAccountTypeEnumColumn1792048605034 implements MigrationInterface {
    // we are apply DB level safety here

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_types" as ENUM('current','saving','islamic')`)
        await queryRunner.query(`ALTER TABLE "accounts" ADD "role" "public"."account_types" NOT NULL DEFAULT 'current' `)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
