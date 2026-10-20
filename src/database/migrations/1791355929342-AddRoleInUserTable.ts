import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleInUserTable1791355929342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles" as ENUM('user','admin')`)
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."user_roles" NOT NULL DEFAULT 'user' `)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
