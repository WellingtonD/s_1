function AgendaAgendamentoDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["fk_agenda", "fk_cliente", "nome_cliente", "fk_tipo_atendimento", "observacao", "fk_status", "telefone_1", "telefone_2"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

AgendaAgendamentoDAO.prototype.lista = function(callback, agendaId){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda_agendamento where fk_agenda = ? `, agendaId,  callback);
}

AgendaAgendamentoDAO.prototype.busca = function(agendaAgendamentoId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM agenda_agendamento WHERE pk = ? `, agendaAgendamentoId, callback);
}

AgendaAgendamentoDAO.prototype.salva = function(agendaAgendamento, callback){
	if (agendaAgendamento.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(agendaAgendamento[e]));							
		this._connection.query(`UPDATE agenda_agendamento SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(agendaAgendamento[e]));			
		this._connection.query(`insert into agenda_agendamento (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

AgendaAgendamentoDAO.prototype.remove = function(agendaAgendamentoId, callback){
	this._connection.query(`delete from agenda_agendamento where pk = ? `, agendaAgendamentoId, callback);
}

module.exports = function(){
	return AgendaAgendamentoDAO;
}