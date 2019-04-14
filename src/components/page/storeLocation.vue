<template>
    <div>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane v-if="false" name="location1">
          <span slot="label"><i class="el-icon-date"></i>区域设置</span>
            <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  label="打卡日期"
                  align="center"
                  prop="ad_user_sign_time"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡时间"
                  align="center"
                  prop="ad_user_sign_am"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡位置"
                  align="center"
                  prop="ad_user_sign_am_location"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡时间"
                  align="center"
                  prop="ad_user_sign_pm"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡位置"
                  align="center"
                  prop="ad_user_sign_pm_location"
                  >
                </el-table-column>
                <el-table-column
                  label="工作日志"
                  align="center"
                  prop="org_sign_content"
                  >
                </el-table-column>
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
                  </template>
                </el-table-column>
              </el-table>   
            </div>
            <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="pageChange1"
                  :current-page.sync="pageNum1"
                  :page-size="pageSize1"
                  layout="prev, pager, next, jumper"
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="false" name="location2">
          <span slot="label"><i class="el-icon-date"></i>楼宇设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  label="打卡日期"
                  align="center"
                  prop="ad_user_sign_time"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡时间"
                  align="center"
                  prop="ad_user_sign_am"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡位置"
                  align="center"
                  prop="ad_user_sign_am_location"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡时间"
                  align="center"
                  prop="ad_user_sign_pm"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡位置"
                  align="center"
                  prop="ad_user_sign_pm_location"
                  >
                </el-table-column>
                <el-table-column
                  label="工作日志"
                  align="center"
                  prop="org_sign_content"
                  >
                </el-table-column>
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
                  </template>
                </el-table-column>
              </el-table>   
            </div>
            <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="pageChange1"
                  :current-page.sync="pageNum1"
                  :page-size="pageSize1"
                  layout="prev, pager, next, jumper"
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="false" name="location3">
          <span slot="label"><i class="el-icon-date"></i>楼层设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  label="打卡日期"
                  align="center"
                  prop="ad_user_sign_time"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡时间"
                  align="center"
                  prop="ad_user_sign_am"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡位置"
                  align="center"
                  prop="ad_user_sign_am_location"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡时间"
                  align="center"
                  prop="ad_user_sign_pm"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡位置"
                  align="center"
                  prop="ad_user_sign_pm_location"
                  >
                </el-table-column>
                <el-table-column
                  label="工作日志"
                  align="center"
                  prop="org_sign_content"
                  >
                </el-table-column>
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
                  </template>
                </el-table-column>
              </el-table>   
            </div>
            <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="pageChange1"
                  :current-page.sync="pageNum1"
                  :page-size="pageSize1"
                  layout="prev, pager, next, jumper"
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="false" name="location4">
          <span slot="label"><i class="el-icon-date"></i>房间设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  label="打卡日期"
                  align="center"
                  prop="ad_user_sign_time"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡时间"
                  align="center"
                  prop="ad_user_sign_am"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡位置"
                  align="center"
                  prop="ad_user_sign_am_location"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡时间"
                  align="center"
                  prop="ad_user_sign_pm"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡位置"
                  align="center"
                  prop="ad_user_sign_pm_location"
                  >
                </el-table-column>
                <el-table-column
                  label="工作日志"
                  align="center"
                  prop="org_sign_content"
                  >
                </el-table-column>
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
                  </template>
                </el-table-column>
              </el-table>   
            </div>
            <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="pageChange1"
                  :current-page.sync="pageNum1"
                  :page-size="pageSize1"
                  layout="prev, pager, next, jumper"
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane  name="location5">
          <span slot="label"><i class="el-icon-date"></i>房内布局设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  label="打卡日期"
                  align="center"
                  prop="ad_user_sign_time"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡时间"
                  align="center"
                  prop="ad_user_sign_am"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡位置"
                  align="center"
                  prop="ad_user_sign_am_location"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡时间"
                  align="center"
                  prop="ad_user_sign_pm"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡位置"
                  align="center"
                  prop="ad_user_sign_pm_location"
                  >
                </el-table-column>
                <el-table-column
                  label="工作日志"
                  align="center"
                  prop="org_sign_content"
                  >
                </el-table-column>
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
                  </template>
                </el-table-column>
              </el-table>   
            </div>
            <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="pageChange1"
                  :current-page.sync="pageNum1"
                  :page-size="pageSize1"
                  layout="prev, pager, next, jumper"
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane name="location6">
          <span slot="label"><i class="el-icon-date"></i>存储设备设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  label="打卡日期"
                  align="center"
                  prop="ad_user_sign_time"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡时间"
                  align="center"
                  prop="ad_user_sign_am"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡位置"
                  align="center"
                  prop="ad_user_sign_am_location"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡时间"
                  align="center"
                  prop="ad_user_sign_pm"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡位置"
                  align="center"
                  prop="ad_user_sign_pm_location"
                  >
                </el-table-column>
                <el-table-column
                  label="工作日志"
                  align="center"
                  prop="org_sign_content"
                  >
                </el-table-column>
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
                  </template>
                </el-table-column>
              </el-table>   
            </div>
            <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="pageChange1"
                  :current-page.sync="pageNum1"
                  :page-size="pageSize1"
                  layout="prev, pager, next, jumper"
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane name="location7">
          <span slot="label"><i class="el-icon-date"></i>设备位置设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  label="打卡日期"
                  align="center"
                  prop="ad_user_sign_time"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡时间"
                  align="center"
                  prop="ad_user_sign_am"
                  >
                </el-table-column>
                <el-table-column
                  label="上午打卡位置"
                  align="center"
                  prop="ad_user_sign_am_location"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡时间"
                  align="center"
                  prop="ad_user_sign_pm"
                  >
                </el-table-column>
                <el-table-column
                  label="下午打卡位置"
                  align="center"
                  prop="ad_user_sign_pm_location"
                  >
                </el-table-column>
                <el-table-column
                  label="工作日志"
                  align="center"
                  prop="org_sign_content"
                  >
                </el-table-column>
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
                  </template>
                </el-table-column>
              </el-table>   
            </div>
            <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="pageChange1"
                  :current-page.sync="pageNum1"
                  :page-size="pageSize1"
                  layout="prev, pager, next, jumper"
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import  TMap from '../../TMap';
  import md5 from 'js-md5';
  export default {
      data: function(){
          return {
              activeName:'location5',
              areaList:[{

              }],
              pageNum1:1,
              pageSize1:10,
              total:0,

            }
              
      },
      mounted() {
          
         
      },
      methods: {
         
          //翻页事件
          pageChange1(){

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
      height: 510px!important;
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