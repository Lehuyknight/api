import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema as Schema, rules} from '@ioc:Adonis/Core/Validator'
import ResponseData from 'App/utils/ResponseData'
const EnumStatus = require('App/utils/EnumStatus')
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
export default class AuthController {
    public async signup({request, response}:HttpContextContract){
        const validator = await Schema.create({
            email: Schema.string([
                rules.trim(),
                rules.normalizeEmail({
                    allLowercase: true,
                    gmailRemoveDots: true,
                    gmailRemoveSubaddress: true,
                }),
                rules.unique({table:'users',column:'email'}),
                rules.required()
            ]),
            name: Schema.string([
                rules.trim(),
                rules.maxLength(100)
            ]),
            phone: Schema.string([
                rules.trim(),
                rules.mobile()
            ]),
            address: Schema.string([
                rules.trim()
            ]),
            password: Schema.string([
                rules.trim(),
                rules.minLength(6),
                rules.unique({table:'users', column:'password'}),
                rules.confirmed(),
                rules.required()
            ])
        })
        try{
            const userData = await request.validate({schema: validator})
            const createData = await User.create(userData)
            return response.json(
                new ResponseData(
                    response.getStatus(),
                    EnumStatus.SUCCESS,
                    createData
                )
            )
        }
        catch(err){
            return response.json(
                new ResponseData(
                    response.getStatus(),
                    EnumStatus.ERROR,
                    err
                )
            )
        }
    }

    public async login({request, response, auth}:HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        try{
            const bearerToken = await auth.attempt(email, password)
            const userData = await User.findBy('email', email)
            return response.status(200).json(
                new ResponseData(
                    response.getStatus(),
                    EnumStatus.SUCCESS,
                    {userData, bearerToken}
                )
            )
        }
        catch(err){
            return response.json(
                new ResponseData(
                    null,
                    EnumStatus.ERROR,
                    'Invalid Credentials'
                )
            )
        }   
    }

    //logout()
    public async logout({request, response, auth}){
        //revoke token        
        await auth.use('api').revoke()
        await Database.from('api_tokens').delete().where('expires_at','<',`${DateTime.now().toSQLDate()} ${DateTime.now().toSQLTime()}`)
        return response.status(200).clearCookies('accessToken')
    }
}