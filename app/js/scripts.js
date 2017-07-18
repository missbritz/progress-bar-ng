       var progressBars = angular.module('progressBars', ['ngRoute']);

        progressBars.controller('barController', function($scope, $http, $filter){

            var url = 'https://pb-api.herokuapp.com/bars',
                reg = new RegExp(/^-?\d*\.?\d+$/);
                $scope = this;
                $scope.progress = [];

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

            //Create and load bars   
            function createBars(bars, limit){

                var bar = bars,
                    max = limit,
                    maxreached,
                    progRate = 0,
                    newVal = 0;

                angular.forEach(bar, function(value, key){

                    newVal = ( reg.test(value) ) ? value : 0 ;
                    maxreached = ( newVal > max ) ? true : false ;
                    
                    progRate = Math.floor((newVal/max)*100);

                    $scope.progress.push({
                        "rate"    : newVal,
                        "percent" : progRate,
                        "id"      : "progress-"+key,
                        "overlimit": false
                    });


                });
            }

           //Selected progress bar
           $scope.SelectedBar = angular.copy($scope.progress[0]);
           
           $scope.updateButton = function(button, barID){
                var newNum = 0,
                    newProg = 0,
                    nProg = 0,
                    newProgRate,
                    limit,
                    maxreached,
                    newButtonVal;

                newButtonVal = ( reg.test(button) ) ? button : 0 ;
                
                $scope.incButton = newButtonVal;
                $scope.selectedBar =  barID;

                limit = $scope.max;

                $scope.activeBar = $filter('filter')( $scope.progress, { id : $scope.selectedBar }, true );

                newNum = $scope.activeBar[0].rate + $scope.incButton;
                newProg = Math.floor((newNum/limit)*100);

                angular.forEach($scope.progress, function(value, key){
                    if( value.id == $scope.selectedBar ){

                           if( newProg < 0 ){
                                nProg = 0;
                                newProgRate = newNum;
                                maxreached = false;
                           }else if( newProg > 100 ){
                                nProg = newProg;
                                newProgRate = newNum;
                                maxreached = true;
                           }else{
                                nProg = newProg;
                                newProgRate = newNum;
                                maxreached = false;
                           }

                        //Assign new values for value and percentage
                        value.rate  = newProgRate;
                        value.percent = nProg;
                        value.overlimit = maxreached;
                    }

                });

           };


        });