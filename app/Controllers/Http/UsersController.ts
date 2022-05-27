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

    public async updateUser({request, response, params, auth}: HttpContextContract){
        try{
            const userId = await auth.user?.id
            const user = await User.findOrFail(params.id)
            if(params.id == userId){
                const data = await request.only(['password', 'address', 'phone','name'])
                const afterUpdate = await user.merge(data).save()
                return response.status(200).json(
                    new ResponseFormat(
                        afterUpdate,
                        true,
                        EnumStatus.SUCCESS,
                        auth.isLoggedOut                        
                    )
                )
            }
            else{
                if(user.isAdmin){
                    return response.status(400).json(
                        new ResponseFormat(
                            `Can't update Admin`,
                            false,
                            EnumStatus.ERROR,
                            auth.isLoggedOut
                        )
                    )
                }
                else{
                    const data = await request.only(['password', 'address', 'phone','name'])
                    const afterUpdate = await user.merge(data).save()
                    return response.status(200).json(
                    new ResponseFormat(
                        afterUpdate,
                        true,
                        EnumStatus.SUCCESS,
                        auth.isLoggedOut                        
                    )
                )
                }
            }
        }
        catch(err){
            return response.status(402).json(
                new ResponseFormat(
                    err,
                    false,
                    EnumStatus.ERROR,
                    auth.isLoggedOut
                )
            )
        }
    }

    public async deleteUser({response, params, auth}:HttpContextContract){
        try{
            const user = await User.findOrFail(params.id)
            if(user.isAdmin){
                return response.status(400).json(
                    new ResponseFormat(
                        `Can't delete Admin`,
                        false,
                        EnumStatus.ERROR,
                        auth.isLoggedOut
                    )
                )
            }
            await user.delete()
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
            return response.status(402).json(
                new ResponseFormat(
                    err,
                    false,
                    EnumStatus.ERROR,
                    auth.isLoggedOut
                )
            )
        }
    }
}
