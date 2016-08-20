 module.exports = function(app){		
	getClienteTelefones =  function(request, response, next){
		let clienteId = request.query['clienteId'];			
		let connection = app.infra.connectionFactory();
		let ClienteTelefonesDAO = new app.infra.ClienteTelefonesDAO(connection);
		ClienteTelefonesDAO.lista(function(erros, resultados){
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

	getClienteTelefoneById =  function(request, response, next){
		let clienteTelefoneId = request.params.clienteTelefoneId;
		let connection = app.infra.connectionFactory();
		let ClienteTelefonesDAO = new app.infra.ClienteTelefonesDAO(connection);
		ClienteTelefonesDAO.busca(clienteTelefoneId, function(erros, resultados){
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

	deleteClienteTelefone = function(request, response, next){	
		let clienteTelefoneId = request.params.clienteTelefoneId;		
		let connection = app.infra.connectionFactory();
		let ClienteTelefonesDAO = new app.infra.ClienteTelefonesDAO(connection);	
		ClienteTelefonesDAO.remove(clienteTelefoneId, function(erros, resultados){			
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

	saveClienteTelefone = function(request, response, next){
		let clienteTelefone = request.body;
		let connection = app.infra.connectionFactory();
		let ClienteTelefonesDAO = new app.infra.ClienteTelefonesDAO(connection);		
		ClienteTelefonesDAO.salva(clienteTelefone, function(erros, resultados){			
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
	
	app.route('/v1/clienteTelefones/:clienteTelefoneId')
		.get(getClienteTelefoneById)
		.delete(deleteClienteTelefone);
	app.route('/v1/clienteTelefones')
		.get(getClienteTelefones)
		.put(saveClienteTelefone)
		.post(saveClienteTelefone);		
} 