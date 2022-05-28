import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Location from './Location'
export default class OrderEntity extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column({serializeAs:'Description'})
  public description: string | null | undefined
  
  @column({serializeAs:'FromAddress'})
  public fromAddress: string
  
  @column({serializeAs:'ToAddress'})
  public toAddress: string
  
  @column({serializeAs:'BuyerPhone'})
  public buyerPhone: string

  @column({serializeAs:'BuyerName'})
  public buyerName: string
  
  @column({serializeAs:'CodAmount'})
  public codAmount: number
  
  @column({serializeAs:'ShippingFee'})
  public shippingFee: number
  
  @column({serializeAs:'DeliverTime'})
  public deliverTime: DateTime| null | undefined
  
  @column({serializeAs:'ShopOrderId'})
  public shopOrderId: number | null | undefined
  
  @column({serializeAs:'Category'})
  public category: number | null | undefined
  
  @column({serializeAs:'Weight'})
  public weight: number | null | undefined
  
  @column({serializeAs:'ImageUrl'})
  public imageUrl: string | null | undefined
  
  @column({serializeAs:'FromLocation'})
  public fromLocation: Location | null | undefined
  
  @column({serializeAs:'ToLocation'})
  public toLocation: Location | null | undefined
  
  @column({serializeAs:'HubPhoneNumber'})
  public hubPhoneNumber: string
  
  @column({serializeAs:'HubPhoneName'})
  public hubPhoneName: string | null | undefined
  
  @column({serializeAs:'Locality'})
  public locality: string | null | undefined
  
  @column({serializeAs:'ItemQty'})
  public itemQty: number
  
  @column({serializeAs:'Status'})
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
