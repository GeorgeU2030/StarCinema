import { MigrationInterface, QueryRunner } from "typeorm";

export class Secondmigration1713883026822 implements MigrationInterface {
    name = 'Secondmigration1713883026822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "year" integer NOT NULL, "duration" integer NOT NULL, "genres" text array NOT NULL DEFAULT '{}', CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "seats" integer NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "function" ("id" SERIAL NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "movieId" integer, "roomId" integer, CONSTRAINT "PK_6e085d059b4227aab09e8a5b05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "theater"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "room"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "movieId" integer`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "roomId" integer`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_66a8ccce1f873446efc78bf750e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_2601c388712491e69737788688b" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "function" ADD CONSTRAINT "FK_08a7a4cdd3f72f409ff6ed7e2d3" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "function" ADD CONSTRAINT "FK_7d7bcf2ab8b836d32edf5e1cee7" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "function" DROP CONSTRAINT "FK_7d7bcf2ab8b836d32edf5e1cee7"`);
        await queryRunner.query(`ALTER TABLE "function" DROP CONSTRAINT "FK_08a7a4cdd3f72f409ff6ed7e2d3"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_2601c388712491e69737788688b"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_66a8ccce1f873446efc78bf750e"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "roomId"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "room" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "theater" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "function"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
