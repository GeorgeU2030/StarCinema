import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieFunction1717296035826 implements MigrationInterface {
    name = 'MovieFunction1717296035826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "premiereDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "rating" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "isprox" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "cover" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "cover"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "isprox"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "premiereDate"`);
    }

}
