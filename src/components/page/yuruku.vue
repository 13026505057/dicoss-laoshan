<template>
    <div>
        
        <div >
            <div class="titleBg">预入库<div style="font-size: 20px;line-height: 20px;margin-top: -25px;"></div></div>
            <div class="block">
                
                <el-input style="width:200px;" v-model="case_number" placeholder="请输入统一涉案号"></el-input>
                <el-input @change="scanChange"  style="width:200px;margin-left: 20px;" v-model="scan_number" placeholder="请扫描案卷条码"></el-input>
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="case_name"
                  style="width: 200px;margin-left: 20px;"
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
                  style="width: 200px;margin-left: 20px;"
                  v-model="timeYear"
                  align="right"
                  type="year"
                  format="yyyy年"
                  value-format="yyyy"
                  placeholder="选择年份">
                </el-date-picker> -->
                <el-select style="width: 200px;margin-left: 20px;" v-model="caseType" placeholder="请选择案件类型">
                  <el-option
                    v-for="item in typeList1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <!-- <el-select style="width: 200px;margin-left: 20px;" v-model="stateFlag" placeholder="请选择状态">
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
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
                <!-- <el-button type="warning" style="margin-left: 30px;" @click="outClick">导出</el-button> -->
                <el-button type="warning" style="margin-left: 30px;" @click="addNewClick">新增</el-button>
                <!-- <el-button type="warning" style="margin-left: 30px;" @click="pipeiClick">人工匹配</el-button>
                <el-button type="warning" style="margin-left: 30px;" @click="weibangClick">未绑查询</el-button>
                <el-button type="warning" style="margin-left: 30px;" @click="lishiClick">匹配历史</el-button> -->
                
            </div>

          
        </div>
        <el-dialog
          title="新增历史案卷"
          :visible.sync="addNewClickDialog" 
          >
            <el-form ref="form" :model="form" label-width="120px" label-position="left" style="margin-left:20px;">
              <el-form-item label="卷宗名称" style="display: inline-block;">
                <el-input v-model="form.exhibit_name" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="年度" style="display: inline-block;margin-left:80px;">
                <el-input v-model="form.nd" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="统一受案号" style="display: inline-block;">
                <el-input v-model="form.tysah" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="档号" style="display: inline-block;margin-left:80px;">
                <el-input v-model="form.dh" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="卷号" style="display: inline-block;">
                <el-input v-model="form.jh" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="案由" style="display: inline-block;margin-left:80px;">
                <el-input v-model="form.ay" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="承办人" style="display: inline-block;">
                <el-input v-model="form.cbr" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="犯罪嫌疑人" style="display: inline-block;margin-left:80px;">
                <el-input v-model="form.bgr" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              
              
              <el-form-item label="期限" style="display: inline-block;">
                <el-select  v-model="form.bgqx" placeholder="请选择" style="width:208px;">
                  <el-option
                    v-for="item in bgqxList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="案件类型" style="display: inline-block;margin-left:80px;">
                <el-select  v-model="form.case_type_id" placeholder="请选择" style="width:208px;">
                  <el-option
                    v-for="item in typeList1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型" style="display: block;">
                <el-select   v-model="form.exhibit_type" placeholder="请选择" style="width:208px;">
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否打印条码" style="display: block;">
                <el-radio v-model="form.print_code" label="1">打印</el-radio>
                <el-radio v-model="form.print_code" label="0">不打印</el-radio>
              </el-form-item>
            </el-form>            
            <span slot="footer" class="dialog-footer">
              <el-button @click="addNewClickDialog = false">取 消</el-button>
              <el-button type="primary" @click="sureAdd">确 定</el-button>
            </span>
        </el-dialog>
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
                :index="indexMethod1"
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
          
          
          <div class="tableList">
              <el-table
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    label="统一涉案号"
                    align="center"
                    prop="tysah">
                    <!-- <template slot-scope="props">
                      <span>签到考勤</span>
                    </template> -->
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
                    label="案卷名称"
                    align="center"
                    show-overflow-tooltip
                    prop="exhibit_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案卷类型"
                    align="center"
                    
                    >
                    <template slot-scope="props">
                        <span>{{props.row.exhibit_type=='SS'?'诉讼':''}}</span>
                        <span>{{props.row.exhibit_type=='JS'?'技术':''}}</span>
                        <span>{{props.row.exhibit_type=='WS'?'文书':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="存放位置"
                    align="center"
                    prop="cell_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="年度"
                    align="center"
                    prop="nd"
                    >
                  </el-table-column>
                  <el-table-column
                    label="入库状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.stock_status=='none'?'未入库':'已入库'}}</span> 
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="隶属案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
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
              form:{
                print_code:'1'
              },
              addNewClickDialog:false,
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
              bgqxList:[
                {
                  name:'永久',
                  value:'1'
                },
                {
                  name:'长期',
                  value:'2'
                },
                {
                  name:'短期',
                  value:'3'
                }
              ],
              typeList:[
                {
                  name:'诉讼',
                  value:'SS',
                },
                {
                  name:'技术',
                  value:'JS',
                },
                {
                  name:'文书',
                  value:'WS',
                }
              ],
              exhibits:[],
              scan_number15:'',
              scan_number:'',
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
              stateFlag:'',
              caseType:'',
              typeList1:[
                {
                  value:'',
                  label:'全部'
                },
                {
                  value:'30',
                  label:'侦监业务'
                },
                {
                  value:'31',
                  label:'公诉业务'
                },{
                  value:'32',
                  label:'民行业务'
                },{
                  value:'33',
                  label:'公益诉讼'
                },{
                  value:'34',
                  label:'执检业务'
                },{
                  value:'35',
                  label:'控申业务'
                },{
                  value:'44',
                  label:'未检业务'
                },{
                  value:'45',
                  label:'检察技术'
                },{
                  value:'46',
                  label:'检委会'
                }
              ],
            }
              
      },
      mounted() {
          this.getDataList();
          var myHeaders = localStorage.getItem('auth');
          var uploadUrl = this.$axios.defaults.baseURL+'/cases/cases/addByExcel';
          this.uploadUrl = uploadUrl;
          var token = {"kf-token":myHeaders};
          this.myHeaders = token;
          this.getNumBage();
      },
      methods: {
          indexMethod(index){
            return this.pageSize*(this.pageNum-1)+index+1;
          },
          indexMethod1(index){
            return this.pageSize2*(this.pageNum2-1)+index+1
          },
          outClick(){
                const self = this;
                // self.getNumBage();
                window.open(self.$axios.defaults.baseURL+'/exhibit/exhibit/exoprtExhibits?exhibit_name='+self.case_name+'&tysah='+self.case_number+'&nd='+self.timeYear+'&stock_status='+self.stateFlag+'&out_exhibit_id='+self.scan_number)
                
          },
          scanChange(val){
            const self = this;
            if(val.length==15){
              self.scan_number15 = val
            }
            if(val.length>15){
              self.scan_number = self.scan_number15
            }

          },
          lishiClick(){
            this.$router.push('/pipeilishi');
          },
          sureAdd(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('nd',self.form.nd);
                params.append('exhibit_type',self.form.exhibit_type);
                params.append('bgqx',self.form.bgqx);
                params.append('exhibit_name',self.form.exhibit_name);
                params.append('tysah',self.form.tysah);
                params.append('ay',self.form.ay);
                params.append('cbr',self.form.cbr);
                params.append('bgr',self.form.bgr);
                params.append('dh',self.form.dh);
                params.append('jh',self.form.jh);
                params.append('print_code',self.form.print_code);
                params.append('case_type_id',self.form.case_type_id);
                // const loading = self.$loading({
                //   lock: true,
                //   text: '打印中',
                //   spinner: 'el-icon-loading',
                //   background: 'rgba(0, 0, 0, 0.6)'
                // });
                self.$axios({
                    method: 'post',
                    url: '/yrExhibitAdd',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      // loading.close();
                      self.$message({
                        type: 'success',
                        message: '添加成功'
                      });
                      self.form = {
                        print_code:'1'
                      }
                      self.addNewClickDialog = false;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          addNewClick(){
            // this.addNewClickDialog = true;
            var self = this;
            self.addNewClickDialog = true;
            // this.$confirm('是否存在案件信息？', '确认信息', {
            //   distinguishCancelAndClose: true,
            //   confirmButtonText: '存在',
            //   cancelButtonText: '不存在'
            // })
            //   .then(() => {
            //       self.$router.push('/historicalCases');
            //   })
            //   .catch(action => {
                  

            //     // this.$message({
            //     //   type: 'info',
            //     //   message: action === 'cancel'
            //     //     ? '放弃保存并离开页面'
            //     //     : '停留在当前页面'
            //     // })
            //   });
          },
          pipeiClick(){
            this.$router.push('/pipei');
          },
          weibangClick(){
            this.$router.push('/weibang');
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
                self.getNumBage();
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('pageNum',self.pageNum);
                params.append('pageSize',self.pageSize);
                params.append('exhibit_name',self.case_name);
                params.append('tysah',self.case_number);
                params.append('nd',self.timeYear);
                params.append('stock_status',self.stateFlag);
                params.append('out_exhibit_id',self.scan_number);
                params.append('case_type_id',self.caseType);
                
                // params.append('stock_status','out');
                params.append('tongyi_status','');
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
                    url: 'yrExhibitGetByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.caseList = data.data.data.list;
                        self.total = data.data.data.total;
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