var meanRegistration = angular.module('meanRegistration', ['ui.grid']);

function mainController($scope, $http) {
    $scope.formData = {};
	$scope.register = {};
	$scope.showForm = true;
	$scope.showGrid = false;
	$scope.isFormInvalid = false;
	$scope.validationErrors = '';

    // when landing on the page, get all registrations and show them
    $http.get('/api/registrations')
        .success(function(data) {
            $scope.registrations = data;			
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the register form, send the text to the node API
    $scope.createRegistration = function(isValid) {	
		if(!isValid){
			$scope.isFormInvalid = true;
			return false;
		} 
        $http.post('/api/registrations', $scope.register)
            .success(function(data) {
			if(data.hasOwnProperty('err')){
				$scope.validationErrors = data.err;
				$scope.showForm = true;
				$scope.showGrid = false;
			} else {
				$scope.register = {}; // clear the form so our user is ready to enter another				
                $scope.registrations = data;
				$scope.showForm = false;
				$scope.showGrid = true;
			}              
                console.log(data);
            })
            .error(function(data) {				
                console.log('Error: ' + data);
            });
    };

    // delete a registration after checking it
    $scope.deleteRegistration = function(id) {
		$scope.$broadcast('show-errors-check-validity');
        $http.delete('/api/registrations/' + id)
            .success(function(data) {
                $scope.registrations = data;
				$scope.showForm = false;
				$scope.showGrid = true;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };	
	

	// continue to dashboard
    $scope.login = function() {
        $scope.showForm = false;
		$scope.showGrid = true;
    };
	
	// back to registration
    $scope.registration = function() {
		$scope.register = {}; // clear the form so our user is ready to enter another
        $scope.showForm = true;
		$scope.showGrid = false;
		$scope.isFormInvalid = false;
    };
	
	//close alert message
	$scope.closeMessage = function (form){
		$scope.register = {}; // clear the form so our user is ready to enter another
		$scope.validationErrors = '';
	};
	
	//grid options
	$scope.gridOptions = { data: 'registrations', showGridFooter:true,
                       columnDefs: [{ field:"firstName", headerCellClass: 'blue', displayName: " First Name"},
                                   { field:"middleName", headerCellClass: 'blue', displayName: "Middle Name"},
                                   { field:"lastName", headerCellClass: 'blue', displayName: "Last Name"},
								   { field:"emailId", headerCellClass: 'blue', displayName: "Email"},
                                   { field:"phoneNumber", headerCellClass: 'blue', displayName: "Phone Number"},
                                   { field:"city", headerCellClass: 'blue', displayName: "City"},
                                   { field:"state", headerCellClass: 'blue', displayName: "State"},
                                   { field:"zip", headerCellClass: 'blue', displayName: "Zip"}]
                            };

								   
								   

}