import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductTable1741183898980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'decimal',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'product_categories_category',
        columns: [
          {
            name: 'productId',
            type: 'int',
          },
          {
            name: 'categoryId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('product_categories_category', [
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const productCategoriesTable = await queryRunner.getTable(
      'product_categories_category',
    );
    if (productCategoriesTable) {
      const productCategoriesForeignKeys =
        productCategoriesTable.foreignKeys.filter(
          (fk) =>
            fk.columnNames.indexOf('productId') !== -1 ||
            fk.columnNames.indexOf('categoryId') !== -1,
        );
      await queryRunner.dropForeignKeys(
        'product_categories_category',
        productCategoriesForeignKeys,
      );
    }
    await queryRunner.dropTable('product_categories_category');

    const productTable = await queryRunner.getTable('product');
    if (productTable) {
      const productForeignKey = productTable.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('userId') !== -1,
      );
      if (productForeignKey) {
        await queryRunner.dropForeignKey('product', productForeignKey);
      }
    }
    await queryRunner.dropTable('product');
  }
}
