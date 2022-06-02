import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { EnumCategory } from 'App/utils/EnumCategory';
import { EnumOrderStatus } from 'App/utils/EnumOrderStatus';

export default class extends BaseSchema {
  protected tableName = 'order_entities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description').nullable()
      table.string('from_address').notNullable()
      table.string('to_address').notNullable()
      table.string('buyer_phone',15).notNullable()
      table.string('buyer_name').notNullable()
      table.integer('cod_amount').notNullable().unsigned()
      table.integer('shipping_fee').notNullable().unsigned()
      table.datetime('deliver_time').nullable().defaultTo('0000-00-00 00:00:00')
      table.uuid('shop_order_id').notNullable().unique()
      table.enum('category',Object.values(EnumCategory))
      table.integer('weight').nullable().defaultTo(0)
      table.string('image_url').nullable().defaultTo('')
      table.jsonb('from_location').nullable()
      table.jsonb('to_location').nullable()
      table.string('hub_phone_number', 15).notNullable()
      table.string('hub_phone_name').nullable().defaultTo('')
      table.string('locality').nullable().defaultTo('')
      table.integer('item_qty').unsigned().defaultTo(1)
      table.enum('status',Object.values(EnumOrderStatus))
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
