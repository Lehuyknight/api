import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
    Route.post('/login','AuthController.login')
    Route.post('/signup','AuthController.signup')
}).prefix('user')
Route.group(() =>{
    Route.get('/user/:id?','UsersController.getUser')
    Route.post('/register','AuthController.signupAdmin').middleware('checkAdmin')
}).prefix('admin').middleware('auth').middleware('checkAdmin')