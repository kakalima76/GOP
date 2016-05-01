angular.module('apoio.factory', [])

.factory('ordemFactory', ['$q', '$http', 'retornaService', function($q, $http,  retornaService){
	var ordem = {}

	var setNumero = function(numero){
	return ordem.numero = numero;
	}

	
	var setHorarios = function(apresentacao, termino, dia){
		ordem.status = 'ativa';
		ordem.apresentacao = apresentacao;
		ordem.termino = termino;
		ordem.data = dia;
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
		if(!document.getElementById('fase').value){
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

.factory('canceladaFactory', [function(){
	var obj = {}
	
	var set = function(value){
		obj = value;
	}

	var get = function(){
		return obj
	}

	return {
		set: set,
		get: get
	}

}])