import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
    Route.group(() => {
        Route.post('/CreateNewOrder','OrdersController.createNewOrder')
    }).prefix('Epartner')
}).prefix('api')