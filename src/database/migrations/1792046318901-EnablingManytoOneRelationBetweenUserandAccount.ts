import { MigrationInterface, QueryRunner } from "typeorm";

export class EnablingManytoOneRelationBetweenUserandAccount1792046318901 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_user_account"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
