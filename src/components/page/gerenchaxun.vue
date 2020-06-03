<template>
    <div>
        
        <div >
            <div class="titleBg">办案人归档率每日排名</div>
            <div class="block" v-if="false">
                
                <el-input style="width:250px;" v-model="case_number" placeholder="案卷号查询"></el-input>
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="case_name"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  placeholder="请输入案件名"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                <!-- <el-date-picker
                  style="margin-left: 20px;width:420px;"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker> -->
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
                
            </div>

          
        </div>
        <el-dialog title="历史案件导入" :visible.sync="addHisDialog">
            <el-upload
              style="text-align:center;"
              class="upload-demo"
              drag
              :on-success="uploadSuccess"
              :action="uploadUrl"
              :headers="myHeaders"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
        <el-dialog title="案卷详情" :visible.sync="case_detail_dialog">
            <el-table
              :data="exhibits"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              class="tableClass"
              >
              <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="案卷编号"
                align="center"
                prop="exhibit_id">
                <!-- <template slot-scope="props">
                  <span>签到考勤</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="案卷状态"
                align="center"
                >
                <template slot-scope="props">
                  <span v-bind:class="[props.row.stock_status=='in'?'':'colorRed']">{{props.row.stock_status=='in'?'已入库':'待入库'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="存放位置"
                align="center"
                prop="cell_name"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                width="200px"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="printAgain(props.row)">补打条码</el-button>
                </template>
              </el-table-column>
            </el-table> 
            <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="pageChange2"
                :current-page.sync="pageNum2"
                :page-size="pageSize2"
                layout="prev, pager, next, jumper"
                :total="total2">
          </el-pagination>
        </el-dialog>
        <div id="container" style="width: 100%;height: 110%;  float: right;" v-if="cityShow">
          
          <div class="tableList" >
                <el-table
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000','height':'100px'}"
                  :row-style="{'height':'100px'}"
                  class="tableClass"
                  height="750">
                  <el-table-column
                    type="index"
                    align="center"
                    width="50"
                    height="10%">
                  </el-table-column>
                  <el-table-column
                    label="单位名称"
                    align="center"
                    height="10%"
                    prop="org_name">
                    <!-- <template slot-scope="props">
                      <span>签到考勤</span>
                    </template> -->
                  </el-table-column>
                  <el-table-column
                    label="应交卷数量"
                    align="center"
                    prop="in_count"
                    >
                  </el-table-column>
                  
                  <el-table-column
                    label="实交卷数量"
                    align="center"
                    prop="none_count"
                    >
                  </el-table-column>
                  <el-table-column
                    label="超期交卷数量"
                    align="center"
                    prop="persent"
                    >
                  </el-table-column>
                  <el-table-column
                    label="交卷率"
                    align="center"
                    prop="persent"
                    >
                  </el-table-column>
                  <!-- <el-table-column
                    label="归档率"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{num1}}</span>
                    </template>
                  </el-table-column> -->
                  
                </el-table>
              
         
           
                
          </div>
          <!-- <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="pageChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
          </el-pagination> -->
        </div>
        <div id="container" style="width: 100%;height: 110%;  float: right;" v-if="orgShow">
          
          <div class="tableList" >
                <el-table
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000','height':'100px'}"
                  :row-style="{'height':'100px'}"
                  class="tableClass"
                  height="750"
                  >
                  <el-table-column
                    type="index"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    label="办案人姓名"
                    align="center"
                    prop="case_bh">
                    <!-- <template slot-scope="props">
                      <span>签到考勤</span>
                    </template> -->
                  </el-table-column>
                  <el-table-column
                    label="部门"
                    align="center"
                    prop="case_bh">
                    <!-- <template slot-scope="props">
                      <span>签到考勤</span>
                    </template> -->
                  </el-table-column>
                  <el-table-column
                    label="应交卷数量"
                    align="center"
                    prop="in_count"
                    >
                  </el-table-column>
                  
                  <el-table-column
                    label="实交卷数量"
                    align="center"
                    prop="none_count"
                    >
                  </el-table-column>
                  <el-table-column
                    label="超期交卷数量"
                    align="center"
                    prop="persent"
                    >
                  </el-table-column>
                  <el-table-column
                    label="交卷率"
                    align="center"
                    prop="persent"
                    >
                  </el-table-column>
                  
                </el-table>
              
         
           
                
          </div>
          <!-- <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="pageChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
          </el-pagination> -->
        </div>
        

    </div>
</template>

<script>
  import  TMap from '../../TMap';
  import md5 from 'js-md5';
  export default {
      data: function(){
          return {
              num1:0,
              num2:0,
              num3:0,
              num4:0,
              num5:0,
              num6:0,
              num7:0,
              num8:0,
              activeName:'tabName1',
              case_detail_dialog:false,
              case_number:'',
              options4: [],
              case_name: [],
              list: [],
              loading: false,
              states: [],
              caseList: [
                
              ],
              exhibits:[],
              total:0,
              pageNum:1,
              pageSize:10,
              total2:0,
              pageNum2:1,
              pageSize2:10,
              addHisDialog:false,
              uploadUrl:'',
              myHeaders:'',
              url:'',
              orgShow:false,
              cityShow:false,
            }
              
      },
      mounted() {
          
          var url = location.href;
          this.url = url;
          console.log(url);
          this.getDataList();
          
      },
      methods: {
          tabClick(res){
            console.log(res)
            this.activeName = res.name;
            this.getDataList();
          },
          uploadSuccess(){
            this.$message({
              type: 'success',
              message: '上传成功'
            });
            this.addHisDialog = false;
            this.getDataList();
          },
          addHistoryClick(){
            this.addHisDialog = true;
          },
          // getConfigResult(e){
          //   console.log(e)
          //   // if(e.data==101){
          //   //   router.push('/readme')
          //   // }else if(e.data==102){
          //   //   router.push('/jiedurenliebiao')
          //   // }else if(e.data==103){
          //   //   router.push('/jiedurendangan')
          //   // }else{
          //   //   router.push('/jingyuanliebiao')
          //   // }
          // },
          //案卷详情点击事件
          caseDetailClick(res){
            // this.$socketApi.sendSock('text',this.getConfigResult);
            this.exhibits = res.exhibits;
            this.case_detail_dialog = true;
          },
          //查询事件
          searchClick(){
            this.getDataList();
          },
          //补打条码
          printAgain(res){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                
                params.append('exhibit_id',res.exhibit_id);
                
                const loading = self.$loading({
                  lock: true,
                  text: '打印中',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.6)'
                });
                self.$axios({
                    method: 'post',
                    url: '/exhibit/exhibit/printAgain',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      loading.close();
                      self.$message({
                        type: 'success',
                        message: '已发送打印请求'
                      });
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //条码打印事件
          printClick(res){
            var self = this;
            var numCount = res.exhibits.length+1;
            this.$confirm('即将打印该案件的第'+numCount+'份案卷条码, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

                const loading = self.$loading({
                  lock: true,
                  text: '打印中',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.6)'
                });
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('case_id',res.case_id);
                params.append('exhibit_name',res.case_name);
                

                self.$axios({
                    method: 'post',
                    url: '/exhibit/exhibit/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      loading.close();
                      self.$message({
                        type: 'success',
                        message: '已发送打印请求'
                      });
                      self.getDataList();
                    }else{

                      self.$response(data,self);
                      loading.close();
                    }
                 });
              
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消打印'
              });          
            });
          },
          //分页器点击事件
          pageChange(){
            this.getDataList();
          },
          //分页器点击事件
          pageChange2(){

          },
          //关键字模糊查询提示
          remoteMethod(query) {
            if (query !== '') {
              this.loading = true;
              this.getNameList(query);
              setTimeout(() => {
                this.loading = false;
                this.options4 = this.list.filter(item => {
                  return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
              }, 2000);
            } else {
              this.options4 = [];
            }
          },
          
          
          //关键字模糊查询提示
          getNameList(query){
                const self = this;
                self.case_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('ad_user_true_name',self.case_name);
                self.$axios({
                    method: 'post',
                    url: '/cases/cases/getCasesName',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.states = data.data.data;
                        self.list = self.states.map(item => {
                          return { value: item.case_name, label: item.case_name};
                        });
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          getNumBage(){
                const self = this;
               
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('tongyi_status','1');
                params.append('stock_status','unnone');

                self.$axios({
                    method: 'post',
                    url: '/cases/cases/getCountForType',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      
                       self.num1 = data.data.data._30;
                       self.num2 = data.data.data._31;
                       self.num3 = data.data.data._32;
                       self.num4 = data.data.data._33;
                       self.num5 = data.data.data._34;
                       self.num6 = data.data.data._35;
                       self.num7 = data.data.data._44;
                       self.num8 = data.data.data._45;
                       // console.log(self.num1)
                       // console.log(self.$children)
                       self.$children[5].$children[0].$forceUpdate();
                       // self.$forceUpdate()
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //获取默认列表数据
          getDataList(){
                const self = this;
                // self.getNumBage();
                var params = {};
                var token = localStorage.getItem('auth');
                var urlNum = self.url.indexOf('city');
                
                
                console.log(urlNum)
                var requestUrl = '';
                if(urlNum>0){
                    var cityId = self.url.split('city=')[1];
                    self.orgShow = false;
                    self.cityShow = true;
                    requestUrl = 'chart/city/getStockPersentByCity';
                    
                   
                    params = {
                        city_id:cityId,
                        nd:'2019'
                    }
                    
                }else{
                    var areaId = self.url.split('area=')[1];
                    self.cityShow = false;
                    self.orgShow = true;
                    requestUrl = 'chart/area/getStockCountByArea';
                    
                    params = {
                        area_id:areaId,
                        nd:'2019'
                    }
                }
                
                
                  
                


                self.$axios({
                    method: 'get',
                    url: requestUrl,
                    params: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 }).then(function(data){
                    console.log(data)
                    if(data.data.code==0){
                        self.caseList = data.data.data;
                        self.total = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          
         //修改单元行颜色
          rowStyle({ row, rowIndex}){
            // console.log('看这里',row)
            return 'color:green!important;'
            // if(rowIndex%2 ==0){
            //   return 'background:#eee;color:#000;height:200px;!important'
            // }else{
            //  return 'background:#e5e7e8;color:#000;height:200px;!important'
            // }
          },      
         
          
          
         
      }
     
  }
    // window.onload = window.onresize = function () {
    //   var devicewidth = document.documentElement.clientWidth;
    //   var scale =  1920/devicewidth;  // 分母——设计稿的尺寸
    //   document.body.style.zoom = 1;
    // };
</script>

<style scoped>
    
    .tree{
      float: left;
      width: 20%;
      height: 600px;
      
    }
    .titleBg{
      width: 55%;
      margin:0 auto;
    }
    .el-tree{
      background: rgba(255,215,0,0.3);
      color: #fff;
    }

    .tableClass{
      width: 100%;
      height: 750px;
      /* overflow-y: scroll; */
      border-top: 1px solid #fff;
      background-color: #fff!important;
    }
    .tableList{
      width: 55%;
      height: 750px!important;
      /* overflow-y: scroll; */
      border:1px solid #231a75;
     /* border-radius: 20px;*/
      
      margin:0 auto;
      margin-top: 20px;
      background-color: #231a75;
      background-size: 180% 6%;
    }
    .tableList::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .tableList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .tableList::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    
    .tableTitle{
      width: 200px;
      height: 60px;
      float: left;
      margin-left: 30px;
    }
    .numData{
      width: 99%;
      height: 60px;
      line-height: 60px;
      color: #fefefe;
      background-color: #231a75;
      background-image: url(../../../static/img/tableBanner.png);
    }

    /*#container {
        min-width:750px;
        min-height:607px;
        
        overflow-y: hidden;
    }*/
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
    .demonstration{
        width: 300px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .colorRed{
      color: red;
    }
    .el-table__row{
      height: 120px!important;
    }
</style>