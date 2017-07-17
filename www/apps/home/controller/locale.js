app.controller('LocaleCtrl', function($scope, $stateParams,$translate) {

	$scope.checkLanguage = function()
	{
		if($translate.use()=='EN')
		 	{
		 		//$scope.language='translate.ingles';
		  		$scope.language='english';
			}
		 else
		  	{
		  		//$scope.language='translate.español';
		  		$scope.language='español';
			  }
	};

	$scope.checkLanguage();

	$scope.switchLanguage = function(key) {
		  	$translate.use(key);
			$scope.checkLanguage();
		};
	


})
