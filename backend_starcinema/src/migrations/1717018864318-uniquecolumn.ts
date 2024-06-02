import { MigrationInterface, QueryRunner } from "typeorm";

export class Uniquecolumn1717018864318 implements MigrationInterface {
    name = 'Uniquecolumn1717018864318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_817d1d427138772d47eca048855"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }

}
