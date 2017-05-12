/**
 * Created by LL on 2016/12/14 0014.
 */
angular.module("admin")
    .filter('levelFilter',function () {
        var pass = ["申请中","通过","拒绝"];
        return function (verifyStatus) {
            return pass[verifyStatus];
        }
    })
    .filter("typeFilter",function () {
        var type = ['禁用','正常'];
        return function (status) {
            return type[status];
        }
    })
    .filter("lateFilter",function () {
        var late = ['迟到','申请中','通过','拒绝'];
        return function (verifyStatus) {
            return late[verifyStatus];
        }
    })
    .filter("storageFilter",function () {
        var late = ['本部库位','二网库位','临展库位','仓库'];
        return function (verifyStatus) {
            return late[verifyStatus - 1];
        }
    })
    .filter("peopleFilter",function () {
        return function (params) {
            if(params === true){
                return '禁用'
            }if(params === false){
                return '正常'
            }
        }
    })
    .filter("provinceFilter",function (areaData) {
        return function (type) {
            for (var i = 0; i < areaData.provinces.length; i++) {
                if (type == areaData.provinces[i].ProID) {
                    return areaData.provinces[i].ProName;
                }
            }
        }
    })
    .filter("cityFilter",function (areaData) {
        return function (type) {
            for (var i = 0; i < areaData.cities.length; i++) {
                if (type == areaData.cities[i].CityID) {
                    return areaData.cities[i].CityName;
                }
            }
        }
    })
    .filter("daysFilter",function () {
        return function (params) {
            if(params == -1){
                return '上午请假'
            }if(params == -2){
                return '下午请假'
            }else{
                return params
            }
        }
    })
    .filter("saleFilter",function () {
        var late = ['未做','报告已上传','需重做'];
        return function (status) {
            return late[status];
        }
    })
    .filter("saleReportFilter",function () {
        var sale = [
            {type:0, status:'在途'},
            {type:1, status:'正常在库'},
            {type:2, status:'已售'},
            {type:30, status:'故障'},
            {type:31,status:'其他'},
            {type:32,status:'二网违规'},
            {type:33,status:"在库违规"}
        ];
        return function (auditResult) {
            for (var i = 0; i < sale.length; i++) {
                if (auditResult == sale[i].type) {
                    return sale[i].status;
                }
            }
        }
    })
    .filter("auditFilter",function () {
        var late = ['未审核','初审通过','终审通过','初审拒绝','终审拒绝'];
        return function (judgeResult) {
            return late[judgeResult];
        }
    })
    .filter("unknownFilter",function () {
        var late = ['无','有'];
        return function (unknown) {
            return late[unknown];
        }
    })
    .filter('rightFilter',function () {
        return function (right) {
            value = right;
            switch(right){
                case 1:
                    return   right = "√";
                    break;
                case 0:
                    return   right = "√";
                    break;
                case 2:
                    return   right = "√";
                    break;
            }
        }
    })
    .filter('removeStorageAtFilter',function () {
        return function (removeStorageAt) {
            if(removeStorageAt == 0 ){
                return '暂无'
            }else{
                return removeStorageAt;
            }
        }
    })
    .filter('companyFilter',function () {
        var status = ['禁用','正常']
        return function (params) {
            return status[params]
        }
    })
    .filter('positionFilter',function(){
        var item={
            E:'东', S:'南', W:'西', N:'北', C:'正中', SE:'東南', NW:'西北', SW:'西南', NE:'东北'
        };
        return function (params){
            for(var a in item){
                if(a==params){
                    return '位于：'+ item[params];
                }
                if(params==''){
                    return '获取失败'
                }
            }
        }
    })

    //距离转换
    .filter('distanceFilter',function(){
        return function (params){
            if(params==''){
                return ''
            }
            else{
                return params+'米'
            }
        }
    })
    //保留一位小数
    .filter('decimalOne',function(){
        return function (params){
            return Number(params).toFixed(1);
        }
    })
    .filter('educationFilter',function(){
        var temp=['小学','初中','高中','专科','大学','研究生','博士']
        return function (params){
            return temp[params]
        }
    })

    //倒查审计
    .filter('inspectFilter',function(){
        var temp=['未还已售','已还已售']
        return function (params){
            return temp[params]
        }
    })

