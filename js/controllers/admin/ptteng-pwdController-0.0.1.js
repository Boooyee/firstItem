'use strict';
angular.module('admin')
    .controller('PwdCtrl',['$state','$scope','$rootScope','commonUtil','pwdService','recordCookies','$cookies','loginService','managerService', function($state,$scope, $rootScope,commonUtil,pwdService, recordCookies,$cookies,loginService,managerService) {
        var vm = $scope.vm = {};

        vm.save = function() {

            if(vm.data.newPwd==vm.data.newPwdAgain){
                pwdService.changePwd(vm.data).then(function(res){

                    //commonUtil.showReturnMsg(res,"field.home");
                    if (res.data.code == 0) {
                        $rootScope.alert("修改成功,请使用新密码重新登录", function() {
                            vm.data = {
                                oldPwd: "",
                                newPwd: "",
                                newPwdAgain: ""
                            };
                        });

                            loginService.logout().then(function(res) {
                                if (res.data.code == 0) {
                                    delete $cookies["login"];
                                    delete $cookies["record"];
                                    sessionStorage.mineSide='';
                                    managerService.clearSelfDetail();
                                    $state.go("login");
                                } else {
                                    $rootScope.alert(res.data.message);
                                }
                            });

                    }
                    else{
                        $rootScope.alert(res.data.message)
                    }


                })
            }else{
                var res={};
                res.data={};
                res.data.message="密码不一致";

                commonUtil.showErrMsg(res);

            }



        };



    }]);