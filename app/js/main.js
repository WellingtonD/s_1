angular.module('estoque', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos', 'ngSanitize'])
    .config(function($routeProvider, $locationProvider) {
    	//tira o hashtag # da url desde que adicione <base href="/"> no index.html
        $locationProvider.html5Mode(true);
        $routeProvider.when('/prontuarios', {
            templateUrl: 'partials/prontuarios.html',
            controller: 'ProntuariosController'
        });
        $routeProvider.when('/prontuarios/new', {
            templateUrl: 'partials/prontuario.html',
            controller: 'ProntuarioController'
        });
        $routeProvider.when('/prontuarios/edit/:prontuarioId', {
            templateUrl: 'partials/prontuario.html',
            controller: 'ProntuarioController'
        });


        $routeProvider.when('/clientes', {
            templateUrl: 'partials/clientes.html',
            controller: 'ClientesController'
        });
        $routeProvider.when('/clientes/new', {
            templateUrl: 'partials/cliente.html',
            controller: 'ClienteController'
        });
        $routeProvider.when('/clientes/edit/:clienteId', {
            templateUrl: 'partials/cliente.html',
            controller: 'ClienteController'
        });        
    });

///https://angular-ui.github.io/ui-router/#resources    