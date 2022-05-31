import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.create({
      email:'admin@c9p.com',
      name:'ADMIN',
      phone:'0123582654',
      address:'test address',
      password:'123456',
      isAdmin:true
    })
  }
}
