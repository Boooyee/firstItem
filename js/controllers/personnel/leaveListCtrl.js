/**
 * Created by Administrator on 2017/2/26 0026.
 */
angular.module("admin")
    .controller("leaveListCtrl",['$rootScope','$scope','$state','leaveService',function($rootScope,$scope,$state,leaveService){
        var vm = this;
        vm.searchParams = $state.params;
        //获取列表
        leaveService.getLeaveList(vm.searchParams).then(function (res) {
            if(res.data.code == 0){
                console.log(res);
                vm.leaveList = res.data.data;
                vm.total = res.data.total;
            }
        });
        //点击通过按钮
        vm.pass = function (params) {
            vm.params = {
                verifyStatus:1,
                id:params.id
            };
            $rootScope.confirm('确定申请通过？',function () {
                leaveService.putChangeLeave(vm.params.id,vm.params).then(function (res) {
                    console.log(res);
                    if(res.data.code == 0){
                        $rootScope.alert("通过申请成功",function () {
                            $state.go($state.current,{},{reload: true});
                        })
                    }else{
                        $rootScope.alert(res.data.message)
                    }
                })
            })
        };
        vm.refuse = function (params) {
                vm.params = {
                    verifyStatus:2,
                    id:params.id
                };
                $rootScope.confirm('确定拒绝通过？',function () {
                    leaveService.putChangeLeave(vm.params.id,vm.params).then(function (res) {
                        console.log(res);
                        if(res.data.code == 0){
                            $rootScope.alert("拒绝申请成功",function () {
                                $state.go($state.current,{},{reload: true});
                            })
                        }else{
                            $rootScope.alert(res.data.message)
                        }
                    })
                })
        };

}]);