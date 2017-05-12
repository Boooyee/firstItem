angular.module('admin').constant('taskTable', {
        data: {
            top: [
                {colspan: 3, spaceId: 1}, {name: '经销商', colspan: 5, id: 1, show: true}, {
                    name: '任务计划',
                    colspan: 7,
                    id: 2,
                    show: true
                }, {name: '数据信息', colspan: 3, id: 3, show: true},
                {name: '分配信息', colspan: 2, id: 4, show: true}, {name: '现场审计', colspan: 4, id: 5, show: true}, {
                    name: '任务结束',
                    colspan: 2,
                    id: 6,
                    show: true
                }, {colspan: 5, spaceId: 2}
            ],
            bottom: [
                {name: '任务编号', keyName: 'id', spaceId: 1, id: 1, show: true}, {
                    name: '状态',
                    spaceId: 1,
                    id: 2,
                    show: true
                }, {name: '厂家', keyName: 'venderName', spaceId: 1, id: 3, show: true}, {
                    name: '编号',
                    keyName: 'distributorId',
                    id: 4,
                    parentId: 1,
                    show: true
                }, {name: '省', keyName: 'distributorProvince', id: 5, parentId: 1, show: true}, {
                    name: '市',
                    keyName: 'distributorCity',
                    id: 6,
                    parentId: 1,
                    show: true
                }, {name: '简称', keyName: 'distributorShortName', id: 7, parentId: 1, show: true}, {
                    name: '全称',
                    keyName: 'distributorName',
                    id: 8,
                    parentId: 1,
                    show: true
                }, {name: '计划日期', keyName: 'planBeginAt', id: 9, parentId: 2, show: true}, {
                    name: '团队',
                    keyName: 'eachTeamName',
                    id: 10,
                    parentId: 2,
                    show: true
                },
                {name: '盘库率', id: 11, parentId: 2, show: true}, {
                    name: '倒查率',
                    id: 12,
                    parentId: 2,
                    show: true
                }, {name: '拍照率', id: 13, parentId: 2, show: true}, {
                    name: '创建时间',
                    keyName: 'createAt',
                    id: 14,
                    parentId: 2,
                    show: true
                }, {name: '创建者', keyName: 'createBy', id: 15, parentId: 2, show: true},
                {name: '盘库数', keyName: 'inventoryNum', id: 16, parentId: 3, show: true}, {
                    name: '倒查数',
                    keyName: 'inspectNum',
                    id: 17,
                    parentId: 3,
                    show: true
                }, {name: '拍照数', id: 18, parentId: 3, show: true},
                {name: '分配时间', keyName: 'distributeAt', parentId: 4, id: 19, show: true}, {
                    name: '分配者',
                    keyName: 'distributeBy',
                    parentId: 4,
                    id: 20,
                    show: true
                }, {name: '进场时间', keyName: 'beginAt', parentId: 5, id: 21, show: true}, {
                    name: '分配数',
                    keyName: 'distributeNum',
                    id: 22,
                    parentId: 5,
                    show: true
                }, {name: '完成时间', keyName: 'endAt', id: 23, parentId: 5, show: true}, {
                    name: '完成数',
                    keyName: 'completeNum',
                    id: 24,
                    parentId: 5,
                    show: true
                }, {name: '关闭时间', keyName: 'closeAt', id: 25, parentId: 6, show: true}, {
                    name: '关闭者',
                    keyName: 'closeBy',
                    id: 26,
                    parentId: 6,
                    show: true
                }, {name: '说明', keyName: 'comment', id: 27, show: true, spaceId: 2}, {
                    name: '其他',
                    keyName: 'otherNum',
                    id: 28,
                    show: true,
                    spaceId: 2
                },
                {name: '二网违规', keyName: 'secondBreakRuleNum', id: 29, show: true, spaceId: 2}, {
                    name: '在库违规',
                    keyName: 'storageBreakRuleNum',
                    id: 30,
                    show: true,
                    spaceId: 2
                }, {name: '故障', keyName: 'breakdownNum', id: 31, show: true, spaceId: 2}, {name: '操作',show: true,}
            ],
            bottomStatus: []
        }


    })
    //厂家任务status
    .constant('venderTaskStatus', {
            '-1': '已取消', '0': '未分配', '1': '未开始', '2': '执行中', '3': '已重开', '4': '已完成', '5': '已关闭'
    })
    //外勤任务status
    .constant('outWorkTaskStatus', {
        '-1': '已取消', '0': '未开始', '1': '执行中', '2': '已重开', '3': '已完成', '4': '已通过', '5': '已关闭'
    })
    //网点属性
    .constant('enrouteSaledReportStorageAttribute',{
        '1':'本部','2':'二网','3':'临展'
    })

    //照片审计结果
    .constant('auditResultConstant',{
        '0':'在途','1':'正常在库','2':'已售','30':'故障','31':'其他','32':'二网违规','33':'在库违规'
    })

    //在途已售报告 每个库位车辆数量
    .constant('saledReportConstant',{
        '1':"本部库位","2":"二网库位","3":"临展车位"
    })

    //在途已售报告 每个库位车辆数量
    .constant('enrouteSaledInventorysConstant',{
        '0':"在途","2":"已售"
    });

