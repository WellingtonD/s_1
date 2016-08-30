 module.exports = function(app){		
	getAgendaStatus =  function(request, response, next){		
		let connection = app.infra.connectionFactory();
		let agendaStatusDAO = new app.infra.agendaStatusDAO(connection);
		agendaStatusDAO.lista(function(erros, resultados){
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

	getAgendaStatusById =  function(request, response, next){
		let agendaStatusId = request.params.agendaStatusId;
		let connection = app.infra.connectionFactory();
		let agendaStatusDAO = new app.infra.agendaStatusDAO(connection);
		agendaStatusDAO.busca(agendaStatusId, function(erros, resultados){
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

	deleteAgendaStatus = function(request, response, next){	
		let agendaStatusId = request.params.agendaStatusId;		
		let connection = app.infra.connectionFactory();
		let agendaStatusDAO = new app.infra.agendaStatusDAO(connection);	
		agendaStatusDAO.remove(agendaStatusId, function(erros, resultados){			
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

	saveAgendaStatus = function(request, response, next){
		let agendaStatus = request.body;
		let connection = app.infra.connectionFactory();
		let agendaStatusDAO = new app.infra.agendaStatusDAO(connection);		
		agendaStatusDAO.salva(agendaStatus, function(erros, resultados){			
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
	
	app.route('/v1/agendaStatus/:agendaStatusId')
		.get(getAgendaStatusById)
		.delete(deleteAgendaStatus);
	app.route('/v1/agendaStatus')
		.get(getAgendaStatus)
		.put(saveAgendaStatus)
		.post(saveAgendaStatus);		
} 