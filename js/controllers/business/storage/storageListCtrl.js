/**
 * Created by Administrator on 2017/2/24 0024.
 */
angular.module("admin")
.controller("storageListCtrl",['$rootScope','$scope','$state','$stateParams','$http','storageService','commonUtil',function($rootScope,$scope,$state,$stateParams,$http,storageService,commonUtil){
        var vm = this;
        //获取列表
        vm.searchParams = $state.params;
        console.log(vm.searchParams);
        storageService.getStorageList(vm.searchParams).then(function (res) {
            if(res.data.code == 0){
                console.log(res);
                vm.storageList = res.data.data.storageList;
                vm.total = res.data.data.total;
            }
        });
        //搜索
        vm.search = function (params) {
            vm.total = 0;
            vm.totalPage = 0;
            vm.searchParams.province = vm.searchParams.address.province;
            vm.searchParams.city = vm.searchParams.address.city;
            $state.go($state.current,vm.searchParams,{reload:true});
        };
        //清除
        vm.clean = function () {
            vm.searchParams = {
                storageName : undefined,
                contactsPost:undefined,
                address:undefined,
                contactsPhone:undefined,
                contactsName:undefined,
                status:undefined
            };
            $state.go($state.current,vm.searchParams,{reload:true})
        };
        //禁用
        vm.false = function (storage) {
            vm.params = {
                id:storage.id,
                status:0
            };
            $rootScope.confirm("确认将库位禁用吗？",function () {
                storageService.putChangeStorage(vm.params.id,vm.params).then(function (res) {
                    console.log(res);
                    if(res.data.code == 0){
                        $rootScope.alert("禁用成功",function () {
                            $state.go($state.current,{},{reload:true});
                        })
                    }else{
                        $rootScope.alert(res.data.message)
                    }
                })
            })
        }
        // 解禁
        vm.true = function (storage) {
        vm.params = {
            id:storage.id,
            status:1
        };

        $rootScope.confirm("确认将库位解禁吗？",function () {
            storageService.putChangeStorage(vm.params.id,vm.params).then(function (res) {
                console.log(res);
                if(res.data.code == 0){
                    $rootScope.alert("解禁成功",function () {
                        $state.go($state.current,{},{reload:true});
                    })
                }else{
                    $rootScope.alert(res.data.message)
                }
            })
        })
    }
}]);