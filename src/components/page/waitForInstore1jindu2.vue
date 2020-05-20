<template>
    <div>
        
        <div >
            <div class="titleBg">案件当前进度查询<div style="font-size: 20px;line-height: 20px;margin-top: -25px;"></div></div>
            <div class="block">
                
                <el-input style="width:200px;" v-model="case_number" placeholder="案卷号查询"></el-input>
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="case_name"
                  style="width: 200px;margin-left: 30px;"
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
                <el-select
                  v-model="case_name"
                  style="width: 200px;margin-left: 30px;"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  placeholder="请输入罪名"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-date-picker
                  style="width: 200px;margin-left: 30px;"
                  v-model="timeYear"
                  align="right"
                  type="year"
                  format="yyyy年"
                  value-format="yyyy"
                  placeholder="选择年份">
                </el-date-picker>
                <el-select
                  v-model="user_true_name"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  placeholder="请输入承办人"
                  :remote-method="remoteMethod2"
                  :loading="loading2">
                  <el-option
                    v-for="item in options42"
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
               <!--  <el-button type="warning" style="margin-left: 20px;" @click="addHisDialog=true">2017诉讼案卷</el-button>
                <el-button type="warning" style="margin-left: 20px;" @click="addHisDialog2=true">2017技术案卷</el-button>
                <el-button type="warning" style="margin-left: 20px;" @click="addHisDialog3=true">2018文书案卷</el-button>
                <el-button type="warning" style="margin-left: 20px;" @click="addHisDialog1=true">2018诉讼案卷</el-button> -->
                
            </div>

          
        </div>
        <el-dialog title="2017诉讼案卷" :visible.sync="addHisDialog">
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
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
        </el-dialog>
        <el-dialog title="2018诉讼案卷" :visible.sync="addHisDialog1">
            <el-upload
              style="text-align:center;"
              class="upload-demo"
              drag
              :on-success="uploadSuccess"
              :action="uploadUrl1"
              :headers="myHeaders"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
        </el-dialog>
        <el-dialog title="2017技术案卷" :visible.sync="addHisDialog2">
            <el-upload
              style="text-align:center;"
              class="upload-demo"
              drag
              :on-success="uploadSuccess"
              :action="uploadUrl2"
              :headers="myHeaders"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
        </el-dialog>
        <el-dialog title="2018文书案卷" :visible.sync="addHisDialog3">
            <el-upload
              style="text-align:center;"
              class="upload-demo"
              drag
              :on-success="uploadSuccess"
              :action="uploadUrl3"
              :headers="myHeaders"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
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
                label="是否有效"
                align="center"
                >
                <template slot-scope="props">
                  <span v-bind:class="[props.row.exhibit_status=='0'?'colorRed':'']">{{props.row.exhibit_status=='0'?'失效':'有效'}}</span>
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
                width="300px"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="printAgain(props.row)">补打条码</el-button>
                  <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="zuofeiClick(props.row)">作废</el-button>
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
        <el-dialog
          title="案件进度"
          :visible.sync="jinduDialogVisible"
          width="40%"
          
          >
          <div class="steps">
            <el-steps :active="0" align-center direction="vertical" space="80px">
              <el-step :status="finish" title="" description="">
                <template slot="title">是否办结：已办结</template>
                <template slot="description">时间：{{overtime}}</template>
              </el-step>
              <el-step :status="anguan_confirm_time==null?'wait':'finish'" title="" description="">
                <template slot="title">案件审查：{{anguan_confirm_time==null?"未审查":"已审查"}}</template>
                <template v-if="anguan_confirm_time==null?false:true"  slot="description">时间：{{anguan_confirm_time}}</template>
              </el-step>
              <el-step :status="dangan_accept_time==null?'wait':'finish'" title="" description="">
                <template slot="title">档案接收：{{dangan_accept_time==null?"未接收":"已接收"}}</template>
                <template v-if="dangan_accept_time==null?false:true"  slot="description">时间：{{dangan_accept_time}}</template>
              </el-step>
              <el-step :status="stock_status=='none'?'wait':'finish'" title="" description="">
                <template slot="title">是否上架：{{stock_status=="none"?"未上架":"已上架"}}</template>
                <template v-if="stock_status=='none'?false:true"  slot="description">时间：{{gdrq}}</template>
              </el-step>
            </el-steps>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="jinduDialogVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="jinduDialogVisible = false">关 闭</el-button>
          </span>
        </el-dialog>
        <div id="container" style="width: 100%;height: 110%;  float: right;">
          
          
          <div class="tableList">
            <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
              <el-tab-pane name="tabName1" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  侦监业务
                  <el-badge :value="num1" :hidden="num1==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                 <el-table
                  ref="multipleTable1"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  
                  <el-table-column
                    label="是否归档"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column

                    label="是否成卷"
                    align="center"
                    >
                    <template slot-scope="scope">
                      <div>
                        {{ scope.row.chengjuan==0?'否':'是' }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column

                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-popconfirm title="确定修改状态吗？" @onConfirm="changesStatus(props.row)">
                          <el-button slot="reference" type="warning" size="mini" style="margin-left: 0px;">修改成卷状态</el-button>
                        </el-popconfirm>
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
              <el-tab-pane name="tabName2" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  公诉业务
                  <el-badge :value="num2" :hidden="num2==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                <el-table
                  ref="multipleTable2"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  <el-table-column
                    label="是否归档"
                    align="center">
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
              <el-tab-pane name="tabName3" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  民行业务
                  <el-badge :value="num3" :hidden="num3==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                <el-table
                  ref="multipleTable3"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  <el-table-column
                    label="是否归档"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
              <el-tab-pane name="tabName9" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  公益诉讼
                  <el-badge :value="num9" :hidden="num9==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                <el-table
                  ref="multipleTable9"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  <el-table-column
                    label="是否归档"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
              <el-tab-pane name="tabName4" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  执检业务
                  <el-badge :value="num4" :hidden="num4==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                <el-table
                  ref="multipleTable4"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  <el-table-column
                    label="是否归档"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
              <el-tab-pane name="tabName5" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  控申业务
                  <el-badge :value="num5" :hidden="num5==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                <el-table
                  ref="multipleTable5"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  <el-table-column
                    label="是否归档"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
              <el-tab-pane name="tabName6" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  未检业务
                  <el-badge :value="num6" :hidden="num6==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                <el-table
                  ref="multipleTable6"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  <el-table-column
                    label="是否归档"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
              <el-tab-pane name="tabName7" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  检察技术
                  <el-badge :value="num7" :hidden="num7==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                <el-table
                  ref="multipleTable7"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  <el-table-column
                    label="是否归档"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
              <el-tab-pane name="tabName8" class="tabClass">
                <span style="font-size:19px;" slot="label"><i class="el-icon-date"></i>
                  检委会
                  <el-badge :value="num8" :hidden="num8==0?true:false" :max="9999" class="badgeClass"> 
                  </el-badge>
                </span>
                <el-table
                  ref="multipleTable8"
                  :data="caseList"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    type="index"
                    :index="indexMethod"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="65">
                  </el-table-column>
                  <el-table-column
                    label="案件编号"
                    align="center"
                    prop="case_bh">
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
                    label="案件类型"
                    align="center"
                    prop="case_type_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="案件状态"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.case_none_status==1?'评查中':'待入库'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="案件描述"
                    align="center"
                    show-overflow-tooltip
                    prop="case_desc"
                    >
                  </el-table-column>
                  <el-table-column
                    label="是否归档"
                    align="center"
                    >
                    <template slot-scope="props">
                        <span>{{props.row.time_status=='in'?'已归档':''}}</span>
                        <span>{{props.row.time_status=='in_jj_out'?'已归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='in_rk_out'?'已归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='in_all_out'?'已归档（双超期）':''}}</span>
                        <span>{{props.row.time_status=='none'?'未归档':''}}</span>
                        <span>{{props.row.time_status=='none_jj_out'?'未归档（交卷超期）':''}}</span>
                        <span>{{props.row.time_status=='none_rk_out'?'未归档（入库超期）':''}}</span>
                        <span>{{props.row.time_status=='none_all_out'?'未归档（双超期）':''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="承办人"
                    align="center"
                    prop="case_take_user_name"
                    >
                  </el-table-column>
                  <el-table-column
                    label="总案卷数"
                    align="center"
                    prop="total_quantity"
                    >
                  </el-table-column>
                  <el-table-column
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
                    align="center">
                      <template slot-scope="props">
                        <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="liuchengClick(props.row)">查看进度</el-button>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column
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
              </el-tab-pane>
            </el-tabs>
           
                
          </div>
          <!-- <div style="margin-top: 20px">
              <el-button @click="toggleSelection(caseList)">全选</el-button>
              <el-button @click="toggleSelection()">取消全选</el-button>
              <el-button @click="updateForIns()">确认待入库</el-button>
              <el-button @click="updateForChecks()">确认已审查</el-button>
          </div>  -->
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
              num9:0,
              addHisDialog1:false,
              addHisDialog2:false,
              addHisDialog3:false,
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
              finish:false,
              multipleSelection: [],
              exhibits:[],
              total:0,
              pageNum:1,
              pageSize:10,
              total2:0,
              pageNum2:1,
              pageSize2:10,
              addHisDialog:false,
              uploadUrl:'',
              uploadUrl1:'',
              uploadUrl2:'',
              uploadUrl3:'',
              myHeaders:'',
              timeYear:'',
              jinduDialogVisible:false,
              bjrq:'',
              anguan_confirm_time:'',
              dangan_accept_time:'',
              stock_status:'',
              gdrq:'',
              overtime:'',
              user_true_name:'',
              loading2:false,
              options42:[]
             
            }
              
      },
      mounted() {
          this.getDataList();
          var myHeaders = localStorage.getItem('auth');
          var uploadUrl = this.$axios.defaults.baseURL+'/exhibit/exhibit/addByExcel2017';
          var uploadUrl1 = this.$axios.defaults.baseURL+'/exhibit/exhibit/addByExcel2018';
          var uploadUrl2 = this.$axios.defaults.baseURL+'/exhibit/exhibit/addByExcel2017Js';
          var uploadUrl3 = this.$axios.defaults.baseURL+'/exhibit/exhibit/addByExcel2018Ws';
          this.uploadUrl = uploadUrl;
          this.uploadUrl1 = uploadUrl1;
          this.uploadUrl2 = uploadUrl2;
          this.uploadUrl3 = uploadUrl3;
          var token = {"kf-token":myHeaders};
          this.myHeaders = token;
          this.getNumBage();
      },
      methods: {
        // 修改成卷状态
        async changesStatus(e){
          let returnData = await this.$api.editChengStatus({case_id:e.case_id,chengjuan:e.chengjuan==0?1:0})
          if(returnData && returnData.code == '0') this.getDataList()
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
          getNameList2(query){
                const self = this;
                self.user_true_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_true_name',self.user_true_name);
                params.append('pageNum',1);
                params.append('pageSize',1000);
                self.$axios({
                    method: 'post',
                    url: '/user/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.states2 = data.data.data.list;
                        self.list2 = self.states2.map(item => {
                          return { value: item.user_true_name, label: item.user_true_name};
                        });
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          indexMethod(index){
            return this.pageSize*(this.pageNum-1)+index+1;
            
          },
          indexMethod1(index){
            return this.pageSize2*(this.pageNum2-1)+index+1
          },
          tabClick(res){
            console.log(res)
            this.activeName = res.name;
            this.getDataList();
          },
          uploadSuccess(res){
            console.log(res)
            if(res.code==0){
              this.$message({
                type: 'success',
                message: '上传成功'
              });
            }else{
              this.$message({
                type: 'erroe',
                message: res.msg
              });
            }
            
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
          // 查看案件步骤
          liuchengClick(res){
            this.jinduDialogVisible = true;
            this.bjrq = res.bjrq;
            this.anguan_confirm_time = res.anguan_confirm_time;
            this.dangan_accept_time = res.dangan_accept_time;
            this.stock_status = res.stock_status;
            this.gdrq = res.gdrq;
            this.overtime = res.overtime;
            
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
          
          //关键字模糊查询提示2020
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
          updateForIns(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var ids = [];
                for(var i = 0; i < self.multipleSelection.length; i++){
                  ids.push(self.multipleSelection[i].case_id)
                }
                params.append('case_ids',ids.join(','));
                self.$axios({
                    method: 'post',
                    url: '/cases/cases/confirmNone',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          updateForChecks(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var ids = [];
                for(var i = 0; i < self.multipleSelection.length; i++){
                  ids.push(self.multipleSelection[i].case_id)
                }
                params.append('case_ids',ids.join(','));
                self.$axios({
                    method: 'post',
                    url: '/cases/cases/confirmPingCha',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        self.getDataList();
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
                // params.append('stock_status','none');
                // params.append('case_none_confirm','0');
                params.append('timeYear',self.timeYear);
                params.append('case_name',self.case_name);
                params.append('case_bh',self.case_number);
                params.append('case_take_user_name',self.user_true_name);
                // params.append('bjrq','NOTNULL');
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
                       self.num9 = data.data.data._46;
                       // console.log(self.num1)
                       console.log(self.$children)
                       self.$children[12].$children[0].$forceUpdate();
                       // self.$forceUpdate()
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          zuofeiClick(res){
            var self = this;
            var params = new URLSearchParams();
            var token = localStorage.getItem('auth');

            params.append('exhibit_id',res.exhibit_id);
            params.append('exhibit_status','0');
            

            self.$axios({
                method: 'post',
                url: '/exhibit/exhibit/update',
                data: params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
             }).then(function(data){
                
                if(data.data.code==0){
                  
                  self.$message({
                    type: 'success',
                    message: '操作成功'
                  });
                  self.case_detail_dialog = false;
                  self.getDataList();
                }else{

                  self.$response(data,self);
                  
                }
             });
          },
          toggleSelection(rows) {
            console.log(rows)
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable1.toggleRowSelection(row);
                this.$refs.multipleTable2.toggleRowSelection(row);
                this.$refs.multipleTable3.toggleRowSelection(row);
                this.$refs.multipleTable4.toggleRowSelection(row);
                this.$refs.multipleTable5.toggleRowSelection(row);
                this.$refs.multipleTable6.toggleRowSelection(row);
                this.$refs.multipleTable7.toggleRowSelection(row);
                this.$refs.multipleTable8.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable1.clearSelection();
              this.$refs.multipleTable2.clearSelection();
              this.$refs.multipleTable3.clearSelection();
              this.$refs.multipleTable4.clearSelection();
              this.$refs.multipleTable5.clearSelection();
              this.$refs.multipleTable6.clearSelection();
              this.$refs.multipleTable7.clearSelection();
              this.$refs.multipleTable8.clearSelection();
            }
          },
          handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
          },
          //获取默认列表数据
          getDataList(){
                const self = this;
                self.getNumBage();
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('case_take_user_name',self.user_true_name);
                params.append('pageNum',self.pageNum);
                params.append('pageSize',self.pageSize);
                params.append('case_name',self.case_name);
                params.append('case_bh',self.case_number);
                // params.append('stock_status','none');
                // params.append('tongyi_status','');
                // params.append('case_none_confirm','0');
                params.append('timeYear',self.timeYear);
                // params.append('bjrq','NOTNULL');
                
                switch(self.activeName){
                case 'tabName1':
                  params.append('case_type_id','30');
                  break;
                case 'tabName2':
                  params.append('case_type_id','31');
                  break;
                case 'tabName3':
                  params.append('case_type_id','32');
                  break;
                case 'tabName4':
                  params.append('case_type_id','33');
                  break;
                case 'tabName5':
                  params.append('case_type_id','34');
                  break;
                case 'tabName6':
                  params.append('case_type_id','35');
                  break;
                case 'tabName7':
                  params.append('case_type_id','44');
                  break;
                case 'tabName8':
                  params.append('case_type_id','45');
                  break;
                case 'tabName9':
                  params.append('case_type_id','46');
                  break;
                default:
                  
                }

                self.$axios({
                    method: 'post',
                    url: '/cases/cases/getCaseJinDuByPage',
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
      height: 400px!important;
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
    .steps{
      margin-left: 50px;
    }
</style>