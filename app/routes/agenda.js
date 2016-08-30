 module.exports = function(app){		
	getAgenda =  function(request, response, next){
		let data = request.query['data'];			
		let connection = app.infra.connectionFactory();
		let AgendaDAO = new app.infra.AgendaDAO(connection);
		AgendaDAO.lista(function(erros, resultados){
			if(erros){				
				return next(erros);
			}
			response.format({
				json: function(){					
					response.json(resultados);
				}
			});
		}, data);
		connection.end();		
	} 

	getAgendaById =  function(request, response, next){
		let agendaId = request.params.agendaId;
		let connection = app.infra.connectionFactory();
		let AgendaDAO = new app.infra.AgendaDAO(connection);
		AgendaDAO.busca(agendaId, function(erros, resultados){
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

	deleteAgenda = function(request, response, next){	
		let agendaId = request.params.agendaId;		
		let connection = app.infra.connectionFactory();
		let AgendaDAO = new app.infra.AgendaDAO(connection);	
		AgendaDAO.remove(agendaId, function(erros, resultados){			
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

	saveAgenda = function(request, response, next){
		let agenda = request.body;
		let connection = app.infra.connectionFactory();
		let AgendaDAO = new app.infra.AgendaDAO(connection);		
		AgendaDAO.salva(agenda, function(erros, resultados){			
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
	
	app.route('/v1/agenda/:agendaId')
		.get(getAgendaById)
		.delete(deleteAgenda);
	app.route('/v1/agenda')
		.get(getAgenda)
		.put(saveAgenda)
		.post(saveAgenda);		
} 