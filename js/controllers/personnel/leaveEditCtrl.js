/**
 * Created by Administrator on 2017/2/27 0027.
 */
angular.module("admin")
    .controller("leaveEditCtrl",function($rootScope,$scope,$state,leaveService){
        var vm = this;
        //列表获取（包含搜索）
        vm.params = $state.params;
        leaveService.getLookLeave(vm.params.id).then(function (res) {
            console.log(res);
            vm.leave = res.data.data;
        });
        //通过
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
                            $state.go("field.leaveList");
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
                verifyStatus:2,
                id:params.id
            };
            $rootScope.confirm('确定拒绝通过？',function () {
                leaveService.putChangeLeave(vm.params.id,vm.params).then(function (res) {
                    console.log(res);
                    if(res.data.code == 0){
                        $rootScope.alert("拒绝申请成功",function () {
                            $state.go("field.leaveList");
                        })
                    }else{
                        $rootScope.alert(res.data.message);
                    }
                })
            })
        };
    });