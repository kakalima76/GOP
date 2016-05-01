angular.module('escala.controller', [])

.controller('telaescalaCtrl', ['$ionicLoading','$q','$scope', '$http', '$state', function($ionicLoading, $q, $scope, $http, $state){
	$scope.agentes = ['', 'nieraldo', 'aurelio','fulano','beltrano','siclano'];
	$scope.agentes.sort();
	$scope.servico = ['', 'expediente', 'folga', 'plantão', '24horas', 'extra', 'complemento', 'férias', 'bim', 'sobreaviso', 'dispensa', 'licença', 'feira']
	$scope.folgas = 
	[
	{id: 0, value: ''},
	{id: 1, value: '1'},
	{id: 3, value: '2'},
	{id: 4, value: '3'}
	];
	$scope.visiblePeriodo = true;
	$scope.visible = false;
	$scope.opcoes = ['', 'salvar', 'selecionar mes', 'criar os', 'sair'];
	$scope.showSalvar = false;
	$scope.showSelecionar = false;
	$scope.showOrdem = false;
	$scope.showSair = false;
	$scope.mostrar = function(){
		if(document.getElementById('opcao').value === 'salvar'){
			$scope.showSalvar = true;
			$scope.showSelecionar = false;
			$scope.showOrdem = false;
			$scope.showSair = false;
		}else if(document.getElementById('opcao').value === 'selecionar mes'){
			$scope.showSalvar = false;
			$scope.showSelecionar = true;
			$scope.showOrdem = false;
			$scope.showSair = false;
		}else if (document.getElementById('opcao').value === 'criar os'){
			$scope.showSalvar = false;
			$scope.showSelecionar = false;
			$scope.showOrdem = true;
			$scope.showSair = false;
		}else{
			$scope.showSalvar = false;
			$scope.showSelecionar = false;
			$scope.showOrdem = false;
			$scope.showSair = true;
		}

	}
	
	
	function dias(val, val2){

		if((val === 1) || (val === 3) || (val === 5) || (val === 7) || (val === 8) || (val === 10) || (val === 12)){
			return 31;
		}else if(val === 2){
		//inicio do método para descobrir se é bissexto
			return (val2 % 4 == 0 && (val2 % 100 != 0 || val2 % 400 == 0)) ? 29 :  28;
		}else{
			return 30;
		}
	}

	function retornaPeriodo(){
		var data  = document.getElementById("mes").value;
		var mes = parseInt(data.substring(5,7));
		var ano = parseInt(data.substring(0,4));
		var array = [];
		for(var i = 1; i<=dias(mes, ano); i++){
			array.push(i);
		}

		return array;

	}

	//acrescenta zeros a número menosres que 10
	function zeros(num){
		return (num < 10) ? '0' + num : num;
	}

	//limpar todos os elementos de combobox e salva a ordem no db
	function limpar(){

		document.getElementById('status').selectedIndex = 0;
		document.getElementById('agente').selectedIndex = 0;
		document.getElementById('passo').selectedIndex = 0;
		document.getElementById('inicio').selectedIndex = 0;
		document.getElementById('fim').selectedIndex = 0;
		document.getElementById("mes").value = null;

	}

	//retorna o nome do mês em português
	function retornaMes(value){
		var meses = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO']
		return meses[value - 1];
	}


	//torna visivel o conteúdo para realizar a escala dos agentes
	$scope.escalar = function(){
		var data = document.getElementById("mes").value
		var mes = parseInt(data.substring(5,7))
			if(data){
				$scope.visiblePeriodo = false;
				$scope.visible = true;
				$scope.dias = retornaPeriodo()
				$scope.nomeMes = retornaMes(mes);
			}
	}

	//esconde a tela de escolha do período - (mês)
	$scope.selecionar = function(){
		$scope.visiblePeriodo = true;
		$scope.visible = false;
		limpar();
	}

	//conta a quantidade de interações
	//que será preciso para atualizar o db.
	function contar (inicio, fim, passo){
		cont = 0;
		do{
			inicio+=passo;
			cont++;
		}while(inicio <= fim);
		return cont;
	}

	//cria a promise para povoar o db.
	function popula(){
		var data = (document.getElementById("mes").value || '');
		var mes = parseInt(data.substring(5,7))
		var ano = parseInt(data.substring(0,4))
		var inicio = parseInt(document.getElementById("inicio").value);
		var fim = parseInt(document.getElementById("fim").value);
		var passo = parseInt(document.getElementById("passo").value);
		var agente = document.getElementById("agente").value;
		var status = document.getElementById("status").value;




		return $q(function(resolve, reject){
			var flag = contar(inicio, fim, passo);
			var count = 0;
			for(var i = inicio; i <= fim; i+=passo){

			var body = 
			{
			nome: agente,
			data: zeros(i)+zeros(mes)+ano,
			ordem: '0',
			status: status
			}

			var promise = $http.put('http://ccuanexos.herokuapp.com/agentes/escala', body);
			$ionicLoading.show({template: 'Carregando...'})
			promise.then(function(){
				count+=1;
				if(flag === count){
					resolve(function(){
						$ionicLoading.hide();
					})
					
				}
			}).then(function(){
				$ionicLoading.hide();
			})

			promise.catch(function(err){
				if(err){
					reject(function(){
						$ionicLoading.hide();
					});
				}
			})

		}
	})
}
	
	$scope.salvar = function(){
		
		var promise = popula();
		promise.then();
		promise.catch();
		
	}

	$scope.criarOS = function(){
		$state.go('ordem');
	}

	$scope.sair = function(){
        return navigator.app.exitApp()
    }
	
}])

.controller('loginCtrl', ['$scope', '$state', function($scope, $state){
	
	$scope.entrar = function(){
		var user = document.getElementById('usuario').value;
		var pass = document.getElementById('senha').value;
		if(user === 'admin' && pass === 'gop2016'){
			$state.go('telaescala');
		}else{
			alert('Dados incorretos!');
		}
	}
	


}])