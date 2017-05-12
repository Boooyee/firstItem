'use strict';
angular.module('admin').factory('commonUtil', [
    '$rootScope',
    '$state',
    function ($rootScope, $state) {
        return {
            pageDefault: {
                page: 1,
                size: 10,
                next: true
            },
            search: function (param) {
                $state.go($state.current, param, {reload: true});
            },
            clean: function (param) {
                angular.forEach(param, function (data, index) {
                    param[index] = '';
                });
                console.log(param);
                return param;
            },
            //取图片命名
            getImgArrName: function (argImg) {
                if (typeof argImg === 'object') {
                    var imgJson = [];
                    argImg.forEach(function (data, index) {
                        var img;
                        imgJson[index] = {};
                        img = data.substr(data.lastIndexOf('/') + 1).substring(0, data.substr(data.lastIndexOf('/') + 1).indexOf('.jpg'));
                        imgJson[index] = {name: img, url: data}
                    })
                    return imgJson
                }else if(typeof argImg ==='string'){
                    var img;
                    img = argImg.substr(argImg.lastIndexOf('/') + 1).substring(0, argImg.substr(argImg.lastIndexOf('/') + 1).indexOf('.jpg'));
                    return {name:img,url:argImg}
                }
            },
            isAllChoice: function (arr) {
                var isAll = true;
                angular.forEach(arr, function (data) {
                    if (!data.choice) {
                        isAll = false;
                    }
                });
                return isAll;
            },
            allChoice: function (arr) {
                angular.forEach(arr, function (data, index) {
                    if (!data.choice) {
                        arr[index].choice = true;
                    }
                });
                return arr;
            },
            cancelAllChoice: function (arr) {
                angular.forEach(arr, function (data, index) {
                    if (data.choice) {
                        arr[index].choice = false;
                    }
                });
                return arr;
            },
            allList: function (arr, btn) {
                var isAll = this.isAllChoice(arr);
                if (isAll) {
                    arr = this.cancelAllChoice(arr);
                } else {
                    arr = this.allChoice(arr);
                }
                return arr;
            },
            querySearchParams: function (params) {
                for (var k in params) {
                    if (params[k] instanceof Date) {
                        params[k] = new Date(params[k]).getTime();
                    }

                    //处理 结束时间 那天末尾
                    //if (k.toLowerCase().indexOf('end') != -1 && params[k]) {
                    //  var timeString = String(params[k]);
                    //  var str = timeString.substring(timeString.length - 1, timeString.length);
                    //  if (str != '9') {
                    //    params[k] = params[k] + 86400000 - 1;
                    //  }
                    //}
                    if (k === 'page') {
                        params[k] = 1;
                    }
                }
                return params;
            },
            process4Page: function (params) {
                if (params == undefined) {
                    params = {};
                } else {
                }
                if (params.page == undefined) {
                    params.page = $state.params.page || this.pageDefault.page;
                }
                if (params.size == undefined) {
                    params.size = $state.params.size || this.pageDefault.size;
                }
                if (params.next == undefined) {
                    params.next = $state.params.next || this.pageDefault.true;
                }
                return {'params': params};
            },
            processPageResult: function (res) {
                $state.params.next = res.data.data.next;
                return res;
            },
            setPage: function (res) {
                this.page = {
                    current: res.data.data.page,
                    size: res.data.data.size,
                    next: res.data.data.next
                };
            },
            resetPage: function () {
                this.page = {
                    current: 1,
                    size: 5,
                    next: true
                };
            },
            page: {
                current: 1,
                size: 5,
                next: true
            },
            //将获取的数据参数转为 [{name:  value: hidden}]形式
            transformArrToObj: function (arr) {
                var params = [];
                angular.forEach(arr, function (data, index) {
                    params[index] = {};
                    params[index].data = [];
                    angular.forEach(data, function (value, key) {
                        params[index].data.push({name: key, value: value, show: true});
                    })
                })
                return params
            },

            concactArrayParam: function (name, params) {
                var tempUrls = '?';
                angular.forEach(params, function (data, index, array) {
                    tempUrls = tempUrls + name + '=' + data + '&';
                });
                var url = tempUrls.substring(0, tempUrls.length - 1);
                return url;
            },
            showErrMsg: function (res) {
                if (res.data.code == -5020) {
                    $rootScope.alert(res.data.message, function () {
                        console.log(res.data.code + ' get error  message is ' + res.data.message);
                        $state.go('login', {}, {reload: true});
                    });
                } else {
                    $rootScope.alert(res.data.message, function () {
                        console.log(res.data.code + ' get error  message is ' + res.data.message);
                    });
                }
            },
            //处理img字符串为img数组
            imgstringToImgArr: function (arr) {
                var that = this;
                angular.forEach(arr, function (data, index) {
                    if (typeof data == 'string' && data.indexOf('.jpg') > 0) {
                        //arr[index] = data.split(';')
                        arr[index] = that.getImgArrName(data.split(';'))
                    }
                })
            },

            showReturnMsg: function (res, path) {
                switch (res.data.code) {
                    case 0:
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + ' get error  message is ' + res.data.message);
                            if (path == undefined) {
                            } else {
                                $state.go(path, {}, {reload: true});
                            }
                        });
                        break;
                    case -5020:
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + ' get error  message is ' + res.data.message);
                            $state.go('login', {}, {reload: true});
                        });
                        break;
                    default:
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + ' get error  message is ' + res.data.message);
                        });
                }
            },
            isUpdate: function (id) {
                if (id == undefined) {
                    return false;
                } else {
                    return true;
                }
            },
            buildTree: function (modules) {
                var tree = [];
                return this.buildTreeNode(0, null, tree, modules);
            },
            buildTreeNode: function (pid, node, tree, modules) {
                var now = this;
                angular.forEach(modules, function (data, index, array) {
                    var module = data;
                    if (module.parentID == pid) {
                        tree = now.buildTreeNode(module.id, module, tree, modules);
                        if (pid == 0) {
                            tree.push(module);
                        } else {
                            if (node.nodes == undefined) {
                                node.nodes = [];
                            }
                            node.nodes.push(module);
                        }
                    }
                });
                tree = tree.sort(now.treeSort);
                angular.forEach(tree, function (item, index) {
                    if (item.nodes) {
                        item.nodes = item.nodes.sort(now.treeSort);
                    }
                });
                return tree;
            },
            treeSort: function (a, b) {
                if (a.level < b.level)
                    return -1;
                else if (a.level > b.level)
                    return 1;
                else
                    return 0;
            },
            //处理时间
            getTheDate: function (utime) {
                utime = parseInt(utime);
                var time = new Date(utime);
                return {year: time.getFullYear(), month: time.getMonth() + 1, day: time.getDate()}
            },
            arrayContains: function (array, obj) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === obj) {
                        return true;
                    }
                }
                return false;
            },
            //延时某秒 若期间无其他操作 则执行事件 否则则不执行 (搜索用)
            timeOutFun:function(timeOutArr,time,fn){
                !timeOutArr.setArr[timeOutArr.index]? timeOutArr.setArr[timeOutArr.index]={}:'';
                if(timeOutArr.setArr[timeOutArr.index].searchContinue===undefined||timeOutArr.setArr[timeOutArr.index].searchContinue===null||timeOutArr.setArr[timeOutArr.index].searchContinue===false){
                    timeOutArr.setArr[timeOutArr.index].searchContinue = true;
                    timeOutArr.setArr[timeOutArr.index].timeSet = setTimeout(function(){
                        fn()
                        timeOutArr.setArr[timeOutArr.index].searchContinue=false
                    },time)
                }else{
                    clearTimeout(timeOutArr.setArr[timeOutArr.index].timeSet);
                    timeOutArr.index++;
                }
            }
        };
    }
]).factory('datePickerUtils', [
    '$filter',
    function ($filter) {
        return {
            isDate: function (obj) {
                return Object.prototype.toString.call(obj) === '[object Date]';
            },
            buildDates: function (date, options) {
                var dates = [], lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 3);
                options = options || {};
                date = new Date(date);
                while (date.getDay() !== options.weekStartsOn) {
                    date.setDate(date.getDate() - 1);
                }
                for (var i = 0; i < 42; i++) {
                    // 42 == 6 rows of dates
                    if (options.noExtraRows && date.getDay() === options.weekStartsOn && date > lastDate)
                        break;
                    dates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }
                return dates;
            },
            buildDayNames: function (weekStartsOn) {
                var dayNames = [
                    '\u65e5',
                    '\u4e00',
                    '\u4e8c',
                    '\u4e09',
                    '\u56db',
                    '\u4e94',
                    '\u516d'
                ];
                if (weekStartsOn) {
                    dayNames = dayNames.slice(0);
                    for (var i = 0; i < weekStartsOn; i++) {
                        dayNames.push(dayNames.shift());
                    }
                }
                return dayNames;
            },
            monthCourse: function (start, end) {
                var months = [];
                start = new Date(start);
                end = new Date(end);
                var differ = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
                for (var i = 0; i < differ; i++) {
                    var newMonth = new Date(start.getFullYear(), start.getMonth() + i, 1);
                    months.push($filter('date')(newMonth, 'yyyy-MM'));
                }
                return months;
            },


            getMonthDate: function (year, month) {
                return new Date(year, month + 1, 0).getDate();
            },
            getDateByTime: function (date, time) {
                var year = new Date(date).getFullYear();
                var month = new Date(date).getMonth();
                var day = new Date(date).getDate();
                var hours = new Date(time).getHours();
                var minutes = new Date(time).getMinutes();
                if (!date || !time) {
                    return '';
                } else {
                    return new Date(year, month, day, hours, minutes).getTime();
                }
            }
        };
    }
]).factory('taskTableUtil', [function () {
    return {
        //判断status是否为布尔值 不是的话 就设置其为false
        turnBoolean: function (config, id) {

            if (typeof config.bottomStatus[id - 1] == 'boolean') {
                config.bottomStatus[id - 1] = !config.bottomStatus[id - 1]
            } else {
                config.bottomStatus[id - 1] = false
            }
            console.log(config)
        },


        //点击的是父级节点调用事件
        parentTarget: function (config, id) {
            angular.forEach(config.bottom, function (data, index) {
                if (data.parentId == id) {
                    data.show = !data.show;
                    console.log(config)
                    if (typeof config.bottomStatus[index] === 'boolean') {
                        config.bottomStatus[index] = !config.bottomStatus[index]
                    }
                    else {
                        config.bottomStatus[index] = false
                    }
                }
            })
        }
    }


}])
;