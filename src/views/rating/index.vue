<template>
    <div class="detail-container" v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="page-title">
            <div class="left"><i class="el-icon-bell" /> 申请评级</div>
        </div>
        <div>
        <el-row style="height:100%;">
            <el-steps :active="status[statusname]" finish-status="success" simple style="margin-top: 20px;background:#f0f8ff;">
                <el-step title="申请" description="提交申请"></el-step>
                <el-step title="审核" description="待分析/待审核/管理员审核"></el-step>
                <el-step title="初评" description="待分配/待评审配/待确认"></el-step>
                <el-step title="复评" description="待分配/待评审配/待确认"></el-step>
                <el-step title="完成" description="结果分析/通过、不通过"></el-step>
            </el-steps>
        </el-row>
        <el-row :gutter="0" >
            <el-col :span="12" class='mainItem' >
                <div class="borderItem" v-if='stateInfo.state==1000'>
                    <div class="item-title">
                        <span class="name"><i class="el-icon-menu" /> 完成评级</span>
                    </div>
                    <div class="borderContent">
                        <div style="display:flex;justify-content: space-between;font-size:18px;align-items: center;">
                            <div>
                                <el-rate
                                v-model="stateInfo.star"
                                disabled
                                text-color="#ff9900"
                                style="height:35px;width:100%;"
                                >
                                </el-rate>
                                <div style="line-height:30px;text-align:center;color:#ff2200;font-size:16px;">{{netbarInfo.star_score}}分</div>
                            </div>
                            <div>{{stateInfo.star}}星场所</div>
                            <div style="color:#409EFF;cursor: pointer;" @click="apply">申请星级牌</div>
                        </div>
                        
                    </div>
                </div>
                <div class="borderItem" v-else>
                    <div class="item-title">
                        <span class="name"><i class="el-icon-menu" /> 操作</span>
                    </div>
                    <div style="margin:10px auto" class="borderContent">
                        <el-button v-waves class="filter-item" v-if='stateInfo.state' type="info" icon="el-icon-loading" @click="handleClick('wait')"> 正在评审中 </el-button>
                        <el-button v-waves class="filter-item" v-if='stateInfo.state' type="primary" @click="handleClick('license')"> 查看软件注册码 </el-button>
                        <el-button  v-waves class="filter-item" v-if='stateInfo.state' type="primary" icon="el-icon-success" >
                            <a href="http://res.liandaxia.com/client/wbpjxt/wbpjxt_setup.rar" download="场所评级软件(PC客户端)">下载评级软件(PC端)</a> 
                        </el-button>
                        <el-button  v-waves class="filter-item" v-if='stateInfo.state' type="primary" icon="el-icon-success" >
                            <a href="https://rate.iasac.org.cn/bossAdmin/docs/网吧评级系统安装说明.doc" download="场所评级软件(PC客户端)">下载安装说明</a> 
                        </el-button>
                        <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick('apply')" v-else> 提交审核 </el-button>
                    </div>
                </div>
                
                <div class="borderItem">
                    <div class="item-title">
                        <span class="name"><i class="el-icon-menu" /> 场所资料</span>
                        <!-- <span @click="goEdit"><i class="el-icon-edit" />填写资料</span> -->
                    </div>
                    <div class="spaceInfo borderContent" v-if='netbarInfo!={}'>
                        <div class="space-title" style="margin:20px 0;"><i class="el-icon-location" /> {{netbarInfo.name}}</div>
                        <el-carousel :interval="40000" indicator-position='none' v-if='imgList.length>0'>
                            <el-carousel-item v-for="(item,index) in imgList" :key="index" style="width:100%;background-color:#fff;">
                            <img :src='item' style="width:100%;height:auto;margin:0 auto;" @click="handlePictureCardPreview(item)"/>
                            </el-carousel-item>
                        </el-carousel>
                        <div v-else style="margin:10px">场所照片 ：未上传</div>
                        <el-row :gutter="5" type="flex" justify="space-between;margin-top:20px;">
                            <el-col :span="12" class="infoItem">
                                <label>机位数量： </label>
                                <span class="name">{{netbarInfo.mnum_option_name}}</span>
                            </el-col>
                            <el-col :span="12" class="infoItem">
                                <label>联系人： </label>
                                <span class="name">{{netbarInfo.linkman}}</span>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" justify="space-between">
                            <el-col :span="12" class="infoItem">
                                <label>场所面积： </label>
                                <span class="name">{{netbarInfo.area_option_name}}</span>
                            </el-col>
                            <el-col :span="12" class="infoItem">
                                <label>联系电话： </label>
                                <span class="name">{{netbarInfo.tel}}</span>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" justify="space-between">
                            <el-col :span="24" class="infoItem">
                                <label>场所地址： </label>
                                <span class="name">{{netbarInfo.full_addr}}</span>
                            </el-col>
                        </el-row>
                        <div class="images-container">
                            <div class="item">
                                <img class="pic-404__parent" :src="netbarInfo.license_img" alt="file" @click="handlePictureCardPreview(netbarInfo.license_img)">
                                <div class="name">营业执照</div>
                            </div>
                            <div class="item">
                                <img class="pic-404__parent" :src="netbarInfo.fire_img" alt="file"  @click="handlePictureCardPreview(netbarInfo.fire_img)">
                                <div class="name">消防验收合格证</div>
                            </div>
                            <div class="item">
                                <img class="pic-404__parent" :src="netbarInfo.permission_img" alt="file" @click="handlePictureCardPreview(netbarInfo.permission_img)">
                                <div class="name">网络文化经营许可证</div>
                            </div>
                            <div class="item">
                                <img class="pic-404__parent" :src="netbarInfo.building_flat_img" alt="file" @click="handlePictureCardPreview(netbarInfo.building_flat_img)">
                                <div class="name">场所平面图</div>
                            </div>
                        </div>
                    </div>
                    <div class="spaceInfo borderContent" v-else>未上传资料</div>
                </div>
            </el-col>
            <el-col :span="12" class="mainItem">
                <div class="borderItem" style="padding-bottom:0;">
                    <div class="item-title"><span class="name"><i class="el-icon-menu" /> 当前状态</span></div>
                    <div class="borderContent">
                        <el-form :inline="true" class="borderContent">
                            <el-form-item label="状态:" style="width:40%">
                                <span>{{stateInfo.state_title}}</span>
                            </el-form-item>
                            <el-form-item label="星评委:"  style="width:40%">
                                <span>{{stateInfo.org_name?stateInfo.org_name:'未分配'}}</span>
                            </el-form-item>
                            <el-form-item label="星级:" style="width:40%">
                                <span>{{stateInfo.star>0?num[stateInfo.star]+'星':stateInfo.star}}</span>
                            </el-form-item>
                            <el-form-item label="处理人:" style="width:40%">
                                <span>{{stateInfo.operator?stateInfo.operator:'未处理'}}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="borderItem" >
                    <div class="item-title"><span class="name"><i class="el-icon-menu" /> 评级历史记录</span></div>
                    <div class="y-scroll" style="padding-right:10px">
                     <el-timeline v-if='activities.length>0' type="card">
                        <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :color="index==0?'#409EFF':'none'"
                        :timestamp="activity.created"
                        placement="top"
                        >
                        <el-card>
                            <div class="memo">{{activity.memo}}</div>
                            <div class="name">操作人:{{activity.operator}}</div>
                        </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    <dir v-else>暂无记录</dir>
                    </div>
                </div>
            </el-col>
        </el-row>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { roleName } from '@/utils/validate'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'rateindex',
  directives: { waves },
  data() {
    return {
        num:['未选择','一','二','三','四','五'],
        tableData:[{}],
        content:"''",
        state:'',
        netbar_id:'',
        loading:false,
        name:roleName(this.$store.state.user.roleid),
        activities: [{
            content: '“初评”资料分析完毕。  将任务分配给“河北省星评委”进行“复评”。',
            operator:'系统',
            timestamp: '2018-04-15'
            }, {
            content: '“张明帅”提交了初评分数：86分，通过评审。 点击查看评分表。',
            operator:'张明帅',
            timestamp: '2018-04-13'
            }, {
            content: '“李杨敏”将审核任务分配给“张明帅”。',
            operator:'李杨敏',
            timestamp: '2018-04-11'
            }
        ],
        stateInfo:{},
        status:{'申请':0,'审核':1,'初评':2,'复评':3,'完成':5},
        statusname:'',
        netbarInfo:{},
        imgList:[],
        dialogImageUrl:'',
        dialogVisible:false,
    }
  },
  watch: {
  },
  created(){
    //   var data=(this.$route.query)
    //   this.netbar_id=data.id;
    this.getNetbarInfo();
  },
  methods: {
    handlePictureCardPreview(url) {
        this.dialogImageUrl = url;
        this.dialogVisible = true;
    },
      apply(){
          this.$message.error('暂未开放')
      },
    goEdit(){
        this.$router.push({path:'/edit'})
    },
    handleClick(type){
        if(type=='apply'){
            this.postAxios('boss/real/post',{}).then(res=>{
                if(res.code==0){
                    location.reload()
                }
            })
        }
        if(type=='license'){
            var str=this.netbarInfo.license
            this.$alert(str, '场所License', {
                confirmButtonText: '确定',
            });
        }
    },
    getNetbarInfo(){
        console.log(this.$store)
        this.postAxios('boss/info/get',{member_id:0}).then(res=>{
            if(res.code==0){
                if(res.data.id==null){
                    this.$router.push({path:'/Apply'});
                }else{
                    this.netbarInfo=res.data;
                    this.netbarInfo.mnum_option_name=res.data.mnum_option_name.replace(/可以提供服务的机位/g,"")
                    this.postAxios('common/progress/list',{netbar_id:res.data.id}).then(res=>{
                        if(res.code==0){
                            this.activities=res.data.history_list;
                        }
                    })
                    var list=[];
                    for(let x=1;x<6;x++){
                        if(res.data['building_img'+x]!=''){
                            list.push(res.data['building_img'+x])
                        }
                    }
                    this.imgList=list;
                }
                
            }
        })
        // 当前状态
        this.postAxios('common/task/info',{member_id:this.$store.state.user.member_id,task_id:0}).then(res=>{
            if(res.code==0){
                this.stateInfo=res.info
            }else{
                this.stateInfo={
                    state_title:'未开始',
                    org_name:'未分配',
                    star:'未开始',
                    operator:'未处理',

                }
            }
        })
        // 进度条状态
        this.postAxios('boss/current/state',{}).then(res=>{
            if(res.code==0){
                this.statusname=res.data.state;
            }
        })
    }
    
    
  }
}
</script>

