/**
 * Created by asus on 2017/3/11.
 */
angular.module('admin').controller('allotTaskController', function ($state, httpService, $rootScope, $timeout,commonUtil) {
    var vm = this;
    // 获取任务id
    var venderTaskId = $state.params.venderTaskId;

    //延时一秒 若无操作则进行搜索  若有操作打断
    var timeOutArr={index:0,setArr:[]};



    //搜索审计员
    vm.allotSearchName = function (memberName) {
        commonUtil.timeOutFun(timeOutArr,1000,function(){
            //if (memberName === '') {
            //    return false
            //}
            var params = {venderTaskId: venderTaskId, memberName: memberName};
            httpService.allotSearchName(params).then(function (res) {
                if (res.data.code == 0) {
                    vm.members = res.data.data.members;
                    console.log(vm.members)
                } else {
                    $rootScope.alert(res.data.message)
                }
            })
        })


    };


    //获取队员的外勤任务详情
    vm.allotDetailList = function (member) {
            vm.choiceMember = member;
            console.log(member.name)
            vm.searchParams.memberName=member.name+'-'+member.account;

            var params = {memberId: member.id, distributorId: $state.params.distributorId};
            httpService.allotDetailList(params).then(function (res) {
                if (res.data.code == 0) {
                    vm.params = res.data.data;
                    vm.total = res.data.total


                } else {
                    $rootScope.alert(res.data.message)
                }
            })

    }


    //获取分配列表
    httpService.getAllotList(venderTaskId).then(function (res) {
        if (res.data.code == 0) {
            vm.storagesList = res.data.data.storages;

            //百度地图
            var map = new BMap.Map("l-map");          // 创建地图实例
            map.centerAndZoom(new BMap.Point(vm.storagesList[0].longitude, vm.storagesList[0].latitude), 5);

            map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件


            angular.forEach(vm.storagesList, function (data, index) {
                data.choice = true;
                //麻点
                var point = new BMap.Point(data.longitude, data.latitude);
                var marker = new BMap.Marker(point); // 创建标注
                map.addOverlay(marker); // 将标注添加到地图中
            })


        } else {
            $rootScope.alert(res.data.message)
        }
    })


    //保存
    vm.submitAllotDetail = function () {
        var params={memberId:vm.choiceMember.id,memberName:vm.choiceMember.name,venderTaskId:venderTaskId}
        angular.forEach(vm.storagesList,function(data,index){
            if(data.choice===true && !data.hasDistributed){
                if(!params.eachStorageId){
                    params.eachStorageId=data.id
                }else{
                    params.eachStorageId+=';'+data.id
                }
            }
        })
        console.log(params)
        httpService.submitAllotDetail(params).then(function (res) {
            if (res.data.code == 0) {
                $state.go('field.taskList',{reload:true})
            } else {
                $rootScope.alert(res.data.message)
            }
        })
    }


});