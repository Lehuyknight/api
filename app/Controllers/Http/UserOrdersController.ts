import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResponseFormat from 'App/utils/ResponseFormat';
const EnumStatus = require('App/utils/EnumStatus');
import { schema as Schema, rules} from '@ioc:Adonis/Core/Validator'
import UserOrder from 'App/Models/UserOrder';
import { EnumOrderStatus } from 'App/utils/EnumOrderStatus';

export default class UserOrdersController {
    public async addUserOrder({request, response, params, auth}: HttpContextContract){
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
                rules.trim()
            ]),
            itemName: Schema.string.nullableAndOptional([
                rules.trim()
            ]),
            qty: Schema.number([
                rules.trim(),
                rules.unsigned(),
            ]),
            note: Schema.string.nullableAndOptional([
                rules.trim()
            ]),
            source: Schema.string.nullableAndOptional([
                rules.trim()
            ]),
            status: Schema.string.nullableAndOptional   ([
                rules.trim()
            ]),
            success: Schema.date.nullableAndOptional({
                format: 'yyyy-MM-dd HH:mm:ss',
            })
        })
        if(auth.isLoggedIn){    
            try{
                //! UPDATE REQUEST BODY (Update Better Way)
                const x = request.all()
                const y = await request.input('qty').replace(/\D/g,'')
                const yy = await request.input('qty').toString()
                const yyy = yy.replace(/\D/g,'')
                const z = EnumOrderStatus.CREATED
                console.log(yyy)
                x.qty = y
                x.status = z
                // //! A better diffrent way?(maybe)(updated)
                // const z2 = await request.input('qty')
                // const zz = z2.replace(/^\D+/g, '')
                // x.qty = zz
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
        else{
            return response.json("nope")
        }
    }

    public async getUserOrder({request, response, params}:HttpContextContract){
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
                const x = await UserOrder.query().select('*')
                const page = request.input('page',1)
                const limit = 10
                const data = await UserOrder.query().select('*').paginate(page, limit)
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

    public async deleteUserOrder({response, params}: HttpContextContract){
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
