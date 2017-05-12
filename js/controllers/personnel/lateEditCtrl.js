/**
 * Created by Administrator on 2017/2/26 0026.
 */
angular.module("admin")
    .controller("lateEditCtrl",['$rootScope','$scope','$state','lateService',function($rootScope,$scope,$state,lateService){
        var vm = this;
        vm.params = $state.params;
        if(vm.params.verifyStatus == 1){
            vm.show = true;
        }else{
            vm.show = false;
        }
        console.log(vm.params)
        lateService.getLookLate(vm.params.id).then(function (res) {
            if(res.data.code == 0){
                vm.late = res.data.data;
                vm.result = JSON.parse(res.data.data.imgUrl)
                vm.late.teamName = res.data.teamName;
                console.log(res)
            }
        });
        vm.pass = function (params) {
            vm.params = {
                verifyStatus:2,
                id:params.id
            };
            $rootScope.confirm('确定申请通过？',function () {
                lateService.putChangeLate(vm.params.id,vm.params).then(function (res) {
                    if(res.data.code == 0){
                        $rootScope.alert("通过申请成功",function () {
                            $state.go("field.lateList");
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
                    if(res.data.code == 0){
                        $rootScope.alert("拒绝申请成功",function () {
                            $state.go("field.lateList");
                        })
                    }else{
                        $rootScope.alert(res.data.message);
                }
                })
            })
        };
        //放大、旋转图片
        vm.img = function (item) {
            $rootScope.scaleImg(item);
        }
    }]);
