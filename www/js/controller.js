angular.module('app.controller', [])

.controller('loginCtrl', ['$scope',function($scope){
	$scope.add = function(){
		return $scope.nome = 'cu da mãe';
	}
	
}])

.controller('cameraCtrl', ['$scope', '$cordovaCamera', function($scope, $cordovaCamera){

	$scope.pictureUrl = 'http://placehold.it/300x300';

   


	$scope.tirarFoto = function(){
		 var options =
		{
		      quality: 100,
		      destinationType: Camera.DestinationType.DATA_URL,
		      sourceType: Camera.PictureSourceType.CAMERA,
		      allowEdit: true,
		      encodingType: Camera.EncodingType.JPEG,
		      targetWidth: 300,
		      targetHeight: 300,
		      popoverOptions: CameraPopoverOptions,
		      saveToPhotoAlbum: true,
			  correctOrientation: false
    	};


		$cordovaCamera.getPicture(options)
		.then(function(data){
			$scope.pictureUrl = 'data:image/jpeg;base64,' + data;
		}, function(err){
			
		})
	}
	
}])

.controller('vistoriaCtrl', ['$scope', '$cordovaCamera', function($scope, $cordovaCamera){


}]);
