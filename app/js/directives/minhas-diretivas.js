angular.module('minhasDiretivas', [])
.directive('meuPainel', function(){
	var ddo = {};
	///diretiva sera atributo e elemento
	ddo.restrict = "AE";

	ddo.scope = {
		titulo: '@',
		url: '@'
	};
	///permite incluir codigo html dentro da diretiva
	ddo.transclude = true;
	ddo.templateUrl = 'js/directives/meu-painel.html';
	return ddo;
})
.directive('minhaFoto', function() {
    var ddo = {};
	ddo.restrict = "AE";
	ddo.scope = {
		titulo: '@',
		url: '@'
	};
	ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';
	return ddo;
})
.directive('meuBotaoPerigo', function() {
    var ddo = {};
    ddo.restrict = "E";
    ddo.scope = {
        nome: '@',
        ///dispara expressao
        acao : '&'
    }
    ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>';

    return ddo;
})
.directive('meuFocus', function () {
	var ddo = {}
	ddo.restrict = "A";
	///criar um evento para a diretiva meu-focus
	ddo.link = function(scope, element) {
		scope.$on('fotoCadastrada', function(){
			element[0].focus();
		});
	}
	return ddo;
});

