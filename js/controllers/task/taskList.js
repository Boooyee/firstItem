/**
 * Created by asus on 2017/2/27.
 */
angular.module('admin').controller('taskListController', function (person, $state, httpService, $rootScope, taskTable, taskTableUtil, venderTaskStatus) {
    var vm = this;
    vm.params = {};
    localStorage.taskDetail = ''

    //任务总览
    vm.taskListOverview = function (list) {
        $rootScope.taskListOverview(list);
    };

    //更新按钮
    vm.refresh = function () {
        $rootScope.confirm('确认进行更新操作?', function () {
            var venderTaskId = '';
            angular.forEach(vm.params.content, function (data) {
                venderTaskId += data.id + ';'
            })
            venderTaskId = venderTaskId.substring(0, venderTaskId.length - 1);
            httpService.taskListRefresh(venderTaskId).then(function (res) {
                if (res.data.code == 0) {
                    $state.go($state.current, $state.params, {reload: true})


                } else {
                    $rootScope.alert(res.data.message)
                }
            })
        })

    };

    //将小红点清零
    vm.cancelRedMark = function (venderTaskId, gotourl,restParams) {
        httpService.cancelRedMark(venderTaskId,restParams).then(function () {
            $state.go(gotourl, {venderTaskId:venderTaskId}, {reload: true})
        })
    }

    //获取任务列表
    vm.getTaskList = function (params) {
        var search;
        if (!params) {
            search = vm.searchParams;
        } else {
            search = angular.extend(params, vm.searchParams);

        }
        httpService.getTaskList(search).then(function (res) {
            if (res.data.code == 0) {
                console.log(res);
                vm.params.content = res.data.data;
                vm.params.config = taskTable;
                vm.total = res.data.total;

            } else {
                $rootScope.alert(res.data.message)
            }
        })
    };

    ////导出excel
    vm.getListExcel = function () {
        //导出excl
        vm.id = [];
        angular.forEach(vm.params.content, function (data) {
            vm.id.push(data.id)
        });
        vm.module = {
            module: "venderTask"
        };
        httpService.getListExcel(vm.id, vm.module).then(function (res) {
            if (res.data.code == 0) {
                location.href=res.data.url
            } else {
                $rootScope.alert(res.data.message)
            }
        })
    };


    //阻止事件冒泡
    vm.stopPropagation = function (e) {
        e.stopPropagation()
    };


    vm.thirdSelectShow = function () {
        vm.thirdSelect = true;
    };
    //将url内的参数取到searchParams变量中
    vm.searchParams = $state.params;
    angular.forEach(vm.searchParams, function (data, index) {
        if (index.indexOf('At') > 0 && data) {
            vm.searchParams[index] = parseInt(data)
        }
    });
    vm.getTaskList();

    //取出status数组
    vm.statusList = venderTaskStatus;


    vm.target = '';


//正序倒叙排序方法
    vm.sort = function (type, e) {
        var params = {};
        var target = vm.params.config.data.bottom[vm.target];
        params.sortField = target.keyName;
        params.sort = type;

        vm.getTaskList(params)

    }

    vm.getNode = function (id, e) {
        //取出被点击的父元素的子元素
        vm.daughterNodeParams = [];
        angular.forEach(vm.params.config.data.bottom, function (data) {
            if (data.parentId == id) {
                vm.daughterNodeParams.push(data)
            }
        })
    };

    vm.nodeChange = function (type, id, e) {


        //这里控制表数据显示
        vm.params.config.data.bottomStatus[id - 1] = false;

        //e.stopPropagation();
        //type 0为父级节点  1为子节点    id为操作的id
        if (type === 0) {
            taskTableUtil.parentTarget(vm.params.config.data, id)
            vm.getNode(id, e)

        } else if (type === 1) {
            alert(123)

            //底部被点击的项
            var bottomTarget = vm.params.config.data.bottom[id - 1];
            //底部被点击的项的状态值记录
            taskTableUtil.turnBoolean(vm.params.config.data, id);
            var topTarget;
            console.log(vm.params.config.data)


//若被操作的有父级层|| 若被操作的有空格层
            if (bottomTarget.parentId || bottomTarget.spaceId) {

                //根据父id 找到父级别的title 并减少其stopPropagation 以达到整体减少1列的目的
                var isContinue = true;
                angular.forEach(vm.params.config.data.top, function (data, index) {

                    //如果是减少 则
                    //找到父级的
                    if (data.id == bottomTarget.parentId) {


                        topTarget = vm.params.config.data.top[index];
                        console.log(bottomTarget);
                        if (bottomTarget.show === false) {

                            if (topTarget.colspan > 1) {
                                console.log(topTarget);
                                topTarget.colspan--
                            }

                        } else {
                            //如果子id显示 必须查找其父id是否显示 若未显示 控制显示
                            //不再继续执行下面的判断消失top函数函数
                            isContinue = false
                            if (topTarget.show == false) {
                                //topTarget.show = true;
                                console.log(topTarget);
                                topTarget.colspan++


                            } else {
                                topTarget.colspan++
                            }

                        }

                        if (data.spaceId == bottomTarget.spaceId) {
                            console.log(topTarget);
                            //注意!!!!!!这里的逻辑 本来是如果下面少了一个 上面就也减一个 但是不知道为什么会出错 所以先注释掉了
                            //if (bottomTarget.show === false) {
                            //    topTarget.colspan--
                            //} else {
                            //    topTarget.colspan++
                            //}
                        }

                    }
                })
                if (isContinue === false) {
                    return false
                }
                //查询top中 是否所有的bottom都被消失 如果是的话  就消失掉这个top
                var allHidden = true;
                angular.forEach(vm.params.config.data.bottom, function (data, index) {

                    if ((data.parentId == bottomTarget.parentId) && (vm.params.config.data.bottomStatus[index] === true || vm.params.config.data.bottomStatus[index] === undefined || vm.params.config.data.bottomStatus[index] === null)) {
                        allHidden = false
                    }
                });
                if (allHidden === true) {
                    topTarget.show = false
                }
            }
        }
    };

    //取消按钮
    vm.venderTaskCancel = function (venderTaskId) {
        $rootScope.confirm('取消的任务无法撤回,确认取消?', function () {
            httpService.venderTaskCancel(venderTaskId).then(function (res) {
                if (res.data.code == 0) {
                    $state.go($state.current, $state.params, {reload: true})
                } else {
                    $rootScope.alert(res.data.message)
                }
            })
        })

    }


    //跳转编辑页
    vm.toDetail = function (list) {
        var params = {
            venderId: list.venderId,
            planBeginAt: list.planBeginAt,
            distributorName: list.distributorName,
            comment: list.comment,
            teamsIds: list.eachTeamId,
            venderTaskId:list.id,
            distributorId:list.distributorId

        };
        localStorage.taskDetail = JSON.stringify(params);
        $state.go('field.taskAdd', {venderTaskId: list.id}, {reload: true});

    }
    //任务列表，点击完成
    vm.venderTaskFinish = function (id) {
        $rootScope.confirm("确认是否完成", function () {
            httpService.putTaskListComplete(id).then(function (res) {
                if (res.data.code == 0) {
                    $rootScope.alert("任务已完成")
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        })
    }


});