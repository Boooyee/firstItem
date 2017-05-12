/**
 * Created by asus on 2017/2/28.
 */
angular.module('admin').controller('outworkController', function ($state,httpService, $rootScope) {
    var vm = this;
    vm.searchParams={};
    vm.searchParams = $state.params;

    ////获取外勤列表
    vm.getOutWorkList = function(){
        if(vm.searchParams.address){
            vm.searchParams.province=vm.searchParams.address.province;
        }
        if(vm.searchParams.address){
            vm.searchParams.city=vm.searchParams.address.city;
        }
        delete vm.searchParams.address;
        httpService.getOutWorkList(vm.searchParams).then(function (res) {
            if (res.data.code == 0) {
                    vm.list = res.data.data;
                vm.total = res.data.total
                //地址
                vm.searchParams.address={};
                if(vm.searchParams.province){
                    vm.searchParams.address.province = parseInt(vm.searchParams.province);
                }
                if(vm.searchParams.city){
                    vm.searchParams.address.city = parseInt(vm.searchParams.city );
                }
                if(vm.searchParams.status){
                    vm.searchParams.status = parseInt(vm.searchParams.status);
                }
                console.log(vm.searchParams);


            } else {
                $rootScope.alert(res.data.message)
            }
        })
    };

    vm.getOutWorkList()


    //撤回
    vm.cancelOutWork = function(id,index){
        $rootScope.outWorkConfirm(id, index,vm.list)
    }


});