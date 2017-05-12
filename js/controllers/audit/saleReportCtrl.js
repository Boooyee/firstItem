/**
 * Created by Administrator on 2017/3/1 0001.
 */
angular.module("admin")
    .controller("saleReportCtrl",['$rootScope','$scope','$state','saleService','commonUtil',function($rootScope,$scope,$state,saleService,commonUtil){
        var vm = this;
        vm.params = $state.params;
        //获取数据
        saleService.getSaleReport(vm.params.id).then(function (res) {
            console.log(res);
            if(res.data.data.inventoryList[0] == undefined){
                vm.distributorName = "未获取经销商名称"
            }else{
                vm.distributorName = res.data.data.inventoryList[0].distributorName;
            }

            vm.saleReport = res.data.data.inventoryList;
            console.log(vm.saleReport);
            vm.self = res.data.data.enrouteSaledReport;
            vm.cars = res.data.data.storageList;
            console.log(vm.cars);

            //已售和在途车辆
            vm.saledCarsNumber = res.data.data.enrouteSaledReport.saledNum;
            vm.onLoadCarsNumber = res.data.data.enrouteSaledReport.enrouteNum;
            vm.otherNum = res.data.data.enrouteSaledReport.otherNum;
            //二网车辆
            vm.carNum = 0;
            angular.forEach(vm.cars,function (data) {
                vm.carNum += +data.carNum;
            });
            //合计车辆数
            vm.add = Number(vm.carNum||0) + Number(vm.self.headStorageNum||0)
            //查看照片
            vm.picture = function () {
                vm.blankBillImg = res.data.data.enrouteSaledReport.blankBillImg;
                vm.blankOutStorageImg = res.data.data.enrouteSaledReport.blankOutStorageImg;
                vm.first  = commonUtil.getImgArrName(vm.blankBillImg);
                vm.second = commonUtil.getImgArrName(vm.blankOutStorageImg);
                $rootScope.alert2(vm.first,vm.second);
            };
        })

}]);