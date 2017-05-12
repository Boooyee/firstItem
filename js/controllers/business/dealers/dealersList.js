/**
 * Created by asus on 2017/2/24.
 */
angular.module('admin').controller('dealersListController',function($http,$state,httpService,$rootScope,areaData,commonUtil){
    var vm = this;
    (function(){
        vm.searchParams={};
        vm.searchParams=$state.params;
        console.log(vm.searchParams);
        console.log(vm.searchParams.address);
        //if(!vm.searchParams.address){
        //    vm.searchParams.address={};
        //    vm.searchParams.address.province=vm.searchParams.province;
        //    vm.searchParams.address.city=vm.searchParams.city;
        //}

        httpService.getdealersList(vm.searchParams).then(function (res) {
            console.log(vm.searchParams);
            console.log(res.data);
            if (res.data.code == 0) {
                vm.teamList=res.data.data.distributorList;
                vm.total = res.data.data.total;
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }());
    //解禁
    vm.outBan=function(id,style){

        console.log(id);console.log(style);
        vm.params={};
        vm.params.status=1;
        $rootScope.confirm2("解禁后该经销商下的信息将可继续使用。", "是否执行解冻操作？", function () {
            httpService.getdealersStatus(id, vm.params).then(function(res){
                if (res.data.code == 0) {
                    $rootScope.alert("解禁成功");
                    $state.go('field.dealersList', {}, {reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        });
    };
    //禁用
    vm.inBan=function(id,style){
        console.log(id);console.log(style);
        vm.params={};
        vm.params.status=0;
        $rootScope.confirm2("禁用后该经销商下的信息将不可继续使用。", "是否执行禁用操作？", function () {
            httpService.getdealersStatus(id, vm.params).then(function(res){
                if (res.data.code == 0) {
                    $rootScope.alert("禁用成功");
                    $state.go('field.dealersList', {}, {reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }

            })
        });



    };
});