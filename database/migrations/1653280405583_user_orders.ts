import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',100).notNullable()
      table.string('address').notNullable()
      table.string('phone',12).notNullable()
      table.string('description').nullable()
      table.string('item_name').nullable().defaultTo('Cơm sườn')
      table.integer('qty').notNullable().unsigned()
      table.string('note').nullable().defaultTo('')
      table.string('source').nullable().defaultTo('web')
      table.string('status').nullable().defaultTo('')
      table.timestamp('success', {useTz: true}).nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
  
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
