/**
 * Created by Administrator on 2017/2/24 0024.
 */
angular.module("admin")
    .controller("peopleEditCtrl",['$rootScope','$scope','$state','$http','peopleService',
        function($rootScope,$scope,$state,$http,peopleService){
        var vm = this;
        vm.params = $state.params;
        console.log(vm.params);
         if(vm.params.id){   //如果接收到id，就是编辑页面
             vm.exist = true;
             vm.exist2 = false;
             peopleService.getlookPeople(vm.params.id).then(function (res) {
                 console.log(res);
                 vm.params = res.data.data;
             });
             $scope.submit = function (people) {
                 $rootScope.confirm("确认是否提交信息。", function () {
                     peopleService.compilePeople(vm.params.id,people).then(function (res) {
                         if(res.data.code === 0){
                             $rootScope.alert("已成功提交", function () {
                                 $state.go('field.peopleList',{teamId:vm.params.teamId});
                             });
                         }else{
                             $rootScope.alert(res.data.message);
                         }
                     })
                 })
             }
         }else{  //否则就是新增页面
             vm.exist2 = true;
             vm.exist = false;
             $scope.submit = function (params) {
                 $rootScope.confirm("确认信息是否提交。", function () {
                     peopleService.postAddPeople(params).then(function (res) {
                         if(res.data.code === 0){
                             console.log(res);
                             $rootScope.alert("已成功提交",function () {
                                 $state.go('field.peopleList',{teamId:vm.params.teamId});
                             })
                         }else{
                             $rootScope.alert(res.data.message)
                         }
                     })
                 })
             }
         }
}]);