<style lang="scss" scoped>
.detail {
  &-container {
    padding: 30px;
    .page-title{
      font-size: 28px;
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
      margin-left:0;
    }
    .mainItem{
        padding:5px;
    }
    .borderItem{
        background-color: #ffffff;
        margin: 10px auto;
        border-radius:5px;
        padding:20px ;
        .item-title{
            line-height: 30px;
            // padding: 20px;
            display: flex;
            justify-content: space-between;
            color: cornflowerblue;
            font-size: 14px;
            .name{
                font-weight: bold;
                color: #071830;
                font-size: 18px;
            }
            span:nth-child(2){
                cursor: pointer;
            }
        }
        
        .infoItem{
            display: flex;
            line-height: 30px;
            margin-top: 10px;
            font-size: 14px;
            label{
                width:80px;
                text-align: right;
            }
            .name{
                flex: 1;
            }
        }
        .spaceInfo{
            .el-carousel__item h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.75;
                line-height: 200px;
                margin: 0;
            }
            
            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }
            
            .el-carousel__item:nth-child(2n+1) {
                background-color: #d3dce6;
            }

            .images-container{
                display: flex;
                align-content: center;
                justify-content: space-around;
                padding-top:20px; 
                .item{
                    flex: 1;
                    margin: 0 10px;
                    // min-height:200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    img{
                        min-height:80px;
                        width: 100%;
                        height: auto;
                    }
                    .name{
                        margin-top: 20px;
                        height: 30px;
                        text-align: center;
                        font-size: 14px;
                    }
                }
                
            }
        }
    }
    .y-scroll{
        padding:20px 0;
        height:670px;
        overflow-y:auto;
        .timeline{
            line-height: 30px;
            .name{
                color: #475669;
            }
        }
    }
    .y-scroll::-webkit-scrollbar{
        display: none;
    }
    .el-form-item{
        margin-bottom: 5px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>