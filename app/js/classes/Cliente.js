class Cliente {    
    //constructor(pk, nome, endereco, bairro, numero, complemento, cidade, email, facebook, observacoes) {
    constructor(pk) {        
        this.pk = pk;
        
        /*
        this.nome = nome;        
        this.endereco = endereco;
        this.bairro = bairro;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.email = email;
        this.facebook = facebook;
        this.observacoes = observacoes;
        */
    }    

/*
    get pk() {        
        return this.pk;
    }
    
    set pk(value) {        
        this.pk = value;
    }    
    */
    
    //get pk(){ return pk; }
    //set pk( value ){ this.pk = value; }





//pk, nome, endereco, bairro, numero, complemento, cidade, email, facebook, observacoes

}

///tornar classe compativel com o NodeJs
///verifica se exports existe
if (typeof exports !== 'undefined') {
    ///se sim export na Class    
    exports.Cliente = Cliente;
}
