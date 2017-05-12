'use strict';
var app=
angular.module('admin', [
  'oc.lazyLoad',
  'ui.router',
  'ngCookies',
  'mgcrea.ngStrap',
  'angular-loading-bar',
  'ngMessages',
    'angularFileUpload'
]).factory('recordCookies', recordCookies).factory('adminInterceptor', adminInterceptor).config(httpConfig).config(lazyLoadConfig).config(projectRouteConfig).config(loadingBar).run(function ($rootScope, $templateCache, $modal, $cookies, $state, $location, managerService, roleService) {

  // 换肤功能：从本地获取已经存储皮肤
  if (localStorage.cssName) {
    var name = "css/skin/" + (localStorage.cssName || 'orange') + ".css";
    $("#aaa").attr("href", name)
  }


  //默认分页参数
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //console.log(event);
    //console.log(toState);
    //console.log(toParams);
    //console.log(fromState);
    //console.log(fromParams);


    if (toParams.page != undefined) {
      toParams.page = toParams.page || 1;
    }
    if (toParams.size != undefined) {
      toParams.size = toParams.size || 10;
    }
  });
  $rootScope.nowDate = new Date().getTime();
  $rootScope.isLogin = function () {
    return !!$cookies.login;
  };
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //if (!$rootScope.isLogin() && $location.path() !== '/login') {
    //  $state.go('login');
    //  return false;
    //}
    //if ($rootScope.isLogin() && $location.path() === '/login') {
    //  $state.go('field.home');
    //  return false;
    //}
  });
  $rootScope.$on('$viewContentLoading', function (event) {
  });
  $rootScope.$on('$viewContentLoaded', function (event) {
  });
  //alert confirm notify    提示模态框
  $rootScope.alert = function (content, okFn) {
    var modal = $modal({
        html: true,
        show: false,
        templateUrl: 'views/template/ptteng-alert-0.0.1.html',
        controller: function ($scope) {
          $scope.content = content;
          $scope.ok = function () {
            typeof okFn == 'function' && okFn();
            modal.$promise.then(modal.hide);
          };
        }
      });
    modal.$promise.then(modal.show);
  };
  //查看照片
    $rootScope.alert2 = function (blankBillImg,blankOutStorageImg,cancelFn) {
        var modal = $modal({
            html: true,
            show: false,
            templateUrl: 'views/audit/lookPicture.html',
            controller: function ($scope) {
                $scope.scaleImg = function(){
                    $rootScope.scaleImg(blankBillImg.url);
                };
                $scope.Img = function(){
                    $rootScope.scaleImg(blankOutStorageImg.url);
                };
                $scope.blankBillImg = blankBillImg;
                $scope.blankOutStorageImg = blankOutStorageImg;
                $scope.cancel = function ($scope) {
                    typeof cancelFn == 'function' && cancelFn();
                    modal.$promise.then(modal.hide);
                };
            }
        });
        modal.$promise.then(modal.show);
    };
    //导出图包
    $rootScope.downLoadReport = function (content,okFn, cancelFn) {
        var modal = $modal({
            html: true,
            show: false,
            templateUrl: 'views/audit/downLoad.html',
            controller: function ($scope) {
                $scope.content = content;
                $scope.ok = function () {
                    $scope.downLoad = JSON.parse(sessionStorage["url"]);
                    typeof okFn == 'function' && okFn();
                    modal.$promise.then(modal.hide);
                };
                $scope.cancel = function ($scope) {
                    typeof cancelFn == 'function' && cancelFn();
                    modal.$promise.then(modal.hide);
                };
            }
        });
        modal.$promise.then(modal.show);
    };
  $rootScope.confirm = function (content,okFn, cancelFn) {
    var modal = $modal({
        html: true,
        show: false,
        templateUrl: 'views/template/ptteng-confirm-0.0.1.html',
        controller: function ($scope) {
          $scope.content = content;
          $scope.ok = function () {
            typeof okFn == 'function' && okFn();
            modal.$promise.then(modal.hide);
          };
          $scope.cancel = function ($scope) {
            typeof cancelFn == 'function' && cancelFn();
            modal.$promise.then(modal.hide);
          };
        }
      });
    modal.$promise.then(modal.show);
  };
