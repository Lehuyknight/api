import { DateTime } from 'luxon'
import { afterUpdate, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string
  
  @column()
  public address: string
  
  @column()
  public phone: string
  
  @column()
  public description: string | null
  
  @column()
  public itemName: string
  
  @column()
  public qty: number
  
  @column()
  public note: string | null

  @column()
  public source: string | null

  @column()
  public status: string | null

  @column.dateTime()
  public success: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterUpdate()
  public static async changeStatus(userOrder: UserOrder){
    if(userOrder.status?.toLocaleLowerCase() == 'success')
    {
      userOrder.success = DateTime.now()
    }
  }
}
