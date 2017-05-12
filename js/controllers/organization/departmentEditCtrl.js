/**
 * Created by Administrator on 2017/2/25 0025.
 */
angular.module("admin")
    .controller("departmentEditCtrl",function($rootScope,$scope,$state,organizationService){
        var vm = this;
        vm.params = $state.params;
        if(vm.params.id){
            vm.edit = true;
            vm.add = false;
            organizationService.getDepartmentEdit(vm.params.id).then(function (res) {
               if(res.data.code == 0){
                   vm.params = res.data.data;
               }else{
                   $rootScope.alert(res.data.message);
               }
            });
            vm.right = function (params) {
                $rootScope.confirm("是否提交部门信息",function () {
                    organizationService.putDepartmentChange(vm.params.id,params).then(function (res) {
                        if(res.data.code == 0){
                            $rootScope.alert("提交部门信息成功",function () {
                                $state.go("field.departmentList",{companyId:vm.params.companyId});
                            })
                        }else{
                            $rootScope.alert(res.data.message);
                        }
                    })
                })
            }
        }else{
            vm.edit = false;
            vm.add = true;
            vm.right = function (params) {
                $rootScope.confirm("是否新增部门",function () {
                    organizationService.postDepartmentAdd(params).then(function (res) {
                        if(res.data.code == 0){
                            $rootScope.alert("新增部门成功",function () {
                                $state.go("field.departmentList",{companyId:vm.params.companyId});
                            })
                        }else{
                            $rootScope.alert(res.data.message);
                        }
                    })
                })
            }
        }
    });