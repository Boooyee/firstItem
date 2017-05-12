/**
 * Created by LL on 2016/12/14 0014.
 */
angular.module("admin")
//用户管理


//产品管理
//数字和字母
    .directive("noChinese", function () {
        return {
            require: "ngModel",
            restrict: "EA",
            scope: {max: "@", maxLength: "@", min: "@"},
            link: function (e, n, r, i) {
                i.$parsers.push(function (n) {
                    if (void 0 == n)return "";
                    var r = +e.max, t = +e.maxLength, u = +e.min, a = n.replace(/[\W]+/g, "");
                    return t && n.length > t && (a = n.slice(0, t)), r && +a > r && (a = r + ""), u && +a < u && (a = u + ""), a != n && (i.$setViewValue(a), i.$render()), a
                })
            }
        }
    })
    //只有数字
    .directive("onlyNum", function () {
        return {
            require: "ngModel",
            restrict: "EA",
            scope: {max: "@", maxLength: "@", min: "@"},
            link: function (e, n, r, i) {
                i.$parsers.push(function (n) {
                    if (void 0 == n)return "";
                    var r = +e.max, t = +e.maxLength, u = +e.min, a = n.replace(/[^0-9]/g, "");
                    return t && n.length > t && (a = n.slice(0, t)), r && +a > r && (a = r + ""), u && +a < u && (a = u + ""), a != n && (i.$setViewValue(a), i.$render()), a
                })
            }
        }
    })
    //身份证
    .directive("idNum", function () {
        return {
            require: "ngModel",
            restrict: "EA",
            scope: {max: "@", maxLength: "@", min: "@"},
            link: function (e, n, r, i) {
                i.$parsers.push(function (n) {
                    if (void 0 == n)return "";
                    var r = +e.max, t = +e.maxLength, u = +e.min, a = n.replace(/[^0-9xX]/g, "");
                    return t && n.length > t && (a = n.slice(0, t)), r && +a > r && (a = r + ""), u && +a < u && (a = u + ""), a != n && (i.$setViewValue(a), i.$render()), a
                })
            }
        }
    })
    //数字格式化
    .directive('change', function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function (scope, iElem, iAttr, ngmodel) {
                iElem.bind('focus', function () {
                    var s = this.value;
                    if (s != '') {
                        this.select();
                    }
                });
                iElem.bind('blur', function () {
                    var s = this.value;
                    console.log(s)
                    if (s != "") {
                        if (s.charAt(s.length - 1) == '.') {
                            return
                        }
                        s = s.replace(/^(\d*)$/, "$1.");
                        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
                        s = s.replace(".", ",");
                        var res = /(\d)(\d{3},)/;
                        while (res.test(s))
                            s = s.replace(res, "$1,$2");
                        s = s.replace(/,(\d\d)$/, ".$1");
                        this.value = s.replace(/^\./, "0.")
                    }
                    console.log(this.value);
                });
            }
        }
    })
    //防重复点击
    .directive("repeatClick", function ($timeout) {
        return {
            restrict: 'EA',
            scope: {},
            link: function (scope, ele, attr) {
                ele.on("click", function () {
                    ele.prop("disabled", true)
                    $timeout(function () {
                        ele.prop("disabled", false)
                    }, 1000)
                })
            }
        }
    })


.directive('search2', function () {
    return {
        restrict: 'EA',
        templateUrl: 'js/directives/searchParams/search-params.html',
        replace: true,
        scope: {params: '=', clean1: '=', clean2: '=', clean3: '='},
        controller: [
            '$state',
            'commonUtil2',
            '$scope',
            function ($state, commonUtil2, $scope) {
                //搜索
                $scope.search = function () {
                    $state.go($state.current, commonUtil2.querySearchParams($scope.params), {reload: true});
                };
                //清空
                $scope.clean = function () {
                    angular.forEach($scope.params, function (data, index) {
                        if (index !== 'size'&&index!=='id'&& index!=='uName'&&index!=='phoneNum'&&index!=='productId'&&index!=='monthLimitType') {
                            $scope.params[index] = '';
                        }
                        //产品期限默认值
                        if (index == 'timeLimitType') {
                            $scope.params[index] = 0;
                        }

                    });
                    $scope.clean1 = undefined;
                    $scope.clean2 = undefined;
                    $scope.clean3 = undefined;
                };
            }
        ]
    };
})

