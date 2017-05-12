/**
 * Created by gaogao on 17/3/8.
 */
angular.module('admin').directive('toggle',function(){
    return {
        restrict:'E',
        templateUrl:'js/directives/data-toggle/data-toggle.html',
        replace: true,
        link:function(scope,attr){
                console.log(scope.vm.params)
            scope.gao=function(event){
                console.log(event)
            }
        }
    }
})