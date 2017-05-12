/**
 * Created by asus on 2017/2/28.
 */
angular.module('admin').controller('taskAddController', function ($state, commonUtil,httpService, $rootScope, FileUploader, uploadService) {
    var vm = this;
    vm.params = {};
    vm.list = {};
        localStorage.taskDetail?vm.urlParams = JSON.parse(localStorage.taskDetail):'';
    console.log(vm.urlParams)

    //延时一秒 若无操作则进行搜索  若有操作打断
    var timeOutArr={index:0,setArr:[]};

    //经销商选择函
    vm.choiceDistributorId = function(distributor){
        if(distributor.status==1){
            vm.params.distributorId = distributor.id;
            vm.agencyName = distributor.companyName;
        }


    }




    if ($state.params.venderTaskId) {
        //任务id
        vm.excelList = {};
        vm.excelList.distributor = {};
        vm.params.planBeginAt = parseInt(vm.urlParams.planBeginAt);
        vm.agencyName = vm.urlParams.distributorName;

        vm.excelList.distributor.name = vm.urlParams.distributorName;

        //放入说明
        vm.params.comment = vm.urlParams.comment;

        //获取任务id详情
        //httpService.getTaskDetail(vm.urlParams.venderTaskId).then(function (res) {
        //    if (res.data.code == 0) {
        //        vm.list.vender = {};
        //        vm.list.vender.venderTeams = res.data.data.venderTeams;
        //        vm.list.vender.thirdPartyTeams = res.data.data.thirdPartyTeams;
        //        angular.forEach(vm.urlParams.teamsIds, function (ids) {
                //    angular.forEach(vm.list.vender, function (data, index) {
                //            angular.forEach(data, function (item, index) {
                //                if (ids == item.teamId) {
                //                    item.choice = true;
                //                }
                //            })
                //
                //    })
                //})
        //
        //    } else {
        //        $rootScope.alert(res.data.message)
        //    }
        //})

        //获取团队
        httpService.taskVenderTeam(vm.urlParams.distributorId).then(function(res){
            if(res.data.code==0){
                        vm.list.vender = {};
                vm.list.vender.venderTeams = res.data.data.venderTeams;
                vm.list.vender.thirdPartyTeams = res.data.data.thirdPartyTeams;
                console.log(vm.list.vender);
                vm.urlParams.teamsIds = vm.urlParams.teamsIds.split(',')

                angular.forEach(vm.urlParams.teamsIds, function (ids) {
                    angular.forEach(vm.list.vender, function (data, index) {
                        console.log(data)
                        angular.forEach(data, function (item, index) {
                            console.log(item)
                            if (ids == item.teamId) {
                                item.choice = true;
                            }
                        })

                    })
                })

            }else{
                $rootScope.alert(res.data.message)
            }
        })

    } else {
        //获取初始内容 新增
        httpService.getTaskInfoList().then(function (res) {
            if (res.data.code == 0) {
                vm.list.vender = res.data.data;
                //默认为第一个
                vm.params.venderId = vm.list.vender.venders[0].venderId||'';
                vm.venderChange()
            } else {
                $rootScope.alert(res.data.message)
            }
        });
    }


    //厂家联动团队
    vm.venderChange = function(){
        httpService.taskVenderTeam(vm.params.venderId).then(function(res){
            if(res.data.code==0){
                console.log(res)
                vm.list.vender.venderTeams = res.data.data.venderTeams;
                vm.list.vender.thirdPartyTeams = res.data.data.thirdPartyTeams

            }else{
                $rootScope.alert(res.data.message)
            }
        })
    }





    //
    //
    ////经销商列表
    //httpService.getdealersList().then(function (res) {
    //    if (res.data.code == 0) {
    //        vm.list.showDistributorId = res.data.data.distributorList;
    //
    //    } else {
    //        $rootScope.alert(res.data.message)
    //    }
    //});


    //搜索经销商
    vm.searchAgencyName = function(){
            if(vm.agencyName.length==''){
                    return false
            }
            //延时一秒 若无操作则进行搜索  若有操作打断
        commonUtil.timeOutFun(timeOutArr,800,function(){
            httpService.searchAgencyName(vm.agencyName).then(function(res){
                if(res.data.code==0){
                    vm.distributors = res.data.data.distributors
                    console.log(vm.distributors)
                }else{
                    $rootScope.alert(res.data.message)
                }
            })
        })

    };


    //选择某一条
    vm.allotDetailList = function (distributor) {
        vm.choiceMember = distributor;
        console.log(distributor.name)
        //vm.searchParams.memberName=member.name+'-'+member.account;
        //
        //var params = {memberId: member.id, distributorId: $state.params.distributorId};
        //httpService.allotDetailList(params).then(function (res) {
        //    if (res.data.code == 0) {
        //        vm.params = res.data.data;
        //        vm.total = res.data.total
        //
        //
        //    } else {
        //        $rootScope.alert(res.data.message)
        //    }
        //})
    }


    //提交
    vm.submitForm = function () {
        //若为厂家 自动选中自己的厂家
        if(vm.list.vender.type==0){
            vm.params.venderId = vm.list.vender.venders[0].venderId
        }
        vm.params.eachTeamId = '';
        //筛选出团队
        var teamList;
        teamList = vm.list.vender.venderTeams.concat(vm.list.vender.thirdPartyTeams)
        console.log(teamList);
        angular.forEach(teamList, function (data, index) {
            if (data.choice === true) {
                console.log(data)
                if (vm.params.eachTeamId == '') {
                    vm.params.eachTeamId = String(data.teamId)
                } else {
                    vm.params.eachTeamId += ';' + String(data.teamId)
                }

            }
        })
        if (vm.params.eachTeamId == '') {
            return $rootScope.alert('请至少选择一个团队')
        }
        console.log(vm.params.eachTeamId)
        ////新增
        if (!$state.params.venderTaskId) {
            //加上经销商id
            //vm.params.distributorId = vm.choiceDistributor.id;
            httpService.addTask(vm.params).then(function (res) {
                if (res.data.code == 0) {
                    console.log(res)
                    $state.go('field.taskList', {reload: true})
                } else {
                    $rootScope.alert(res.data.message)
                }
            })
        } else {//编辑
            var params = {
                eachTeamId: vm.params.eachTeamId,
                venderTaskId: vm.urlParams.venderTaskId,
                planBeginAt: vm.params.planBeginAt,
                comment: vm.params.comment,
                distributorId:vm.params.distributorId
            };
            httpService.putTaskDetail(params.venderTaskId, params).then(function (res) {
                if (res.data.code == 0) {
                    $state.go('field.taskList', {reload: true})
                } else {
                    $rootScope.alert(res.data.message)
                }
            })
        }

    }

});