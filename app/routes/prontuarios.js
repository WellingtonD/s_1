 module.exports = function(app){		
	getProntuarios =  function(request, response, next){
		let sqlCustom = request.query['sqlCustom'] || {};			
		let connection = app.infra.connectionFactory();
		let prontuariosDAO = new app.infra.ProntuariosDAO(connection);		
		prontuariosDAO.lista(function(erros, resultados){
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

	getProntuarioById =  function(request, response, next){
		let prontuarioId = request.params.prontuarioId;
		let connection = app.infra.connectionFactory();
		let prontuariosDAO = new app.infra.ProntuariosDAO(connection);
		prontuariosDAO.busca(prontuarioId, function(erros, resultados){
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

	deleteProntuario = function(request, response, next){	
		let prontuarioId = request.params.prontuarioId;		
		let connection = app.infra.connectionFactory();
		let prontuariosDAO = new app.infra.ProntuariosDAO(connection);	
		prontuariosDAO.remove(prontuarioId, function(erros, resultados){			
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

	saveProntuario = function(request, response, next){
		let prontuario = request.body;
		let connection = app.infra.connectionFactory();
		let prontuariosDAO = new app.infra.ProntuariosDAO(connection);		
		prontuariosDAO.salva(prontuario, function(erros, resultados){			
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
	
	app.route('/v1/prontuarios/:prontuarioId')
		.get(getProntuarioById)
		.delete(deleteProntuario);
	app.route('/v1/prontuarios')
		.get(getProntuarios)
		.put(saveProntuario)
		.post(saveProntuario);		
} 