import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ErrorCaptureTable1695311247277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'error_capture',
            columns: [
                {
                    name: 'id',
                    type: 'int4',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'domain',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'method',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar'
                },
                {
                    name: 'accountcode',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'ip',
                    type: 'varchar',
                    isNullable: true,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('error_capture')
    }

}
