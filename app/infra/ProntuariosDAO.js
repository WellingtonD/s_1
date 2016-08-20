
let libSQL = require('./../js/SqlCustom.js');
let pkFields = ["id"];
let fields = ["nome", "data_cadastro", "data_nascimento", "id_convenio", "sexo", "id_estado_civil", "id_raca", "rg", "cpf", "id_escolaridade", "naturalidade", "profissao", "logradouro", "complemento", "bairro", "cidade", "cep", "uf", "observacoes", "email", "telefones", "alerta", "estado_civil", "raca", "escolaridade"];
let objSQL = new libSQL.SqlCustom();
objSQL._pkFields = pkFields;
objSQL._fields = fields;

function ProntuariosDAO(connection){
	this._connection = connection;
}

ProntuariosDAO.prototype.lista = function(callback, sqlCustom){
	let _sqlCustom = JSON.parse(sqlCustom);	
	this._connection.query(`SELECT ${ objSQL.getSelectFields() } FROM tb_prontuarios ${ objSQL.getSql(_sqlCustom, ` where `) } `,objSQL._bindings, callback);
}

ProntuariosDAO.prototype.busca = function(prontuarioId, callback){	
	this._connection.query(`SELECT ${ objSQL.getSelectFields() } FROM tb_prontuarios WHERE id = ? `, prontuarioId, callback);
}

ProntuariosDAO.prototype.salva = function(prontuario, callback){
	if (prontuario.id){		
		let bindUpdate = [];			
		fields.concat(pkFields).map(e => bindUpdate.push(prontuario[e]));							
		this._connection.query(`UPDATE tb_prontuarios SET ${ objSQL.getUpdateFields() } WHERE id = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		fields.map(e =>	bindInsert.push(prontuario[e]));			
		this._connection.query(`insert into tb_prontuarios (${ objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

ProntuariosDAO.prototype.remove = function(prontuarioId, callback){
	this._connection.query(`delete from tb_prontuarios where id = ? `, prontuarioId, callback);
}

module.exports = function(){
	return ProntuariosDAO;
}