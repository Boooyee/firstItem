/**
 * Created by asus on 2017/2/26.
 */
angular.module('admin').controller('agencyListController',function(httpService,$state,$rootScope){
    var vm = this;
    //获取列表   搜索
    (function(){
        vm.searchParams={};
        vm.searchParams=$state.params;

        console.log(vm.searchParams);

        httpService.getagencyList(vm.searchParams).then(function(res){
            console.log(res.data.data);
            vm.list=res.data.data.venderList;
            vm.total = res.data.data.total;
        })
    }());
    //解禁
    vm.outBan=function(id,status){
        vm.params={};
        vm.params.status=1;
        $rootScope.confirm2("解禁后该公司下的信息将可继续使用。", "是否执行解冻操作？", function () {
            httpService.getagencyStatus(id, vm.params).then(function(res){
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
    vm.inBan=function(id,status) {
        console.log(id);console.log("我的状态是"+status);
        vm.params = {};
        vm.params.status = 0;
        $rootScope.confirm2("禁用后该厂家下的信息将不可继续使用。", "是否执行禁用操作？", function () {
            httpService.getagencyStatus(id, vm.params).then(function (res) {
                if (res.data.code == 0) {
                    $rootScope.alert("禁用成功");
                    $state.go($state.current, {}, {reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }

            })
        });
    };

});