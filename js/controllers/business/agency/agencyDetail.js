/**
 * Created by asus on 2017/2/26.
 */
angular.module('admin').controller('agencyDetailController',function( httpService,$state,$rootScope,$stateParams){
    var vm = this;
    var id=$stateParams.id;
    console.log("我的ID是"+id);

    if(!id){
        //获取厂家可选账号
        (function(){
            httpService.getagencyAccount(0).then(function(res){
                console.log(res.data.data);
                vm.chooseAccount=res.data.data.managerList;
            })
        }());

        //点击提交
        vm.submitForm=function(){
            $rootScope.confirm2("确定后添加到厂家列表。", "是否执行新增操作？", function () {
                httpService.getagencyAdd(vm.params).then(function(res){
                    if(res.data.code==0){
                        $state.go('field.agencyList',{}, {reload: true});
                    }else{
                        $rootScope.alert(res.data.message)
                    }
                })
            })
        };
    }else{
        console.log(id);
        //编辑
        if(id) {
            vm.exist = true;
            //根据id获取信息，显示在页面上
            httpService.getagencyDetail(id).then(function (res) {
                console.log(res.data.data);
                vm.params = res.data.data;
            });

            //根据id获取可选团队
            httpService.getagencyAccount(id).then(function (res) {
                //console.log(res.data.data);
                vm.chooseAccount = res.data.data.managerList;
            });

            //点击提交
            vm.submitForm = function () {
                httpService.getagencyUpdate(id, vm.params).then(function (res) {

                    if (res.data.code == 0) {
                        $rootScope.alert("编辑成功");
                        $state.go('field.agencyList');
                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }

                });
            }
        }else{
            $rootScope.alert('传入ID不正确')
        }
    }


});