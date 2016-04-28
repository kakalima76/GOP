angular.module('apoio.factory', [])

.factory('ordemFactory', ['$q', '$http', 'retornaService', function($q, $http,  retornaService){
	var ordem = {}

	var setNumero = function(numero){/*

		return $q(function(resolve, reject){

			var promise = $http.get('http://ccuanexos.herokuapp.com/ordem/ultimo')
			promise.then(function(data){
			ordem.numero = data.data[0].numero + 1;

			document.getElementById("numOrdem").innerHTML = ordem.numero;

			});

			promise.then(function(){
				$scope.$broadcast('scroll.refreshComplete');
			})

			promise.catch(function(err){alert(err);});

	})*/
	return ordem.numero = numero;
}

	
	var setHorarios = function(apresentacao, termino){
		ordem.apresentacao = apresentacao;
		ordem.termino = termino;
	}

	
	var setAcao = function(acao){
		ordem.acao = acao.toString();
	}

	var setChefe = function(chefe){
		ordem.chefe = chefe.toString();
	}

	var setViatura = function(viatura){
		ordem.viatura = viatura.toString();
	}

	var setAgentes = function(agentes){
		ordem.agentes = agentes.toString();
	}

	var setEquipe = function(equipe){
		ordem.equipe = equipe.toString();
	}

	var get = function(){
		return ordem;
	}

	var destruir = function(){
		ordem = {};
	}

	return {
		setNumero: setNumero,
		setHorarios: setHorarios,
		setEquipe: setEquipe,
		setAcao: setAcao,
		setChefe: setChefe,
		setViatura: setViatura,
		setAgentes: setAgentes,
		destruir: destruir,
		get: get
	}


}])

.service('agentesService', ['$http', 'retornaService', function($http, retornaService){
	var agentes = {};
	agentes.escala = []


	var setAgentes = function(){
		var promise = $http.get('http://ccuanexos.herokuapp.com/agentes/');
		var node = document.createElement('h5');
		var texto = document.createTextNode('caregando...');
		node.appendChild(texto);
		document.getElementById('carregar').appendChild(node);
		
			promise.then(function(data){
			agentes.escala = data.data;
			document.getElementById('carregar').removeChild(node);
			console.log(agentes.escala.length)
			})
	}

	var get = function(){
		return agentes;
	}

	var filtrarAgente = function(value){
		if(value.data == retornaService.getData() && value.chefe == false && value.status == 'folga'){
			return true;
		}
	}

	var getAgentes = function(){
		var agentes = get();
		var array = agentes.escala.filter(filtrarAgente);
		var map = array.map(function(val){
			return val.nome;
		})
		return map.sort();
	}

	var filtrarChefe = function(value){
		if(value.data == retornaService.getData() && value.chefe == true && value.status == 'folga'){
			return true;
		}
	}
	
	var getChefes = function(){
		var agentes = get();
		var array = agentes.escala.filter(filtrarChefe);
		var map = array.map(function(val){
			return val.nome;
		})
		return map.sort();
	}

	var destruir = function(){
		agentes = null;
		delete agentes;
	}


	return {
		get: get,
		setAgentes: setAgentes,
		getAgentes: getAgentes,
		getChefes: getChefes,
		destruir: destruir
	}

}])


.service('retornaService', ['$state', function($state){
	var array = {

	}

	array.elem = [];
	array.num = 0;

	var get = function(){
		return array;
	}

	var stateGo = function(){
		$state.go('ordem');
		if(document.getElementById('fase').selectedIndex != 0){
			document.getElementById('fase').selectedIndex = 0;
		}
		
	}

	var guarda = function(val){
		if(val){
			array.num += 1;
			if(array.num < 10){
			val = '0' + array.num + ') ' + val;
			}else
			{
			val = array.num + ') ' + val;
			}

			array.elem.push(val);
		}else{
			alert('Escolha uma opção.')
		}
		
	}

	var reseta = function(){
		array.elem = [];
		array.num = 0;
	}

	var retornaArray = function(){
		return array.elem;
	}

	var abrirPagina = function(rota){
		$state.go(rota);
	}

	var formaData = function(data){
		ano = data.substring(0,4);
		mes = data.substring(5,7);
		dia = data.substring(8,10);
		array.data = dia+mes+ano;
	}

	var getData = function(){
		return array.data;
	}

	return {
		get: get,
		retornaArray: retornaArray,
		guarda: guarda,
		stateGo: stateGo,
		reseta: reseta,
		abrirPagina: abrirPagina,
		formaData: formaData,
		getData: getData
	}
}])
