function AgendaPerfilMapaDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["hora", "fk_agenda_perfil", "vigencia_inicio", "vigencia_fim"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

AgendaPerfilMapaDAO.prototype.lista = function(callback, agendaPerfilId){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda_perfil_mapa where fk_agenda_perfil = ? `, agendaPerfilId,  callback);
}

AgendaPerfilMapaDAO.prototype.busca = function(agendaPerfilMapaId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda_perfil_mapa WHERE pk = ? `, agendaPerfilMapaId, callback);
}

AgendaPerfilMapaDAO.prototype.salva = function(agendaPerfilMapa, callback){
	if (agendaPerfilMapa.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(agendaPerfilMapa[e]));							
		this._connection.query(`UPDATE agenda_perfil_mapa SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(agendaPerfilMapa[e]));			
		this._connection.query(`insert into agenda_perfil_mapa (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

AgendaPerfilMapaDAO.prototype.remove = function(agendaPerfilMapaId, callback){
	this._connection.query(`delete from agenda_perfil_mapa where pk = ? `, agendaPerfilMapaId, callback);
}

module.exports = function(){
	return AgendaPerfilMapaDAO;
}