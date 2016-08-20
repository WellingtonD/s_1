 module.exports = function(app){		
	getOperadorasTelefonia =  function(request, response, next){				
		let connection = app.infra.connectionFactory();
		let OperadoraTelefoniaDAO = new app.infra.OperadoraTelefoniaDAO(connection);
		OperadoraTelefoniaDAO.lista(function(erros, resultados){
			if(erros){				
				return next(erros);
			}
			response.format({
				json: function(){					
					response.json(resultados);
				}
			});
		});
		connection.end();		
	} 

	getOperadoraTelefoniaById =  function(request, response, next){
		let operadoraTelefoniaId = request.params.operadoraTelefoniaId;
		let connection = app.infra.connectionFactory();
		let OperadoraTelefoniaDAO = new app.infra.OperadoraTelefoniaDAO(connection);
		OperadoraTelefoniaDAO.busca(operadoraTelefoniaId, function(erros, resultados){
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

	deleteOperadoraTelefonia = function(request, response, next){	
		let operadoraTelefoniaId = request.params.operadoraTelefoniaId;		
		let connection = app.infra.connectionFactory();
		let OperadoraTelefoniaDAO = new app.infra.OperadoraTelefoniaDAO(connection);	
		OperadoraTelefoniaDAO.remove(operadoraTelefoniaId, function(erros, resultados){			
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

	saveOperadoraTelefonia = function(request, response, next){
		let operadoraTelefonia = request.body;
		let connection = app.infra.connectionFactory();
		let OperadoraTelefoniaDAO = new app.infra.OperadoraTelefoniaDAO(connection);		
		OperadoraTelefoniaDAO.salva(operadoraTelefonia, function(erros, resultados){			
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
	
	app.route('/v1/operadorasTelefonia/:operadoraTelefoniaId')
		.get(getOperadoraTelefoniaById)
		.delete(deleteOperadoraTelefonia);
	app.route('/v1/operadorasTelefonia')
		.get(getOperadorasTelefonia)
		.put(saveOperadoraTelefonia)
		.post(saveOperadoraTelefonia);		
} 