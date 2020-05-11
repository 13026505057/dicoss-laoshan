<template>
    <div>
        
        <div >
            <div class="titleBg">档案借阅</div>
            <div class="block">
                <!-- 借阅时间 -->
                <el-date-picker
                  v-model="detaTimeInfo" value-format="yyyy-MM-dd"
                  type="daterange" @change="changeDataTime"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
                <!-- 借阅人 -->
                <el-input v-model="submitDataInfo['borrow_user_true_name']" placeholder="请输入借阅人信息" style="width:auto"></el-input>
                <el-input v-model="submitDataInfo['case_name']" placeholder="请输入案卷名称" style="width:auto"></el-input>
                <el-input v-model="submitDataInfo['out_exhibit_id']" placeholder="请输入案卷条形码" style="width:auto"></el-input>
                <el-button type="warning" style="margin-left: 50px;" @click="searchClick">查询</el-button>
                <el-button type="warning" style="margin-left: 30px;" @click="addHistoryClick">借阅总结</el-button>
            </div>
        </div>

        <el-dialog title="借阅总结" :visible.sync="addHisDialog">
            <el-upload
              style="text-align:center;"
              class="upload-demo"
              drag
              name="file"
              :on-success="uploadSuccess"
              :action="uploadUrl"
              :headers="{'kf-token':token}"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传word/pdf/excle文件，且不超过500kb</div>
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
                :index="indexMethod1"
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
        <div id="container" style="width: 100%;height: 110%;  float: right;">
          <el-tabs v-model="activeName_item" @tab-click="handleClick">
            <el-tab-pane label="借阅中" name="first">
              <el-table :data="tableData_pending" :loading="loading"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle" class="tableClass">
                <el-table-column align="center" v-for="item in column_pending"
                  :key="item.itemId" :label="item.title" :prop="item.dom"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="props">
                    <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="downLoad(props.row)">下载</el-button>
                    <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="delClick(props.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="借阅历史" name="second">
              <el-table :data="tableData_history" :loading="loading"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle" class="tableClass">
                <el-table-column align="center" v-for="item in column_history"
                  :key="item.itemId" :label="item.title" :prop="item.dom"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="props">
                    <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="downLoad(props.row)">下载</el-button>
                    <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="delClick(props.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <!-- 分页器 -->
          <el-pagination
            small background
            style="text-align: center;margin-top: 20px;"
            @current-change="pageChange"
            :current-page.sync="pagination.pageNum"
            :page-size="pagination.pageSize"
            layout="prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </div>
        

    </div>
</template>

