/**
 * Created by asus on 2017/2/27.
 */
angular.module('admin').controller('contentDetailController', ['$scope', '$state', 'httpService', 'uploadService', 'FileUploader',
    '$rootScope',
    function ($scope, $state, httpService, uploadService, FileUploader, $rootScope){
        var vm = this;
        var id=$state.params.id;
        console.log(id);


        if(!id){
            //新增     //type==1 帮助中心

            //vm.repeat是帮助中心内容，img和information
            vm.repeat=[{
                //centerType:'',
                information:'',
                img:''
            }];

            //第一个input框选择
            (function () {
                var num=0;
                vm.repeat[num].uploader2 = uploadService.uploadFile(FileUploader);
                vm.repeat[num].uploader2.onAfterAddingFile = function (fileItem) {
                    vm.show_limit2 =false;
                    if (parseFloat(fileItem.file.size / 1024 / 1024) >= 1) {
                        vm.show_limit2 =true;
                    }
                };
                //选择后清除队列
                vm.repeat[num].clearImg2 =function () {
                    vm.repeat[num].uploader2.clearQueue();
                };

                vm.repeat[num].uploader2.onSuccessItem = function (item,  response, status, headers) {
                    if (status == 200) {
                        vm.repeat[0].img=response.data.url
                    }
                };

            }());


            //vm.clickImg=function(a){
            //    console.log(a.length);
            //};

            //点击新增div元素
            vm.add = function () {
                console.log(vm.repeat);
                //每次点击新增：uploader2  、 img  、information
                vm.repeat.push( {img:'',information:''});
                console.log(vm.repeat);
                var num=vm.repeat.length-1;
                console.log('num的值是'+num)


                //内容
                vm.repeat[num].uploader2 = uploadService.uploadFile(FileUploader);
                vm.repeat[num].uploader2.onAfterAddingFile = function (fileItem) {
                    vm.show_limit2 =false;
                    if (parseFloat(fileItem.file.size / 1024 / 1024) >= 1) {
                        vm.show_limit2 =true;
                    }
                };
                //选择后清除队列
                vm.repeat[num].clearImg2 =function () {
                    vm.repeat[num].uploader2.clearQueue();
                };

                vm.repeat[num].uploader2.onSuccessItem = function (item,  response, status, headers) {
                    if (status == 200) {
                        vm.repeat[num].img=response.data.url
                    }
                };

            };

            //删除
            vm.del = function (index) {
                vm.repeat.splice(index, 1);
            };
            //点击提交
            vm.submitForm = function (status) {
                //console.log(status);
                console.log(vm.content.type);
                //提交关于我们
                if (vm.content.type == 0) {
                    if (content.$invalid) {
                        vm.show_error = true;
                        $rootScope.alert("请核对表单填写是否符合要求！")
                    } else {
                        vm.content.status = status;
                        console.log(vm.content);
                        vm.content.url =vm.url;

                        console.log(vm.content);
                        httpService.getcontentAdd(vm.content).then(function (res) {
                            console.log(res);
                            if (res.data.code == 0) {
                                if (status == 2) {
                                    $rootScope.alert("上线发布成功！");
                                } else {
                                    $rootScope.alert("保存草稿成功！");
                                }
                                $state.go('field.contentList', {}, {reload: true});
                            } else {
                                $rootScope.alert(res.data.message);
                            }
                        });
                    }
                }
                //提交帮助中心
                if (vm.content.type == 1) {
                    console.log(vm.repeat);
                    //vm.content = {};
                    vm.content.type = 1;
                    vm.content.status = status;
                    //遍历vm.repeat，修改上传参数格式
                    vm.content.content =[];
                    angular.forEach(vm.repeat, function (item, index) {
                        console.log(item);
                        console.log(index);
                        if(item.information!=''){
                            vm.content.content[index]={
                                type:'text',
                                value:item.information
                            }}
                        if(item.img!=''){
                            vm.content.content[index]={
                                type:'img',
                                value:item.img
                            }}
                        console.log(vm.content);
                    });

                    console.log(vm.content);

                    vm.content.content = angular.toJson(vm.content.content);
                    console.log(vm.content);
                    httpService.getcontentAdd(vm.content).then(function (res) {
                        console.log(res);
                        if (res.data.code == 0) {
                            if (status == 2) {
                                $rootScope.alert("上线发布成功！");
                            } else {
                                $rootScope.alert("保存草稿成功！");
                            }
                            $state.go('field.contentList', {}, {reload: true});
                        } else {
                            $rootScope.alert(res.data.message);
                        }
                    });
                }
            }
        }
        else {
            //编辑
            //根据ID获取列表
            console.log('传过来的ID是'+id);
            httpService.getcontentDetail(id).then(function (res) {
                console.log(res.data.data.article);
                vm.content=res.data.data.article;
                console.log(vm.content);
                //type==0关于我们
                if(vm.content.type==0){
                    vm.url=vm.content.url;
                }
                //type==1帮助中心
                if(vm.content.type==1){

                    vm.repeat=[];
                    //vm.content.content转换为数组
                    var objArr = JSON.parse(vm.content.content);
                    console.log(objArr);

                    //去掉数组中为null的项
                    //n为数组的长度

                    for ( var a=0;a<objArr.length;a++){
                        if(objArr[a]==null){
                            objArr.splice(a,1);
                            //a=a-1;
                        }
                    }
                    console.log(objArr);



                    //push进去img和information
                    for(var i=0;i< objArr.length;i++){
                        vm.repeat.push( {img:'',information:'',centerType:''});
                    }
                    console.log(vm.repeat);
                    console.log(objArr);


                    //遍历content数组，分别传到html
                    angular.forEach(objArr,function(data,index,array){
                        console.log(data);

                        console.log(data);
                        if(data.type=='text'){
                            vm.repeat[index].uploader2 = uploadService.uploadFile(FileUploader);
                            vm.repeat[index].centerType=2;
                            vm.repeat[index].information=data.value;
                        }
                        if(data.type=='img'){
                            vm.repeat[index].uploader2 = uploadService.uploadFile(FileUploader);
                            vm.repeat[index].centerType=1;
                            vm.repeat[index].img=data.value;
                        }
                    });



                    angular.forEach(vm.repeat,function(data,index){
                        vm.repeat[index].uploader2 = uploadService.uploadFile(FileUploader);
                        vm.repeat[index].uploader2.onAfterAddingFile = function (fileItem) {
                            vm.show_limit2 =false;
                            if (parseFloat(fileItem.file.size / 1024 / 1024) >= 1) {
                                vm.show_limit2 =true;
                            }
                        };
                        vm.repeat[index].uploader2.onSuccessItem = function (item,  response, status, headers) {
                            if (status == 200) {
                                vm.repeat[index].img=response.data.url
                            }
                        };

                    });



                    //点击新增，新增出来
                    vm.add = function () {
                        vm.repeat.push( {img:'',information:'',centerType:''});
                        console.log(vm.repeat);
                        angular.forEach(vm.repeat,function(data,index){

                            vm.repeat[index].uploader2 = uploadService.uploadFile(FileUploader);
                            vm.repeat[index].uploader2.onAfterAddingFile = function (fileItem) {
                                vm.show_limit2 =false;
                                if (parseFloat(fileItem.file.size / 1024 / 1024) >= 1) {
                                    vm.show_limit2 =true;
                                }
                            };

                            vm.repeat[index].uploader2.onSuccessItem = function (item,  response, status, headers) {
                                if (status == 200) {
                                    vm.repeat[index].img=response.data.url
                                }
                            };

                        })
                    };

                    //点击删除按钮删除
                    vm.del = function (index) {
                        vm.repeat.splice(index, 1);
                    };
                }

                    //点击提交
                    vm.submitForm = function (status) {

                        console.log(status);

                        //提交关于我们
                        if (vm.content.type == 0) {
                            if (content.$invalid) {
                                vm.show_error = true;
                                $rootScope.alert("请核对表单填写是否符合要求！")
                            } else {
                                vm.content.status = status;
                                console.log(vm.content);
                                vm.content.url =vm.url;

                                console.log(vm.content);
                                httpService.getcontentSet(id,vm.content).then(function (res) {
                                    console.log(res);
                                    if (res.data.code == 0) {
                                        if (status == 2) {
                                            $rootScope.alert("上线发布成功！");
                                        } else {
                                            $rootScope.alert("保存草稿成功！");
                                        }
                                        $state.go('field.contentList', {}, {reload: true});
                                    } else {
                                        $rootScope.alert(res.data.message);
                                    }
                                });
                            }
                        }
                        //提交帮助中心
                        if (vm.content.type == 1) {
                            console.log(vm.repeat);

                            vm.content.type = 1;
                            vm.content.status = status;
                            //遍历vm.repeat，修改上传参数格式
                            vm.content.content =[];
                            angular.forEach(vm.repeat, function (item, index) {
                                console.log(item);
                                console.log(index);
                                if(item.centerType==2){
                                    vm.content.content[index]={
                                        type:'text',
                                        value:item.information
                                    }}
                                if(item.centerType==1){
                                    vm.content.content[index]={
                                        type:'img',
                                        value:item.img
                                    }}
                            });
                            console.log(vm.content);
                            vm.content.content = angular.toJson(vm.content.content);
                            console.log(id);
                            console.log(vm.content);



                            httpService.getcontentSet(id,vm.content).then(function (res) {
                                console.log(res);

                                if (res.data.code == 0) {
                                    if (status == 2) {
                                        $rootScope.alert("上线发布成功！");
                                    } else {
                                        $rootScope.alert("保存草稿成功！");
                                    }
                                    $state.go('field.contentList', {}, {reload: true});
                                } else {
                                    $rootScope.alert(res.data.message);
                                }
                            });
                        }
                    }

            })
        }


        //第一个上传图片
        vm.uploader1 = uploadService.uploadFile(FileUploader);
        vm.uploader1.onAfterAddingFile = function (fileItem) {
            console.log(fileItem);
            console.info('onAfterAddingFile', fileItem);
            vm.show_limit1 =false;
            if (parseFloat(fileItem.file.size / 1024 / 1024) >= 1) {
                vm.show_limit1 =true;
            }
        };
        //选择后清除队列
        //vm.clearImg1 =function () {
        //    vm.uploader1.clearQueue();
        //};
        vm.uploader1.onSuccessItem = function (fileItem, response, status, headers) {
            if (status == 200) {
                console.log(response.data.url);
                vm.url = response.data.url;
            }
        };

    }]);
