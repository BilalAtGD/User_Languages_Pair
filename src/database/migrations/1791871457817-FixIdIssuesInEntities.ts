import { MigrationInterface, QueryRunner } from "typeorm";

export class FixIdIssuesInEntities1791871457817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        
        
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "account_id" TO "id"`);
        await queryRunner.query(`ALTER SEQUENCE "accounts_account_id_seq" RENAME TO "accounts_id_seq"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "transactionId" TO "id"`);
        await queryRunner.query(`ALTER SEQUENCE "transactions_transactionId_seq" RENAME TO "transactions_id_seq"`);        
        


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "id" TO "account_id"`);
        await queryRunner.query(`ALTER SEQUENCE "accounts_id_seq" RENAME TO "accounts_account_id_seq"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "id" TO "transactionId"`);
        await queryRunner.query(`ALTER SEQUENCE "transactions_transactionId_seq" RENAME TO "transactions_id_seq"`); 
        
    }

}
