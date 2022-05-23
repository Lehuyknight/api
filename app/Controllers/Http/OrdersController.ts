import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResponseFormat from 'App/utils/ResponseFormat';
const EnumStatus = require('App/utils/EnumStatus');
import { HttpContext } from "@adonisjs/core/build/standalone";
import Order from 'App/Models/Order';
import { schema as Schema, rules} from '@ioc:Adonis/Core/Validator'
import UserOrdersController from './UserOrdersController';
import UserOrder from 'App/Models/UserOrder';

export default class OrdersController {
}
