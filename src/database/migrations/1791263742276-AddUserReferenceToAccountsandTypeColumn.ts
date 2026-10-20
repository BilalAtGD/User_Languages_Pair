import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserReferenceToAccountsandTypeColumn1791263742276 implements MigrationInterface {
    name = 'AddUserReferenceToAccountsandTypeColumn1791263742276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        

        await queryRunner.query(`ALTER TABLE "accounts" ADD "user_id" integer`)
        await queryRunner.query(`CREATE TYPE "public"."account_types" as ENUM('current','saving','islamic')`)
        await queryRunner.query(`ALTER TABLE "accounts" ADD "type" "public"."account_types" NOT NULL DEFAULT 'current' `)
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_user_account_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_user_id_account_type" UNIQUE ("user_id","type")`);
        
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
