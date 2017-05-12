/**
 * Created by Administrator on 2017/2/24 0024.
 */
angular.module("admin")
    .controller("peopleListCtrl",['$rootScope','$scope','$state','$http','peopleService',
        function($rootScope,$scope,$state,$http,peopleService){
        var vm = this;
        vm.searchParams = $state.params;
        console.log(vm.searchParams);
        //获取
        peopleService.getPeople(vm.searchParams).then(function (res) {
            if(res.data.code == 0){
                console.log(res);
                vm.peoples = res.data.data;
                vm.total = res.data.total;
                vm.totalPage = res.data.totalPage;
            }
        });
        //搜索
        vm.search = function (params) {
            vm.total = 0;
            vm.totalpage = 0;
            peopleService.getPeople(params).then(function (res) {
                if(res.data.code == 0){
                    console.log(res);
                    vm.peoples = res.data.data;
                    vm.total = res.data.total;
                }
            });
        };
        //清除
        vm.clean = function () {
            $state.go($state.current,{},{reload:true})
        };
            //禁用
            vm.false = function (storage) {
                vm.params = {
                    id:storage.id,
                    isForbidden:true
                };
                $rootScope.confirm("确认将队员禁用吗？",function () {
                    peopleService.deletePeoples(vm.params.id,vm.params).then(function (res) {
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
            };
            // 解禁
            vm.true = function (storage) {
                vm.params = {
                    id:storage.id,
                    isForbidden:false
                };
                $rootScope.confirm("确认将队员解禁吗？",function () {
                    peopleService.deletePeoples(vm.params.id,vm.params).then(function (res) {
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