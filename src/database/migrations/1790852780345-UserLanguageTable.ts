import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLanguageTable1790852780345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user_languages"
             ("user_id" integer NOT NULL, 
             "language_id" integer NOT NULL,
             "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
              CONSTRAINT "PK_user_id_language_id"
              PRIMARY KEY ("user_id", "language_id"))`);
    await queryRunner.query(
      'ALTER TABLE "user_languages" ADD CONSTRAINT "FK_user_languages_has_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_languages" ADD CONSTRAINT "FK_user_languages_has_language_id" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query('CREATE INDEX "idx_on_user_language_user_id" ON "user_languages" ("user_id")');
    await queryRunner.query('CREATE INDEX "idx_on_user_language_language_id" ON "user_languages" ("language_id")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_languages" DROP CONSTRAINT "FK_user_languages_has_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_languages" DROP CONSTRAINT ""FK_user_languages_has_language_id"`,
    );
    await queryRunner.query("ALTER TABLE 'user_languages' DROP INDEX 'idx_on_user_language_user_id'")
    await queryRunner.query("ALTER TABLE 'user_languages' DROP INDEX 'idx_on_user_language_language_id'")
    await queryRunner.query(`DROP TABLE "user_languages"`);
  }
}
