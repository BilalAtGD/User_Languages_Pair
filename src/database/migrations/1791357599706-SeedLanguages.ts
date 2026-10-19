import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs';
import path from 'path';

export class SeedLanguagesandAdmin1791357599706
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const filePath = path.join(
      __dirname,
      '../data/language-codes.csv',
    );

    const file = fs.readFileSync(filePath, 'utf-8');

    const lines = file
      .split('\n')
      .slice(1)
      .filter(line => line.trim());

    for (const line of lines) {
      const [code, name] = line.split(',');

      await queryRunner.query(
        `
        INSERT INTO "languages" ("code", "name")
        VALUES ($1, $2)
        `,
        [code.trim(), name.trim()],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "languages"`);
  }
}