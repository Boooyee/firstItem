/**
 * Created by Administrator on 2017/3/1 0001.
 */
angular.module("admin")
    .controller("auditReportCtrl",['$rootScope','$scope','$state','saleService',function($rootScope,$scope,$state,saleService){
        var vm = this;
        vm.params = $state.params;
        vm.correction = true;
        console.log(vm.params);
        vm.self = JSON.parse(localStorage["self"]);
        vm.print = function () {
            window.print();
        };
        saleService.getAuditReport(vm.params.id).then(function (res) { //获取数据
            if(res.data.code == 0){
                console.log(res);
                vm.report = res.data.data.report;
                vm.reportdetail = res.data.data.reportDetail;
                vm.inventory = res.data.data.inventoryList;
                vm.inventory.id = res.data.data.inventoryList.id;
                vm.self = res.data.data.enrouteSaledReport;
                vm.self.head = JSON.parse(res.data.data.enrouteSaledReport.head);
                vm.self.second = JSON.parse(res.data.data.enrouteSaledReport.seconds);
                vm.times = res.data.data.inspectList;
                vm.tr = res.data.data.inventoryOtherList;
                vm.close = res.data.data.closeSignIn;
                console.log(res);
                //盘库车辆总数
                vm.reportdetail.inventoryAdd = Number(vm.reportdetail.inventoryInstoreNum || 0)+ Number(vm.reportdetail.inventorySaledNum || 0) + Number(vm.reportdetail.inventoryEnrouteNum || 0) + Number(vm.reportdetail.inventoryOtherNum || 0);
                //倒查车辆总数
                vm.reportdetail.inspectAdd = Number(vm.reportdetail.inspectInstoreNum || 0) + Number(vm.reportdetail.inspectSaledNum || 0);
                //实际库存
                vm.reportdetail.actualAdd = Number(vm.reportdetail.centraStorageNum || 0) + Number(vm.reportdetail.secondStorageNum || 0) + Number(vm.reportdetail.showStorageNum || 0);
                //实际盘库
                vm.storageAdd = Number(vm.reportdetail.centraStorageCarNum || 0) + Number(vm.reportdetail.secondStorageCarNum || 0) + Number(vm.reportdetail.showStorageCarNum || 0);
                //本部车辆占比
                vm.storagePercent = Math.round(Number(vm.reportdetail.centraStorageCarNum) / Number(vm.storageAdd) * 100) + '%';
                //下载excl
                vm.module = 'report';
                saleService.getDownLoadExclone(vm.params.id,vm.module).then(function (res) {
                    vm.excl1 = res.data.url;
                });
                saleService.getDownLoadExcltwo(vm.params.id,vm.module).then(function (res) {
                    vm.excl2 = res.data.url;
                });

            }
        });


        //下载图包
        vm.downLoadImgZip = function(){
            vm.reportPic = 'reportPic';
            saleService.getDownLoadPic(vm.params.id,vm.reportPic).then(function (res) {
                var downImg = res.data.url;
                location.href = downImg
            });
        }

        vm.amend = function () {
                    vm.save = true;
                    vm.correction = false;
                    vm.reportdetail.inventoryInstoreNum = vm.reportdetail.inventoryInstoreCount;
                    vm.reportdetail.inventorySaledNum = vm.reportdetail.inventorySaledCount;
                    vm.reportdetail.inventoryEnrouteNum = vm.reportdetail.inventoryEnrouteCount;
                    vm.reportdetail.inventoryOtherNum = vm.reportdetail.inventoryOtherCount;
                    vm.reportdetail.inspectInstoreNum = vm.reportdetail.inspectInstoreCount;
                    vm.reportdetail.inspectSaledNum = vm.reportdetail.inspectSaledCount;
                    //盘库车辆总数
                    vm.reportdetail.inventoryAdd = Number(vm.reportdetail.inventoryInstoreNum || 0)+ Number(vm.reportdetail.inventorySaledNum || 0) + Number(vm.reportdetail.inventoryEnrouteNum || 0) + Number(vm.reportdetail.inventoryOtherNum || 0);
                    //倒查车辆总数
                    vm.reportdetail.inspectAdd = Number(vm.reportdetail.inspectInstoreNum || 0) + Number(vm.reportdetail.inspectSaledNum || 0);
                };
        vm.hold = function () { //保存表单
        	/* 将修正过的数据传给后端 */
        	var temp = {
        		inventoryInstoreNum : vm.reportdetail.inventoryInstoreNum,
        		inventorySaledNum : vm.reportdetail.inventorySaledNum,
        		inventoryEnrouteNum : vm.reportdetail.inventoryEnrouteNum,
        		inventoryOtherNum : vm.reportdetail.inventoryOtherNum,
        		inspectInstoreNum : vm.reportdetail.inspectInstoreNum,
        		inspectSaledNum :  vm.reportdetail.inspectSaledNum
        	};
            $rootScope.confirm("确认是否保存？",function () {
                saleService.putSaveReport(vm.params.id, temp).then(function (res) {
                    if (res.data.code == 0) {
                        $rootScope.alert("已成功提交");
                    }else{
                        $rootScope.alert(res.data.message);
                    }
                })
            })
        };

        vm.first = function (params) {
            vm.radio = {
                pass : 1,
                refuse : 3
            };
            $rootScope.checkConfirm("审核是否通过或者拒绝？",vm.radio.pass,vm.radio.refuse,function () {
                vm.status = JSON.parse(sessionStorage['check']);
                 if(vm.status == "pass"){
                     saleService.putFirstPassReport(params).then(function (res) {
                         if(res.data.code == 0){
                             $rootScope.alert("初审通过",function () {
                                 $state.go("field.auditReport",{stauts:'pass'})
                             })
                         }else{
                             $rootScope.alert(res.data.message);
                         }
                     });
                 }else if(vm.status == "refuse"){
                     saleService.putFirstRefuseReport(params).then(function (res) {
                     if(res.data.code == 0){
                         $rootScope.alert("初审拒绝",function () {
                             $state.go($state.current,{},{reload:true})
                         })
                     }else{
                         $rootScope.alert(res.data.message);
                     }
                 })
               }
            })
        };
        vm.second = function (params) {
            vm.radio = {
                pass : 2,
                refuse : 4
            };
            $rootScope.checkConfirm("审核是否通过或者拒绝？",vm.radio.pass,vm.radio.refuse,function () {
                vm.status = JSON.parse(sessionStorage['check']);
                 if(vm.status == "pass"){
                     saleService.putFinalPassReport(params).then(function (res) {
                         if(res.data.code == 0){
                             $rootScope.alert("终审通过",function () {
                                 $state.go($state.current,{status:2},{reload:true})
                             })
                         }else{
                             $rootScope.alert(res.data.message);
                         }
                     });
                 }else if(vm.status == "refuse"){
                     saleService.putFinalRefuseReport(params).then(function (res) {
                         if(res.data.code == 0){
                             $rootScope.alert("终审拒绝",function () {
                                 $state.go($state.current,{},{reload:true})
                             })
                         }else{
                             $rootScope.alert(res.data.message);
                         }
                     })
                 }
            })
        };
}]);
