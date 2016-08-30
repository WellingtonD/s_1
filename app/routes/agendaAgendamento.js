 module.exports = function(app){		
	getAgendaAgendamento =  function(request, response, next){
		let agendaId = request.query['agendaId'];			
		let connection = app.infra.connectionFactory();
		let AgendaAgendamentoDAO = new app.infra.AgendaAgendamentoDAO(connection);
		AgendaAgendamentoDAO.lista(function(erros, resultados){
			if(erros){				
				return next(erros);
			}
			response.format({
				json: function(){					
					response.json(resultados);
				}
			});
		}, agendaId);
		connection.end();		
	} 

	getAgendaAgendamentoById =  function(request, response, next){
		let agendaAgendamentoId = request.params.agendaAgendamentoId;
		let connection = app.infra.connectionFactory();
		let AgendaAgendamentoDAO = new app.infra.AgendaAgendamentoDAO(connection);
		AgendaAgendamentoDAO.busca(agendaAgendamentoId, function(erros, resultados){
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

	deleteAgendaAgendamento = function(request, response, next){	
		let agendaAgendamentoId = request.params.agendaAgendamentoId;		
		let connection = app.infra.connectionFactory();
		let AgendaAgendamentoDAO = new app.infra.AgendaAgendamentoDAO(connection);	
		AgendaAgendamentoDAO.remove(agendaAgendamentoId, function(erros, resultados){			
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

	saveAgendaAgendamento = function(request, response, next){
		let agendaAgendamento = request.body;
		let connection = app.infra.connectionFactory();
		let AgendaAgendamentoDAO = new app.infra.AgendaAgendamentoDAO(connection);		
		AgendaAgendamentoDAO.salva(agendaAgendamento, function(erros, resultados){			
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
	
	app.route('/v1/agendaAgendamento/:agendaAgendamentoId')
		.get(getAgendaAgendamentoById)
		.delete(deleteAgendaAgendamento);
	app.route('/v1/agendaAgendamento')
		.get(getAgendaAgendamento)
		.put(saveAgendaAgendamento)
		.post(saveAgendaAgendamento);		
} 