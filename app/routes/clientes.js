 module.exports = function(app){		
	getClientes =  function(request, response, next){
		let sqlCustom = request.query['sqlCustom'] || {};			
		let connection = app.infra.connectionFactory();
		let clientesDAO = new app.infra.ClientesDAO(connection);
		clientesDAO.lista(function(erros, resultados){
			if(erros){				
				return next(erros);
			}
			response.format({
				json: function(){					
					response.json(resultados);
				}
			});
		}, sqlCustom);
		connection.end();		
	} 

	getClienteById =  function(request, response, next){
		let clienteId = request.params.clienteId;
		let connection = app.infra.connectionFactory();
		let clientesDAO = new app.infra.ClientesDAO(connection);
		clientesDAO.busca(clienteId, function(erros, resultados){
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

	deleteCliente = function(request, response, next){	
		let clienteId = request.params.clienteId;		
		let connection = app.infra.connectionFactory();
		let clientesDAO = new app.infra.ClientesDAO(connection);	
		clientesDAO.remove(clienteId, function(erros, resultados){			
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

	saveCliente = function(request, response, next){
		let cliente = request.body;
		let connection = app.infra.connectionFactory();
		let clientesDAO = new app.infra.ClientesDAO(connection);
		clientesDAO.salva(cliente, function(erros, resultados){			
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
			///console.log(resultados.insertId);		
		});
		request = null;
		connection.end();
	}
	
	app.route('/v1/clientes/:clienteId')
		.get(getClienteById)
		.delete(deleteCliente);
	app.route('/v1/clientes')
		.get(getClientes)
		.put(saveCliente)
		.post(saveCliente);		
} 