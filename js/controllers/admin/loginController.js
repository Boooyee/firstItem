angular.module("admin").controller('LoginController', ['$state', '$cookies', '$timeout', 'loginService','managerService','recordCookies','$rootScope', LoginController]);

function LoginController($state, $cookies, $timeout, loginService, managerService, recordCookies, $rootScope) {
    var vm = this;
    vm.verfityBtn = '获取验证码'
    vm.resetParams = {};





    ////发送验证码
    //vm.getVerify = function (type) {
    //    var params =
    //    {
    //        type: type,
    //        mobile: vm.resetParams.mobile
    //    };
    //    if(!params.mobile){
    //        $rootScope.alert('请输入手机号')
    //        return false
    //    }
    //
    //    loginService.getVerify(params).then(function (res) {
    //        if (res.data.code == 0) {
    //            vm.verfityBtn = '验证码已发送'
    //            $timeout(function () {
    //                vm.verfityBtn = '获取验证码'
    //            }, 60000)
    //        }
    //        else {
    //            $rootScope.alert(res.data.message)
    //        }
    //    })
    //};


    //重置密码
    vm.reset = function () {
        loginService.resetPassWord(vm.resetParams).then(function (res) {
            if (res.data.code == 0) {
                $rootScope.alert("重置密码成功",function(){
                    $state.go($state.current,{},{reload:true})
                });
                $state.go($state.current,{},{reload:true})



            }
            else {
                $rootScope.alert(res.data.message)
            }
        })
    }


    //登录
    vm.submit = function () {
        var params = {
            name: vm.name,
            pwd: vm.pwd
        };

                //登录
                loginService.login(params).then(function (res) {
                    if (res.data.code == 0) {
                        $cookies.login = "true";
                        $state.go("field.dashboard");
                        recordCookies({managerID: res.data.data.manager.id, roleID: res.data.data.manager.roleID});
                        managerService.saveSelfDetail(res.data.data);
                    } else {
                        vm.errorTip ='登录失败，请稍候重试或联系超级管理员';
                        $timeout(function () {
                            vm.errorTip = "";
                        }, 5000);
                    }
                });




    }
}