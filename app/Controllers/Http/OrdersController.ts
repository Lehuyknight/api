import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const EnumStatus = require('App/utils/EnumStatus');
import { EnumCategory } from 'App/utils/EnumCategory';
import { EnumOrderStatus } from 'App/utils/EnumOrderStatus';
import ResponseData from 'App/utils/ResponseData';
import { schema as Schema, rules} from '@ioc:Adonis/Core/Validator'
import OrderEntity from 'App/Models/OrderEntity'
import fetch from 'node-fetch';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';

export default class OrdersController {
    public async createNewOrder({request, response, auth}:HttpContextContract){        
        const validator = await Schema.create({
            description: Schema.string.nullableAndOptional([
                rules.trim()
            ]),
            fromAddress: Schema.string([
                rules.trim()
            ]),
            toAddress: Schema.string([
                rules.trim()
            ]),
            buyerPhone: Schema.string([
                rules.trim(),
                rules.mobile(),
                rules.maxLength(15)
            ]),
            buyerName: Schema.string([
                rules.trim(),
                rules.maxLength(50)
            ]),
            codAmount: Schema.number([
                rules.trim(),
                rules.unsigned()
            ]),
            shippingFee: Schema.number([
                rules.trim(),
                rules.unsigned()
            ]),
            deliverTime: Schema.date.nullableAndOptional({
                format: 'sql'
            }),
            shopOrderId: Schema.number.nullableAndOptional([
                rules.trim(),
                rules.unsigned()
            ]),
            category: Schema.number([
                rules.trim(),
                rules.range(1,2)
            ]),
            weight: Schema.number.nullableAndOptional([
                rules.trim(),
                rules.unsigned()
            ]),
            imageUrl: Schema.string.nullableAndOptional([
                rules.trim(),
                rules.regex(/^(?:[a-z]:)?[\/\\]{0,2}(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/),
            ]),
            fromLocation: Schema.object.nullableAndOptional().members({
                lat: Schema.number.nullableAndOptional([
                    rules.trim()
                ]),
                lng: Schema.number.nullableAndOptional([
                    rules.trim()
                ])
            }),
            toLocation: Schema.object.nullableAndOptional().members({
                lat: Schema.number.nullableAndOptional([
                    rules.trim()
                ]),
                lng: Schema.number.nullableAndOptional([
                    rules.trim()
                ])
            }),
            hubPhoneNumber: Schema.string([
                rules.trim(),
                rules.mobile(),
                rules.maxLength(15)
            ]),
            hubPhoneName: Schema.string.nullableAndOptional([
                rules.trim()
            ]),
            locality: Schema.string.nullableAndOptional([
                rules.trim()
            ]),
            itemQty: Schema.number([
                rules.trim(),
                rules.unsigned()
            ]),
            status: Schema.number([
                rules.trim(),
                rules.range(1,6)
            ])
        })
        try{
            const data = await request.validate({schema: validator})
            const newOrder = await OrderEntity.create(data)
            if(auth.user){
                const authToken = await auth.user.authToken
                return response.status(200).json(
                    new ResponseData(
                        newOrder,
                        authToken
                    )
                )
            }
            else{
                const authToken = process.env.UNKNOWN_ACCESS_TOKEN
                return response.status(200).json(
                    new ResponseData(
                        newOrder,
                        authToken
                    )
                )
            }
        }
        catch(err){
            return response.status(400).json(err)
        } 
    }

    public async login({request, response, auth}:HttpContextContract){

    }

    public async getOrder({request, response, auth}: HttpContextContract){

    }
    
    public async getOrders({request, response, params, auth}: HttpContextContract){
        const res = await fetch('https://httpbin.org/post', {method: 'POST', body: 'a=1'})
        //const data = await res.json()   
        if(auth.isLoggedIn){
            const data = await request.headers()
            return response.send(data)
        }
        else{
            return response.json('nope')
        }
    }

    public async cancelOrders({request, response, params}: HttpContextContract){

    }


}
