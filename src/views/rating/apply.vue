<template>
<div class="apply-container">
     <div>
        <div class="borderItem">
            <div class="item-title">
                <span class="name"><i class="el-icon-menu" /> 申请评级</span>
            </div>
            <div style="margin:20px;line-height:30px;">
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;互联网上网服务营业场所服务等级评定平台业主后台是一个提供给“上网场所业主”使用的用户平台。
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;业主可以在平台中进行等级评定的申请，并可以管理维护自己场所的资料。
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;您如果需要申请成为星级场所，请先详细阅读《评级协议》，并勾选表示同意协议后，点击再点击“申请”按钮。
            </div>
            <div style="width:260px;margin:20px auto;"><el-button type="success"  style='width:100%;' @click="applyNetbar">申 请</el-button></div>
            <div style="text-align:center"><el-checkbox v-model="checked" style="margin-right:0;">我已详细阅读并同意</el-checkbox><a style="color:#409EFF;" target="_blank" href="https://rate.iasac.org.cn/judgeAdmin/docs/业主协议V1.0.doc">《全国上网场所评级协议》</a> </div>
        </div>
    </div>
    
</div>
</template>
<script>
export default {
    name: 'apply',
    data() {
        return {
            checked:false,
            netbarApply:false,
            tableData:[{}]
        }
    },
    watch: {
    },
    created(){
        //   var data=(this.$route.query)
        //   this.netbar_id=data.id;
        //   this.state=data.state;
    },
     methods: {
        applyNetbar(){
            if(this.checked){
                this.netbarApply=true;
                this.$router.push({path:'/edit'});
            }else{
                this.$message.error("请先勾选协议！");
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.apply{
  &-container {
    padding: 30px;
    .page-title{
      margin-bottom: 30px;
      font-weight:bolder;
    }
    .rowcenter{
    text-align: center;
    }
    .filter-item{
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
    .mainItem{
        padding:5px;
    }
    .borderItem{
        background-color: #ffffff;
        margin: 10px auto;
        border-radius:5px;
        padding:20px;
        .item-title{
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            color: cornflowerblue;
            font-size: 14px;
            .name{
                font-weight: bold;
                color: rgb(7, 24, 48);
                font-size: 18px;
                cursor: Default;
            }
            span:nth-child(2){
                cursor: pointer;
            }
        }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

