<template>
    <el-dialog center :title="auditTitle" ref="submitForm" :model="submitForm" :visible.sync="dialogFormVisible" :before-close='closeAuditdialog' width="600px">
        <div class="passinfo" style='border:1px solid #DCDFE6;padding:10px;text-align:center;' v-if="type=='pass'">即将通过资料审核。检查无误后请点击确认。<br/> 确认后场所资料将由系统进行分析。</div>
        <div class="refuseinfo" style='border:1px solid #DCDFE6;padding:10px;text-align:center;' v-else-if="type=='refuse'">拒绝通过 资料审核。请填写原因。</div>
        <div class="badinfo" style='border:1px solid #DCDFE6;padding:10px;text-align:center;' v-else>无法处理资料审核。请填写原因。</div>
        <el-form ref="submitForm" :model="submitForm"  label-position="top" label-width="100px" style="width: 400px; margin-left:50px;">
            <el-form-item label="原因（业主可见）：" v-if="type!='pass'">
                <el-input type="textarea" v-model="submitForm.reason" :rows="7"></el-input>
            </el-form-item>
            <el-form-item label="备注（业主不可见）：" >
                <el-input type="textarea" v-model="submitForm.memo" :rows="7"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer left">
            <el-button @click="closeAuditdialog">
            取消
            </el-button>
            <el-button type="primary" @click="auditSubmit()">
            确认
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  name: 'Audit',
  props:['dialogFormVisible','type','auditTitle'],
  data() {
    return {
      submitForm:{
          reason:'',
          memo:''
      },
      roletype:{
        '3':'星评员', '4':'星评管理员',  '5':'星评超级管理员', '6':'全国星评','7':'业主'
      }
    }
  },
  watch:{
    
  },
  created() {
  },
  methods: {
    closeAuditdialog() {
        console.log(this.type)
        this.submitForm={
          reason:'',
          memo:''
      }
        this.$refs.submitForm.resetFields();
        this.$emit("closeAuditdialog");
    },
    auditSubmit(){
        var url='judge/assessor/handler',data={
            type: this.type,
            memo: this.submitForm.memo,
            reason: this.submitForm.reason,
            netbar_id: 2,
        }
        this.postAxios(url,data).then(res=>{
            if(res.code==0){
                this.$emit("closeAuditdialog",res);
            }
        })
    }

  }
}
</script>
<style lang="scss" scoped>
  
</style>
