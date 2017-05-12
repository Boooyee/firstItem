/**
 * Created by asus on 2017/2/27.
 */
angular.module('admin').controller('contentListController',['$state','httpService','$rootScope','$scope',function($state,httpService,$rootScope,$scope){
    var vm = this;
    (function(){
        vm.searchParams={};
        vm.searchParams=$state.params;

        console.log(vm.searchParams);

        httpService.getcontentList(vm.searchParams).then(function(res){
            console.log(res.data.data.articleList);
            vm.list=res.data.data.articleList;
            vm.total = res.data.data.total;
        })
    }());
    //解禁
    vm.online=function(id){
        vm.params={};
        vm.params.status=2;
        vm.params.id=id;

        $rootScope.confirm2("上线将在前台展示此内容。", "确认上线？", function () {
            httpService.getcontentStatus(vm.params).then(function(res){
                if (res.data.code == 0) {
                    $rootScope.alert("上线成功");
                    $state.go($state.current, {}, {reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        });
    };
    //禁用
    vm.offline=function(id) {
        //console.log(id);console.log("我的状态是"+status);
        vm.params = {};
        vm.params.status = 1;
        vm.params.id = id;
        $rootScope.confirm2("下线将使前台不再展示此内容。", "确认下线？", function () {
            httpService.getcontentStatus( vm.params).then(function (res) {
                if (res.data.code == 0) {
                    $rootScope.alert("下线成功");
                    $state.go($state.current, {}, {reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }

            })
        });
    };
    //删除
    vm.delete=function(id){
        console.log(id);

        $rootScope.confirm2("删除将自动下线此内容。", "确认删除？", function () {
            httpService.getcontentDelete(id).then(function(res){
                if (res.data.code == 0) {
                    $rootScope.alert("删除成功");
                    $state.go($state.current, {}, {reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        });
    };







}]);



