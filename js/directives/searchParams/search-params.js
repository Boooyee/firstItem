angular.module('admin').directive('search', function () {
    return {
        restrict: 'EA',
        templateUrl: 'js/directives/searchParams/search-params.html',
        replace: true,
        scope: {params: '=', clean1: '=', clean2: '=', clean3: '=',clean4: '='},
        controller: [
            '$state',
            'commonUtil',
            '$scope',
            function ($state, commonUtil, $scope) {
                //搜索
                $scope.search = function () {
                    if($scope.params.address){
                        $scope.params.province=$scope.params.address.province;
                    }
                    if($scope.params.address){
                        $scope.params.city=$scope.params.address.city;
                    }
                    console.log($scope.params);
                    //console.log(commonUtil.querySearchParams($scope.params));

                    $state.go($state.current, $scope.params, {reload: true});
                };
                //清空
                $scope.clean = function () {
                    console.log($scope.params);
                    angular.forEach($scope.params, function (data, index) {
                        //console.log(index)
                        if (index !== 'size') {
                            if (index.indexOf('Id')<=0) {
                                    $scope.params[index] = '';
                            }
                        }
                    });
                    $scope.clean1 = undefined;
                    $scope.clean2 = undefined;
                    $scope.clean3 = undefined;
                    $scope.clean4 = undefined;
                };
            }
        ]
    };
});