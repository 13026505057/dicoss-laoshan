<template>
    <div>
        
        <div >
            <div class="titleBg"></div>
           <!--  <el-input class="inp-1" v-model="input" placeholder="货架号"></el-input>
            <el-input class="inp-2" v-model="input" placeholder="案卷号"></el-input> -->
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="货架号:">
                <el-input @input="changeValue" clearable ref="inp1" class="inp-1" v-model="form.name1"></el-input>
              </el-form-item>
              <el-form-item label="案卷号:">
                <el-input @input="changeValue2" ref="inp2" clearable class="inp-2" v-model="form.name2"></el-input>
              </el-form-item>
              <el-form-item label="案卷类型:">
                <el-radio v-model="exhibit_type" label="SS">诉讼</el-radio>
                <el-radio v-model="exhibit_type" label="JS">技术</el-radio>
                <el-radio v-model="exhibit_type" label="WS">文书</el-radio>
              </el-form-item>
            </el-form>
          
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
              form:{
                name1:'',
                name2:'',

              },
              input:'',
              caseInfo:'',
              exhibit_type:'SS'
            }
              
      },
      mounted() {
          // this.getDataList();
          this.getFocus();
          
          
      },
      methods: {
 
          getFocus(){
            var self =this;
            // setTimeout(function(){
              self.$refs.inp1.focus();
            // },1000)
          },
          changeValue(val){
            console.log(val)

            var self = this;  
            if(val != ""){
              setTimeout(function(){
                self.$refs.inp2.focus();
              },2000)
            }else{

            }
            
          },
          changeValue2(val){
              const self = this;

              if (val!="") {
                if(val.length==15){
                  self.getScanCode(val)
                }
                
              }else{

              }
                
          },
          // 
          getScanCode(val){
              const self = this;

              var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  console.log(val)
                  params.append('code',val);
                  params.append('exhibit_type',self.exhibit_type);
                  self.$axios({
                      method: 'post',
                      url: '/stock/stock/getScanCode',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      
                      if(data.data.code==0){
                          if(data.data.data.type=="exhibit"){
                              self.caseInfo = data.data.data.exhibit.exhibit_id;
                              self.Warehousing()

                            }else if(data.data.data.type=="cell"){
                              // self.locationInfo = data.data.data.cell;
                            }


                      }else{
                        self.$response(data,self);
                      }
                   });
          },
          // 入库
          Warehousing(){
            const self = this;

            var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  // console.log(val)
                  params.append('cell_id',self.form.name1);
                  params.append('exhibit_id',self.caseInfo);

                  self.$axios({
                      method: 'post',
                      url: '/stock/stock/in',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      
                      if(data.data.code==0){
                          self.$message({
                            message: '入库成功',
                            type: 'success'
                          });
                          self.form.name2="";
                          setTimeout(function(){
                            self.$refs.inp2.focus();
                          },1000)

                      }else{
                        self.$response(data,self);
                      }
                   });
          },
          
          //获取默认列表数据
          getDataList(){
                const self = this;
               
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('pageNum',self.pageNum);
                params.append('pageSize',self.pageSize);
                params.append('case_name',self.case_name);
                params.append('case_bh',self.case_number);
                params.append('stock_log_type','in');

                self.$axios({
                    method: 'post',
                    url: '/stock/stock-log/getByPage',
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
    .inp-1,.inp-2{
      width: 600px;
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