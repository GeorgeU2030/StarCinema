import { MigrationInterface, QueryRunner } from "typeorm";

export class Addimagecolumn1717004513112 implements MigrationInterface {
    name = 'Addimagecolumn1717004513112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying NOT NULL DEFAULT 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "image" character varying NOT NULL DEFAULT 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "image" character varying NOT NULL DEFAULT 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "image" character varying NOT NULL DEFAULT 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    }

}