//两行内容
    $rootScope.confirm2 = function (content1,content2, okFn, cancelFn) {
        var modal = $modal({
            html: true,
            show: false,
            templateUrl: 'views/template/ptteng-confirm-0.0.1-2.html',
            controller: function ($scope) {
                $scope.content1 = content1;
                $scope.content2 = content2;
                $scope.ok = function () {
                    typeof okFn == 'function' && okFn();
                    modal.$promise.then(modal.hide);
                };
                $scope.cancel = function ($scope) {
                    typeof cancelFn == 'function' && cancelFn();
                    modal.$promise.then(modal.hide);
                };
            }
        });
        modal.$promise.then(modal.show);
    };
//审核模态框
    $rootScope.checkConfirm = function (content,pass,refuse,okFn, cancelFn) {
        var modal = $modal({
            html: true,
            show: false,
            templateUrl: 'views/audit/checkAlert.html',
            controller: function ($scope) {
                sessionStorage["check"]='';
                $scope.content = content;
                $scope.pass = pass;
                $scope.refuse = refuse;
                $scope.ok = function () {
                    sessionStorage["check"] = JSON.stringify($scope.status);
                    typeof okFn == 'function' && okFn();
                    modal.$promise.then(modal.hide);
                };
                $scope.cancel = function ($scope) {
                    typeof cancelFn == 'function' && cancelFn();
                    modal.$promise.then(modal.hide);
                };
            }
        });
        modal.$promise.then(modal.show);
    };

    //任务列表-总览
    $rootScope.taskListOverview = function (list) {
        var modal = $modal({
            html: true,
            show: false,
            templateUrl: 'views/template/taskList-overview.html',
            controller: function ($scope) {
                $scope.list = list;
                $scope.cancel = function () {
                    typeof cancelFn == 'function' && cancelFn();
                    modal.$promise.then(modal.hide);
                };
            }
        });
        modal.$promise.then(modal.show);
    };




  //外勤确认框
  $rootScope.outWorkConfirm = function(memberTaskId,index,list) {
    var modal = $modal({
      html: true,
      show: false,
      templateUrl: 'views/template/outwork-confirm.html',
      controller: function ($scope,httpService) {

        $scope.ok = function () {

        //撤回
          var params = {memberTaskId:memberTaskId,withdrawCause:$scope.withdrawCause}
          httpService.alloutWithdraw(params).then(function(res){
            if(res.data.code==0){
              typeof okFn == 'function' && okFn();
              modal.$promise.then(modal.hide);
              console.log(list[index].isWithdraw)
              list[index].isWithdraw = 1;
            }else{
              console.log(list[index])
              $rootScope.alert(res.data.message)
            }
          })
    console.log(params)

        };
        $scope.cancel = function ($scope) {
          typeof cancelFn == 'function' && cancelFn();
          modal.$promise.then(modal.hide);
        };
      }
    });
    modal.$promise.then(modal.show);
  };

    //外勤审核 模态框

    //照片审核模态框
    $rootScope.photoCheckModal = function(memberTaskId) {
        var modal = $modal({
            html: true,
            show: false,
            templateUrl: 'views/template/photo-check-modal.html',
            controller: function ($scope,httpService) {

                $scope.ok = function () {
                    var params = {memberTaskId:memberTaskId,status:$scope.status};
                    httpService.judgeTask(params.memberTaskId,params).then(function(res){
                        if(res.data.code==0){
                            modal.$promise.then(modal.hide);
                        }else{
                            $rootScope.alert(res.data.message)
                        }
                    })
                    modal.$promise.then(modal.hide);
                    $state.go($state.current,$state.params,{reload:true});

                };
                $scope.cancel = function ($scope) {
                    typeof cancelFn == 'function' && cancelFn();
                    modal.$promise.then(modal.hide);
                };
            }
        });
        modal.$promise.then(modal.show);
    };

    //图片放大 模态框
    $rootScope.scaleImg=function(url){
        console.log(url);
        var modal = $modal({
            html:true,
            show:false,
            templateUrl:'views/template/scaleImg.html',
            controller:function($scope){
                $scope.url=url;
                $scope.angle=0;
                $scope.iconOff=function () {
                    modal.$promise.then(modal.hide);
                };
                //转角度
                $scope.clickAngle = function(){
                    $scope.angle>=360?$scope.angle=0:$scope.angle+=90
                }
            }
        });
        modal.$promise.then(modal.show)
    };





    // 按组合键时新页面打开功能
  $rootScope.navigate = function ($event, to, params) {
    if ($event.metaKey) {
      var url = $state.href(to, params, { absolute: true });
      window.open(url, '_blank');
    } else {
      $state.go(to, params);
    }
  };
}).directive('compile', function ($compile) {
  // directive agency creates a link function
  return function (scope, element, attrs) {
    scope.$watch(function (scope) {
      // watch the 'compile' expression for changes
      return scope.$eval(attrs.compile);
    }, function (value) {
      // when the 'compile' expression changes
      // assign it into the current DOM
      element.html(value);
      // compile the new DOM and link it to the current
      // scope.
      // NOTE: we only compile .childNodes so that
      // we don't get into infinite loop compiling ourselves
      $compile(element.contents())(scope);
    });
  };
});
;
// Set lazy load module
function lazyLoadConfig($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    modules: [
      {
        name: 'datepicker',
        files: [
          'js/directives/datepicker/datepicker.css',
          'js/directives/datepicker/datepicker.js'
        ]
      },
      {
        name: 'dndLists',
        files: ['vendor/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js']
      },
      {
        name: 'page',
        files: ['js/directives/pagination.js']
      },
      {
        name: 'search',
        files: ['js/directives/searchParams/search-params.js']
      },
      {
        name: 'angularFileUpload',
        files: ['//cdn.bootcss.com/angular-file-upload/2.1.4/angular-file-upload.min.js']
      },
      {
        name: 'drop',
        files: ['vendor/angular-drop/angular-drag-and-drop-lists.min.js']
      },
      {
        name: 'um',
        files: [
          'vendor/um/umeditor.config.js',
          'vendor/um/umeditor.min.js',
          'vendor/um/lang/zh-cn/zh-cn.js',
          'vendor/um/themes/default/css/umeditor.css'
        ]
      },
      {
        name: 'bindHtml',
        files: ['//cdn.bootcss.com/angular-sanitize/1.5.8/angular-sanitize.min.js']
      }
    ]
  });
}
// Loader
function loadingBar(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.latencyThreshold = 200;
  cfpLoadingBarProvider.includeSpinner = false;
}
function httpConfig($httpProvider,$locationProvider) {




  // Set x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  // Set up global transformRequest function
  $httpProvider.defaults.transformRequest = function (data) {
    if (data === undefined) {
      return data;
    }
    return $.param(data);
  };
  // 拦截器
  $httpProvider.interceptors.push('adminInterceptor');
}

//将url的#去掉
function streamlineUrl($locationProvider){
  $locationProvider.html5Mode(true);
}

function recordCookies($cookies) {
  return function (params) {
    var cookie = $cookies.records || '{"managerID":"","moduleID":"","targetID":"","operate":""}';
    cookie = JSON.parse(cookie);
    if (params) {
      var setCookies = {
          managerID: params.managerID || cookie.managerID,
          moduleID: params.moduleID || cookie.moduleID,
          operate: params.operate || cookie.operate,
          roleID: params.roleID || cookie.roleID,
          targetID: +params.targetID || cookie.targetID
        };
      if (params.operate == 'POST') {
        delete setCookies.targetID;
      }
      $cookies.records = JSON.stringify(setCookies);
    } else {
      return cookie;
    }
  };
}
function adminInterceptor(recordCookies) {
  return {
    request: function (config) {
      recordCookies({ operate: config.method });
      return config;
    },
    requestError: function (config) {
      return config;
    },
    response: function (res) {
      return res;
    },
    responseError: function (res) {
      return res;
    }
  };
}