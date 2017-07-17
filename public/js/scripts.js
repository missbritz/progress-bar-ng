       

       var progressBars = angular.module('progressBars', ['ngRoute']);

        progressBars.controller('barController', function($scope, $http, $filter){

            var url = 'https://pb-api.herokuapp.com/bars',
                $scope = this;
                $scope.progress = [],
                $scope.NoPreload = false;

            //Load data
            $http({
                    method: 'GET',
                    url: url
               }).then(function (response){
                    $scope.details = response.data;
                    $scope.bar = response.data.bars;
                    $scope.max = response.data.limit;
                    $scope.button = response.data.buttons;

                    //Hide Preloaders
                    $scope.NoPreload = true;

                    createBars($scope.bar, $scope.max);

                   },function (error){
                    console.log(error);
                }); 

            function createBars(bars, limit){

                var bar = bars,
                    max = limit,
                    progRate = 0,
                    prog = [];

                angular.forEach(bar, function(value, key){
                    progRate = Math.floor((value/max)*100);

                    $scope.progress.push({
                        "rate"    : progRate,
                        "percent" : value,
                        "id"      : "progress-"+key 
                    });

                });
            };

           $scope.SelectedBar = angular.copy($scope.progress[0]);
           
           $scope.updateButton = function(button, barID){
                var activeBar,
                    newNum = 0,
                    newProg = 0,
                    nProg = 0,
                    newProgRate;
                
                $scope.incButton = button;
                $scope.selectedBar =  barID;    

                $scope.activeBar = $filter('filter')( $scope.progress, { id : $scope.selectedBar }, true );

                newNum = $scope.activeBar[0].rate + parseInt($scope.incButton);
                newProg = Math.floor((newNum/$scope.max)*100);

                angular.forEach($scope.progress, function(value, key){
                    if( value.id == $scope.selectedBar ){

                           if( newProg < 0 ){
                                nProg = 0;
                                newProgRate = 0;

                           }else if( newProg > 100 ){
                                nProg = 100;
                                newProgRate = newProg;
                                addClass = 'overlimit';
                           }else{
                                nProg = newProg;
                                newProgRate = newProg;
                           }

                        //Assign new values for value and percentage
                        value.rate  = newProgRate;
                        value.percent = nProg;
                    }

                });

               console.log($scope.progress);

           }


        });