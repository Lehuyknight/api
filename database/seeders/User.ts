import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.create({
      email:'love@gmail.com',
      name:'Huy',
      phone:'0123582654',
      address:'test address',
      password:'Lehuy1920',
      isAdmin:true
    })
  }
}
