angular.module('estoque').controller('ClienteTelefonesController', function($scope, recursoClienteTelefone, $routeParams, cadastroDeClienteTelefones, $timeout, $location, cadastroDeOperadorasTelefonia){  
    $scope.mensagem = '';
    $scope.clienteTelefones = [];
    $scope.clienteTelefone = {};
    $scope.showMensagem = false;
    
    $scope.operadorasTelefonia = [];

    ///mostrar mensagem por 2 seegundos
    doMensagem = msg => {
       $scope.mensagem = msg; 
       $scope.showMensagem = true;
       $timeout(() => {
          $scope.showMensagem = false;
       }, 2000);
    };   

    ///evento nas variavel pk
    $scope.$watch("clienteTelefone.pk", () =>  
        $scope.titulo = `${$scope.clienteTelefone.pk ? `Alterar` : `Novo`} Telefone`    
    ); 
    
    ///monitora quando o evento clienteGet é disparado, ou seja, quando 
    ///é aberto o cadastro de um cliente 
    $scope.$on("clienteGet", (event, args) => {         
        $scope.listar(args.clienteId)
    });

    ///pegar o o valor de um campo do item do array pelo valor de outro campo
    $scope.getFieldByValue = (val, valIdx, arr, retIdx) => {           
        if (arr.length > 0) {    
            return arr[arr.findIndex(e => e[valIdx] === val)][retIdx];
        }        
    }
        
    $scope.novo = idCliente => {
        $scope.clienteTelefone = {};  
        $scope.clienteTelefone.fk_cliente = idCliente;  
    }

    ///metodo listar
    $scope.listar = clienteId => {        
        recursoClienteTelefone.query({clienteId:clienteId}, clienteTelefones => {                  
            $scope.clienteTelefones = clienteTelefones;  
            cadastroDeOperadorasTelefonia.listar()
                .then(dados => $scope.operadorasTelefonia = dados.ret)
                .catch(erro => console.log(erros));                
            }, erro => doMensagem(erro)
        );
    };

    ///pegar o telefone por id
    $scope.getByID = clienteTelefone => {                  
        recursoClienteTelefone.get({clienteTelefoneId: clienteTelefone.pk}, ret => {          
            $scope.clienteTelefone = ret;                               
        }, erro => {
            console.log(erro);            
            doMensagem(erro);
        });
    };

    ///metodo remover, recebe como parametro o objeto produto
    $scope.remover = clienteTelefone => {
        if (confirm('Confirmar Exclusão do Telefone?')) {
            recursoClienteTelefone.delete({clienteTelefoneId: clienteTelefone.pk}, ret => {                
                $scope.clienteTelefones.splice($scope.clienteTelefones.findIndex(e => e["pk"] === clienteTelefone.pk), 1);
            }, erro => {
                console.log(erro);
                doMensagem(erro);
            });
        } 
    };

    ///metodo submeter, disparado quando clicado no botao salvar
    $scope.submeter = idCliente => {                    
        cadastroDeClienteTelefones.cadastrar($scope.clienteTelefone)
            .then(dados => {                   
                $scope.clienteTelefone = {};
                if (idCliente){
                    $scope.listar(idCliente);    
                }                                  
            })
            .catch(erro => {
                $scope.clienteTelefone = {};
                doMensagem(erro.mensagem);
            });
        
    };
});