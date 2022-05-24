import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import UserOrder from './UserOrder'
import Env from '@ioc:Adonis/Core/Env'
import OrderEntity from './OrderEntity'
import User from './User'
import { HttpContext } from '@adonisjs/core/build/standalone'
import AuthMiddleware from 'App/Middleware/Auth'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => OrderEntity)
  public orderEntity: HasOne<typeof OrderEntity>

  @column()
  public authToken: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async assignToken(order: Order,{auth}){
      if(auth.user){
        order.authToken = await process.env.AUTH_TOKEN
      }
  }
}
