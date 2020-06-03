<template>
    <div class="sidebar">
        <div class="slidebarTitle"><i class="el-icon-warning" style="margin-right:10px;color:yellow;"></i>系统导航</div>
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"   unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <!-- <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item> -->
                        <template v-for="(subItem,i) in item.subs">
                            <template v-if="subItem.subs">
                                <el-submenu :index="subItem.index" >
                                    <template slot="title"><!-- <i :class="subItem.icon" style=""></i> --><span style="margin-left:20px;">{{ subItem.title }}</span></template>
                                    <el-menu-item style="padding-left:80px;" v-for="(subItem2,i) in subItem.subs" :key="i" :index="subItem2.index"  >{{ subItem2.title }}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="subItem.index" >
                                    <i :class="subItem.icon" ></i>{{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
            <el-button @click="open3()" type="primary" style="width:100%;margin-top:50px;">修改密码</el-button>
        </el-menu>

    </div>
</template>

<script>
import md5 from 'js-md5';
    export default {
        data() {
            return {
                items: [
                    
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '首页'
                    },
                    
                    {
                        icon: 'el-icon-setting',
                        index: '10',
                        title: '案管部门',
                        subs:[
                            {
                                
                                index: 'waitForInstore1jindu1',
                                title: '> 案件进度查询'
                            },
                            {   
                                index: 'waitForInStore1',
                                title: '> 等待质量评查'
                            },
                            {   
                                index: 'returnBacking1',
                                title: '> 符合归档条件案件'
                            },
                            
                            
                            {   
                                index: 'weiguidanganguan',
                                title: '> >未归档案件'
                            },
                            {   
                                index: 'returnBacked1',
                                title: '> >已归档案件'
                            },
                            // {   
                            //     index: 'instore1',
                            //     title: '> 在库案件档案梳理表'
                            // },
                            // {   
                            //     index: 'anjianchaxun1',
                            //     title: '> 整体案件档案梳理表'
                            // },
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '9',
                        title: '档案部门',
                        subs:[
                            {
                                
                                index: 'yuruku',
                                title: '> 案件预入库'
                            },
                            {
                                
                                index: 'ruku',
                                title: '> 案件入库'
                            },
                            {
                                
                                index: 'waitForInstore1jindu2',
                                title: '> 案件进度查询'
                            },
                            {
                                index: 'returnBacking',
                                title: '> 符合归档条件的案件'
                                
                                // subs:[
                                //     {   
                                //         index: 'returnBacking',
                                //         title: '> 待回执案件档案梳理'
                                //     },
                                //     {   
                                //         index: 'returnBacked',
                                //         title: '> 已回执案件档案梳理'
                                //     },
                                //     {   
                                //         index: 'instore',
                                //         title: '> 在库案件档案梳理表'
                                //     },
                                //     {   
                                //         index: 'anjianchaxun',
                                //         title: '> 整体案件档案梳理表'
                                //     },
                                // ]
                            },
                            {   
                                index: 'notFiled',
                                title: '> >未归档案件'
                            },
                            {
                                index: 'waitForInStore',
                                title: '> >档案接收审查'
                                // icon: 'el-icon-setting',
                                // index: '1',
                                // title: '应入库档案管理',
                                // subs:[
                                //     {   
                                //         index: 'waitForInStore',
                                //         title: '> 应入库案件档案'
                                //     },
                                //     {   
                                //         index: 'inStored',
                                //         title: '> 已入库案件档案'
                                //     },
                                //     {   
                                //         index: 'inStoreHistory',
                                //         title: '> 案件档案归档操作记录'
                                //     },
                                // ]
                            },
                            {
                                index: 'waitForOutStore',
                                title: '> >通过审查的档案'
                                // icon: 'el-icon-setting',
                                // index: '2',
                                // title: '待出库档案管理',
                                // subs:[
                                //     {   
                                //         index: 'waitForOutStore',
                                //         title: '> 待出库案件档案'
                                //     },
                                //     {   
                                //         index: 'outStored',
                                //         title: '> 已出库案件档案'
                                //     },
                                //     {   
                                //         index: 'outStoreHistory',
                                //         title: '> 案件档案出库操作记录'
                                //     },
                                // ]
                            },
                            {
                                index: 'returnStore',
                                title: '> >已入库上架'
                                // icon: 'el-icon-setting',
                                // index: '3',
                                // title: '待归还档案管理',
                                // subs:[
                                //     {   
                                //         index: 'returnStore',
                                //         title: '> 待归还案件档案'
                                //     },
                                //     {   
                                //         index: 'returnStored',
                                //         title: '> 已归还案件档案'
                                //     },
                                //     {   
                                //         index: 'returnHistory',
                                //         title: '> 案件档案归还历史'
                                //     },
                                // ]
                            },
                            // {
                            //     icon: 'el-icon-setting',
                            //     index: '7',
                            //     title: '档案盘点管理',
                            //     subs:[
                            //         {   
                            //             index: 'checkByMounth',
                            //             title: '> 月盘点管理'
                            //         },
                            //         {   
                            //             index: 'checkByYear',
                            //             title: '> 年盘点管理'
                            //         },
                            //         {   
                            //             index: 'waitForCheck',
                            //             title: '> 自定义盘点'
                            //         },
                            //     ]
                            // },
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '6',
                        title: '档案利用',
                        subs:[
                            {   
                                index: 'jieyuezongjie',
                                title: '> 档案借阅'
                            },
                            {   
                                index: 'nianzhongzongjie',
                                title: '> 利用分析'
                            },
                            {   
                                index: 'chukutongji',
                                title: '> 出库统计'
                            }
                            
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'addHistory',
                        title: '历史案卷'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'archivesData',
                        title: '电子案卷'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'addHistory1',
                        title: ' 档案绩效评价'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '20',
                        title: '个人相关',
                        subs:[
                            // {   
                            //     index: 'waitForInStore1',
                            //     title: '> 待质量审查案件'
                            // },
                            {   
                                index: 'Borrow1',
                                title: '> 借阅'
                            },
                            {   
                                index: 'jieyueshenpi',
                                title: '> 借阅审批'
                            },
                            {   
                                index: 'biguidang',
                                title: '> 已办结案件'
                            },
                            {   
                                index: 'gerendaipingcha',
                                title: '> > 等待质量评查'
                            },
                            {   
                                index: 'returnBacking2',
                                title: '> > 未归档案件'
                            },
                            // {   
                            //     index: 'weiguidanganguan2',
                            //     title: '> > 未归档案件'
                            // },
                            {   
                                index: 'returnBacked2',
                                title: '> > 已归档案件'
                            },
                            // {   
                            //     index: 'instore1',
                            //     title: '> 在库案件档案梳理表'
                            // },
                            // {   
                            //     index: 'anjianchaxun1',
                            //     title: '> 整体案件档案梳理表'
                            // },
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '8',
                        title: '分析评估',
                        subs:[
                            // {   
                            //     index: 'chengbanrenBymonth',
                            //     title: '> 承办人月归档梳理'
                            // },
                            // {   
                            //     index: 'chengbanrenByYear',
                            //     title: '> 承办人年归档梳理'
                            // },
                            // {   
                            //     index: 'chengbanren',
                            //     title: '> 承办人整体归档梳理'
                            // },
                            // {   
                            //     index: 'bumenBymonth',
                            //     title: '> 部门月归档梳理'
                            // },
                            // {   
                            //     index: 'bumenByYear',
                            //     title: '> 部门年归档梳理'
                            // },
                            // {   
                            //     index: 'inStoreByBumen',
                            //     title: '> 部门整体归档梳理'
                            // },
                           
                            // {   
                            //     index: 'bumenBymonthOut',
                            //     title: '> 部门月借阅梳理'
                            // },
                            // {   
                            //     index: 'bumenByYearOut',
                            //     title: '> 部门年借阅梳理'
                            // },
                            // {   
                            //     index: 'historyByBumen',
                            //     title: '> 部门整体借阅梳理'
                            // }
                            {   
                                index: 'geyewuying',
                                title: '> 各业务类型符合归档条件'
                            },
                            {   
                                index: 'geyewuyi',
                                title: '> 各业务类型已归档案件'
                            },
                            {   
                                index: 'geyewuwei',
                                title: '> 各业务类型未归档案件'
                            },
                           
                            {   
                                index: 'bananrenying',
                                title: '> 办案人符合归档条件'
                            },
                            {   
                                index: 'bananrenyi',
                                title: '> 办案人已归档案件'
                            },
                            {   
                                index: 'bananrenwei',
                                title: '> 办案人未归档案件'
                            },
                            {   
                                index: 'shixiaopingjia',
                                title: '> 时效评价'
                            }
                        ]
                    },
                    
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'videoHistory',
                    //     title: '现场还原'
                    // },
                    {
                        icon: 'el-icon-setting',
                        index: '5',
                        title: '通用设置',
                        subs:[
                            {   
                                index: 'orgAdmin',
                                title: '> 单位设置'
                            },
                            {   
                                index: 'bumenAdmin',
                                title: '> 部门设置'
                            },
                            {   
                                index: 'zhiweiAdmin',
                                title: '> 职位设置'
                            },
                            {   
                                index: 'userAdmin',
                                title: '> 人员设置'
                            },
                            {   
                                index: 'camera',
                                title: '> 摄像头设置'
                            },
                            {   
                                index: 'storeLocation',
                                title: '> 存储位置设置'
                            }
                        ]
                    }
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'history',
                    //     title: '历史案卷'
                    // },
                    
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '17',
                    //     title: '人员报到',
                    //     subs:[
                    //         {   
                    //             icon: 'el-icon-setting',
                    //             index: '18',
                    //             title: '> 本地籍',
                    //             subs:[
                    //                 {
                    //                     index: 'shejiebaodao',
                    //                     title: '> 社戒报到'
                    //                 },
                    //                 {
                    //                     index: 'shekangbaodao',
                    //                     title: '> 社康报到'
                    //                 },
                    //                 {
                    //                     index: 'shehuimianbaodao',
                    //                     title: '> 社会面报道'
                    //                 }
                    //             ]
                    //         },
                    //         {   
                    //             icon: 'el-icon-setting',
                    //             index: '19',
                    //             title: '> 外地籍',
                    //             subs:[
                    //                 {
                    //                     index: 'shejiebaodao1',
                    //                     title: '> 社戒报到'
                    //                 },
                    //                 {
                    //                     index: 'shekangbaodao1',
                    //                     title: '> 社康报到'
                    //                 },
                    //                 {
                    //                     index: 'shehuimianbaodao1',
                    //                     title: '> 社会面报道'
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // },
                    
                    

                    
                    
                    

                   
                   
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            var level = localStorage.getItem('user_type');
            var level1 = localStorage.getItem('user_type1');

            switch(level) {
                case '1,2,3,4':
                    
                   break;
                case '1,2':
                   this.items.splice(9,1)
                   this.items.splice(7,1)
                   break;
                case '5,6':
                   this.items.splice(9,1)
                   this.items.splice(7,1)
                   break;
                case '1,2,4':
                   this.items.splice(9,1)
                   break;
                case '1,3,4':
                   this.items.splice(1,1)
                   this.items.splice(4,1)
                   break;
                case '2,3,4':
                   // this.items.splice(8,1)
                   this.items.splice(2,1)
                   this.items.splice(2,1)
                   this.items.splice(2,1)
                   break;
                case '1,2,3':
                   this.items.splice(7,1)
                   break;
                case '1,4':
                   this.items.splice(9,1)
                   this.items.splice(1,1)
                   this.items.splice(4,1)
                   break;
                case '2,4':
                   this.items.splice(9,1)
                   this.items.splice(2,1)
                   this.items.splice(2,1)
                   this.items.splice(2,1)
                   break;
                case '3,4':
                   this.items.splice(1,1)
                   this.items.splice(1,1)
                   this.items.splice(1,1)
                   this.items.splice(1,1)
                   this.items.splice(2,1)
                   break;
                case '4':
                   this.items.splice(9,1)
                   this.items.splice(1,1)
                   this.items.splice(1,1)
                   this.items.splice(1,1)
                   this.items.splice(1,1)
                   this.items.splice(1,1)
                   this.items.splice(1,1)
                   break;
                case '1,3':
                    this.items.splice(7,1)
                    this.items.splice(1,1)
                    this.items.splice(4,1)
                    // this.items.splice(2,1)
                   break;
                case '2,3':
                    this.items.splice(7,1)
                    this.items.splice(2,1)
                    this.items.splice(2,1)
                    this.items.splice(2,1)
                   break;
                case '1':
                    this.items.splice(9,1)
                    this.items.splice(7,1)
                    this.items.splice(1,1)
                    this.items.splice(4,1)
                   break;
                case '5':
                    this.items.splice(9,1)
                    this.items.splice(7,1)
                    this.items.splice(1,1)
                    this.items.splice(4,1)
                   break;
                case '2':
                    this.items.splice(9,1)
                    this.items.splice(7,1)
                    this.items.splice(2,1)
                    this.items.splice(2,1)
                    this.items.splice(2,1)
                   break;
                case '6':
                    this.items.splice(9,1)
                    this.items.splice(7,1)
                    this.items.splice(2,1)
                    this.items.splice(2,1)
                    this.items.splice(2,1)
                   break;
                default:
                this.items = [];
                    
            }
            switch(level1) {
                case '5,6':
                    this.items[6].splice(1,1)
                   break;
                default:
            }
            
            
        },
        methods:{
           
            open3() {
                var self = this;
                self.$prompt('请输入新密码', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                }).then(({ value }) => {

                        
                        var passwordmd5 = md5.hex(value);
                        var params = new URLSearchParams();
                        var token = localStorage.getItem('auth');
                        params.append('password',passwordmd5);         
                        self.$axios({
                            method: 'post',
                            url: '/user/updatePass',
                            data: params,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                         }).then(function(data){
                            if(data.data.code==0){
                                self.$message({
                                  type: 'success',
                                  message: '修改成功'
                                });  
                            }else{
                              self.$response(data,self);
                            }
                         });      
                  
                }).catch(() => {
                  self.$message({
                    type: 'info',
                    message: '取消输入'
                  });       
                });
             }

        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 80px;
        bottom:0;
        background: #fff;
       /* overflow-y: scroll;*/
    }
    .slidebarTitle{
        text-align: center;
        color: #fff;
        height: 30px;
        line-height: 30px;
        font-family:'KaiTi';
        font-size: 18px;
        color: #fff;
        background-color: #489ccb;
    }
    .sidebar > ul {
        height:100%;
           overflow-y: scroll;
    }

    .sidebar > ul::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .sidebar > ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .sidebar > ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    .el-menu-item{
        background: -webkit-linear-gradient(#b3f2ff, #96e9f9); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#b3f2ff, #96e9f9); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#b3f2ff, #96e9f9); /* Firefox 3.6 - 15 */
        background: linear-gradient(#b3f2ff, #96e9f9); /* 标准的语法（必须放在最后） */
        border-bottom:1px solid #b9cad3;
        height: 40px;
        line-height: 40px;
    }
    .el-submenu__title{
        background: -webkit-linear-gradient(#b3f2ff, #96e9f9); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#b3f2ff, #96e9f9); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#b3f2ff, #96e9f9); /* Firefox 3.6 - 15 */
        background: linear-gradient(#b3f2ff, #96e9f9); /* 标准的语法（必须放在最后） */
        height: 40px;
        line-height: 40px;
    }
    .el-menu-item.is-active{
        color: #fff!important;
        background: #3fafe1!important;
    }
    .el-submenu .el-menu-item{
        background: #fff;
        border-bottom:none;
    }
    .el-menu-vertical-demo el-menu{
        background-color: #ccc;
    }

</style>

