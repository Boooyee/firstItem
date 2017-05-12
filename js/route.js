'use strict';
function projectRouteConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        };
    };
    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });
    var versionNum = '006';
    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider.state('field', {
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/admin/mainController.js?ver=' + versionNum,
                    'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.js?ver=' + versionNum,
                    'js/directives/ptteng-user/ptteng-user-0.0.1.js?ver=' + versionNum,
                    'js/directives/ptteng-paging/pagination.js?ver=' + versionNum,
                    'js/directives/numberic/numberic.js?ver=' + versionNum,
                    'js/directives/searchParams/search-params.js',
                    'js/directives/ptteng-uploadThumb/ptteng-uploadThumb-0.0.1.js',
                    'js/directives/area-select/areaSelect.js',
                    'js/directives/area-select/areaConstant.js',
                    'js/directives/directives.js',
                    // 'js/directives/jsPDF/html2canvas.js',
                    // 'js/directives/jsPDF/jsPDF.js',
                    //'js/agency/agency.js',
                    'js/filter/filter.js',
                    'js/factory/ptteng-util-0.0.1.js'
                ])
            }
        })
        //经销商
        //================经销商列表===============
        .state('field.dealersList',{
            url:'/dealersList?page&size&companyName&companyShortName&contactsName&contactsPhone&selfStorageNum&secondStorageNum&tempStorageNum&status&province&city',
            templateUrl:'views/business/dealers/dealersList.html',
            controller:'dealersListController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    //'js/directives/area-selcet/areaSelect.js',
                    'js/controllers/business/dealers/dealersList.js'

                ])
            }
        })
        //==========新增经销商========
        .state('field.dealersDetail',{
            url:'/dealersAdd?id',
            templateUrl:'views/business/dealers/dealersAdd.html',
            controller:'dealersDetailController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/business/dealers/dealersDetail.js'
                )
            }
        })


        //团队
        //===============团队列表===============
        .state('field.teamList',{
            url:'/teamList?name&count&isForbidden&page&size',
            templateUrl:'views/business/team/teamList.html',
            controller:'teamListController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/business/team/teamList.js'
                )
            }
        })
        //==============新增团队================
        .state('field.teamDetail',{
            url:'/teamDetail?id',
            templateUrl:'views/business/team/teamAdd.html',
            controller:'teamDetailController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/business/team/teamDetail.js'
                )
            }
        })


        //厂家
        //===============厂家列表===============
        .state('field.agencyList',{
            url:'/agencyList?page&size&venderName&teamNum&managerName&status',
            templateUrl:'views/business/agency/agencyList.html',
            controller:'agencyListController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/business/agency/agencyList.js'
                )
            }
        })
        //==============新增厂家================
        .state('field.agencyDetail',{
            url:'/agencyDetail?id',
            templateUrl:'views/business/agency/agencyDetail.html',
            controller:'agencyDetailController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/business/agency/agencyDetail.js'
                )
            }
        })


        //运营
        //===============内容列表===============
        .state('field.contentList',{
            url:'/contentList?title&createBy&status&type&page&size&startAt&endAt',
            templateUrl:'views/operate/contentList.html',
            controller:'contentListController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/operate/contentList.js'
                )
            }
        })
        //==============新增内容================
        .state('field.contentDetail',{
            url:'/contentDetail?id',
            templateUrl:'views/operate/contentDetail.html',
            controller:'contentDetailController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/operate/contentDetail.js'
                )
            }
        })

        //任务
        //===============任务列表===============
        .state('field.taskList',{
            url:'/taskList?page&size&id&distributorShortName&teamName&minPlanBeginAt&maxPlanBeginAt&minCreateAt&maxCreateAt&status',
            templateUrl:'views/task/taskList.html',
            controller:'taskListController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                        'js/controllers/task/taskList.js',
                        'js/directives/data-toggle/data-toggle.js',
                        'js/directives/area-select/areaConstant.js'

                    ]
                ),
                person: function() {
                    return {
                        name: "Ari",
                        email: "ari@fullstack.io"
                    }
                }
            }
        })
        //==============新增/编辑任务================
        .state('field.taskAdd',{
            url:'/taskAdd?venderTaskId&venderId&planBeginAt&distributorName',
            templateUrl:'views/task/taskAdd.html',
            controller:'taskAddController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/task/taskAdd.js'
                )
            }
        })
        //==================编辑任务=============
        .state('field.taskImport',{
            url:'/taskImport',
            templateUrl:'views/task/task-import.html',
            controller:'taskImportController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/task/taskImportController.js'
                )
            }
        })
        //==================外勤列表=============
        .state('field.outworkList',{
            url:'/outworkList?updateByName&venderTaskId&memberTaskId&storageName&province&city&memberName&minUpdateAt&maxUpdateAt&status',
            templateUrl:'views/task/outworkList.html',
            controller:'outworkController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/task/outworkList.js'
                )
            }
        })
        //分配任务
        .state('field.allotTask',{
            url:'/allotTask?venderTaskId&distributorId',
            templateUrl:'views/task/allotTask.html',
            controller:'allotTaskController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/task/allotTask.js'
                )
            }
        })//照片
        .state('field.photoCheck',{
            url:'/photoCheck?venderTaskId',
            templateUrl:'views/task/photoCheck.html',
            controller:'photoCheckController',
            controllerAs:'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/task/photoCheck.js'
                )
            }
        })











        //================库位列表==================
        .state('field.storageList', {
            url: '/storageList?id&distributorId&storageName&latitude&longitude&atrribute&province&city&contactsName&contactsPost&contactsPhone&status&size&page',
            templateUrl: 'views/business/storage/storageList.html',
            controller: 'storageListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/business/storage/storageListCtrl.js')}
        })
        //新增、编辑库位
        .state('field.storageEdit', {
            url: '/storageEdit?id&distributorId',
            templateUrl: 'views/business/storage/storageEdit.html',
            controller: 'storageEditCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/business/storage/storageEditCtrl.js')}
        })
        //队员列表
        .state('field.peopleList', {
            url: '/peopleList?teamId&name&phone&account&page&total&size',
            templateUrl: 'views/business/people/peopleList.html',
            controller: 'peopleListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/business/people/peopleListCtrl.js')}
        })
        //编辑、新增队员
        .state('field.peopleEdit', {
            url: '/peopleEdit?id&teamId',
            templateUrl: 'views/business/people/peopleEdit.html',
            controller: 'peopleEditCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/business/people/peopleEditCtrl.js')}
        })

        //迟到申报列表
        .state('field.lateList', {
            url: '/lateList?taskId&memberId&memberName&memberPhone&dealerName&taskAt&submitAt&arriveAt&verifyStatus&page&size&total&totalPage',
            templateUrl: 'views/personnel/lateList.html',
            controller: 'lateListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/personnel/lateListCtrl.js')}
        })
        //迟到申报
        .state('field.lateEdit', {
            url: '/lateEdit?id&verifyStatus',
            templateUrl: 'views/personnel/lateEdit.html',
            controller: 'lateEditCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/personnel/lateEditCtrl.js')}
        })
        //请假申报列表
        .state('field.leaveList', {
            url: '/leaveList?id&memberName&memberPhone&submitAt&startAt&days&verifyStatus&page&size&total&totalPage',
            templateUrl: 'views/personnel/leaveList.html',
            controller: 'leaveListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/personnel/leaveListCtrl.js')}
        })
        //请假详情
        .state('field.leaveEdit', {
            url: '/leaveEdit?id&status',
            templateUrl: 'views/personnel/leaveEdit.html',
            controller: 'leaveEditCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/personnel/leaveEditCtrl.js')}
        })

        //公司列表
        .state('field.companyList', {
            url: '/companyList?companyName&status&page&size',
            templateUrl: 'views/organization/companyList.html',
            controller: 'companyListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/organization/companyListCtrl.js')}
        })
        //编辑、新增公司
        .state('field.companyEdit', {
            url: '/companyEdit?id&name&status&createAt&updateAt',
            templateUrl: 'views/organization/companyEdit.html',
            controller: 'companyEditCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/organization/companyEditCtrl.js')}
        })
        //员工列表
        .state('field.staffList', {
            url: '/staffList?departmentId&companyId&employeeName&phone&inductionStartTime&inductionEndTime&companyName&departmentName&city&position&status',
            templateUrl: 'views/organization/staffList.html',
            controller: 'staffListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/organization/staffListCtrl.js')}
        })
        //新增、编辑员工
        .state('field.staffEdit', {
            url: '/staffEdit?id',
            templateUrl: 'views/organization/staffEdit.html',
            controller: 'staffEditCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/organization/staffEditCtrl.js')}
        })
        //部门列表
        .state('field.departmentList', {
            url: '/departmentList?companyId&departmentName&status',
            templateUrl: 'views/organization/departmentList.html',
            controller: 'departmentListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/organization/departmentListCtrl.js')}
        })
        //新增、编辑部门
        .state('field.departmentEdit', {
            url: '/departmentEdit?id&companyId',
            templateUrl: 'views/organization/departmentEdit.html',
            controller: 'departmentEditCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/organization/departmentEditCtrl.js')}
        })

        //在途已售报告表
        .state('field.saleList', {
            url: '/saleList?taskNum&distributorName&connactPhone&connactName&status&planStartTime&planEndTime&page&size&total',
            templateUrl: 'views/audit/saleList.html',
            controller: 'saleListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/audit/saleListCtrl.js')}
        })
        //审计报告表
        .state('field.auditList', {
            url: '/auditList?id&venderTaskId&distributorShortName&judgeResult&firstJudgeStart&firstJudgeEnd&finalJudgeStart&finalJudgeEnd&status',
            templateUrl: 'views/audit/auditList.html',
            controller: 'auditListCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/audit/auditListCtrl.js','views/audit/checkAlert.html')}
        })
        //个人资质
        .state('field.personalData', {
            url: '/personalData?id',
            templateUrl: 'views/organization/personalData.html',
            controller: 'personalData',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/organization/personalData.js')}
        })
        //在途已售报告
        .state('field.saleReport', {
            url: '/saleReport?id',
            templateUrl: 'views/audit/saleReport.html',
            controller: 'saleReportCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/audit/saleReportCtrl.js','views/audit/lookPicture.html')}
        })
        //审计报告
        .state('field.auditReport', {
            url: '/auditReport?id&status',
            templateUrl: 'views/audit/auditReport.html',
            controller: 'auditReportCtrl',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/audit/auditReportCtrl.js','views/audit/checkAlert.html')}
        })









        //====================公用模块===================
        .state('field.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/admin/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve: {loadMyFile: _lazyLoad('js/controllers/admin/loginController.js?ver=' + versionNum)}
        }).state('field.manager', {
        url: '/manager?page&rid&name',
        templateUrl: 'views/admin/manager.html',
        controller: 'ManagerCtrl',
        resolve: {
            loadMyFile: _lazyLoad([
                'js/controllers/admin/ptteng-managerController-0.0.1.js',
                'js/directives/pwd-check/pwCheck.js?ver=' + versionNum
            ])
        }
    }).state('field.managerDetail', {
        url: '/managerDetail/:id',
        templateUrl: 'views/admin/managerDetail.html',
        controller: 'ManagerDetailCtrl',
        resolve: {loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerDetailController-0.0.1.js?ver=' + versionNum)}
    }).state('field.role', {
        url: '/role/:page',
        templateUrl: 'views/admin/role.html',
        controller: 'RoleCtrl',
        resolve: {loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleController-0.0.1.js?ver=' + versionNum)}
    }).state('field.roleDetail', {
        url: '/roleDetail/:id',
        templateUrl: 'views/admin/roleDetail.html',
        controller: 'RoleDetailCtrl',
        resolve: {loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleDetailController-0.0.1.js?ver=' + versionNum)}
    }).state('field.module', {
        url: '/module?page&size',
        templateUrl: 'views/admin/module.html',
        controller: 'ModuleCtrl',
        resolve: {loadMyFile: _lazyLoad('js/controllers/admin/ptteng-moduleController-0.0.1.js?ver=' + versionNum)}
    }).state('field.moduleDetail', {
        url: '/moduleDetail/:id',
        templateUrl: 'views/admin/moduleDetail.html',
        controller: 'ModuleDetailCtrl',
        resolve: {loadMyFile: _lazyLoad('js/controllers/admin/ptteng-moduleDetailController-0.0.1.js?ver=' + versionNum)}
    }).state('field.pwd', {
        url: '/pwd',
        templateUrl: 'views/admin/pwdSetting.html',
        controller: 'PwdCtrl',
        resolve: {loadMyFile: _lazyLoad('js/controllers/admin/ptteng-pwdController-0.0.1.js?ver=' + versionNum)}
    }).state('field.operatingRecord', {
        url: '/operatingRecord/:operateStart/:operateEnd/:managerName/:operate/:roleID',
        templateUrl: 'views/admin/operatingRecord.html',
        controller: 'operatingRecordCtrl',
        controllerAs: 'vm',
        resolve: {loadMyFile: _lazyLoad('js/controllers/admin/operatingRecordCtrl.js?ver=' + versionNum)}
    }).state('field.recordDetail', {
        url: '/recordDetail/:id',
        templateUrl: 'views/admin/recordDetail.html',
        controller: 'recordDetailCtrl',
        controllerAs: 'vm',
        resolve: {loadMyFile: _lazyLoad('js/controllers/admin/recordDetailCtrl.js?ver=' + versionNum)}
    });
}