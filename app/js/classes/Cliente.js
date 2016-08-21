class Cliente {    
    constructor(pk, nome, endereco, bairro, numero, complemento, cidade, email, facebook, observacoes) {            
        this._pk = pk;
        this._nome = nome;        
        this._endereco = endereco;
        this._bairro = bairro;
        this._numero = numero;
        this._complemento = complemento;
        this._cidade = cidade;
        this._email = email;
        this._facebook = facebook;
        this._observacoes = observacoes;
    }    

    get pk() { return this._pk; }
    set pk(v) { this._pk = v; }
        
    get nome() { return this._nome; }
    set nome(v) { this._nome = v; }
    
    get endereco() { return this._endereco; }
    set endereco(v) { this._endereco = v; }

    get bairro() { return this._bairro; }
    set bairro(v) { this._bairro = v; }

    get numero() { return this._numero; }
    set numero(v) { this._numero = v; }

    get complemento() { return this._complemento; }
    set complemento(v) { this._complemento = v; }

    get cidade() { return this._cidade; }
    set cidade(v) { this._cidade = v; }

    get email() { return this._email; }
    set email(v) { this._email = v; }

    get facebook() { return this._facebook; }
    set facebook(v) { this._facebook = v; }

    get observacoes() { return this._observacoes; }
    set observacoes(v) { this._observacoes = v; }    
}

///tornar classe compativel com o NodeJs
///verifica se exports existe
if (typeof exports !== 'undefined') {
    ///se sim export na Class    
    exports.Cliente = Cliente;
}
