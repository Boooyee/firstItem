/**
 * Created by asus on 2017/3/11.
 */
angular.module('admin').controller('photoCheckController', function ($rootScope,commonUtil, httpService, $state) {
    var vm = this;
    vm.target = sessionStorage.target || 0;
    console.log(vm.target);
    //厂家任务id
    vm.venderTaskId = $state.params.venderTaskId;

    //vm.detailType  点击某一条 调用 photoRightDetail 展示图片后 记录类型 (类型不同  点击重拍是不同的接口);合影为1  在途已售报告为2 盘库为3  倒查为4
    vm.detailType = '';

    //获取照片审核列表  tab和title的数字统计  memberTaskList为tab循环列表  enrouteSaledReport为title统计数字循环列表
    vm.getPhotoCheck = function () {
        httpService.getPhotoCheck(vm.venderTaskId).then(function (res) {
            if (res.data.code == 0) {
                vm.photoTab = res.data.data;
                console.log(vm.photoTab);
                vm.photoTab.carsWithNoPhotos.carsWithNoPhotosJson = JSON.parse(vm.photoTab.carsWithNoPhotos.carsWithNoPhotosJson)
                if (vm.photoTab && vm.photoTab.memberTaskList && vm.target !=1000) {
                    vm.photoCheckDetail()
                }
            } else {
                $rootScope.alert(res.data.message)
            }
        })
    };
    vm.getPhotoCheck();


    //放大图片
    vm.scaleImg = function (url) {
        $rootScope.scaleImg(url)
    };


    //点击 tab 剩余未拍车辆
    vm.getCarsWithNoPhoto = function(){
            vm.target =1000;
        sessionStorage.target = vm.target;
        vm.photoRightIndex = -1;
        vm.closeRight = '';
        vm.rightPhoto = '';
        vm.saledReportList = '';

    };

    //获取照片审核详情
    vm.photoCheckDetail = function (index, memberTaskId) {
        if(index ===undefined || index===null){
            vm.target=sessionStorage.target||0
        }else {
            vm.target=index;
        }

        sessionStorage.target = vm.target;
        console.log(vm.target);
        vm.photoRightIndex = -1;
        vm.closeRight = '';
        vm.rightPhoto = '';
        vm.saledReportList = '';
        httpService.photoCheckDetail(vm.photoTab.memberTaskList[vm.target].memberTaskStorageId).then(function (res) {
            if (res.data.code == 0) {
                console.log(res);
                vm.photoCheckDetailList = res.data.data;
                vm.photoList = res.data.data.inventoryList.concat(res.data.data.inspectList)
                console.log(vm.photoList)


                //合影list
                vm.memberStorage = res.data.data.memberStorage;
                //在途已售报告list


            } else {
                $rootScope.alert(res.data.message)
            }
        })
    };

    //点击列表中某一条 展示图片
    vm.photoRightDetail = function (index, type,status) {
        console.log(status);
            if(status && status!=1){
                return false
            }

        //如果arguments中有type的话 就是综合 也就是合影和在途已售报告
        vm.rightPhoto = {};
        delete vm.saledReportList;

        if (!type) {
            vm.closeRight = false;
            vm.photoRightIndex = index;

                vm.rightPhoto = vm.photoList[index - 3];
            vm.rightPhoto.type == 1 ? vm.detailType = 3 : vm.detailType = 4;

            angular.forEach(vm.rightPhoto, function (data, index) {
                if (typeof data == 'string' && data.indexOf('.jpg') > 0) {
                    vm.rightPhoto[index] = commonUtil.getImgArrName(data.split(';'));
                    console.log(vm.rightPhoto[index]);
                }
            });
            console.log(vm.rightPhoto)
        } else {
            vm.rightPhoto={};
            delete vm.saledReportList;

            //type 1 为合影  2为 在途已售报告
            if (type === 1) {
                vm.closeRight = false;
                //合影
                vm.photoRightIndex = 1;
                vm.rightPhoto = vm.photoCheckDetailList.memberStorage;

                vm.detailType = 1
            } else if (type === 2) {
                if(vm.photoCheckDetailList.enrouteSaledReport.enrouteSaledReportStatus===2){
                    return false
                }
                vm.closeRight = false;
                //在途已售报告
                vm.photoRightIndex = 2;
                //根据厂家任务id 获取在途已售报告
                httpService.getSaledReport(vm.venderTaskId).then(function (res) {
                    if (res.data.code == 0) {
                        console.log(res);
                        vm.saledReportList = res.data.data;
                        vm.saledReportList.enrouteSaledInventorys =JSON.parse(vm.saledReportList.enrouteSaledInventorys);
                        vm.saledReportList.carNumInfo?vm.saledReportList.carNumInfo =JSON.parse(vm.saledReportList.carNumInfo):'';
                        //处理string格式的图片 变成 img arr
                        commonUtil.imgstringToImgArr(vm.saledReportList.enrouteSaledReport);
                        console.log(vm.saledReportList)

                    } else {
                        $rootScope.alert(res.data.message)
                    }
                })

                vm.detailType = 2
            }
            //处理string格式的图片 变成 img arr
            commonUtil.imgstringToImgArr(vm.rightPhoto);

        }

    }

    //重拍
    vm.rePhoto = function () {
        var params = {status: 2};
        var mthod;
        $rootScope.confirm('重拍将清除本车审计照片，确认打回重拍？', function () {
            //detailType 合影为1  在途已售报告为2 盘库为3  倒查为4
            if (vm.detailType == 1) {
                params.id = vm.rightPhoto.memberStorageId;
                mthod = 'checkMemberStorage'

            } else if (vm.detailType == 2) {
                params.id = vm.saledReportList.enrouteSaledReport.id;
                console.log(params);
                mthod = 'checkEnrouteSaledReport'

            } else if (vm.detailType == 3) {
                params.id = vm.rightPhoto.inventoryId;
                mthod = 'checkInventory'


            } else if (vm.detailType == 4) {
                params.id = vm.rightPhoto.inspectListId;
                mthod = 'checkInspectId'
            }
            //
            console.log(params);
            httpService[mthod](params.id, params).then(function (res) {
                if (res.data.code == 0) {
                    //$rootScope.alert("审核成功");
                    $state.go($state.current, $state.params, {reload: true})
                } else {
                    $rootScope.alert(res.data.message)
                }
            })

        })

    }


    vm.photoCheckModal = function () {
        console.log(vm.photoTab.memberTaskList[vm.target]);
        $rootScope.photoCheckModal(vm.photoTab.memberTaskList[vm.target].memberTaskStorageId)
    }

});