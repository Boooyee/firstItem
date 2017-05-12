/**
 * Created by Administrator on 2017/2/25 0025.
 */
angular.module("admin")
    .controller("departmentListCtrl",function($rootScope,$scope,$state,organizationService){
        var vm = this;
        vm.searchParams = $state.params;
        organizationService.getDepartement(vm.searchParams).then(function (res) {
            if(res.data.code == 0){
                console.log(res);
                vm.department = res.data.data.departmentList;
                vm.total = res.data.total;
            }
        });
        vm.pass = function (params) {
            vm.status = {
                status:1
            };
            $rootScope.confirm("是否解禁部门",function () {
                organizationService.putDepartmentStatus(params.id,vm.status).then(function (res) {
                    if(res.data.code == 0){
                        $rootScope.alert("解禁成功",function () {
                            $state.go($state.current,{},{reload:true})
                        })
                    }else{
                        $rootScope.alert(res.data.message);
                    }
                })
            })
        };

        //跳转 员工
            vm.toStaffList = function(data){
                sessionStorage.departmentInfo =JSON.stringify({departmentName : data.name,departmentId:data.id})
                $state.go('field.staffList',{companyId:data.companyId,departmentId:data.id},{reload:true})
            };


        vm.refuse = function (params) {
            vm.status = {
                status:0
            };
            $rootScope.confirm("是否禁用部门",function () {
                organizationService.putDepartmentStatus(params.id,vm.status).then(function (res) {
                    if(res.data.code == 0){
                        $rootScope.alert("禁用成功",function () {
                            $state.go($state.current,{},{reload:true})
                        })
                    }else{
                        $rootScope.alert(res.data.message);
                    }
                })
            })
        }
    });