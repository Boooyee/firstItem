'use strict';
angular.module('admin')
    .factory('uploadService', [
        'pathProject',
        function (pathProject) {
            return {
                uploadFile: function (FileUploader, alias) {
                    var param = {url: pathProject.upload_url};
                    if (alias) {
                        angular.extend(param, {alias: alias});
                    }
                    return new FileUploader(param);
                }
            };
        }
    ])
    .factory('httpService',function($http,pathProject){
        return{
            // ============团队==============
            // 团队列表页面
            getteamList:function(params){
                return $http.get(pathProject.teamList(),{params:params})
            },
            // 获取团队信息
            getteam:function(id){
                return  $http.get(pathProject.team(id))
            },

            // 团队编辑页面
            getteamSet:function(id,params){
                return $http.put(pathProject.teamSet(id),params)
            },

            // 团队新增页面
            getteamAdd:function(params){
                return $http.post(pathProject.teamAdd(),params)
            },

            // ====================任务==============================
            // 任务新增中获取信息
            getTaskInfoList:function(){
               return $http.get(pathProject.getTaskInfoList())
            },
            // 获取任务列表
            getTaskList:function(params){
                return $http.get(pathProject.getTaskList(),{params:params})
            },
            // 获取状态正常的厂商
            getteamRight:function(){
                return $http.get(pathProject.teamRight())
            },
            // 新增任务
            addTask:function (params){
                return $http.post(pathProject.addTask(),params)
            },
            //新建厂家任务时，厂家和团队的联动（新接口）
            taskVenderTeam: function(venderId){
              return $http.get(pathProject.taskVenderTeam(venderId))
            },

            // 厂家任务列表的取消按钮
            venderTaskCancel:function(venderTaskId){
                return $http.put(pathProject.venderTaskCancel(venderTaskId))
            },
            //厂家任务列表导出
            getListExcel:function (params,venderTask) {
                return $http.get(pathProject.listExcel(params),{params:venderTask})
            },
            // 获取任务详情(任务编辑页面获取信息)
            getTaskDetail:function(venderTaskId,params){
              return $http.get(pathProject.getTaskDetail(venderTaskId),params)
            },

            // 保存编辑
            putTaskDetail:function(venderTaskId,params){
              return $http.put(pathProject.putTaskDetail(venderTaskId),params)
            },

            // 解析excel
            readExcel:function(params){
                return $http.get(pathProject.readExcel(),{params:params})
            },

            // 获取外勤列表
            getOutWorkList:function(params){
                console.log(params);
                return $http.get(pathProject.getOutWorkList(params.venderTaskId),{params:params})
            },

            // 获取分配列表
            getAllotList:function(venderTaskId){
                return $http.get(pathProject.getAllotList(venderTaskId))
            },

            // 分配列表 - 姓名搜索
            allotSearchName:function(params){
                return $http.get(pathProject.allotSearchName(),{params:params})
            },

            // 姓名搜索后 展现队员外勤任务列表
            allotDetailList:function(params){
                return $http.get(pathProject.allotDetailList(),{params:params})
            },

            // 分配外勤任务 保存
            submitAllotDetail:function(params){
                return $http.post(pathProject.submitAllotDetail(),params)
            },

            // 外勤列表- 撤回
            alloutWithdraw:function(params){
                return $http.put(pathProject.alloutWithdraw(params.memberTaskId),params)
            },

            // 照片审核列表
            getPhotoCheck:function(venderTaskId){
                return $http.get(pathProject.getPhotoCheck(venderTaskId))
            },

            // 照片审核详情
            photoCheckDetail:function(memberTaskId){
                return $http.get(pathProject.photoCheckDetail(memberTaskId))
            },

            // 照片 获得在途已售报告详情
            getSaledReport :function(venderTaskId){
                return $http.get(pathProject.getSaledReport(venderTaskId))
            },

            // 照片 审核人库合影 接口3 重拍按钮
            checkMemberStorage : function(id,params){
                return $http.put(pathProject.checkMemberStorage(id),params)
            },

            // 照片 审核盘库合影 接口4 重拍按钮
            checkInventory: function(id,params){
             return $http.put(pathProject.checkInventory(id),params)
            },
            // 照片 审核倒查照片 接口5 重拍按钮
            checkInspectId: function(id,params){
                return $http.put(pathProject.checkInspectId(id),params)
            },
            // 照片 审核在途 照片 接口6 重拍按钮
            checkEnrouteSaledReport: function(id,params){
                return $http.put(pathProject.checkEnrouteSaledReport(id),params)
            },

            // 审核网点任务（外勤任务）接口7 网点审核按钮
            judgeTask : function(memberTaskId,params){
                return $http.put(pathProject.judgeTask(memberTaskId),params)
            },
            // 任务列表，点击完成
            putTaskListComplete:function(venderTaskId){
                return $http.put(pathProject.taskListComplete(venderTaskId))
        },
            //任务列表 更新按钮
            taskListRefresh: function(venderTaskIds){
                return $http.put(pathProject.taskListRefresh(),{venderTaskIds:venderTaskIds})
            },
            //新建厂家任务时 经销商名字搜索
            searchAgencyName:function(distributorName){
                return $http.get(pathProject.searchAgencyName(distributorName))
            },
            //导入数据 完成按钮
            taskImportCompelete:function(params){
                return $http.get(pathProject.taskImportCompelete(),{params:params})
            },


            // ====================厂家==============================

            getagencyList:function(params){
                return $http.get(pathProject.agencyList(),{params:params})
            },
            // 厂家详情
            getagencyDetail:function(id){
                return $http.get(pathProject.agencyDetail(id))
            },
            // 厂家新增
            getagencyAdd:function(params){
                return $http.post(pathProject.agencyAdd(),params)
            },
            // 厂家更新接口
            getagencyUpdate:function(id,params){
                return $http.put(pathProject.agencyUpdate(id),params)
            },
            // 更改状态接口
            getagencyStatus:function(id,params){
                return $http.put(pathProject.agencyStatus(id),params)
            },
            // 获取厂家可选账号
            getagencyAccount:function(id,params){
                return $http.get(pathProject.agencyAccount(id),{params:params})
            },
    // 经销商相关
            // 经销商列表
            getdealersList:function(params){
                return $http.get(pathProject.dealersList(),{params:params})
            },
            // 经销商新增
            getdealersAdd:function(params){
                return  $http.post(pathProject.dealersAdd(),params)
            },
            // 经销商详情
            getdealersDetail:function(id){
                return $http.get(pathProject.dealersDetail(id))
            },

            // 经销商更新接口
            getdealersUpdate:function(id,params){
                return $http.put(pathProject.dealersUpdate(id),params)
            },

            // 更改状态
            getdealersStatus:function(id,params){
                return $http.put(pathProject.dealersStatus(id),params)
            },
// 运营管理
            // 获取列表
            getcontentList:function(params){
                return $http.get(pathProject.contentList(),{params:params})
            },
            // 获取明细记录
            getcontentDetail:function(id){
                return  $http.get(pathProject.contentDetail(id))
            },
            // 新增
            getcontentAdd:function(params){
                return $http.post(pathProject.contentAdd(),params)
            },

            // 修改article
            getcontentSet:function(id,params){
                return $http.put(pathProject.contentSet(id),params)
            },

            // 删除article
            getcontentDelete:function(id){
                return $http.delete(pathProject.contentDelete(id))
            },
            // 修改artice状态（上线/下线）
            getcontentStatus:function(params){
                return $http.put(pathProject.contentStatus(),params)
            },
            //小红点
            sidebarRedMark: function(){
                return $http.get(pathProject.sidebarRedMark())
            },
            //清除小红点
            cancelRedMark: function(venderTaskId,params){
                return $http.put(pathProject.cancelRedMark(venderTaskId),params)
            }
        }
    })

    .factory('peopleService',function($http,pathProject){
        return {
            // ============队员===========
            // 队员列表
            getPeople:function (params) {
                return $http.get(pathProject.people(),{params:params})
            },
            // 获取队员信息
            getlookPeople:function (id) {
                return $http.get(pathProject.lookPeople(id))
            },
            // 编辑队员
            compilePeople:function (id,parmas) {
                return $http.put(pathProject.lookPeople(id),parmas)
            },
            // 新增队员
            postAddPeople:function (params) {
                return $http.post(pathProject.addpeople(),params)
            },
            // 更改队员状态
            deletePeoples:function (id,params) {
                return $http.put(pathProject.deletePeople(id),params)
            }
        }
    })
    .factory('storageService',function ($http,pathProject) {
        return {
            // ===============库位=================
            // 获取库位列表
            getStorageList:function (params) {
                return $http.get(pathProject.storageList(),{params:params})
            },
            // 获取库位详情
            getCompileStorage:function (id) {
                return $http.get(pathProject.compileStorage(id))
            },
            // 编辑库位
            putNewStorage:function (id,params) {
                return $http.put(pathProject.newStorage(id),params)
            },
            // 新增库位
            postAddStorage:function (params) {
                return $http.post(pathProject.addStorage(),params)
            },
            // 库位状态更改
            putChangeStorage:function (id,params) {
                return $http.put(pathProject.changeStorage(id),params)
            },
            // 是否为本部库位
            getSelfStorage:function (distributorId) {
                return $http.get(pathProject.selfStorage(distributorId))
            }
        }
    })
    .factory('leaveService',function ($http,pathProject) {
        return {
            // ===============请假==================
            // 获取请假列表
            getLeaveList:function (params) {
                return $http.get(pathProject.leaveList(),{params:params})
            },
            // 请假详情
            getLookLeave:function (id) {
                return $http.get(pathProject.lookLeave(id))
            },
            // 请假状态更改
            putChangeLeave:function (id,params) {
                return $http.put(pathProject.changeLeave(id),params)
            }
        }
    })
    .factory('lateService',function ($http,pathProject) {
        return {
            // ==============迟到======================
            getLateList:function (params) {
                return $http.get(pathProject.lateList(),{params:params})
            },
            // 查看迟到详情
            getLookLate:function (id) {
                return $http.get(pathProject.lookLate(id))
            },
            // 更改申报状态
            putChangeLate:function (id,params) {
                return $http.put(pathProject.changLate(id),params)
            }
        }
    })
    .factory('saleService',function ($http,pathProject) {
        return {
            // ================审核管理==================
            // 获取在途已售报告列表
            getSaleList:function (params) {
                return $http.get(pathProject.saleList(),{params:params})
            },
            // 生成在途已售报告
            getSaleReport:function (id) {
                return $http.get(pathProject.saleReport(id))
            },
            // 获取审计报告列表
            getAuditList:function (params) {
                return $http.get(pathProject.auditList(),{params:params})
            },
            // 生成审计报告
            getAuditReport:function (id) {
                return $http.get(pathProject.auditReport(id))
            },
            // 实际数据
            // getChangeReport:function (id) {
            //     return $http.get(pathProject.changeReport(id))
            // },
            // 保存报告
            putSaveReport : function (id, params) {
                return $http({
                    url: pathProject.changeReport(id),
                    method: "PUT",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: JSON.stringify(params),
                    transformRequest: function (data, headersGetter) {
                        return data;
                    }
                });
            },
           /*
			 * function (id) { return $http.put(pathProject.changeReport(id)) },
			 */

           //导出excel
            getDownLoadExclone:function (id,params) {
              return $http.get(pathProject.downLoadExclone(id),{params:params})
            },
            getDownLoadExcltwo:function (id,params) {
                return $http.get(pathProject.downLoadExcltwo(id),{params:params})
            },
            //导出图包
            getDownLoadPic:function (id,params) {
                return $http.get(pathProject.downLoadPic(id),{params:params})
            },
            // 初审通过
            putFirstPassReport:function (id) {
                return $http.put(pathProject.firstPassReport(id))
            },
            // 初审拒绝
            putFirstRefuseReport:function (id) {
                return $http.put(pathProject.firstRefuseReport(id))
            },
            // 终审通过
            putFinalPassReport:function (id) {
                return $http.put(pathProject.finalPassReport(id))
            },
            // 终审拒绝
            putFinalRefuseReport:function (id) {
                return $http.put(pathProject.finalRefuseReport(id))
            }
        }
    })
    //组织管理
    .factory('organizationService',function ($http,pathProject) {
        return {
            //公司列表
            getCompanyList:function (params) {
                return $http.get(pathProject.companyList(),{params:params})
            },
            //公司状态更改
            putCompanyChange:function (id,params) {
                return $http.put(pathProject.companyChange(id),params)
            },
            //编辑公司
            putCompanyEdit:function (id,params) {
                return $http.put(pathProject.companyEdit(id),params)
            },
            //公司新增
            postCompanyAdd:function (params) {
                return $http.post(pathProject.companyAdd(),params)
            },
            //部门列表
            getDepartement:function (params) {
                return $http.get(pathProject.departmentList(),{params:params})
            },
            //部门更新状态
            putDepartmentStatus:function (id,params) {
                return $http.put(pathProject.departmentStatus(id),params)
            },
            //部门详情
            getDepartmentEdit:function (id) {
                return $http.get(pathProject.departmentEdit(id))
            },
            //部门更新
            putDepartmentChange:function (id,params) {
                return $http.put(pathProject.departmentChange(id),params)
            },
            //部门新增
            postDepartmentAdd:function (params) {
                return $http.post(pathProject.departmentAdd(),params);
            },
            //员工列表
            getstaffList:function(params){
                return $http.get(pathProject.staffList(),{params:params})
            },
            //员工详情
            getStaffDetail:function(id){
                return $http.get(pathProject.staffDetail(id))
            },
            //员工新增
            poststaffAdd:function(params){
                return $http.post(pathProject.staffAdd(),params);
            },
            //员工编辑
            putstaffEdit: function (id,params) {
                return $http.put(pathProject.staffEdit(id),params)
            },
            //员工更改状态
            putstaffStatus: function (id,params) {
                return $http.put(pathProject.staffStatus(id),params)
            },





        }
    });