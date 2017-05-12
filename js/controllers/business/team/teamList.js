/**
 * Created by asus on 2017/2/26.
 */
angular.module('admin').controller('teamListController',
    function(httpService,$rootScope,$state,$scope){
        var vm = this;

        //获取列表
        (function(){
            vm.searchParams={};
            vm.searchParams=$state.params;
            console.log(vm.searchParams);
            httpService.getteamList(vm.searchParams).then(function (res) {
                console.log(res.data.data);
                if (res.data.code == 0) {
                    vm.teamList=res.data.data;
                    vm.total = res.data.total;
                    //vm.total = 16;
                    console.log(vm.total);
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        }());


        //解禁
        vm.outBan=function(id,style){
            console.log(id);console.log(style);
            vm.params={};
            vm.params.isForbidden=false;
            $rootScope.confirm2("解禁后该团队下的信息将可继续使用。", "是否执行解禁操作？", function () {
                httpService.getteamSet(id, vm.params).then(function(res){
                    if (res.data.code == 0) {
                        $rootScope.alert("解禁成功");
                        $state.go('field.teamList', {}, {reload: true});
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
            vm.params.isForbidden=true;
            $rootScope.confirm2("禁用后该团队下的信息将不可继续使用。", "是否执行禁用操作？", function () {
                httpService.getteamSet(id, vm.params).then(function(res){
                    if (res.data.code == 0) {
                        $rootScope.alert("禁用成功");
                        $state.go('field.teamList', {}, {reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            });
        };
    });