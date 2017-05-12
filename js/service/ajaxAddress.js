/**
 * Created by gaogao on 16/7/22.
 */
angular.module('admin').factory('pathProject', [
    'commonUtil', '$http',
    function (commonUtil, $http) {
        return {
            //上传接口
            upload_url: '/a/u/file/1',




//团队
            //团队列表页面
            teamList:function(){
                return '/a/u/team/list'
            },
            //获取团队详情
            team:function (id){
                return '/a/u/team/'+id
            },
            //编辑团队
            teamSet:function(id){
                return '/a/u/team/'+id
            },
            //新增团队
            teamAdd:function(){
                return '/a/u/team'
            },
            //获取状态正常的厂商
            teamRight:function(){
                return '/a/u/venders/status'
            },



//任务
            //任务新增中获取信息
            getTaskInfoList:function(){
               return "/a/u/venderTask/init"
            },
            //新增任务
            addTask:function(){
              return "/a/u/venderTask"
            },

            //新建厂家任务时，厂家和团队的联动（新接口）
            taskVenderTeam : function(venderId){
              return "/a/u/vender/"+venderId+'/team'
            },

            //厂家任务列表的取消按钮
            venderTaskCancel:function(venderTaskId){
              return "/a/u/"+venderTaskId+'/venderTask/cancel'
            },

            //获取任务列表
            getTaskList:function(){
                return "/a/u/venderTask/search"
            },
            //根据url解析excel
            readExcel:function(){
                return "/a/u/venderTask/excel"
            },
            //厂家任务列表导出
            listExcel:function (params) {
                return "/a/u/vender/task/list/excel?ids="+params
            },
            //获取任务详情(任务编辑页面获取信息)
            getTaskDetail:function(venderTaskId){
                return "/a/u/"+venderTaskId+'/venderTask/edit/init'
            },
            putTaskDetail:function(venderTaskId){
                return "/a/u/"+venderTaskId+'/venderTask/edit'
            },
            //外勤列表
            getOutWorkList: function(venderTaskId){
                return "/a/u/"+venderTaskId+'/memberTask/search'
            },

            //获取分配列表
            getAllotList:function(venderTaskId){
                return "/a/u/"+venderTaskId+"/venderTask/distribute"
            },

            //分配列表 - 姓名搜索
            allotSearchName:function(){
                return "/a/u/memberTask/searchName"
            },

            //姓名搜索后 展现队员外勤任务列表
            allotDetailList: function(){
                return "/a/u/memberTask/searchMemberTask"
            },

            //分配外勤任务  保存
            submitAllotDetail: function(){
                return "/a/u/memberTask/distribute/save"
            },

            //外勤列表- 撤回
            alloutWithdraw: function(memberTaskId){
                return "/a/u/memberTask/"+memberTaskId+'/withdraw'
            },

            //照片审核列表
            getPhotoCheck: function(venderTaskId){
                return "/a/u/vendertask/"+venderTaskId+'/auditresult/list'
            },

            //照片审核详情
            photoCheckDetail:function(memberTaskId){
                return "/a/u/vendertask/auditresult/"+memberTaskId
            },

            //照片 获得在途已售报告详情
            getSaledReport :function(venderTaskId){
              return "/a/u/enroute/saled/report/"+venderTaskId+'/photo'
            },
            //照片 审核人库合影  接口3
            checkMemberStorage : function(id){
                return "/a/u/memberStorage/"+id+'/status'
            },
            //照片 审核人库合影  接口4
            checkInventory: function(id){
                return "/a/u/inventory/"+id+"/status"
            },

            //照片 审核倒查照片  接口5
            checkInspectId: function(id){
                return "/a/u/inspect/"+id+"/status"
            },

            //照片 审在途已售报告照片  接口6
            checkEnrouteSaledReport: function(id){
                return "/a/u/enroute/saled/report/"+id+'/status'
            },

            //审核网点任务（外勤任务）接口7
            judgeTask : function(memberTaskId){
                return "/a/u/memberTask/"+memberTaskId+'/judge'
            },
            //任务列表，点击完成
            taskListComplete:function (venderTaskId) {
                return "/a/u/vendertask/"+venderTaskId+"/completion"
            },
            //任务列表,更新按钮
            taskListRefresh: function(){
                return '/a/u/venderTask/search/refresh'
            },

            //新建厂家任务时 经销商名字搜索
            searchAgencyName:function(distributorName){
                return '/a/u/venderTask/searchName?distributorName='+distributorName
            },

            //导入数据 完成按钮
            taskImportCompelete:function(){
              return "/a/u/venderTask/csv"
            },




//队员
            //队员列表
            people:function () {
                return '/a/u/member/list'
            },
            //获取编辑队员信息
            lookPeople:function (id) {
                return '/a/u/member/'+id
            },
            //队员新增
            addpeople:function () {
                return '/a/u/member'
            },
            //更改队员状态
            deletePeople:function (id) {
                return '/a/u/member/'+id
            },
//厂家
            //厂家列表接口
            agencyList:function(){
                return '/a/u/vender/list/search'
            },
            //厂家详情
            agencyDetail:function(id){
                return '/a/u/vender/'+id

            },
            //厂家新增接口
            agencyAdd:function(){
                return '/a/u/vender'
            },
            //厂家更新接口
            agencyUpdate:function(id){
                return '/a/u/vender/'+id
            },
            //更改状态接口
            agencyStatus:function(id){
              return '/a/u/vender/status/'+id
            },
            //获取厂家可选账号
            agencyAccount:function(id){
                return '/a/u/vender/account/'+id
            },
//经销商相关
            //经销商列表
            dealersList:function(){
                return '/a/u/distributor/list/search'
            },
            //经销商新增
            dealersAdd:function(){
                return '/a/u/distributor'
            },
            //经销商更新
            dealersUpdate:function(id){
                return '/a/u/distributor/'+id
            },
            //经销商详情
            dealersDetail:function(id){
                return ' /a/u/distributor/'+id
            },
            //更改状态接口
            dealersStatus:function(id){
                return '/a/u/distributor/status/'+id
            },
//article管理
            //获取列表
            contentList:function(){
                return '/a/article/search'
            },
            //获取article明细记录
            contentDetail:function(id){
               return '/a/article/'+id
            },
            //新增article
            contentAdd:function(){
                return ' /a/u/article'
            },
            //修改article
            contentSet:function(id){
                return '/a/u/article/'+id
            },
            //删除article
            contentDelete:function(id){
                return '/a/u/article/'+id
            },
            //修改article状态
            contentStatus:function(){
                return '/a/u/article/status/'
            },












//队员
            //队员列表
            people:function () {
                return '/a/u/member/list'
            },
            //获取编辑队员信息
            lookPeople:function (id) {
                return '/a/u/member/'+id
            },
            //队员新增
            addpeople:function () {
                return '/a/u/member'
            },
            //删除队员
            deletePeople:function (id) {
                return '/a/u/member/'+id
            },
            //返回当前页面
            backpage:function (id) {
              return  '/a/u/member/list'+id
            },
//库位
            //获取库位列表
            storageList:function () {
                return '/a/u/storage/list/search'
            },
            //获取库位信息
            compileStorage:function (id) {
                return '/a/u/storage/'+id
            },
            //编辑库位
            newStorage:function (id) {
                return '/a/u/storage/'+id
            },
            //新增库位
            addStorage:function () {
                return '/a/u/storage'
            },
            //更新库位状态
            changeStorage:function (id) {
                return "/a/u/storage/status/"+id
            },
            //是否为本部库位
            selfStorage:function (distributorId) {
                return '/a/u/storage/self/'+distributorId
            },
//请假
            //请假申报列表
            leaveList:function () {
                return "/a/u/leave/list"
            },
            //请假详情
            lookLeave:function (id) {
                return '/a/u/leave/'+id
            },
            //请假申报状态更新
            changeLeave:function (id) {
                return "/a/u/leave/"+id
            },
//迟到申请
            //迟到申报列表
            lateList:function () {
                return "/a/u/late/list"
            },
            lookLate:function (id) {
                return '/a/u/late/'+id
            },
            changLate:function (id) {
                return '/a/u/late/'+id
            },
//审核管理
            //获取和搜索 在途已售报告列表
            saleList:function () {
                return '/a/u/enroute/saled/report/list/search'
            },
            //生成在途已售报告
            saleReport:function (id) {
                return '/a/u/enroute/saled/report/'+id
            },
            //获取和搜索 审计报告列表
            auditList:function () {
                return '/a/u/report/list'
            },
            //生成审计报告表
            auditReport:function (id) {
                return '/a/u/report/'+id+'/detail'
            },
            //保存修正数据
            changeReport:function (id) {
//                return '/a/u/audit/real/'+id
                return '/a/u/report/' + id + '/save/correction'
            },
            //导出excl1
            downLoadExclone:function (id) {
                return '/a/u/report/'+id+'/excel/one'
            },
            //导出excel2
            downLoadExcltwo:function (id) {
                return '/a/u/report/'+id+'/excel/two'
            },
            //导出图包
            downLoadPic:function (id) {
                return '/a/u/report/'+id+'/pic'
            },
            //初审通过
            firstPassReport:function (id) {
                return '/a/u/report/'+id+'/first/approve'
            },
            //初审拒绝
            firstRefuseReport:function (id) {
                return '/a/u/report/'+id+'/first/reject'
            },
            //终审通过
            finalPassReport:function (id) {
                return '/a/u/report/'+id+'/final/approve'
            },
            //终审拒绝
            finalRefuseReport:function (id) {
                return '/a/u/report/'+id+'/final/reject'
            },
//组织管理
            //公司列表
            companyList:function () {
                return '/a/u/company/list/search'
            },
            //公司更改状态接口
            companyChange:function (id) {
                return '/a/u/company/status/'+id
            },
            //公司编辑
            companyEdit:function (id) {
                return '/a/u/company/'+id
            },
            //公司新增
            companyAdd:function () {
                return "/a/u/company"
            },
            //部门列表
            departmentList:function () {
                return "/a/u/department/list/search"
            },
            //部门状态更新
            departmentStatus:function (id) {
                return "/a/u/department/status/"+id
            },
            //部门详情
            departmentEdit:function (id) {
                return "/a/u/department/"+id
            },
            //部门更新
            departmentChange:function (id) {
                return "/a/u/department/"+id
            },
            //部门新增
            departmentAdd:function () {
                return "/a/u/department"
            },

            //员工列表
            staffList:function(){
                return '/a/u/employee/list/search'
            },
            //员工详情
            staffDetail:function(id){
                return '/a/u/employee/'+id
            },
            //员工新增
            staffAdd:function(){
                return '/a/u/employee'
            },
            //员工编辑
            staffEdit:function(id){
                return '/a/u/employee/'+id
            },
            //员工更改状态
            staffStatus:function(id){
                return '/a/u/employee/status/'+id
            },
//侧边栏小红点
            sidebarRedMark: function(){
                return "/a/u/red/mark/count"
            },
            //每个厂家任务外勤或照片的小红点清零
            cancelRedMark: function(venderTaskId){
                return "/a/u/venderTask/"+venderTaskId+"/red"
            }
        };
    }
]);