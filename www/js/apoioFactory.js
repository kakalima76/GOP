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
		var ano = data.substring(0,4);
		var dia = '10'
		if(data.length === 10){
			mes = data.substring(5,7);
			dia = data.substring(8,10);
		}else if (data.length === 9){

			if(parseInt(data.substring(5,7)) > 9){
				var mes = data.substring(5,7);
			}else{
				var mes = '0' + data.substring(5,6);
			}

			if(parseInt(data.substring(7,9)) > 9){
				var dia = data.substring(7,9);
			}else{
				var dia = '0' + data.substring(8,9);
			}

		}else if (data.length === 8){
			var mes = '0' + data.substring(5,6);
			var dia = '0' + data.substring(7,8);
		}
		
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

.factory('dataFactory', [function(){
	var obj = {};
	
	var set = function(value){
		obj.data = value;
	}

	var get = function(){
		return obj.data;
	}

	var setNumero = function(value){
		obj.numero = value;
	}

	var getNumero = function(){
		return obj.numero;
	}

	var setEscalados = function(value){
		obj.escalados = value;
	}

	var getEscalados = function(){
		return obj.escalados;
	}

	//seta a string '00)' anterior a ser extraída para retorno posterior
	var setPosicao = function(value){
		obj.str = value
	}

	var getPosicao = function(){
		return obj.str;
	}

	var setDiv = function(value){
		obj.div = value;
	}

	var getDiv = function(){
		return obj.div;
	}

	return {
		set: set,
		get: get,
		setEscalados: setEscalados,
		getEscalados: getEscalados,
		setPosicao: setPosicao,
		getPosicao: getPosicao,
		setNumero: setNumero,
		getNumero: getNumero,
		setDiv: setDiv,
		getDiv: getDiv

	}

}])

.service('viaturasService', [function(){
	var tipos = ['', 'AMAROK', 'GOL', 'ÔNIBUS','BAÚ', 'VOYAGE']

	var viaturas = 
	[
		{tipo: 'AMAROK', placa: 'KXC 5822'},
		{tipo: 'AMAROK', placa: 'KXQ 5231'},
		{tipo: 'AMAROK', placa: 'KWY 4899'},
		{tipo: 'AMAROK', placa: 'KWX 5751'},
		{tipo: 'AMAROK', placa: 'KWX 5777'},
		{tipo: 'AMAROK', placa: 'KXA 5127'},
		{tipo: 'AMAROK', placa: 'KWP 5822'},
		{tipo: 'AMAROK', placa: 'KWW 4772'},
		{tipo: 'AMAROK', placa: 'KWO 5031'},
		{tipo: 'AMAROK', placa: 'KRU 3092'},
		{tipo: 'AMAROK', placa: 'KWR 5642'},
		{tipo: 'AMAROK', placa: 'KXI 4978'},
		{tipo: 'AMAROK', placa: 'KXD 6261'},
		{tipo: 'AMAROK', placa: 'KXM 6442'},
		{tipo: 'AMAROK', placa: 'KXA 5128'},
		{tipo: 'AMAROK', placa: 'LTB 5687'},
		{tipo: 'AMAROK', placa: 'KWQ 5332'},
		{tipo: 'GOL', placa: 'LLW 9227' },
		{tipo: 'GOL', placa: 'KNB 6814'},
		{tipo: 'GOL', placa: 'LQV 7493'},
		{tipo: 'GOL', placa: 'LQV 7479'},
		{tipo: 'BAÚ', placa: 'KZG 8512'},
		{tipo: 'BAÚ', placa: 'KYY 4165'},
		{tipo: 'ÔNIBUS', placa: 'LMA 5251'},
		{tipo: 'ÔNIBUS', placa: 'KYL 8776'},
		{tipo: 'ÔNIBUS', placa: 'LNU 8380'},
		{tipo: 'ÔNIBUS', placa: 'LOH 6073'},
		{tipo: 'VOYAGE', placa: 'LQU 2501'}
	]

	

	return {
		viaturas: viaturas,
		tipos: tipos
	}

}])