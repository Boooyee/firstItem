'use strict';
angular.module('admin')
    .controller('ManagerCtrl',['$state','$scope','$rootScope','$cookies','commonUtil','managerService','roleService', function ($state, $scope, $rootScope,$cookies, commonUtil, managerService,roleService) {
        var vm = $scope.vm = {};
        $scope.rid_role={};
        vm.roleList=[];
        var roleParam={size:65535};
        vm.searchParams={};
        if($state.params.rid){
            vm.searchParams.rid=$state.params.rid||'';

        }
        if($state.params.name){
            vm.searchParams.name=$state.params.name||'';

        }



        //清除按钮
        $scope.clear=function(){
            angular.forEach(vm.searchParams,function(data,index){
                vm.searchParams[index]=''
            })
            console.log(vm.searchParams)
        }

        function getRoleList(rids) {
            roleService.batchGetRole(rids).then(function (res) {

                angular.forEach(res.data.data.roleList, function (data, index, array) {
                    $scope.rid_role[data.id] = data;
                });

                angular.forEach(vm.list, function (data, index, array) {
                    data.role = $scope.rid_role[data.roleID];
                });


            });
        }

        function getManagerList(rid,name) {

            managerService.getManagerList({roleID:rid,name:name}).then(function (res) {
                if (res.data.code == 0) {
                    vm.page = {
                        next: res.data.data.next || 0,
                        size: res.data.data.size || 0,
                        page: res.data.data.page || 0,
                        total: res.data.data.total || 0
                    };
                    managerService.batchGetManager(res.data.data.ids).then(function (res) {

                        if (res.data.code == 0) {
                            vm.list = res.data.data.managerList;
                            console.log(res.data.data);
                            vm.total=res.data.data.total;
                            var rids = [];

                            angular.forEach(res.data.data.managerList, function (data, index, array) {
                                rids.push(data.roleID);
                            });
                            getRoleList(rids);
                        } else {
                            commonUtil.showErrMsg(res);
                        }

                    });

                } else {
                    commonUtil.showErrMsg(res);

                }
            });
        }

        getManagerList();


        vm.delete = function(id) {

            $rootScope.confirm("您确定要删除吗？", function() {
                managerService.deleteManager(id).then(function(res) {

                    commonUtil.showReturnMsg(res,"field.manager");
                });
            });

        };


        roleService.getRoleList(roleParam).then(function (res) {
            if (res.data.code == 0) {

                roleService.batchGetRole(res.data.data.ids).then(function (res) {


                    if (res.data.code == 0) {

                        vm.roleList= res.data.data.roleList;

                        vm.roleList.push({id:'',name:"全部角色"});





                    } else {
                        commonUtil.showErrMsg(res);
                    }
                });
            } else {
                commonUtil.showErrMsg(res);
            }

        });

        // search
        vm.rid = {};
        vm.search = function(){

            //if(vm.rid<0){
                getManagerList(vm.searchParams.rid,vm.searchParams.name);
            //$state.go($state.current,{rid:vm.searchParams.rid,name:vm.searchParams.name},{reload:true})

            //
            //}else{
            //    searchManager(vm.rid);
            //
            //}

        };

        // init
        function searchManager(param) {
            console.log(param);

            roleService.getRoleManager(param).then(function (res) {
                if (res.data.code == 0) {

                    managerService.batchGetManager(res.data.data.ids).then(function (res) {
                        if (res.data.code == 0) {

                            vm.list= res.data.data.managerList;

                            getRoleList([param]);


                        } else {
                            commonUtil.showErrMsg(res);
                        }
                    })
                } else {
                    commonUtil.showErrMsg(res);
                }
            });
        }
    }]);