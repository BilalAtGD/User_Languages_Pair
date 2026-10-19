import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedandUpdatedTheTimestampInSystem1791351180916 implements MigrationInterface {
    name = 'AddedandUpdatedTheTimestampInSystem1791351180916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "languages" ADD "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()`);
        
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            }

}
