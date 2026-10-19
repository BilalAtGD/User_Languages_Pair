import { MigrationInterface, QueryRunner } from "typeorm";

export class LanguageTable1790852621240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "languages"
             ("id" SERIAL NOT NULL, 
             "name" character varying NOT NULL, 
             "code" character varying NOT NULL, 
             CONSTRAINT "UQ_9c0e155475f0aa782e4a6178969" UNIQUE ("name"), 
             CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE 'lanaguages'")
    }

}
