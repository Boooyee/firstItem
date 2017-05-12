/**
 * Created by asus on 2017/2/24.
 */
angular.module('admin').controller('dealersDetailController',function($scope,$rootScope,httpService,$state,areaData,$stateParams){
    var vm = this;
    var id=$stateParams.id;
    //省市联动填上星星
    $("#address label").prepend('<span class="star">*</span>');


    //跳转
    vm.toStaffList = function(data){
        console.log(data)

        sessionStorage.companyInfo.departmentName = data.name;
        sessionStorage.companyInfo.departmentId = data.id;

        $state.go('field.staffList',{companyId:data.companyId,departmentId:data.id},{reload:true})
    };




    if(!id){
        //新增


        vm.params={};
        vm.params.address={};
        console.log(vm.params.address);
        $scope.$watch('vm.params.address',function(){
            if(vm.params.address.province==null || vm.params.address.city==null){
                vm.form=true;
            }
            else{
                vm.form=false;
            }

        });



        vm.submitForm=function(){
            console.log(vm.params);
            vm.params.city =vm.params.address.city;
            vm.params.province=vm.params.address.province;

            if(vm.params.city==null || vm.params.province==null || vm.params.provinceName==null || vm.params.cityName==null ){

                angular.forEach(areaData.provinces,function(data){
                    if(data.ProID==vm.params.province){
                        vm.params.provinceName=data.ProName;
                        console.log( vm.params.provinceName)
                    }
                });
                angular.forEach(areaData.cities,function(data){
                    if(data.CityID==vm.params.city){
                        vm.params.cityName=data.CityName;
                        console.log( vm.params.cityName)
                    }
                });

                console.log(vm.params);

            }

            $rootScope.confirm2("确定后添加到经销商管理列表。", "是否执行新增操作？", function () {
                //delete vm.params.address1;
                console.log(vm.params);
                //if(vm.params.address){
                //    delete vm.params.address1
                //}

                httpService. getdealersAdd( vm.params).then(function(res){
                    console.log(res.data.data);
                    if (res.data.code == 0) {
                        $rootScope.alert("新增成功");
                        $state.go('field.dealersList', {}, {reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            })
        }
    }  else {
        //编辑
        if(id) {
            vm.exist = true;
            //根据id获取信息，显示在页面上
            httpService.getdealersDetail(id).then(function (res) {
                console.log(res.data);
                vm.params = res.data.data.distributor;
                vm.params.detailAddress=res.data.data.headStorage.detailAddress;
                vm.params.latitude=res.data.data.headStorage.latitude;
                vm.params.longtitude=res.data.data.headStorage.longtitude;
                console.log(vm.params);

                if(res.data.code==0) {
                    vm.params.address = {
                        city: res.data.data.distributor.city,
                        province: res.data.data.distributor.province
                    }
                }
                else {
                    $rootScope.alert(res.data.message)
                }
                console.log(vm.params.address);
            });


            //点击提交
            vm.submitForm = function () {
                //提交省市name字段
                vm.params.city =vm.params.address.city;
                vm.params.province=vm.params.address.province;
                vm.params.address=null;
                //console.log(areaData.provinces);
                angular.forEach(areaData.provinces,function(data){
                    if(data.ProID==vm.params.province){
                        vm.params.provinceName=data.ProName;
                        console.log( vm.params.provinceName)
                    }
                });
                angular.forEach(areaData.cities,function(data){
                    if(data.CityID==vm.params.city){
                        vm.params.cityName=data.CityName;
                        console.log( vm.params.cityName)
                    }
                });
                console.log(vm.params);

                //发送请求修改
                httpService.getdealersUpdate(id, vm.params).then(function (res) {
                    if (res.data.code == 0) {
                        $rootScope.alert("编辑成功");
                        $state.go('field.dealersList');
                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }
                });
            }
        }

    }


});