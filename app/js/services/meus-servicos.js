//,'ngAnimate', 'ui.bootstrap', 'summernote'
angular.module('meusServicos', ['ngResource', 'summernote'])
    .factory('recursoProntuario', function($resource) {        
        return $resource('/v1/prontuarios/:prontuarioId', null, {
            "update" : { 
                method: "PUT"
            }
        }); 
    })
    .factory('cadastroDeProntuarios', function(recursoProntuario, $q, $rootScope){
		var servico = {};	
		servico.cadastrar = function(prontuario){			
			return $q(function(resolve, reject) {
				if (prontuario.id){		
					///envia mensagem HTTP para o server
					///parametros:
					///		1) corpo da mensagem : objeto prontuario que sera alterado
					///		2) callback função se sucesso
					///		3) callback função se erro 			
					recursoProntuario.update(prontuario, function() {
						var msg = 'Prontuario '+prontuario.nome+' atualizado com sucesso!';
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('prontuarioCadastrado');
						resolve({
							mensagem : msg,
							inclusao : false
						});
						console.log(msg);
					}, function(erro) {
						var msg = 'Não foi possivel alterar o prontuario '+prontuario.nome+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});				
				}
				else {									
					recursoProntuario.save(prontuario, function(data){
						var msg = 'Prontuario '+prontuario.nome+' incluido com sucesso!';
						///possibilita pegar o id inserido
						if (data.id) {
							console.log(`Id ${ data.id } criado com sucesso`);
						}
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('prontuarioCadastrado');
						resolve({
							mensagem : msg,
							inclusao : true
						});
						console.log(msg);	
					}, function(erro) {											
						var msg = 'Não foi possivel cadastrar o prontuario '+produto.nome+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});
				}
			});
		}
		return servico;    	
    })
	
	
	.factory('recursoCliente', function($resource) {        
        return $resource('/v1/clientes/:clienteId', null, {
            "update" : { 
                method: "PUT"
            }
        }); 
    })
    .factory('cadastroDeClientes', function(recursoCliente, $q, $rootScope){
		var servico = {};	
		servico.cadastrar = function(cliente){			
			return $q(function(resolve, reject) {
				if (cliente.pk){		
					///envia mensagem HTTP para o server
					///parametros:
					///		1) corpo da mensagem : objeto cliente que sera alterado
					///		2) callback função se sucesso
					///		3) callback função se erro 			
					recursoCliente.update(cliente, function() {
						var msg = 'Cliente '+cliente.nome+' atualizado com sucesso!';
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('clienteCadastrado');
						resolve({
							mensagem : msg,
							inclusao : false
						});
						console.log(msg);
					}, function(erro) {
						var msg = 'Não foi possivel alterar o cliente '+cliente.nome+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});				
				}
				else {									
					recursoCliente.save(cliente, function(data){
						var msg = 'Cliente '+cliente.nome+' incluido com sucesso!';
						///possibilita pegar o id inserido
						if (data.pk) {
							console.log(`Id ${ data.pk } criado com sucesso`);
						}
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('clienteCadastrado');
						resolve({
							mensagem : msg,
							inclusao : true
						});
						console.log(msg);	
					}, function(erro) {											
						var msg = 'Não foi possivel cadastrar o cliente '+cliente.nome+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});
				}
			});
		}
		return servico;
	})
	
	
	
	.factory('recursoClienteTelefone', function($resource) {        
        return $resource('/v1/clienteTelefones/:clienteTelefoneId', null, {
            "update" : { 
                method: "PUT"
            }
        }); 
    })
    .factory('cadastroDeClienteTelefones', function(recursoClienteTelefone, $q, $rootScope){
		var servico = {};	
		servico.cadastrar = function(clienteTelefone){			
			return $q(function(resolve, reject) {
				if (clienteTelefone.pk){		
					///envia mensagem HTTP para o server
					///parametros:
					///		1) corpo da mensagem : objeto cliente que sera alterado
					///		2) callback função se sucesso
					///		3) callback função se erro 			
					recursoClienteTelefone.update(clienteTelefone, function() {
						var msg = 'Telefone '+clienteTelefone.telefone+' atualizado com sucesso!';
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('clienteTelefoneCadastrado');
						resolve({
							mensagem : msg,
							inclusao : false
						});
						console.log(msg);
					}, function(erro) {
						var msg = 'Não foi possivel alterar o telefone '+clienteTelefone.telefone+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});				
				}
				else {									
					recursoClienteTelefone.save(clienteTelefone, function(data){
						var msg = 'Telefone '+clienteTelefone.telefone+' incluido com sucesso!';
						///possibilita pegar o id inserido
						if (data.pk) {
							console.log(`Id ${ data.pk } criado com sucesso`);
						}
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('clienteTelefoneCadastrado');
						resolve({
							mensagem : msg,
							inclusao : true
						});
						console.log(msg);	
					}, function(erro) {											
						var msg = 'Não foi possivel cadastrar o telefone '+clienteTelefone.telefone+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});
				}
			});
		}
		return servico;
	})
	


	.factory('recursoOperadoraTelefonia', function($resource) {        
        return $resource('/v1/operadorasTelefonia/:operadoraTelefoniaId', null, {
            "update" : { 
                method: "PUT"
            }
        }); 
    })
    .factory('cadastroDeOperadorasTelefonia', function(recursoOperadoraTelefonia, $q, $rootScope){
		var servico = {};	
	
		///esse serviço é utilizado para fornecer uma listagem de operadorasTelefonia
		///para qualquer controller, o controller que quiser essa listagem deve
		///receber a injeção do serviço cadastroDeOperadorasTelefonia 
		servico.listar = function() {
			return $q(function(resolve, reject){
				recursoOperadoraTelefonia.query(function(operadorasTelefonia){
					resolve({
						ret : operadorasTelefonia						
					});                                     	     	
            	}, function(erro) {    
					reject({
						erro : erro
					});
            	});
			});
		}
	
		servico.cadastrar = function(operadoraTelefonia){			
			return $q(function(resolve, reject) {
				if (operadoraTelefonia.pk){		
					///envia mensagem HTTP para o server
					///parametros:
					///		1) corpo da mensagem : objeto cliente que sera alterado
					///		2) callback função se sucesso
					///		3) callback função se erro 			
					recursoOperadoraTelefonia.update(operadoraTelefonia, function() {
						var msg = 'Telefone '+operadoraTelefonia.nome+' atualizado com sucesso!';
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('operadoraTelefoniaCadastrada');
						resolve({
							mensagem : msg,
							inclusao : false
						});
						console.log(msg);
					}, function(erro) {
						var msg = 'Não foi possivel alterar a operadora '+operadoraTelefonia.nome+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});				
				}
				else {									
					recursoOperadoraTelefonia.save(operadoraTelefonia, function(data){
						var msg = 'Operadora '+operadoraTelefonia.nome+' incluida com sucesso!';
						///possibilita pegar o id inserido
						if (data.pk) {
							console.log(`Id ${ data.pk } criado com sucesso`);
						}
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('operadoraTelefoniaCadastrado');
						resolve({
							mensagem : msg,
							inclusao : true
						});
						console.log(msg);	
					}, function(erro) {											
						var msg = 'Não foi possivel cadastrar a operadora '+operadoraTelefonia.nome+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});
				}
			});
		}
		return servico;
	})
	
	
	
	.factory('recursoClienteDiario', function($resource) {        
        return $resource('/v1/clienteDiario/:clienteDiarioId', null, {
            "update" : { 
                method: "PUT"
            }
        }); 
    })
    .factory('cadastroDeClienteDiarios', function(recursoClienteDiario, $q, $rootScope){
		var servico = {};	
		servico.cadastrar = function(clienteDiario){			
			return $q(function(resolve, reject) {
				if (clienteDiario.pk){		
					///envia mensagem HTTP para o server
					///parametros:
					///		1) corpo da mensagem : objeto cliente que sera alterado
					///		2) callback função se sucesso
					///		3) callback função se erro 			
					recursoClienteDiario.update(clienteDiario, function() {
						var msg = 'Diario '+clienteDiario.data+' atualizado com sucesso!';
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('clienteDiarioCadastrado');
						resolve({
							mensagem : msg,
							inclusao : false
						});
						console.log(msg);
					}, function(erro) {
						var msg = 'Não foi possivel alterar o Diario '+clienteDiario.data+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});				
				}
				else {									
					recursoClienteDiario.save(clienteDiario, function(data){
						var msg = 'Diario '+clienteDiario.data+' incluido com sucesso!';
						///possibilita pegar o id inserido
						if (data.pk) {
							console.log(`Id ${ data.pk } criado com sucesso`);
						}
						///disparar o evento  prontuarioCadastrado
						$rootScope.$broadcast('clienteDiarioCadastrado');
						resolve({
							mensagem : msg,
							inclusao : true
						});
						console.log(msg);	
					}, function(erro) {											
						var msg = 'Não foi possivel cadastrar o Diario '+clienteDiario.data+'!';
						reject({
							mensagem : msg
						});
						console.log(erro);
						console.log(msg);
					});
				}
			});
		}
		return servico;
	})
	
	
	;	    