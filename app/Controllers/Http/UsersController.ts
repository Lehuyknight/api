import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
const EnumStatus = require('App/utils/EnumStatus')
import ResponseFormat from 'App/utils/ResponseFormat'

export default class UsersController {
    public async getUser({params, response, request, auth}: HttpContextContract){
        if(params.id){
            try{
                const user = await User.findOrFail(params.id)
                return response.status(200).json(
                    new ResponseFormat(
                        user,
                        true,
                        EnumStatus.SUCCESS,
                        auth.isLoggedOut
                    )
                )
            }
            catch(err){
                return response.status(200).json(
                    new ResponseFormat(
                        err,
                        false,
                        EnumStatus.NOT_FOUND,
                        auth.isLoggedOut
                    )
                )
            }
        }
        else{
            try{
                const user = await User.all()
                return response.status(200).json(
                    new ResponseFormat(
                        user,
                        true,
                        EnumStatus.SUCCESS,
                        auth.isLoggedOut
                    )
                )
            }
            catch(err){
                return response.status(200).json(
                    new ResponseFormat(
                        err,
                        false,
                        EnumStatus.NOT_FOUND,
                        auth.isLoggedOut
                    )
                )
            }
        }
    }
}
