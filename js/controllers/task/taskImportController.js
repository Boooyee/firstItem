/**
 * Created by asus on 2017/2/28.
 */
angular.module('admin').controller('taskImportController', function ($rootScope, httpService, FileUploader, uploadService, $state) {
    var vm = this;
    vm.params = {};

    //初始化
    FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
        return true;
    };
    //盘库
    vm.uploader1 = uploadService.uploadFile(FileUploader);

    //if ($state.params.venderTaskId) {
    //    vm.urlParams = JSON.parse(localStorage.taskDetail);
    //    vm.urlParams.venderTaskId = $state.params.venderTaskId;
    //    vm.urlParams.teamsIds = vm.urlParams.teamsIds.split(';')
    //}


//再次点击按钮后 清除掉
    vm.clearUpload1 = function () {
        vm.uploader1.clearQueue();
    }
    vm.uploader1.onSuccessItem = function (fileItem, response, status, headers) {
        if (status == 200) {
            vm.params.inventoryCSVUrl = response.data.url;
        }
    };

    //倒查
    vm.uploader2 = uploadService.uploadFile(FileUploader);

//再次点击按钮后 清除掉
    vm.clearUpload2 = function () {
        vm.uploader2.clearQueue();
    }
    vm.uploader2.onSuccessItem = function (fileItem, response, status, headers) {
        if (status == 200) {
            vm.params.inspectCSVUrl = response.data.url;
        }
        console.log(vm.params)
    };


    //完成按钮
    vm.submit = function () {
        var params = vm.params;
        httpService.taskImportCompelete(params).then(function (res) {
            if (res.data.code == 0) {
                $state.go('field.taskList', {reload: true})

            } else {
                $rootScope.alert(res.data.message)
            }
        })
    }


});