/**
 * Created by Administrator on 2017/2/25 0025.
 */
angular.module("admin")
    .controller("staffListCtrl",["$rootScope","$scope","$state","$http","organizationService",function($rootScope,$scope,$state,$http,organizationService){
            var vm = this;
            vm.searchParams = $state.params;
            //获取列表
            organizationService.getstaffList(vm.searchParams).then(function (res) {
                    vm.list = res.data.data.employeeList;
                    vm.total = res.data.total;
            });

        //解禁
        vm.outBan=function(id){
            vm.params={};
            vm.params.status=1;
            $rootScope.confirm2("解禁以后将恢复对该员工的操作。", "确认解禁？", function () {
                organizationService.putstaffStatus(id, vm.params).then(function(res){
                    if (res.data.code == 0) {
                        $rootScope.alert("解禁成功");
                        $state.go($state.current, {}, {reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            });
        };
        //禁用
        vm.inBan=function(id) {
            console.log(id);console.log("我的状态是"+status);
            vm.params = {};
            vm.params.status = 0;
            $rootScope.confirm2("禁用后该员工将无法进行相关操作。", "确认禁用？", function () {
                organizationService.putstaffStatus(id, vm.params).then(function (res) {
                    if (res.data.code == 0) {
                        $rootScope.alert("禁用成功");
                        $state.go($state.current, {}, {reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }

                })
            });
        };


    }]);