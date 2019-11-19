<template>
    <div class="detail-container" v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="page-title">
            <div class="left"> 填写资料</div>
            <div class="right">
                <el-button type='success' style="width:100%;" @click='infoFinished' v-if='finished'>已填写完毕前往首页</el-button>
                <el-button type="success" v-else @click='Allsubmit'>提交资料</el-button>
            </div>
        </div>
        <!-- 基本资料 -->
        <div class="borderItem">
            <div class="item-title">
                <span class="name"><i class="el-icon-menu" /> 基本资料</span>
            </div>
            <el-form ref="form1" :model="baseinfo" label-width="100px" label-position='right' class="item-content" >
                <el-form-item label="场所名称" style="width:100%" >
                    <el-input v-model="baseinfo.name" placeholder='请填写场所名称'></el-input>
                </el-form-item>
                <el-form-item label="联系人" style="width:100%">
                    <el-input v-model="baseinfo.linkman" placeholder='请填写联系人'></el-input>
                </el-form-item>
                <el-form-item label="场所省市" v-if='!finished'>
                     <el-select v-model="baseinfo.province" placeholder="请选择省份">
                        <el-option
                        v-for="item in provinceList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-if='baseinfo.province>0' v-model="baseinfo.city" placeholder="请选择城市">
                        <el-option
                        v-for="item in cityList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="场所地址" style="width:100%">
                    <el-input v-model="baseinfo.addr" placeholder='请填写场所地址'></el-input>
                </el-form-item>
                <el-form-item label="场所电话" style="width:100%">
                    <el-input v-model="baseinfo.tel" placeholder='请填写场所电话'></el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <!-- <el-button type="primary" @click="onSubmitBase">提交基本资料</el-button> -->
                </el-form-item>
            </el-form>
        </div>

        <!-- 营业证书 -->
         <div class="borderItem">
            <div class="item-title">
                <span class="name"><i class="el-icon-menu" /> 营业证书</span>
            </div>
            <el-form :inline="true" class="item-content" style="padding: 0 40px;">
                <el-form-item  label-width='auto'>
                    <div class="forLabel">
                        <div class="uploadFile">
                        <el-upload
                            action="https://data.jesport.com/filecenter/image/upload"
                            list-type="picture-card"
                            name='img'
                            :limit=1
                            :before-remove="removeimg"
                            :on-success="imgupload1"
                            :on-preview="handlePictureCardPreview"
                            :file-list='license_img'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        </div>
                        <div slot="label">营业执照</div>
                    </div>
                </el-form-item>
                <el-form-item >
                    <div class="forLabel">
                    <div class="uploadFile">
                    <el-upload
                        action="https://data.jesport.com/filecenter/image/upload"
                        list-type="picture-card"
                        name='img'
                        :limit=1
                        :on-success="imgupload2"
                        :on-preview="handlePictureCardPreview"
                        :file-list='fire_img'>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    </div>
                    <div slot="label">消防验收合格证</div>
                    </div>
                </el-form-item>
                <el-form-item >
                    <div class="forLabel">
                    <div class="uploadFile">
                    <el-upload
                        action="https://data.jesport.com/filecenter/image/upload"
                        list-type="picture-card"
                        :limit=1
                        name='img'
                        :on-success="imgupload3"
                        :on-preview="handlePictureCardPreview"
                        :file-list='permission_img'>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    </div>
                    <div slot="label">网络文化经营许可证</div>
                    </div>
                </el-form-item>
                <el-form-item >
                    <div class="forLabel">
                    <div class="uploadFile">
                    <el-upload
                        action="https://data.jesport.com/filecenter/image/upload"
                        list-type="picture-card"
                        name='img'
                        :limit=1
                        :on-success="imgupload4"
                        :on-preview="handlePictureCardPreview"
                        :file-list='building_flat_img'>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    </div>
                    <div slot=label>场所平面图</div>
                    </div>
                </el-form-item>
            </el-form>
            <!-- <el-button type="primary" @click="onSubmitLicense">提交营业证书</el-button> -->
         </div>

         <!-- 评级资料 -->
         <div class="borderItem">
            <div class="item-title">
                <span class="name"><i class="el-icon-menu" /> 评级资料</span>
            </div>
            <el-form :model="baseinfo" label-width="100px" label-position='right' class="item-content">
                <el-form-item label="申请星级" style="width:100%">
                    <el-radio-group v-model="ratePost.apply_star" size="small">
                        <el-radio :label="item.id" border v-for='item in starList' :key='item.id' style="margin:5px">{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="场所面积" style="width:100%">
                    <el-radio-group v-model="ratePost.area_option_id" size="small">
                        <el-radio :label="item.id" border v-for='item in areaList' :key='item.id' style="margin:5px;width:140px;">{{item.title}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="机位数量" style="width:100%">
                    <el-radio-group v-model="ratePost.mnum_option_id" size="small">
                        <el-radio :label="item.id" border v-for='item in mnumList' :key='item.id' style="margin:5px;width:240px;">{{item.title}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  label-position='top'>
                    <div slot="label">场所照片<br/>(至少3张)</div>
                    <el-upload
                        action="https://data.jesport.com/filecenter/image/upload"
                        list-type="picture-card"
                        name='img'
                        ref="uploads"
                        :limit=5
                        :on-preview="handlePictureCardPreview"
                        :on-success="spaceImgUpload"
                        :on-remove="spaceImgRemove"
                        :file-list='spaceimgList'>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label-width="0">
                    <el-button type="primary" @click="onSubmitRate">提交评级资料</el-button>
                </el-form-item> -->
            </el-form>
        </div>
         <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { roleName } from '@/utils/validate'
import waves from '@/directive/waves' // waves directive

import Audit from '@/components/Popup/audit.vue'
import { finished } from 'stream';

export default {
  name: 'Detail',
  directives: { waves },
  components:{Audit},
  data() {
    return {
        spaceimgList:[],
        finished:false,
        loading:false,
        num:['一','二','三','四','五'],
        baseinfo:{
            name:'',
            province:'',
            city:'',
            linkman:'',
            addr:'',
            tel:'',
        },
        license_img:[],
        fire_img:[],
        permission_img:[],
        building_flat_img:[],
        netbarInfo:{},
        imgList:[],
        provinceList:[],
        cityList:[],
        imageUrl:'',
        dialogImageUrl:'',
        dialogVisible:false,
        ratePost:{
            building_img1: "",
            building_img2: "",
            building_img3: "",
            building_img4: "",
            building_img5: "",
            building_img6: "",
            apply_star: 0,
            area_option_id: 0,
            mnum_option_id: 0,
            protocol_img: ""
        },
        starList:[
            {name:'五星',id:5},
            {name:'四星',id:4},
            {name:'三星',id:3},
            // {name:'二星',id:2},
            // {name:'一星',id:1}
        ],
        areaList:[],
        mnumList:[
            {
                id: 118, item_id: 161, title: ">=300个可以提供服务的机位"
            },
            {
                id: 119, item_id: 161, title: ">=250个可以提供服务的机位"
            },
            {
                id: 120, item_id: 161, title: ">=200个可以提供服务的机位"
            },
            {
                id: 121, item_id: 161, title: ">=100个可以提供服务的机位"
            },
            {
               id: 122, item_id: 161, title: ">=50个可以提供服务的机位"
            },
            {
                id: 123, item_id: 161, title: "<50个可以提供服务的机位"
            },
            
        ],
        steps:0,
    }
  },
  watch: {
      'baseinfo.province': {
         handler: function(val) {
            this.baseinfo.city=''
            this.getcity()
         },
     }
  },
  created(){
    this.getprovince();
    this.getNetbarInfo();
  },
  methods: {
      removeimg(){
          if(this.finished){
              this.$message.error('已提交审核，无法删除');
              return false;
          }
      },
    Allsubmit(){
        this.onSubmitBase();
    },
    infoFinished(){
        this.$router.push({path:'/'})
    },
    imgupload1(res,file,fileList){
        this.license_img[0]={name:'license_img',url:res.errMsg};
    },
    imgupload2(res,file,fileList){
        this.fire_img[0]={name:'fire_img',url:res.errMsg};
    },
    imgupload3(res,file,fileList){
        this.permission_img[0]={name:'permission_img',url:res.errMsg};
    },
    imgupload4(res,file,fileList){
        this.building_flat_img[0]={name:'building_flat_img',url:res.errMsg};
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    onSubmitBase(){
        let data={
            linkman : this.baseinfo.linkman,
            name : this.baseinfo.name,
            pid : this.baseinfo.province, 
            cid : this.baseinfo.city, 
            addr : this.baseinfo.addr,
            tel : this.baseinfo.tel
        }
        this.postAxios('boss/store/post',data).then(res=>{
            if(res.code==0){
                this.onSubmitLicense()
            }else{
                this.$message.error('请填写完成基本资料')
            }
        })
    },
    onSubmitLicense(){
        var data={
            license_img: this.license_img[0].url,
            fire_img: this.fire_img[0].url,
            permission_img: this.permission_img[0].url,
            building_flat_img:this.building_flat_img[0].url
        }
        this.postAxios('boss/cert/post',data).then(res=>{
            if(res.code==0){
                this.onSubmitRate();
            }else{
                this.$message.error('请提交营业证书')
            }
        })
    },
    spaceImgUpload(res,file,fileList){
        
        let obj={};
        obj.url=res.errMsg; 
        obj.name='building_img'+fileList.length;
        // this.spaceimgList.push(obj);
        this.spaceimgList=fileList
    },
    spaceImgRemove(file,fileList){
        var list=[]
        console.log(fileList)
        // fileList.forEach((item,index) => {
        //     var obj={};
        //     obj.name='building_img'+(index+1)
        //     obj.url=item.url
        //     list.push(obj)
        // });
        this.spaceimgList=fileList;
    },
    onSubmitRate(){
        var _this=this;
        var list=this.$refs.uploads.fileList;
        var list=this.spaceimgList;
        var postData={apply_star:this.ratePost.apply_star,area_option_id:this.ratePost.area_option_id,mnum_option_id:this.ratePost.mnum_option_id,protocol_img:''};
        // for(let x=0;x<5;x++){
        //     x<list.length?postData['building_img'+(x+1)]=list[x].url:postData['building_img'+(x+1)]='';
        // }
        list.forEach((item,index) => {
            if(item.response){
                postData['building_img'+(index+1)]=item.response.errMsg;
            }else{
                 postData['building_img'+(index+1)]=item.url;
            }
        });
        this.postAxios('boss/rate/post',postData).then(res=>{
            if(res.code==0){
                this.$message.success({
                    duration:2000,
                    type:'success',
                    message:'提交资料成功！',
                    onClose:function(){
                        // location.reload();
                        _this.postAxios('boss/real/post',{}).then(res=>{
                            if(res.code==0){
                                _this.$router.push({path:'/'});
                                // location.reload()
                            }
                        })
                    }
                })
            }else{
                this.$message.error('请填写完成评级资料')
            }
        })
    },
    getprovince(){
        this.postAxios('common/province/list',{}).then(res=>{
            this.provinceList=res.data.region_list;
        })
    },
    getNetbarInfo(){
        this.postAxios('boss/info/get',{member_id:this.$store.state.user.member_id}).then(res=>{
            if(res.code==0){
                this.netbarInfo=res.data;
                this.baseinfo.name = res.data.name;
                this.baseinfo.tel = res.data.tel;
                this.baseinfo.linkman = res.data.linkman;
                this.baseinfo.addr = res.data.full_addr;
                // this.license_img[0] = res.data.license_img==null?'':{url:res.data.license_img,name:'license_img'};
                res.data.license_img==null?'':this.license_img.push({url:res.data.license_img,name:'license_img'});
                res.data.fire_img==null?'':this.fire_img.push({url:res.data.fire_img,name:'fire_img'});
                res.data.permission_img==null?'':this.permission_img.push({url:res.data.permission_img,name:'permission_img'});
                res.data.building_flat_img==null?'':this.building_flat_img.push({url:res.data.building_flat_img,name:'building_flat_img'});
                this.ratePost.apply_star=res.data.apply_star;
                this.ratePost.area_option_id=res.data.area_option_id;
                this.ratePost.mnum_option_id=res.data.mnum_option_id;

                var list=[];
                for(let x=1;x<6;x++){
                    var obj={};
                    if(res.data['building_img'+x]!= null &&res.data['building_img'+x]!= ''){
                        obj.url=res.data['building_img'+x];
                        obj.name='building_img'+x
                        list.push(obj);
                    }
                }
                this.spaceimgList=list;
            }
            var num=0;
            this.baseinfo.name!=''?num++:'';
            (this.building_flat_img[0]&&this.building_flat_img[0].url!='')?num++:'';
            this.spaceimgList.length>0?num++:'';
            num>2?this.finished=true:this.finished=false;
        });
        
        this.postAxios('boss/option/list',{type:'area'}).then(res=>{
            this.areaList=res.data.options;
        });
        this.postAxios('boss/option/list',{type:'mnum'}).then(res=>{
            this.mnumList=res.data.options;
        })
    },
    getcity(){
        this.postAxios('common/city/list',{ids:this.baseinfo.province.toString()}).then(res=>{
            this.cityList=res.data.region_list;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: Default;
    }
    .rowcenter{
        text-align: center;
    }
    .filter-item{
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
    .forLabel{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    .uploadFile{
        width:156px;
        height:156px;
        overflow:hidden;
    }
    .borderItem{
        background-color: #fff;
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
        .item-content{
            margin:20px;
            padding: 0 20px
        }
        .remark{
            margin:20px auto;
            .item{
                display: flex;
                padding: 20px 0;
                border-bottom:1px solid #e5e5e5;
                &:last-child {
                    border-bottom: none;
                }
                .avatar{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid #868686;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
                .itemmain{
                    flex: 1;
                    .top{
                        display: flex;
                        justify-content: space-between;
                    }
                }
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

            .images-container,.name-container{
                display: flex;
                align-content: center;
                justify-content: space-around;
                .item{
                    flex: 1;
                    margin: 0 10px;
                    img{
                        width: 100%;
                        height: auto;
                    }
                    .name{
                        text-align: center;
                    }
                }
                
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