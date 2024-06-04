import { MigrationInterface, QueryRunner } from "typeorm";

export class Functionticket1717478786735 implements MigrationInterface {
    name = 'Functionticket1717478786735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "functionId" integer`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_130bfe96e129d4b164479bf08df" FOREIGN KEY ("functionId") REFERENCES "function"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_130bfe96e129d4b164479bf08df"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "functionId"`);
    }

}
