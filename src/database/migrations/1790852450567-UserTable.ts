import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1790852450567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" 
            ("id" SERIAL NOT NULL,
             "name" character varying NOT NULL, 
             "email" character varying NOT NULL,
              "password" character varying NOT NULL, 
              "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
              CONSTRAINT "UQ_user_email" UNIQUE ("email"), 
              CONSTRAINT "PK_user_id" PRIMARY KEY ("id"))
              
              `);
              
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_user_id"`)
        await queryRunner.query(`DROP TABLE "users"`);
    }

}





