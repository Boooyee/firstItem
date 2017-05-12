/**
 * Created by Administrator on 2017/2/25 0025.
 */
angular.module("admin")
    .controller("companyListCtrl",["$rootScope","$scope","$state","$http","organizationService",function($rootScope,$scope,$state,$http,organizationService){
        var vm = this;
        vm.searchParams = $state.params;
        //获取列表
        organizationService.getCompanyList(vm.searchParams).then(function (res) {
            console.log(res);
            vm.companyList = res.data.data.companyList;
            vm.total = res.data.total;
            sessionStorage.companyInfo = '';
            sessionStorage.departmentInfo = '';


        });
        //更新状态
        vm.pass = function (params) {
            vm.status = {
                status:1
            };
            $rootScope.confirm("是否解禁公司",function () {
                organizationService.putCompanyChange(params.id,vm.status).then(function (res) {
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

        //跳转部门
        vm.toDepartmentList = function(data){
            sessionStorage.companyInfo = JSON.stringify({companyName:data.name,companyId:data.id});
            $state.go('field.departmentList',{companyId:data.id},{reload:true})
        };



        vm.refuse = function (params) {
            vm.status = {
                status:0
            };
            $rootScope.confirm("是否禁用公司",function () {
                organizationService.putCompanyChange(params.id,vm.status).then(function (res) {
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
    }]);