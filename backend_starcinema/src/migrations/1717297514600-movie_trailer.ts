import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieTrailer1717297514600 implements MigrationInterface {
    name = 'MovieTrailer1717297514600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "trailer" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "trailer"`);
    }

}
