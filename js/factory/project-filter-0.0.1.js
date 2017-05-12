'use strict';

angular.module('admin')
    //厂家任务任务 status Filter
    .filter('venderTaskStatusFilter', function (venderTaskStatus) {
        return function(status){
            return venderTaskStatus[status]
        }
    })
    //网点属性
    .filter('enrouteSaledReportStorageAttributeFilter',function(enrouteSaledReportStorageAttribute){
        return function(id){
            return enrouteSaledReportStorageAttribute[id]

        }
    })

    //外勤任务 status Filter
    .filter('outWorkTaskStatusFilter',function(outWorkTaskStatus) {
        return function(status){
            return outWorkTaskStatus[status]

        }
    })
    //照片审计结果
    .filter('auditResultFilter',function(auditResultConstant) {
        return function(status){
            return auditResultConstant[status]

        }
    })



    //省 Filter
    .filter('provinceFilter',function(areaData){
          return function(province){
              angular.forEach(areaData.province,function(data){
                if(data.ProID==province){
                    return data.ProName
                }
              })

          }
        })
        //市Filter
    .filter('cityFilter',function(areaData){
         return function(city){
             angular.forEach(areaData.cities,function(data){
                 if(data.CityID==province){
                     return data.CityName
                 }
             })

         }
     })

        //在途已售报告 每个库位车辆数量
    .filter('saledReportFilter',function(saledReportConstant){
            return function(status){
                return saledReportConstant[status]
            }
    })


    //在途已售报告 每个库位车辆数量
    .filter('enrouteSaledInventorysFilter',function(enrouteSaledInventorysConstant){
        return function(status){
            return enrouteSaledInventorysConstant[status]
        }
    })


