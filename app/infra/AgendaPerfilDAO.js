function AgendaPerfilDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["nome"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

AgendaPerfilDAO.prototype.lista = function(callback){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda_perfil `,  callback);
}

AgendaPerfilDAO.prototype.busca = function(agendaPerfilId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda_perfil WHERE pk = ? `, agendaPerfilId, callback);
}

AgendaPerfilDAO.prototype.salva = function(agendaPerfil, callback){
	if (agendaPerfil.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(agendaPerfil[e]));							
		this._connection.query(`UPDATE agenda_perfil SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(agendaPerfil[e]));			
		this._connection.query(`insert into agenda_perfil (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

AgendaPerfilDAO.prototype.remove = function(agendaPerfilId, callback){
	this._connection.query(`delete from agenda_perfil where pk = ? `, agendaPerfilId, callback);
}

module.exports = function(){
	return AgendaPerfilDAO;
}