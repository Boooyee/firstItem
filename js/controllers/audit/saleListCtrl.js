/**
 * Created by Administrator on 2017/2/27 0027.
 */
angular.module("admin")
    .controller("saleListCtrl",function($rootScope,$scope,$state,saleService){
        var vm = this;
        vm.searchParams = $state.params;
        //获取与搜索
        saleService.getSaleList(vm.searchParams).then(function (res) {
            vm.saleList = res.data.data.enrouteSaledReportList;
            console.log(vm.saleList);
            vm.total = res.data.data.total;
        })
});