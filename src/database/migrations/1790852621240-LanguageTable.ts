import { MigrationInterface, QueryRunner } from "typeorm";

export class LanguageTable1790852621240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "languages"
             ("id" SERIAL NOT NULL, 
             "name" character varying NOT NULL, 
             "code" character varying NOT NULL, 
             "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
             CONSTRAINT "UQ_language_name" UNIQUE ("name"), 
             CONSTRAINT "PK_language_id" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" DROP CONSTRAINT "UQ_language_name"`)
        await queryRunner.query(`ALTER TABLE "languages" DROP CONSTRAINT "PK_language_id"`)
        await queryRunner.query(`DROP TABLE "lanaguages"`)
    }

}
