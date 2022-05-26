import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResponseFormat from 'App/utils/ResponseFormat';
const EnumStatus = require('App/utils/EnumStatus');
import { schema as Schema, rules} from '@ioc:Adonis/Core/Validator'
import UserOrder from 'App/Models/UserOrder';

export default class UserOrdersController {
    public async addUserOrder({request, response, params}: HttpContextContract){
        const data = await Schema.create({
            name: Schema.string([
                rules.trim(),
                rules.maxLength(100)
            ]),
            address: Schema.string([
                rules.trim(),
                rules.maxLength(200),
                rules.required()
            ]),
            phone: Schema.string([
                rules.mobile(),
                rules.trim(),
                rules.maxLength(12),
                rules.required()
            ]),
            description: Schema.string.nullableAndOptional([
                rules.trim(),
                rules.nullable()
            ]),
            itemName: Schema.string([
                rules.trim()
            ]),
            qty: Schema.number([
                rules.trim(),
                rules.unsigned(),
            ]),
            note: Schema.string.nullableAndOptional([
                rules.trim(),
                rules.nullable()
            ]),
            source: Schema.string.nullableAndOptional([
                rules.trim(),
                rules.nullable()
            ]),
            status: Schema.string.nullableAndOptional   ([
                rules.trim(),
                rules.nullable()
            ]),
            success: Schema.date.nullableAndOptional({
                format: 'yyyy-MM-dd HH:mm:ss',
            })
        })
        try{
            const x = request.all()
            const y = await request.input('qty').replace(' suất','')
            x.qty = y
            await request.updateBody(x)
            const validator = await request.validate({schema: data})
            const userOrderData = await UserOrder.create(validator)
            return response.json(
                new ResponseFormat(
                     userOrderData,
                    true,
                    EnumStatus.SUCCESS,
                    true
                )
            )
        }
        catch(err){
            return response.json(
                new ResponseFormat(
                    err,
                    false,
                    EnumStatus.ERROR,
                    true
                )
            )
        }
    }

    public async getUserOrder({response, params}:HttpContextContract){
        if(params.id){
            try{
                const data = await UserOrder.findOrFail(params.id)
                return response.json(
                    new ResponseFormat(
                        data,
                        true,
                        EnumStatus.SUCCESS,
                        true
                    )
                )
            }
            catch(err){
                new ResponseFormat(
                    err,
                    false,
                    EnumStatus.ERROR,
                    true
                )
            }
        }
        else{
            try{
                const data = await UserOrder.all()
                return response.json(
                    new ResponseFormat(
                        data,
                        true,
                        EnumStatus.SUCCESS,
                        true
                    )
                )
            }
            catch(err){
                return response.json(
                    new ResponseFormat(
                        err,
                        false,
                        EnumStatus.ERROR,
                        true
                    )
                )
            }
        }
    }

    public async deleteUserOrder({request, response, params}: HttpContextContract){
        try{
            const data = await UserOrder.findOrFail(params.id)
            await data.delete()
            return response.json(
                new ResponseFormat(
                    data,
                    true,
                    EnumStatus.SUCCESS,
                    true
                )
            )
        }
        catch(err){
            return response.json(
                new ResponseFormat(
                    err,
                    false,
                    EnumStatus.ERROR,
                    true
                )
            )
        }
    }

    public async patchUserOrder({request, response, params}:HttpContextContract){
        try{
            const order = await UserOrder.findOrFail(params.id)
            const data = request.only(['name', 'address', 'phone', 'description', 'itemName', 'qty', 'note', 'status', 'success'])
            await order.merge(data).save()
            return response.json(
                new ResponseFormat(
                    order,
                    true,
                    EnumStatus.SUCCESS,
                    true
                )
            )
        }
        catch(err){
            return response.json(
                new ResponseFormat(
                    err,
                    false,
                    EnumStatus.ERROR,
                    true
                )
            )
        }
    }
}
