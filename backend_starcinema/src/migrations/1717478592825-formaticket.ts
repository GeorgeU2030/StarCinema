import { MigrationInterface, QueryRunner } from "typeorm";

export class Formaticket1717478592825 implements MigrationInterface {
    name = 'Formaticket1717478592825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "format"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "format" character varying NOT NULL`);
    }

}
