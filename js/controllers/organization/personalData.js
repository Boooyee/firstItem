/**
 * Created by Administrator on 2017/2/28 0028.
 */
angular.module("admin")
    .controller("personalData",function($scope,FileUploader,organizationService,$state,uploadService,$rootScope){
        var vm = this;
        var arr = [{name:'身份证',uploaderId:1,type:'cardImg'},{name:'照片',uploaderId:2,type:'photo'},{name:'毕业证',uploaderId:3,type:'diploma'},{name:'技能证书',uploaderId:4,type:'skillCertificate'},{name:'签订协议',uploaderId:5,type:'signAgreement'},{name:'其他证书',uploaderId:6,type:'otherCertificate'}];
        vm.uploaderList=[];
        vm.ga = function(){
            console.log(vm.uploaderList)
        }
        vm.params={};



        //图片放大
        vm.imgScale = function(url){
            $rootScope.scaleImg(url)
        }

        //初始化
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return true;
        };

        //生成正确的queque 初始化
        angular.forEach(arr,function(data,index){
            vm.uploaderList.push({name:data.name,type:data.type,uploaderId:data.uploaderId,upload:[{uploader:''}]});
            vm.uploaderList[index].upload[0].uploader=uploadService.uploadFile(FileUploader);
            vm.uploaderList[index].upload[0].uploader.onSuccessItem = function (fileItem, response, status, headers,gaogao) {
                if (status == 200) {
                    //这里面是上传完成的回调
                    console.log(fileItem)
                    if(fileItem.myType in vm.params){
                        vm.params[fileItem.myType].push({name:fileItem.myType,url:response.data.url,time:fileItem.file.lastModifiedDate})
                    }else{
                        vm.params[fileItem.myType]=[]
                        vm.params[fileItem.myType].push({name:fileItem.myType,url:response.data.url,time:fileItem.file.lastModifiedDate})
                    }
               console.log(vm.params)
                }

            };
        });

        //再次点击按钮后 清除掉
        vm.clearUpload = function (item2) {
            item2.clearQueue();
        };

        //增加或减少
        vm.addOrReduce = function(data,method,index){
            if(method=='add'){
                console.log(data)
                data.push({uploader:''})
                console.log(data[data.length-1]);
                data[data.length-1].uploader = uploadService.uploadFile(FileUploader);
                data[data.length-1].uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    if (status == 200) {
                        //这里面是上传完成的回调
                        if(fileItem.myType in vm.params){
                            vm.params[fileItem.myType].push({name:fileItem.myType,url:response.data.url,time:fileItem.file.lastModifiedDate})
                        }else{
                            vm.params[fileItem.myType]=[]
                            vm.params[fileItem.myType].push({name:fileItem.myType,url:response.data.url,time:fileItem.file.lastModifiedDate})
                        }

                    }
                };
            }else{
                console.log(index);
                data.splice(index,1);
            }

        };

        //删除照片
        vm.clearTheImg = function(type,time){
            angular.forEach(vm.params[type],function(data,index){
                console.log(data)
                console.log(time)

                if(data.time==data.time){
                        console.log(vm.params);
                    vm.params[type].splice(index,1)
                    console.log(vm.params)
                    }
            })

        }

        //取消
        vm.cancel = function(){
                history.go(-1)
        }

        //提交
        vm.submit = function(){
            var params = {};
            var id = $state.params.id;
            angular.forEach(vm.params,function(data1,index){
                angular.forEach(data1,function(data2){
                    console.log(data2.url)
                    !params[data2.name]?params[data2.name]=data2.url+',':params[data2.name]+=data2.url+','
                });
                params[index].substring(0,params.length-1)
            })
            console.log(params);

            organizationService.putstaffEdit(id,params).then(function(res){
                    if(res.data.code==0){
                        $state.go('field.staffList',{reload:true})
                    }else{
                        $rootScope.alert(res.data.message)
                    }
            })



        }




    });
