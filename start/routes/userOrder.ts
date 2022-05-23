import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/:id?','UserOrdersController.getUserOrder')
    Route.post('/','UserOrdersController.addUserOrder')
    Route.patch('/:id', 'UserOrdersController.patchUserOrder')
    Route.delete('/:id','UserOrdersController.deleteUserOrder')
}).prefix('userorder').middleware('checkAdmin').middleware('auth')