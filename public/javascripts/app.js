// app.js
var routerApp = angular.module('routerApp', ['ui.router','ui.grid','ui.grid.edit']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/vendor');
    
    $stateProvider
        
        // Vendor STATES AND NESTED VIEWS ========================================
        .state('vendor', {
            url: '/vendor',
            templateUrl: 'partial-vendor.html',
            controller: function($scope, $http, $rootScope) {
            
             // when landing on the page, get all registrations and show them
            $http.get('/api/vendorlist')
            .success(function(data) {
                $scope.vendorOpportunities = data;            
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
            
                //grid options
            $scope.gridOptions = { data: 'vendorOpportunities', showGridFooter:true, enableFiltering: true,
                           columnDefs: [
                                        { field:"opTitle", headerCellClass: 'blue', displayName: " Opportunity"},
                                       { field:"createdBy", headerCellClass: 'blue', displayName: "Agency"},
                                       { field:"perfPlace", headerCellClass: 'blue', displayName: "Location"},
                                       { field:"setAside", headerCellClass: 'blue', displayName: "Set Aside"},
                                       { field:"opType", headerCellClass: 'blue', displayName: "Type"},                                   
                                       { field:"publishedDt", headerCellClass: 'blue', displayName: "Posted On"},
                                       { field:"respDueDt", headerCellClass: 'blue', displayName: "Response Due Date"},
                                       { field:"opStatus", headerCellClass: 'blue', displayName: "Status"}]
                                };            
        }
        })
        
        // Buyer PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('buyer', {
            url: '/buyer',
            templateUrl: 'partial-buyer.html'  ,
            controller: function($scope, $http, $rootScope, $state) {
    		
    		 // when landing on the page, get all registrations and show them
    		$http.get('/api/buyerlist/mehulsoni@gmail.com')
            .success(function(data) {
                $rootScope.registrations = data;			
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    		
            $scope.gridScope = $scope;
                //grid options
    		$scope.gridOptions = { data: 'registrations', showGridFooter:true,
                           columnDefs: [{ name: 'edit', headerCellClass: 'blue', displayName: '', cellTemplate: '<img src="../img/delete.gif" ng-click="grid.appScope.deleteOpportunity(row.entity)" />&nbsp;&nbsp;<img src="../img/edit.gif" ng-click="grid.appScope.editOpportunity(row.entity)" />' },
                                        { field:"opTitle", headerCellClass: 'blue', displayName: " Opportunity"},
    								   { field:"createdBy", headerCellClass: 'blue', displayName: "Agency"},
                                       { field:"perfPlace", headerCellClass: 'blue', displayName: "Location"},
    								   { field:"setAside", headerCellClass: 'blue', displayName: "Set Aside"},
                                       { field:"opType", headerCellClass: 'blue', displayName: "Type"},                                   
    								   { field:"publishedDt", headerCellClass: 'blue', displayName: "Posted On"},
                                       { field:"respDueDt", headerCellClass: 'blue', displayName: "Response Due Date"},
                                       { field:"opStatus", headerCellClass: 'blue', displayName: "Status"}]
                                };

            $scope.deleteOpportunity = function(entity ) { 
                //alert('here'+entity._id);
                $http.delete('/api/opportunity/'+entity._id)
                .success(function(data) {
                    $state.go('buyer');
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }

            $scope.editOpportunity = function(entity ) { 
                $rootScope.editId = entity._id;
                $state.go('editOpportunity');
            }
        }     
        })
		
		// Create Opportunity STATES AND NESTED VIEWS ========================================
        .state('createOpportunity', {
            url: '/createOpportunity',
            templateUrl: 'partial-create-opportunity.html',
            controller: function($scope, $http, $state, $rootScope) {
            
             $scope.opportunity = {};
             $scope.isFormInvalid = false;

             // when submitting the opportunity form, send the text to the node API
            $scope.createOpportunity = function(isValid) { 
                if(!isValid){
                    $scope.isFormInvalid = true;
                    return false;
                } 
                $scope.opportunity.createdBy='mehulsoni@gmail.com';
                $scope.opportunity.opStatus='Draft';
                $http.post('/api/create', $scope.opportunity)
                    .success(function(data) {
                    if(data.hasOwnProperty('err')){
                        // $scope.validationErrors = data.err;
                        // $scope.showForm = true;
                        // $scope.showGrid = false;
                    } else {
                        $scope.opportunity = {}; // clear the form so our user is ready to enter another               
                        $rootScope.registrations = data;
                        $state.go('buyer');
                        // $scope.showForm = false;
                        // $scope.showGrid = true;
                    }              
                        console.log(data);
                    })
                    .error(function(data) {             
                        console.log('Error: ' + data);
                    });
            };





            $scope.publishOpportunity = function(isValid) { 
                if(!isValid){
                    $scope.isFormInvalid = true;
                    return false;
                } 
                $scope.opportunity.createdBy='mehulsoni@gmail.com';
                $scope.opportunity.opStatus='Published';
                $http.post('/api/create', $scope.opportunity)
                    .success(function(data) {
                    if(data.hasOwnProperty('err')){
                        // $scope.validationErrors = data.err;
                        // $scope.showForm = true;
                        // $scope.showGrid = false;
                    } else {
                        $scope.opportunity = {}; // clear the form so our user is ready to enter another               
                        $rootScope.registrations = data;
                        $state.go('buyer');
                        // $scope.showForm = false;
                        // $scope.showGrid = true;
                    }              
                        console.log(data);
                    })
                    .error(function(data) {             
                        console.log('Error: ' + data);
                    });
            };


            $scope.cancelOpportunity = function() { 
                $state.go('buyer');
            };
            
                
            
            }
        })


.state('editOpportunity', {
            url: '/editOpportunity',
            templateUrl: 'partial-edit-opportunity.html',
            controller: function($scope, $http, $state, $rootScope) {
            
             $scope.opportunity = {};
             $scope.isFormInvalid = false;

            

             $http.get('/api/opportunity/'+$rootScope.editId)
            .success(function(data) {
                $scope.opportunity.opTitle = data.opTitle; 
                $scope.opportunity.buyerName = data.buyerName; 
                $scope.opportunity.perfPlace = data.perfPlace;    
                $scope.opportunity.primaryContact = data.primaryContact; 
                $scope.opportunity.setAside = data.setAside; 
                $scope.opportunity.opType = data.opType; 
                $scope.opportunity.publishedDt = data.publishedDt; 
                $scope.opportunity.respDueDt = data.respDueDt; 
                $scope.opportunity.opDesc = data.opDesc;         
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

             // when submitting the opportunity form, send the text to the node API
            $scope.editOpportunity = function(isValid) { 
                
                $scope.opportunity.createdBy='mehulsoni@gmail.com';
                $scope.opportunity.opStatus='Draft';
                $http.post('/api/opportunity/'+$rootScope.editId, $scope.opportunity)
                    .success(function(data) {
                    if(data.hasOwnProperty('err')){
                        // $scope.validationErrors = data.err;
                        // $scope.showForm = true;
                        // $scope.showGrid = false;
                    } else {
                        $scope.opportunity = {}; // clear the form so our user is ready to enter another               
                        $rootScope.registrations = data;
                        $state.go('buyer');
                        // $scope.showForm = false;
                        // $scope.showGrid = true;
                    }              
                        console.log(data);
                    })
                    .error(function(data) {             
                        console.log('Error: ' + data);
                    });
            };


            


            $scope.publishEditOpportunity = function(isValid) { 
               
                $scope.opportunity.createdBy='mehulsoni@gmail.com';
                $scope.opportunity.opStatus='Published';
                $http.post('/api/opportunity/'+$rootScope.editId, $scope.opportunity)
                    .success(function(data) {
                    if(data.hasOwnProperty('err')){
                        // $scope.validationErrors = data.err;
                        // $scope.showForm = true;
                        // $scope.showGrid = false;
                    } else {
                        $scope.opportunity = {}; // clear the form so our user is ready to enter another               
                        $rootScope.registrations = data;
                        $state.go('buyer');
                        // $scope.showForm = false;
                        // $scope.showGrid = true;
                    }              
                        console.log(data);
                    })
                    .error(function(data) {             
                        console.log('Error: ' + data);
                    });
            };


            $scope.cancelOpportunity = function() { 
                $state.go('buyer');
            };
            
                
            
            }
        });
		
        
});

