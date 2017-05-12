/**
 * Created by Administrator on 2017/2/24 0024.
 */
angular.module("admin")
    .controller("storageEditCtrl",['$rootScope','$scope','$state','$http','$stateParams','storageService','areaData',
        function($rootScope,$scope,$state,$http,$stateParams,storageService,areaData){
        var vm = this;
        vm.params = $state.params;
            //是否存在本部库位
            storageService.getSelfStorage(vm.params.distributorId).then(function (res) {
                if(res.data.code == 0){
                    vm.show = true;
                }if(res.data.code == -7007){
                    vm.show = false;
                }
            });
        if(vm.params.id)  {//如果接受到id信息
            vm.add = false;
            vm.compile = true;
            //获取编辑库位的信息
            storageService.getCompileStorage(vm.params.id).then(function (res) {
                console.log(res);
                if(res.data.code == 0){
                    vm.params = res.data.data;
                    vm.params.area = {
                        province:res.data.data.province,
                        city:res.data.data.city
                    };
                    if(res.data.data.attribute === '1'){
                        vm.show = true;
                    }
                }
            });
            //修改后点击提交
            vm.submit = function (params) {
                vm.params.city = vm.params.area.city;
                vm.params.province = vm.params.area.province;
                $rootScope.confirm('确定提交吗？',function () {  //模态框
                    storageService.putNewStorage(params.id,params).then(function (res) {
                        console.log(res);
                        if(res.data.code == 0){
                            $rootScope.alert("提交成功",function () {
                                $state.go('field.storageList',{distributorId:vm.params.distributorId});
                            })
                        }else{
                            $rootScope.alert(res.data.message)
                        }
                    })
                })
            }
        }else{  //新增页面
            vm.add = true;
            vm.compile = false;
            vm.submit = function () {
                //省市遍历
                vm.params.city = vm.params.area.city;
                vm.params.province = vm.params.area.province;
                vm.params.area = null;
                //console.log(areaData.provinces);
                angular.forEach(areaData.provinces,function(data){
                    if(data.ProID == vm.params.province){
                        vm.params.provinceName = data.ProName;
                        console.log( vm.params.provinceName)
                    }
                });
                angular.forEach(areaData.cities,function(data){
                    if(data.CityID == vm.params.city){
                        vm.params.cityName = data.CityName;
                        console.log( vm.params.cityName)
                    }
                });
                console.log(vm.params);

                $rootScope.confirm('确定提交吗？',function () {
                    storageService.postAddStorage(vm.params).then(function (res) {
                        if(res.data.code == 0 || res.data.code == -7007){
                            $rootScope.alert('提交成功',function () {
                                $state.go('field.storageList',{distributorId:vm.params.distributorId});
                            })
                        }else{
                            $rootScope.alert(res.data.message)
                        }
                    })
                })
            }
        }
}]);