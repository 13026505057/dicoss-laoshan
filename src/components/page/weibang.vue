<template>
    <div>
        
        <div >
            <div class="titleBg">未绑定查询</div>
    

          
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
                label="条形码号"
                align="center"
                prop="out_exhibit_id">
                <!-- <template slot-scope="props">
                  <span>签到考勤</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="档号"
                align="center"
                prop="dh"
                >
              </el-table-column>
              <el-table-column
                label="卷号"
                align="center"
                prop="jh"
                >
              </el-table-column>
              <el-table-column
                label="卷宗名称"
                align="center"
                prop="case_name"
                >
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
          
          <div class="leftBox">
            <div class="block" style="background-size: 200% 40%;">
                <el-date-picker
                  style="width: 150px;margin-left: 10px;"
                  v-model="timeYear"
                  align="right"
                  type="year"
                  format="yyyy年"
                  value-format="yyyy"
                  placeholder="选择年份">
                </el-date-picker>
                <!-- <el-input style="width:150px;" v-model="case_number" placeholder="请输入统一涉案号"></el-input> -->
                <!-- 关键词联想组建 -->
                <!-- <el-select
                  v-model="case_name"
                  clearable
                  style="width: 150px;margin-left: 10px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入卷宗名"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input clearable  style="width:150px;" v-model="user_bgr" placeholder="被告人"></el-input> -->
                <!-- <el-select style="width: 150px;margin-left: 10px;" v-model="stateFlag" placeholder="请选择状态">
                  <el-option
                    v-for="item in stateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
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
                <!-- <el-input clearable @change='valueChange'  style="width:150px;" v-model="scanCode" placeholder="扫码输入"></el-input> -->
                <el-button type="warning" style="margin-left: 10px;" @click="searchClick">查询</el-button>
                <el-button type="warning" style="margin-left: 10px;" @click="exportClick">导出</el-button>
                
            </div>
              <div class="tableList" style="background-image: url(../../../static/img/juanzongxinxi.jpg)!important">
                <el-table
                    highlight-current-row
                    height='520'
                    :data="caseList"
                    :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                    :row-style="rowStyle"
                    class="tableClass"
                    @row-click="rowclick"
                    >
                    <el-table-column
                      type="index"
                      align="center"
                      width="50">
                    </el-table-column>
                    <!-- <el-table-column
                      label="条形码号"
                      align="center"
                      prop="out_exhibit_id">
                    </el-table-column> -->
                    <el-table-column
                      label="档号"
                      align="center"
                      prop="dh"
                      >
                    </el-table-column>
                    <el-table-column
                      label="卷号"
                      align="center"
                      prop="jh"
                      >
                    </el-table-column>
                    <el-table-column
                      label="卷宗名称"
                      align="center"
                      show-overflow-tooltip
                      prop="exhibit_name"
                      >
                    </el-table-column>
                    <el-table-column
                      label="被告人"
                      align="center"
                      show-overflow-tooltip
                      prop="bgr"
                      >
                    </el-table-column>
                    <el-table-column
                      label="申诉人"
                      align="center"
                      show-overflow-tooltip
                      prop="ssr"
                      >
                    </el-table-column>
                    <el-table-column
                      label="归档部门"
                      align="center"
                      show-overflow-tooltip
                      prop="gdbm"
                      >
                    </el-table-column>
                    <el-table-column
                      label="承办人"
                      align="center"
                      show-overflow-tooltip
                      prop="cbr"
                      >
                    </el-table-column>
                    <!-- <el-table-column
                      label="案卷类型"
                      align="center"
                      
                      >
                      <template slot-scope="props">
                          <span>{{props.row.exhibit_type=='SS'?'诉讼':''}}</span>
                          <span>{{props.row.exhibit_type=='JS'?'技术':''}}</span>
                          <span>{{props.row.exhibit_type=='WS'?'文书':''}}</span>
                      </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                      label="年度"
                      align="center"
                      prop="nd"
                      >
                    </el-table-column> -->
                    <!-- <el-table-column
                      label="入库状态"
                      align="center"
                      >
                      <template slot-scope="props">
                          <span>{{props.row.stock_status=='none'?'未入库':'已入库'}}</span> 
                      </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                      label="在库案卷数"
                      align="center"
                      prop="in_quantity"
                      >
                    </el-table-column>
                    <el-table-column
                      label="待入库案卷数"
                      align="center"
                      >
                      <template slot-scope="props">
                          <span>{{props.row.total_quantity-props.row.in_quantity}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="300px"
                      align="center"
                      >
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="caseDetailClick(props.row)">已有案卷</el-button>
                        <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="printClick(props.row)">新增条码</el-button>
                      </template>
                    </el-table-column> -->
                  </el-table> 
             
                  
              </div>
              <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="pageChange"
                  :current-page.sync="pageNum"
                  :page-size="pageSize"
                  layout="prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
          </div>
          <div class="rightBox">
            
            <div class="bottomBox">
              <div class="block" style="background-size: 200% 40%;">
                <el-date-picker
                  style="width: 150px;margin-left: 10px;"
                  v-model="timeYear2"
                  align="right"
                  type="year"
                  format="yyyy年"
                  value-format="yyyy"
                  placeholder="选择年份">
                </el-date-picker>
                <!-- <el-input style="width:150px;" v-model="case_number2" placeholder="请输入统一受案号"></el-input> -->
                <!-- <el-input style="width:150px;" v-model="bumen_number2" placeholder="请输入部门受案号"></el-input> -->
                <!-- 关键词联想组建 -->
                <!-- <el-select
                  v-model="case_name2"
                  style="width: 150px;margin-left: 10px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入案件名"
                  :remote-method="remoteMethod2"
                  :loading="loading2">
                  <el-option
                    v-for="item in options42"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
                <!-- <el-input style="width:150px;" v-model="case_take_user_name" placeholder="请输入承办人"></el-input> -->
                <!-- <el-date-picker
                  style="width: 150px;margin-left: 10px;"
                  v-model="timeYear"
                  align="right"
                  type="year"
                  format="yyyy年"
                  value-format="yyyy"
                  placeholder="选择年份">
                </el-date-picker>
                <el-select style="width: 150px;margin-left: 10px;" v-model="stateFlag" placeholder="请选择状态">
                  <el-option
                    v-for="item in stateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
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
                
                <el-button type="warning" style="margin-left: 10px;" @click="searchClick3">查询</el-button>
                <el-button type="warning" style="margin-left: 10px;" @click="exportClick2">导出</el-button>
                
            </div>
              <div class="tableList" style="height: 50%;background-image: url(../../../static/img/anjianxinxi.jpg)!important">
                <el-table
                    height='520'
                    :data="caseList3"
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
                      label="统一受案号"
                      align="center"
                      prop="tysah">
                      <!-- <template slot-scope="props">
                        <span>签到考勤</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column
                      label="部门受案号"
                      align="center"
                      prop="bmsah">
                      <!-- <template slot-scope="props">
                        <span>签到考勤</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column
                      label="案件名称"
                      align="center"
                      prop="case_name"
                      >
                    </el-table-column>
                    <el-table-column
                      label="承办人"
                      align="center"
                      prop="case_take_user_name"
                      >
                    </el-table-column>
                    <el-table-column
                      label="承办部门"
                      align="center"
                      show-overflow-tooltip
                      prop="dept_name"
                      >
                    </el-table-column>
                    
                    <el-table-column
                      label="办结日期"
                      align="center"
                      prop="bjrq"
                      >
                    </el-table-column>
                    <el-table-column
                      label="案件类型"
                      align="center"
                      prop="case_type_name"
                      >
                    </el-table-column>
                    <!-- <el-table-column
                      label="入库状态"
                      align="center"
                      >
                      <template slot-scope="props">
                          <span>{{props.row.stock_status=='none'?'未入库':'已入库'}}</span> 
                      </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                      label="在库案卷数"
                      align="center"
                      prop="in_quantity"
                      >
                    </el-table-column>
                    <el-table-column
                      label="待入库案卷数"
                      align="center"
                      >
                      <template slot-scope="props">
                          <span>{{props.row.total_quantity-props.row.in_quantity}}</span>
                      </template>
                    </el-table-column> -->
                     <!-- <el-table-column
                      label="是否绑定当前卷宗"
                      align="center"
                      
                      >
                      <template slot-scope="props">
                          <span>{{props.row.is_old=='1'?'已绑定':'未绑定'}}</span> 
                      </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                      label="操作"
                      width="100px"
                      align="center"
                      >
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="bangdingClick3(props.row)">绑定</el-button>
                        
                      </template>
                    </el-table-column> -->
                  </el-table> 
             
                  
              </div>
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
            </div>
          </div>
        </div>
        

    </div>
</template>

<script>
  import  TMap from '../../TMap';
  import md5 from 'js-md5';
  export default {
      data: function(){
          return {
              scanCode:'',
              case_take_user_name:'',
              bumen_number2:'',
              case_name2:'',
              case_number2:'',
              bangding_exhibit_id:'',
              num1:0,
              num2:0,
              num3:0,
              num4:0,
              num5:0,
              num6:0,
              num7:0,
              num8:0,
              user_bgr:'',
              activeName:'tabName1',
              case_detail_dialog:false,
              case_number:'',
              options4: [],
              case_name: '',
              list: [],
              loading: false,
              states: [],
              options42: [],
              
              list2: [],
              loading2: false,
              states2: [],
              caseList: [
                
              ],
              caseList2: [
                
              ],
              caseList3: [
                
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
              timeYear:'',
              timeYear2:'',
              stateList:[
                {
                  value:'',
                  label:'全部'
                },
                {
                  value:'none',
                  label:'未入库'
                },
                {
                  value:'in',
                  label:'已入库'
                }
              ],
              stateFlag:''
            }
              
      },
      mounted() {
          this.getDataList();
          this.getDataList3();
          var myHeaders = localStorage.getItem('auth');
          var uploadUrl = this.$axios.defaults.baseURL+'/cases/cases/addByExcel';
          this.uploadUrl = uploadUrl;
          var token = {"kf-token":myHeaders};
          this.myHeaders = token;
          // this.getNumBage();
      },
      methods: {
          exportClick2(){
            const self = this;
                // self.getNumBage();
                window.open(self.$axios.defaults.baseURL+'/cases/cases/exportCases?timeYear='+self.timeYear2+'&total_quantity=0')
          },
          exportClick(){
            const self = this;
                // self.getNumBage();
                window.open(self.$axios.defaults.baseURL+'/exhibit/exhibit/exoprtExhibits?nd='+self.timeYear+'&case_id=NULL')
          },
          valueChange(val){
            // console.log(val)
            if(val.length==15){
              this.scanCode = val;
              // console.log(val)
              this.getDataList();
            }
            
          },
          bangdingClick(val){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('exhibit_id',self.bangding_exhibit_id);
                params.append('case_id',val.case_id);
                
                
                self.$axios({
                    method: 'post',
                    url: '/exhibit/exhibit/attachExhibitToCase',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){

                      self.$message({
                        type: 'success',
                        message: '绑定成功'
                      });
                      // self.bangding_exhibit_id = '';
                      self.getDataList();
                      self.getDataList2();
                      // self.getDataList3();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          bangdingClick3(val){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('exhibit_id',self.bangding_exhibit_id);
                params.append('case_id',val.case_id);
                
                
                self.$axios({
                    method: 'post',
                    url: '/exhibit/exhibit/attachExhibitToCase',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){

                      self.$message({
                        type: 'success',
                        message: '绑定成功'
                      });
                      // self.bangding_exhibit_id = '';
                      self.getDataList();
                      // self.getDataList2();
                      self.getDataList3();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          rowclick(row, column, event){
            console.log(row)
            this.bangding_exhibit_id = row.exhibit_id;
            this.getDataList2(row)
          },
          tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
              return 'warning-row';
            } else if (rowIndex === 3) {
              return 'success-row';
            }
            return '';
          },
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
          searchClick3(){
            this.getDataList3();
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
            this.getDataList3()
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
          remoteMethod2(query) {
            if (query !== '') {
              this.loading2 = true;
              this.getNameList2(query);
              setTimeout(() => {
                this.loading2 = false;
                this.options42 = this.list2.filter(item => {
                  return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
              }, 2000);
            } else {
              this.options42 = [];
            }
          },
          //关键字模糊查询提示
          getNameList2(query){
                const self = this;
                self.case_name2 = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('ad_user_true_name',self.case_name2);
                self.$axios({
                    method: 'post',
                    url: '/cases/cases/getCasesName',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.states2 = data.data.data;
                        self.list2 = self.states2.map(item => {
                          return { value: item.case_name, label: item.case_name};
                        });
                    }else{
                      self.$response(data,self);
                    }
                 });
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
                // params.append('tongyi_status','');
                // params.append('stock_status','out');
                params.append('stock_status_str','in,out,wout,win');
                params.append('timeYear',self.timeYear);
                params.append('case_name',self.case_name);
                params.append('case_bh',self.case_number);
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
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('pageNum',self.pageNum);
                params.append('pageSize',self.pageSize);
                params.append('case_name',self.case_name);
                params.append('tysah',self.case_number);
                params.append('nd',self.timeYear);
                // params.append('stock_status','none');
                params.append('bgr',self.user_bgr);
                params.append('out_exhibit_id',self.scanCode);
                // params.append('stock_status','out');
                params.append('tongyi_status','');
                params.append('case_id','NULL');
                // switch(self.activeName){
                // case 'tabName1':
                //   params.append('case_type_id','30');
                //   break;
                // case 'tabName2':
                //   params.append('case_type_id','31');
                //   break;
                // case 'tabName3':
                //   params.append('case_type_id','32');
                //   break;
                // case 'tabName4':
                //   params.append('case_type_id','33');
                //   break;
                // case 'tabName5':
                //   params.append('case_type_id','34');
                //   break;
                // case 'tabName6':
                //   params.append('case_type_id','35');
                //   break;
                // case 'tabName7':
                //   params.append('case_type_id','45');
                //   break;
                // case 'tabName8':
                //   params.append('case_type_id','45');
                //   break;
                // default:
                  
                // }

                self.$axios({
                    method: 'post',
                    url: '/exhibit/exhibit/getOldByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.caseList = data.data.data.list;
                        self.total = data.data.data.total;
                        self.bangding_exhibit_id = data.data.data.list[0].exhibit_id;
                        // self.getDataList2();
                    }else{
                      self.$response(data,self);
                    } 
                 });
          },
          getDataList2(val){
                const self = this;
                self.caseList2 = [];
                // self.getNumBage();
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('exhibit_id',self.bangding_exhibit_id);
                
                self.$axios({
                    method: 'post',
                    url: '/exhibit/exhibit/getExhibitLikeCases',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.caseList2 = data.data.data;
                        // self.total = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          getDataList3(val){
                const self = this;
                // self.getNumBage();
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                self.caseList3 = [];
                params.append('pageNum',self.pageNum2);
                params.append('pageSize',self.pageSize2);
                // params.append('case_name',self.case_name);
                // params.append('tysah',self.case_number);
                // params.append('nd',self.timeYear);
                // params.append('case_bh',self.case_number2);
                // params.append('case_name',self.case_name2);
                // params.append('case_take_user_name',self. case_take_user_name);
                params.append('timeYear',self.timeYear2);
                params.append('total_quantity','0');
                // params.append('tongyi_status','');
                

                self.$axios({
                    method: 'post',
                    url: '/cases/cases/getCasesByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.caseList3 = data.data.data.list;
                        self.total2 = data.data.data.total;
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
    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
    .local{
      width: 49%;
    }
    .topBox{
      width: 100%;
      height: 50%;
    }
    .bottomBox{
      width: 100%;
      height: 50%;
    }
    .topBox .tableList{
      width: 100%;
      height: 520px!important;
      margin-top: 0px;
    }
    .bottomBox .tableList{
      width: 100%;
      height: 520px!important;
      margin-top: 20px;
    }
    .rightBox{
      width: 49%;
      height: 100%;
      float: right;
      /*background-color: red;*/
    }
    .leftBox{
      width: 50%;
      height: 100%;
      float: left;
    }
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
      width: 100%;
      height: 520px!important;
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