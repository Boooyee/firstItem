/**
 * Created by Administrator on 2017/2/25 0025.
 */
angular.module("admin")
    .controller("companyEditCtrl",function($rootScope,$scope,$state,organizationService){
        var vm = this;
        vm.params = $state.params;
        console.log(vm.params);
        if(vm.params.id){
            vm.compile = true;
            vm.add = false;
            vm.right = function () {
                $rootScope.confirm("确认提交公司信息？",function () {
                    organizationService.putCompanyEdit(vm.params.id,vm.params).then(function (res) {
                        if(res.data.code == 0){
                            $rootScope.alert("提交成功",function () {
                                $state.go("field.companyList")
                            })
                        }else{
                            $rootScope.alert(res.data.message);
                        }
                    })
                })
            }
        }
        else{
            vm.compile = false;
            vm.add = true;
            vm.right = function (params) {
                $rootScope.confirm("确认新增公司？",function () {
                    organizationService.postCompanyAdd(params).then(function (res) {
                        if(res.data.code == 0){
                            $rootScope.alert("提交成功",function () {
                                $state.go("field.companyList")
                            })
                        }else{
                            $rootScope.alert(res.data.message);
                        }
                    })
                })
            }
        }
    });