import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/:id?','UserOrdersController.getUserOrder').middleware('checkAdmin')
    Route.patch('/:id', 'UserOrdersController.patchUserOrder').middleware('checkAdmin')
    Route.delete('/:id','UserOrdersController.deleteUserOrder').middleware('checkAdmin')
}).prefix('userorder').middleware('auth')
Route.post('/','UserOrdersController.addUserOrder').prefix('userorder')