 module.exports = function(app){		
	getClienteDiario =  function(request, response, next){
		let clienteId = request.query['clienteId'];			
		let connection = app.infra.connectionFactory();
		let ClienteDiarioDAO = new app.infra.ClienteDiarioDAO(connection);
		ClienteDiarioDAO.lista(function(erros, resultados){
			if(erros){				
				return next(erros);
			}
			response.format({
				json: function(){					
					response.json(resultados);
				}
			});
		}, clienteId);
		connection.end();		
	} 

	getClienteDiarioById =  function(request, response, next){
		let clienteDiarioId = request.params.clienteDiarioId;
		let connection = app.infra.connectionFactory();
		let ClienteDiarioDAO = new app.infra.ClienteDiarioDAO(connection);
		ClienteDiarioDAO.busca(clienteDiarioId, function(erros, resultados){
			if(erros){
				return next(erros);
			}
			response.format({
				json: function(){
					response.json(resultados[0]);
				}
			});
		});
		connection.end();		
	}	

	deleteClienteDiario = function(request, response, next){	
		let clienteDiarioId = request.params.clienteDiarioId;		
		let connection = app.infra.connectionFactory();
		let ClienteDiarioDAO = new app.infra.ClienteDiarioDAO(connection);	
		ClienteDiarioDAO.remove(clienteDiarioId, function(erros, resultados){			
			if (erros){
				console.log(erros);			
				return next(erros);
			}
			response.format({
				json: function(){
					response.json(resultados);
				}
			});			
			console.log(resultados);		
		});
		request = null;
		connection.end();
	}		

	saveClienteDiario = function(request, response, next){
		let clienteDiario = request.body;
		let connection = app.infra.connectionFactory();
		let ClienteDiarioDAO = new app.infra.ClienteDiarioDAO(connection);		
		ClienteDiarioDAO.salva(clienteDiario, function(erros, resultados){			
			if (erros){
				console.log(erros);			
				return next(erros);
			}
			response.format({
				json: function(){
					response.json(resultados);
				}
			});
			///pegar id inserido			
			console.log(resultados.insertId);		
		});
		request = null;
		connection.end();
	}
	
	app.route('/v1/clienteDiario/:clienteDiarioId')
		.get(getClienteDiarioById)
		.delete(deleteClienteDiario);
	app.route('/v1/clienteDiario')
		.get(getClienteDiario)
		.put(saveClienteDiario)
		.post(saveClienteDiario);		
} 