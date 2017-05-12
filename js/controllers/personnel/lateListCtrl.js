/**
 * Created by Administrator on 2017/2/26 0026.
 */
angular.module("admin")
    .controller("lateListCtrl",function($rootScope,$scope,$state,lateService){
        var vm = this;
        vm.searchParams = $state.params;
        //获取和搜索
        lateService.getLateList(vm.searchParams).then(function (res) {
            if(res.data.code == 0){
                console.log(res);
                vm.lateList = res.data.data;
                vm.total = res.data.total;
            }
        });
        //通过
        vm.pass = function (params) {
            vm.params = {
                verifyStatus:2,
                id:params.id
            };
            $rootScope.confirm('确定申请通过？',function () {
                lateService.putChangeLate(vm.params.id,vm.params).then(function (res) {
                    console.log(res);
                    if(res.data.code == 0){
                        $rootScope.alert("通过申请成功",function () {
                            $state.go($state.current,{},{reload:true});
                        })
                    }else{
                        $rootScope.alert("通过申请失败",function () {
                        })
                    }
                })
            })
        };
        //拒绝
        vm.refuse = function (params) {
            vm.params = {
                verifyStatus:3,
                id:params.id
            };
            $rootScope.confirm('确定拒绝通过？',function () {
                lateService.putChangeLate(vm.params.id,vm.params).then(function (res) {
                    console.log(res);
                    if(res.data.code == 0){
                        $rootScope.alert("拒绝申请成功",function () {
                            $state.go($state.current,{},{reload:true});
                        })
                    }else{
                        $rootScope.alert(res.data.message);
                    }
                })
            })
        };
    });