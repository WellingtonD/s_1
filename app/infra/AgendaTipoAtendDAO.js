function AgendaTipoAtendDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["descricao", "fk_class_cor"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

AgendaTipoAtendDAO.prototype.lista = function(callback){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda_tipo_atend `,  callback);
}

AgendaTipoAtendDAO.prototype.busca = function(agendaTipoAtendId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda_tipo_atend WHERE pk = ? `, agendaTipoAtendId, callback);
}

AgendaTipoAtendDAO.prototype.salva = function(agendaTipoAtend, callback){
	if (agendaTipoAtend.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(agendaTipoAtend[e]));							
		this._connection.query(`UPDATE agenda_tipo_atend SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(agendaTipoAtend[e]));			
		this._connection.query(`insert into agenda_tipo_atend (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

AgendaTipoAtendDAO.prototype.remove = function(agendaTipoAtendId, callback){
	this._connection.query(`delete from agenda_tipo_atend where pk = ? `, agendaTipoAtendId, callback);
}

module.exports = function(){
	return AgendaTipoAtendDAO;
}