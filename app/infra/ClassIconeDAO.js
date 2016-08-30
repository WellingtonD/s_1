function ClassIconeDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["descricao", "class"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

ClassIconeDAO.prototype.lista = function(callback){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM class_icone `,  callback);
}

ClassIconeDAO.prototype.busca = function(classIconeId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM class_icone WHERE pk = ? `, classIconeId, callback);
}

ClassIconeDAO.prototype.salva = function(classIcone, callback){
	if (classIcone.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(classIcone[e]));							
		this._connection.query(`UPDATE class_icone SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(classIcone[e]));			
		this._connection.query(`insert into class_icone (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

ClassIconeDAO.prototype.remove = function(classIconeId, callback){
	this._connection.query(`delete from class_icone where pk = ? `, classIconeId, callback);
}

module.exports = function(){
	return ClassIconeDAO;
}