import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedAdmin1791358464401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.query(`
    INSERT INTO "users" ("name", "email", "password", "role")
    VALUES ('Bilal', 'bilal@gmail.com', '123456', 'Admin')
  `);
}
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
