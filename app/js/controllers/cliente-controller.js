angular.module('estoque').controller('ClienteController', function($scope, recursoCliente, $routeParams, cadastroDeClientes, $timeout, $location){  
    $scope.mensagem = '';
    $scope.cliente = {};
    $scope.showMensagem = false;
    $scope.titulo = `${$routeParams.clienteId ? `Alterar` : `Novo`} Cliente`;
    $scope.clienteTelefones = [];

    ///mostrar mensagem por 2 seegundos
    doMensagem = function(msg) {
       $scope.mensagem = msg; 
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
                doMensagem(erro);
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
            doMensagem(erro);
        });
    }

    ///metodo submeter, disparado quando clicado no botao salvar
    $scope.submeter = function() {
        if ($scope.formulario.$valid) {
            cadastroDeClientes.cadastrar($scope.cliente)
                .then(function(dados) {
                   $scope.cliente = {};
                   $location.path(`/clientes`);                 
                })
                .catch(function(erro) {
                    $scope.cliente = {};
                    doMensagem(erro.mensagem);
                });
        }
    };
});