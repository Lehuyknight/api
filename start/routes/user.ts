import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
    Route.post('/login','AuthController.login')
    Route.post('/signup','AuthController.signup')
    Route.post('/signAdmin','AuthController.signupAdmin').middleware('checkAdmin')
}).prefix('user')