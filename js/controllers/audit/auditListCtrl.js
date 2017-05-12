/**
 * Created by Administrator on 2017/2/27 0027.
 */
angular.module("admin")
    .controller("auditListCtrl",['$rootScope','$scope','$state','saleService',function($rootScope,$scope,$state,saleService){
        var vm = this;
        vm.searchParams = $state.params;
        saleService.getAuditList(vm.searchParams).then(function (res) {
            console.log(res);
            vm.auditList = res.data.data;
            vm.total = res.data.total;
            vm.self = JSON.parse(localStorage["self"]);
        });
        vm.first = function (params) {
            vm.radio = {
                pass : 1,
                refuse : 3
            };
            $rootScope.checkConfirm("审核是否通过或者拒绝？",vm.radio.pass,vm.radio.refuse,function () {
                vm.status = JSON.parse(sessionStorage['check']);
                if(vm.status == 'pass'){
                    saleService.putFirstPassReport(params.id).then(function (res) {
                        if(res.data.code == 0){
                            $rootScope.alert("初审通过",function () {
                                $state.go($state.current,{},{reload:true})
                            })
                        }else{
                            $rootScope.alert(res.data.message);
                        }
                    })
                }else if(vm.status == 'refuse' ){
                    saleService.putFirstRefuseReport(params.id).then(function (res) {
                        if(res.data.code == 0){
                            $rootScope.alert("初审拒绝",function () {
                                $state.go($state.current,{},{reload:true})
                            })
                        }else{
                            $rootScope.alert(res.data.message);
                        }
                    })
                }
            });
        };
        vm.second= function (params) {
            vm.radio = {
                pass : 2,
                refuse : 4
            };
            $rootScope.checkConfirm("审核是否通过或者拒绝？",vm.radio.pass,vm.radio.refuse,function () {
                vm.status = JSON.parse(sessionStorage['check']);
                 if(vm.status == "pass"){
                     saleService.putFinalPassReport(params.id).then(function (res) {
                         if(res.data.code == 0){
                             $rootScope.alert("终审通过",function () {
                                 $state.go($state.current,{},{reload:true})
                             })
                         }else{
                             $rootScope.alert(res.data.message);
                         }
                     });
                 }else if(vm.status == "refuse"){
                     saleService.putFinalRefuseReport(params.id).then(function (res) {
                         if(res.data.code == 0){
                             $rootScope.alert("终审拒绝",function () {
                                 $state.go($state.current,{},{reload:true})
                             })
                         }else {
                             $rootScope.alert(res.data.message);
                         }
                     })
                 }
            })
        };
}]);