.directive('search3', function () {
    return {
        restrict: 'EA',
        templateUrl: 'js/directives/searchParams/search-params.html',
        replace: true,
        scope: {params: '=', clean1: '=', clean2: '=', clean3: '='},
        controller: [
            '$state',
            'commonUtil',
            '$scope',
            function ($state, commonUtil, $scope) {
                //搜索
                $scope.search = function () {
                    $state.go($state.current, commonUtil.querySearchParams($scope.params), {reload: true});
                };
                //清空
                $scope.clean = function () {
                    angular.forEach($scope.params, function (data, index) {
                        if (index !== 'size'&&index!=='id'&& index!=='uName'&&index!=='phoneNum') {
                            $scope.params[index] = '';
                        }


                    });
                    $scope.clean1 = undefined;
                    $scope.clean2 = undefined;
                    $scope.clean3 = undefined;
                };
            }
        ]
    };
})

    .directive('search4', function () {
        return {
            restrict: 'EA',
            templateUrl: 'js/directives/searchParams/search-params.html',
            replace: true,
            scope: {params: '=', clean1: '=', clean2: '=', clean3: '='},
            controller: [
                '$state',
                'commonUtil',
                '$scope',
                function ($state, commonUtil, $scope) {
                    //搜索
                    $scope.search = function () {
                        $state.go($state.current, commonUtil.querySearchParams($scope.params), {reload: true});
                    };
                    //清空
                    $scope.clean = function () {
                        angular.forEach($scope.params, function (data, index) {
                            if (index !== 'size'&&index!=='creditId') {
                                $scope.params[index] = '';
                            }


                        });
                        $scope.clean1 = undefined;
                        $scope.clean2 = undefined;
                        $scope.clean3 = undefined;
                    };
                }
            ]
        };
    })
//指令部分
.directive('choice',function($state,$rootScope,debtService){
    return {
        restrict:'EA',
        templateUrl:'views/business/template.html',
        scope:{
            list:'=',
            money:'=',
            creditSplitId:'=',
            creditId:'='
        },
        link:function(scope){
            //匹配列表
            scope.pipei = {};

            //选择全部投资弹窗
            scope.chooseAllInvestment=function () {
                $rootScope.allInvestment(scope.backList,scope.pipeichanpin);
            };

            //将列表进行切割
            //前3个
            scope.frontList = scope.list.slice(0, 3);
            console.log(scope.frontList);
            //后面的
            if (scope.list.length > 3) {
                scope.backList = scope.list.slice(0);
            }

            //选的前一个
            var previousIndex,
                previousType;

            //push推荐匹配产品函数
            scope.pipeichanpin = function (investId, type) {
                var i;
                for(var x=0;x<scope[type].length;x++){
                    if(scope[type][x].investId==investId){
                        i=x;
                    }
                }
                if(!scope[type][i].use){
                    if(previousIndex!=undefined){
                        scope[previousType][previousIndex].use = false;
                    }
                    scope[type][i].originalIndex = i;
                    scope[type][i].use = true;
                    scope.haveChoose=true;
                    previousIndex=i;
                    previousType=type;
                    scope.pipei=scope[type][i];
                    scope.pipei.type=type;
                    scope.chooseWhat='';
                    // scope.pipei={
                    //     type:type,
                    //     contractNo: scope[type][index].contractNo,
                    //     productName: scope[type][index].productName,
                    //     originalIndex: scope[type][index].originalIndex,
                    //     interestEndAt: scope[type][index].interestEndAt,
                    //     userName: scope[type][index].userName,
                    //     investAmount: scope[type][index].investAmount,
                    //     investSplitId: scope[type][index].investSplitId
                    // };
                }
            };

            //取消推荐匹配产品函数
            scope.cancel = function () {
                scope.haveChoose=false;
                scope[scope.pipei.type][scope.pipei.originalIndex].use = false;
                scope.pipei={};
            };

            scope.saveDeb=function () {
                $rootScope.confirm2("保存后不可变更此匹配方案","确认保存？",function () {
                    scope.params={creditSplitId:scope.creditSplitId,investSplitId:scope.pipei.investSplitId};
                    console.log(scope.params);
                    debtService.saveDeb(scope.params).then(function (res) {
                        console.log(res);
                        if (res.data.code==0){
                            $rootScope.alert("保存成功");
                            $state.go('field.debtMatching',{creditId:scope.creditId});
                        }
                        else {
                            $rootScope.alert(res.data.message);
                        }
                    })
                })
            }
        }
    }
})