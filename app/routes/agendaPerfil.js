 module.exports = function(app){		
	getAgendaPerfil =  function(request, response, next){		
		let connection = app.infra.connectionFactory();
		let AgendaPerfilDAO = new app.infra.AgendaPerfilDAO(connection);
		AgendaPerfilDAO.lista(function(erros, resultados){
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

	getAgendaPerfilById =  function(request, response, next){
		let agendaPerfilId = request.params.agendaPerfilId;
		let connection = app.infra.connectionFactory();
		let AgendaPerfilDAO = new app.infra.AgendaPerfilDAO(connection);
		AgendaPerfilDAO.busca(agendaPerfilId, function(erros, resultados){
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

	deleteAgendaPerfil = function(request, response, next){	
		let agendaPerfilId = request.params.agendaPerfilId;		
		let connection = app.infra.connectionFactory();
		let AgendaPerfilDAO = new app.infra.AgendaPerfilDAO(connection);	
		AgendaPerfilDAO.remove(agendaPerfilId, function(erros, resultados){			
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

	saveAgendaPerfil = function(request, response, next){
		let agendaPerfil = request.body;
		let connection = app.infra.connectionFactory();
		let AgendaPerfilDAO = new app.infra.AgendaPerfilDAO(connection);		
		AgendaPerfilDAO.salva(agendaPerfil, function(erros, resultados){			
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
	
	app.route('/v1/agendaPerfil/:agendaPerfilId')
		.get(getAgendaPerfilById)
		.delete(deleteAgendaPerfil);
	app.route('/v1/agendaPerfil')
		.get(getAgendaPerfil)
		.put(saveAgendaPerfil)
		.post(saveAgendaPerfil);		
} 