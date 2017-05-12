/**
 * Created by asus on 2017/2/26.
 */
angular.module('admin').controller('teamDetailController',function(httpService,$rootScope,$state,$stateParams){
    var vm = this;
    var id=$stateParams.id;
    if(!id){
        (function(){

            httpService.getteamRight().then(function(res){
                console.log(res.data);
                vm.general=res.data.type;
                console.log('type状态是'+vm.general);
                vm.list=res.data.data;

                //点击提交
                vm.submitForm=function(){
                    //console.log(res.data.message);
                    if(vm.general===1){
                        vm.params={
                            belongToId:-10000
                        };
                    }

                    vm.params.type=res.data.type;
                    console.log(vm.params);
                    $rootScope.confirm2("确定后添加到团队列表。", "是否执行新增操作？", function () {
                    httpService.getteamAdd(vm.params).then(function(res){
                        console.log(res.data.message);

                        if(res.data.code==0){
                            $state.go('field.teamList',{}, {reload: true});
                        }else{
                            $rootScope.alert(res.data.message)
                        }
                    })
                })
                };

            });



        })()

    }
    else{
        if(id){
            vm.exist = true;
            //根据id获取信息
            httpService.getteam(id).then(function(res){
                console.log(res.data.data);
                vm.params=res.data.data;
            });
            //点击提交
            vm.submitForm=function(){
                delete vm.params.isForbidden;
                console.log(vm.params);
                httpService.getteamSet(id,vm.params).then(function(res){

                    if(res.data.code==0){
                        $rootScope.alert("编辑成功");
                        $state.go('field.teamList');

                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }

                });
            };




        }
    }



});