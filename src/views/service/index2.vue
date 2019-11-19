<template>
  <div class="servicePage-container">
    <div class="page-title">
        <div class="left"><i class="el-icon-bell" /> 企业文化培训</div>
        <div class="right">
          <el-tooltip placement="bottom">
            <div slot="content">每年提供企业文化培训活动<br/>10次及以上得3分<br/>5次及以上得2分<br/>3次及以上得1分<br/>3次以下得0分</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
    </div>
    <div class="page-content">
      <div class="t1"><span>今年已提交活动次数：{{info.times}}次 可得 {{info.score}} 分</span><a href="javascript:;" style="margin-left:10px;color:blue" @click="history">查看历史图片</a></div>
      <div class="t2">
        <span>本次添加活动次数</span>
        <el-input-number v-model="activtynum" @change="handleChange" size="medium" controls-position="right" :min="1" :max="99"></el-input-number>
      </div>
      <div class="pics">
        <div>请至少上传{{activtynum}}张照片</div>
        <el-upload
          action="https://data.jesport.com/filecenter/image/upload"
          name='img'
          list-type="picture-card"
          ref="upload"
          :on-preview="handlePictureCardPreview"
          :on-remove="imgRemove"
          :on-success="imgUpload"
          :file-list='imgList'>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible2" width='80%' title="历史图片" style="margin-top: -8vh;">
          <div style="max-height:800px;overflow:hidden;overflow-y:auto;">
            <div v-for="(item,index) in historyPics" :key='index'>
              <img width="auto" :src="item" alt="">
            </div>
          </div>
          
        </el-dialog>
      </div>
      <div style="margin:10px auto">
					<el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info:{},
      activtynum:0,
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible2: false,
      imgList:[],
      historyPics:[],
    }
  },
  created(){
    this.postAxios('boss/upgrade/info',{type:2}).then(res=>{
        if(res.code==0){
          this.info=res.data;
        }
    })
  },
  methods:{
    history(){
      this.postAxios('boss/upgrade/history',{type:2}).then(res=>{
          if(res.code===0){
            this.historyPics=res.data.pic_list;
            this.dialogVisible2=true;
          }
      })
    },
    handleChange(value) {
      this.activtynum=value
    },
    imgUpload(data,file,fileList){
      var that=this;
      that.$message({
        type:'success',
        message:'添加成功',
      })
      file.newUrl=data.errMsg;
      fileList.forEach((item,index) => {
        item.index=index
      });
      this.imgList=fileList;
    },
    // 删除图
    imgRemove(file,fileList){
      var that=this;
      this.imgList.splice(file.index,1);
    },
    submit(){
      var pic=[];
      this.imgList.forEach(item=>{
        pic.push(item.newUrl);
      })
      if(pic.length<this.times){
        this.$message({
          type:'error',
          message:'图片数量少于次数',
        })
        return false;
      }
      this.postAxios('boss/upgrade/add',{type:2,times:this.activtynum,pics:pic}).then(res=>{
        if(res.code==0){
          this.$message({
            type:'success',
            message:'提交成功',
            onClose:function(){
              location.reload();
            }
          })
        }else{
          this.$message({
          type:'error',
          message:res.msg,
        })
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  .servicePage {
    &-container {
      padding: 30px;
      .page-title{
        font-size: 28px;
        margin-bottom: 30px;
        font-weight:bolder;
        display: flex;
        justify-content: space-between;
      }
      .page-content{
        line-height: 2;
      }
    }
  }
</style>