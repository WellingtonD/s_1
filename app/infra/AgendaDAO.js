function AgendaDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["fk_agenda_perfil", "data_hora"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

AgendaDAO.prototype.lista = function(callback, data){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda where data_hora = ?`, data,  callback);
}

AgendaDAO.prototype.busca = function(agendaId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda WHERE pk = ? `, agendaId, callback);
}

AgendaDAO.prototype.salva = function(agenda, callback){
	if (agenda.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(agenda[e]));							
		this._connection.query(`UPDATE agenda SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(agenda[e]));			
		this._connection.query(`insert into agenda (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

AgendaDAO.prototype.remove = function(agendaId, callback){
	this._connection.query(`delete from agenda where pk = ? `, agendaId, callback);
}

module.exports = function(){
	return AgendaDAO;
}