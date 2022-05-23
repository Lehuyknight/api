import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import UserOrder from './UserOrder'
import Env from '@ioc:Adonis/Core/Env'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => UserOrder)
  public newOrder: HasOne<typeof UserOrder>

  @column()
  public authToken: BigIntToLocaleStringOptions

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async assignToken(order: Order) {
      order.authToken = await Env.get('UNKNOWN_ACCESS_TOKEN')
  }
}
