import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CorsAllowedDomain1695727460334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cors_allow_domain',
            columns: [
                {
                    name: 'id',
                    type: 'int4',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isUnique: true,
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cors_allow_domain')
    }

}
