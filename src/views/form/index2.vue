<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h2 class="title">全国上网场所评级平台</h2>
        <div class="title2">您不是星评员</div>
        <div class="title2">您的登录手机号：{{mobile}}</div>
        <div class="title3">您尚未获得星评员权限，请填写相应的申请信息后，由您所在的星评委管理员添加权限后再登录</div>
      </div>
    </el-form>
    <div style="width:50%;margin:30px auto;">
      <el-button :loading="loading" type="primary" style="width:100%;height: 50px;" @click.native.prevent="handleLogout">前往登录</el-button>
    </div>
  </div>
</template>

<script>
import { validRealname } from '@/utils/validate'
import store from '../../store';
import {router,dynamicRouter} from '@/router'
export default {
  name: 'Myform2',
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(!validRealname(value))
      if (!validRealname(value)) {
        callback(new Error('请输入真实姓名'))
      } else {
        callback()
      }
    }
    
    return {
      mobile:this.$store.state.user.mobile,
      loginForm: {
        name: '',
        tel: ''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
      },
      loading: false,
      redirect: undefined,
      btnTitle:"获取验证码",
      disabled:false,  //是否可点击
    }
  },
  watch: {
    // password:function(val){
    //   this.loginForm.password=val
    //   if(val.length==6){

    //   }
    // }
  },
  created(){
    console.log(store)
  },
  methods: {
    
    validatePhone(){
        //判断输入的手机号是否合法
        if(!this.loginForm.name) {
            this.errors = {
            phone:"真实姓名不能为空"
        }
            return false
        } else if(/^([\u4e00-\u9fa5]){2,7}$/.test(this.loginForm.name)) {
            this.errors = {
            phone:"请输入真实姓名"
        }
            return false
        } else {
            this.errors ={}
            return true
        }
    },
    handleLogout(){
      this.$store.dispatch('user/logout').then((res)=>{
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
      
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postAxios('judge/info/post', this.loginForm).then((res) => {
            this.$message.error(res.errMsg)
            if(res.code==0){
              this.loading = false;
            }else{
              this.$message.error(res.errMsg)
              console.log(res.errMsg)
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .login-form-item{
      position: relative;
    }
  }
  .title-container {
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .title2 {
      font-size: 20px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .title3{
      text-align: center;
      color:#e6e6e6;
    }
  }

  
}
</style>