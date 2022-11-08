import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1667915575683 implements MigrationInterface {
  name = '$npmConfigName1667915575683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`description\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`description\``,
    );
  }
}
