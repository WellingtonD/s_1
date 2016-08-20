angular.module('estoque').controller('ProntuarioController', function($scope, recursoProntuario, $routeParams, cadastroDeProntuarios, $timeout, $location){  
    $scope.mensagem = '';
    $scope.prontuario = {};
    $scope.showMensagem = false;
    $scope.titulo = `${$routeParams.prontuarioId ? `Alterar` : `Novo`} Prontuario`;

    ///mostrar mensagem por 2 seegundos
    doMensagem = function(msg) {
       $scope.mensagem = msg; 
       $scope.showMensagem = true;
       $timeout(function(){
          $scope.showMensagem = false;
       }, 2000);
    };   

    ///metodo remover, recebe como parametro o objeto produto
    $scope.remover = function(prontuario){
        if (confirm('Confirmar Exclusão do Prontuario?')) {
            recursoProntuario.delete({prontuarioId: prontuario.id}, function(ret){
                $location.path(`/prontuarios`);
            }, function(erro){
                console.log(erro);
                doMensagem(erro);
            });
        } 
    };

    if($routeParams.prontuarioId) {
        recursoProntuario.get({prontuarioId: $routeParams.prontuarioId}, function(ret){          
            $scope.prontuario = ret;            
        }, function(erro){
            console.log(erro);            
            doMensagem(erro);
        });
    }

    ///metodo submeter, disparado quando clicado no botao salvar
    $scope.submeter = function() {
        if ($scope.formulario.$valid) {
            cadastroDeProntuarios.cadastrar($scope.prontuario)
                .then(function(dados) {
                   $scope.prontuario = {};
                   $location.path(`/prontuarios`);                 
                })
                .catch(function(erro) {
                    $scope.prontuario = {};
                    doMensagem(erro.mensagem);
                });
        }
    };
});