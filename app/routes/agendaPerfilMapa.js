 module.exports = function(app){		
	getAgendaPerfilMapa =  function(request, response, next){
		let agendaPerfilId = request.query['agendaPerfilId'];			
		let connection = app.infra.connectionFactory();
		let AgendaPerfilMapaDAO = new app.infra.AgendaPerfilMapaDAO(connection);
		AgendaPerfilMapaDAO.lista(function(erros, resultados){
			if(erros){				
				return next(erros);
			}
			response.format({
				json: function(){					
					response.json(resultados);
				}
			});
		}, agendaPerfilId);
		connection.end();		
	} 

	getAgendaPerfilMapaById =  function(request, response, next){
		let agendaPerfilMapaId = request.params.agendaPerfilMapaId;
		let connection = app.infra.connectionFactory();
		let AgendaPerfilMapaDAO = new app.infra.AgendaPerfilMapaDAO(connection);
		AgendaPerfilMapaDAO.busca(agendaPerfilMapaId, function(erros, resultados){
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

	deleteAgendaPerfilMapa = function(request, response, next){	
		let agendaPerfilMapaId = request.params.agendaPerfilMapaId;		
		let connection = app.infra.connectionFactory();
		let AgendaPerfilMapaDAO = new app.infra.AgendaPerfilMapaDAO(connection);	
		AgendaPerfilMapaDAO.remove(agendaPerfilMapaId, function(erros, resultados){			
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

	saveAgendaPerfilMapa = function(request, response, next){
		let agendaPerfilMapa = request.body;
		let connection = app.infra.connectionFactory();
		let AgendaPerfilMapaDAO = new app.infra.AgendaPerfilMapaDAO(connection);		
		AgendaPerfilMapaDAO.salva(agendaPerfilMapa, function(erros, resultados){			
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
	
	app.route('/v1/agendaPerfilMapa/:agendaPerfilMapaId')
		.get(getAgendaPerfilMapaById)
		.delete(deleteAgendaPerfilMapa);
	app.route('/v1/agendaPerfilMapa')
		.get(getAgendaPerfilMapa)
		.put(saveAgendaPerfilMapa)
		.post(saveAgendaPerfilMapa);		
} 