<script>
  import  TMap from '../../TMap';
  import md5 from 'js-md5';
  export default {
      data: function(){
          return {
              case_detail_dialog:false,
              options4: [],
              case_name: [],
              list: [],
              
              states: [],
              caseList: [
                {
                  case_name:2
                }
              ],
              
              exhibits:[{

              }],
              total:0,
              pageNum:1,
              pageSize:10,
              total2:0,
              pageNum2:1,
              pageSize2:10,
              addHisDialog:false,
              uploadUrl:'',
              pagination: {
                pageNum: 1,
                pageSize: 10,
              },
              submitDataInfo: {
                borrow_begin_time: '',
                borrow_end_time: '',
                is_back: 0,
                out_exhibit_id: '',
                case_name: '',
                borrow_user_true_name: ''
              },
              detaTimeInfo: '',
              loading: false,
              activeName_item: 'first',
              tableData_pending: [],
              tableData_history: [],
              column_pending: [
                { title: '案卷编号', dom: 'exhibit_id',itemId: 1 },
                { title: '案卷档号', dom: 'dh',itemId: 2 },
                { title: '隶属案件', dom: 'case_name',itemId: 3 },
                { title: '借阅人', dom: 'borrow_user_true_name',itemId: 4 },
                { title: '借阅时间', dom: 'borrow_time',itemId: 5 },
              ],
              column_history: [
                { title: '案卷编号', dom: 'exhibit_id',itemId: 1 },
                { title: '案卷档号', dom: 'dh',itemId: 2 },
                { title: '隶属案件', dom: 'case_name',itemId: 3 },
                { title: '借阅人', dom: 'borrow_user_true_name',itemId: 4 },
                { title: '借阅时间', dom: 'borrow_time',itemId: 5 },
                { title: '归还时间', dom: 'back_time',itemId: 6 },
              ],
            }
              
      },
      mounted() {
        this.getTableList({
          ...this.pagination,
          ...this.submitDataInfo
        });
        this.token = localStorage.getItem('auth');
        this.uploadUrl = this.$axios.defaults.baseURL+'/file/addBorrow';
      },
      methods: {
        //获取列表
        async getTableList(dataInfo){
          this.loading = true;
          console.log(dataInfo)
          const titleList = await this.$api.getArchivesList(dataInfo);
          const pagination = { ...this.pagination };
          if (dataInfo.is_back == 0) this.tableData_pending = titleList.data.list;
            else this.tableData_history = titleList.data.list;
          pagination.total = titleList.total;
          this.pagination = pagination;
          this.loading = false;
        },
        handleClick(tab) {
          this.submitDataInfo.is_back = tab.index;
          this.getTableList({
            ...this.pagination,
            ...this.submitDataInfo
          })
        },
        changeDataTime(){
          console.log(this.detaTimeInfo)
          this.submitDataInfo['borrow_begin_time'] = this.detaTimeInfo[0];
          this.submitDataInfo['borrow_end_time'] = this.detaTimeInfo[1];
        },
        //分页器点击事件
        pageChange(){
          this.getTableList({
            ...this.pagination,
            ...this.submitDataInfo
          });
        },
        //查询事件
        searchClick(){
          this.getTableList({
            ...this.pagination,
            ...this.submitDataInfo
          });
        },
          indexMethod(index){
            return this.pageSize*(this.pageNum-1)+index+1;
          },
          indexMethod1(index){
            return this.pageSize2*(this.pageNum2-1)+index+1
          },
          uploadSuccess(response){
            if(response.code==0){
              this.$message({
                type: 'success',
                message: '上传成功'
              });
              this.addHisDialog = false;
              this.getDataList();
            }else{
              this.$message({
                type: 'error',
                message: '上传失败'
              });
            }
            
          },
          addHistoryClick(){
            this.addHisDialog = true;
          },
          //案卷详情点击事件
          downLoad(res){
            window.open(res.file_url)
            // this.$socketApi.sendSock('text',this.getConfigResult);
            // this.exhibits = res.exhibits;
            // this.case_detail_dialog = true;
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
          delClick(res){
            var self = this;
            
            this.$confirm('即将删除该文章, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

                // const loading = self.$loading({
                //   lock: true,
                //   text: '打印中',
                //   spinner: 'el-icon-loading',
                //   background: 'rgba(0, 0, 0, 0.6)'
                // });
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('file_id',res.file_id);
                // params.append('exhibit_name',res.case_name);
                

                self.$axios({
                    method: 'post',
                    url: '/file/del',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      // loading.close();
                      self.$message({
                        type: 'success',
                        message: '删除成功'
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
                message: '已取消删除'
              });          
            });
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
              }, 200);
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
                params.append('ad_user_true_name',self.name);
                self.$axios({
                    method: 'post',
                    url: '/stop/getAdUserNames',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.states = data.data.data;
                        self.list = self.states.map(item => {
                          return { value: item.value, label: item.value};
                        });
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          
         //修改单元行颜色
          rowStyle({ row, rowIndex}){
            if(rowIndex%2 ==0){
              return 'background:#eee;color:#000;'
            }else{
             return 'background:#e5e7e8;color:#000;'
            }
          },      
         
          
          
         
      }
     
  }
    window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          console.log('location', loc);
          localStorage.setItem('locationDes',loc.poiaddress);
          localStorage.setItem('localLat',loc.latlng.lat);
          localStorage.setItem('localLng',loc.latlng.lng);
          localStorage.setItem('isLocalChoosed',1);
        }
    }, false);
</script>

<style scoped>
    .tree{
      float: left;
      width: 20%;
      height: 600px;
      
    }
    .el-tree{
      background: rgba(255,215,0,0.3);
      color: #fff;
    }

    .tableClass{
      width: 100%;
      height: auto;
      background-color: #231a75;
    }
    .tableList{
      width: 99%;
      height: 460px!important;
      overflow-y: scroll;
      border:1px solid #231a75;
     /* border-radius: 20px;*/
      margin-top: 20px;
      background-color: #231a75;
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
        min-width:900px;
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
</style>