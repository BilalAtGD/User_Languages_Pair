import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLanguageTable1790852780345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user_languages"
             ("user_id" integer NOT NULL, 
             "language_id" integer NOT NULL,
              CONSTRAINT "PK_1e5982be5ab91cb784b89065142"
              PRIMARY KEY ("user_id", "language_id"))`);
    await queryRunner.query(
      `ALTER TABLE "user_languages" ADD CONSTRAINT "FK_1f9e6f03b56e66eee864aa6af95" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_languages" ADD CONSTRAINT "FK_2e0dcd0010c641a705bd6d0ad6e" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_languages" DROP CONSTRAINT "FK_2e0dcd0010c641a705bd6d0ad6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_languages" DROP CONSTRAINT "FK_1f9e6f03b56e66eee864aa6af95"`,
    );
    await queryRunner.query(`DROP TABLE "user_languages"`);
  }
}
