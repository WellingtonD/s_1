angular.module('estoque').controller('ClienteController', function($scope, recursoCliente, $routeParams, cadastroDeClientes, $timeout, $location){  
    $scope.mensagem = '';
    $scope.cliente = {};
    $scope.showMensagem = false;
    $scope.mensagemErro = false;
    $scope.titulo = `${$routeParams.clienteId ? `Alterar` : `Novo`} Cliente`;
    $scope.clienteTelefones = [];

    ///mostrar mensagem por 2 seegundos
    $scope.doMensagem = function(msg, erro=false) {
        
       $scope.mensagem = msg; 
       $scope.mensagemErro = erro;
       $scope.showMensagem = true;
       $timeout(function(){
          $scope.showMensagem = false;
       }, 2000);
    };   

    ///metodo remover, recebe como parametro o objeto produto
    $scope.remover = function(cliente){
        if (confirm('Confirmar Exclusão do Cliente?')) {
            recursoCliente.delete({clienteId: cliente.pk}, function(ret){
                $location.path(`/clientes`);
            }, function(erro){
                console.log(erro);
                doMensagem(erro, true);
            });
        } 
    };


    if($routeParams.clienteId) {
        recursoCliente.get({clienteId: $routeParams.clienteId}, function(ret){          
            $scope.cliente = ret; 
            ///disparar evento que cliente foi buscado
            $scope.$broadcast("clienteGet", {clienteId: $routeParams.clienteId});                  
        }, function(erro){
            console.log(erro);            
            doMensagem(erro, true);
        });
    }

    ///metodo submeter, disparado quando clicado no botao salvar
    $scope.submeter = function() {
        if ($scope.formulario.$valid) {
            cadastroDeClientes.cadastrar($scope.cliente)
                .then(function(dados) {
                    $scope.doMensagem(dados.mensagem, false);
                })
                .catch(function(erro) {                    
                    $scope.doMensagem(erro.mensagem, true);
                });
        }
    };
});