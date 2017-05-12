/**
 * Created by Administrator on 2017/2/25 0025.
 */
angular.module("admin")
    .controller("staffEditCtrl",function($rootScope,$stateParams,$state,$http,organizationService){
        var vm = this;
        var id=$stateParams.id;
        console.log(id);
        vm.cancel = function(){
            history.go(-1)
        }
        if(id){
            vm.exist= true;
            //根据员工id获取信息
            (function(){
                organizationService.getStaffDetail(id).then(function (res) {
                    console.log(res.data.data);
                    vm.params=res.data.data;
                    //vm.params.birthday=parseInt(vm.params.birthday);
                    //console.log(vm.params.birthday)
                })

            }());

            vm.submit = function () {

                //计算年龄
                function jsGetAge(strBirthday) {
                    var bDay = new Date(strBirthday),
                        nDay = new Date(),
                        nbDay = new Date(nDay.getFullYear(),bDay.getMonth(),bDay.getDate()),
                        age = nDay.getFullYear() - bDay.getFullYear();
                    if (bDay.getTime()>nDay.getTime()) {return '日期有错'}
                    return nbDay.getTime()<=nDay.getTime()?age:--age;
                }
                vm.params.age=jsGetAge(vm.params.birthday);

                $rootScope.confirm("确认编辑员工？",function () {
                    organizationService.putstaffEdit(id,vm.params).then(function (res) {
                        if(res.data.code == 0){
                            $rootScope.alert("提交成功",function () {
                                $state.go("field.staffList,{},{reload: true}")
                            })
                        }else{
                            $rootScope.alert(res.data.message);
                        }
                    })
                })
            }
        }
        else{
            console.log(id);
            vm.params={};
            var companyInfo = JSON.parse(sessionStorage.companyInfo);
            var departmentInfo = JSON.parse(sessionStorage.departmentInfo);
            //将公司部门名字和id放入
            vm.params.company = companyInfo.companyName
            vm.params.companyId = companyInfo.companyId
            vm.params.department = departmentInfo.departmentName
            vm.params.departmentId = departmentInfo.departmentId



            vm.submit = function () {
                console.log(1);
                vm.params.status=1;

                function jsGetAge(strBirthday) {
                    var bDay = new Date(strBirthday),
                        nDay = new Date(),
                        nbDay = new Date(nDay.getFullYear(),bDay.getMonth(),bDay.getDate()),
                        age = nDay.getFullYear() - bDay.getFullYear();
                    if (bDay.getTime()>nDay.getTime()) {return '日期有错'}
                    return nbDay.getTime()<=nDay.getTime()?age:--age;
                }
                vm.params.age=jsGetAge(vm.params.birthday);

                console.log(vm.params);
                $rootScope.confirm("确认新增员工？",function () {
                    organizationService.poststaffAdd(vm.params).then(function (res) {
                        if(res.data.code == 0){
                            $rootScope.alert("提交成功",function () {
                                //$state.go("field.staffList")
                                history.go(-1)
                            })
                        }else{
                            $rootScope.alert(res.data.message);
                        }
                    })
                })
            }
        }
    });