import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
    Route.group(() => {
        Route.post('/CreateNewOrder','OrdersController.createNewOrder')
        Route.post('/order', 'OrdersController.getOrder')
    }).prefix('Epartner')
}).prefix('api').middleware('auth')