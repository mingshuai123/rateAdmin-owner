<template>
  <div class="app-container">
		<div class="page-title">
				<div class="left"><i class="el-icon-bell" /> 经营资料</div>
		</div>
    <el-alert title="完善场所经营信息，即可获得展示权限" type="warning"></el-alert>
    <!-- 场所图片 -->
    <div class="borderItem">
      <div class="item-title">
          <span class="name"><i class="el-icon-caret-right" />展示图(可上传5张)</span>
      </div>
      <el-form class="borderContent">
        <el-form-item label-width=0>
          <el-upload
            action="https://data.jesport.com/filecenter/image/upload"
            list-type="picture-card"
            name='img'
            ref="upload"
            :limit=5
            :on-preview="handlePictureCardPreview"
            :on-remove="spaceImgRemove"
            :on-success="spaceImgUpload"
            :file-list='imgList'>
            <i class="el-icon-plus"></i>
          </el-upload>
					</el-form-item>
  			</el-form>
    </div>
		<!-- 位置电话 -->
		<div class="borderItem">
      <div class="item-title">
          <span class="name"><i class="el-icon-caret-right" />位置/电话</span>
      </div>
			<el-form v-model="businessInfo" label-width="100px" label-position='right' class="borderContent">
				<el-form-item label="地址" style="width:80%">
						<el-input v-model="businessInfo.addr"></el-input>
				</el-form-item>
				<el-form-item label="电话" style="width:80%">
						<el-input v-model="businessInfo.tel"></el-input>
				</el-form-item>
				<el-form-item label-width="0" >
						<el-button type="primary" @click="onSubmitAddr">修改</el-button>
					</el-form-item>
			</el-form>
		</div>
		<!-- 提供服务 -->
		<div class="borderItem">
      <div class="item-title">
          <span class="name"><i class="el-icon-caret-right" />提供服务</span>
      </div>
			<el-form label-width="100px" label-position='right' class="borderContent">
				<el-checkbox-group v-model="configure_ids" size="small" style="margin-bottom:10px">
					<el-checkbox :label="item.id" v-for="(item,index) in configureList" :key="index" border style="margin:10px">{{item.name}}</el-checkbox>
				</el-checkbox-group>
				<el-form-item label-width="0">
						<el-button type="primary" @click="onSubmitConfig">修改</el-button>
					</el-form-item>
			</el-form>
		</div>
		<!-- 优惠活动 -->
		<div class="borderItem">
      <div class="item-title">
          <span class="name"><i class="el-icon-caret-right" />优惠活动</span>
          <span @click="handleAddprivilege"><i class="el-icon-edit" />添加</span>
      </div>
      <div class="borderContent">
        <el-table :data="privilegelist" border fit highlight-current-row style="width: 100%" empty-text='暂无数据'>
          <el-table-column min-width="300px" label="名称">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.name" maxlength='5' class="edit-input" size="small" placeholder="请输入名称(5字以内)" />
              </template>
              <span v-else>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="300px" label="详细信息">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.info" maxlength='20' class="edit-input" size="small" placeholder="请输入名称(20字以内)" />
              </template>
              <span v-else>{{ row.info }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="220" type='index'>
            <template slot-scope="{row, $index}">
              <el-button
                v-if="row.edit"
                type="success"
                size="small"
                icon="el-icon-circle-check-outline"
                @click="submitprivilege(row)"
              >
                提交
              </el-button>
              <el-button
                  v-if="row.edit"
                  class="cancel-btn"
                  size="small"
                  icon="el-icon-refresh"
                  type="warning"
                  @click="cancelEditprivilege(row, $index)"
                >
                  取消
              </el-button>
              <!-- <el-button v-if="!row.edit" @click="row.edit=!row.edit" >编辑</el-button> -->
              <el-button
                v-if="!row.edit"
                type="danger"
                size="small"
                icon="el-icon-edit"
                @click="delprivilege(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
			
		</div>
		<!-- 菜单 -->
		<div class="borderItem">
      <div class="item-title">
          <span class="name"><i class="el-icon-caret-right" />菜单</span>
          <span @click="updataMenu"><i class="el-icon-edit" />修改</span>
      </div>
      <div class="borderContent">
        <el-table :data="menuList" border fit highlight-current-row style="width: 100%" empty-text='暂无数据'>
          <el-table-column label="名称" prop='name'></el-table-column>
          <el-table-column label="价格" prop='num'></el-table-column>
          <el-table-column label="单位" prop='unit'></el-table-column>
          <el-table-column label="类型" prop="typename"></el-table-column>
        </el-table>
      </div>
		</div>
    <!-- 活动信息 -->
		<div class="borderItem" style="margin-bottom:50px">
      <div class="item-title">
          <span class="name"><i class="el-icon-caret-right" />活动信息</span>
          <span @click="handleAddact"><i class="el-icon-edit" />添加</span>
      </div>
      <div class="borderContent">
        <el-table :data="activitylist" border fit highlight-current-row style="width: 100%" empty-text='暂无数据'>
          <el-table-column max-width="300px" label="活动图片">
            <template slot-scope="{row}">
              <img :src="row.img" alt="" style="width:100%;">
            </template>
          </el-table-column>
          <el-table-column  label="活动名称" prop="name"></el-table-column>
          <el-table-column  label="活动介绍" prop="intro"></el-table-column>
          <el-table-column  label="活动时间" prop="start_date"></el-table-column>
          <el-table-column align="center" label="操作" width="220">
            <template slot-scope="{row}">
            <el-button
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="updataAct(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="delAct(row)"
            >
              删除
            </el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>
			
		</div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- 菜单弹框 -->
    <el-dialog :visible.sync="menuPoupshow" title="修改菜单" width='75%' :before-close="menuClose">
      <el-table :data="menuListupdate" border fit highlight-current-row style="width: 100%">
				<el-table-column  label="名称">
          <template slot-scope="{row}">
              <el-input v-model="row.name" />
          </template>
        </el-table-column>
        <el-table-column  label="价格">
          <template slot-scope="{row}">
              <el-input v-model="row.num"  placeholder="默认单位为 元" />
          </template>
        </el-table-column>
        <el-table-column  label="单位">
          <template slot-scope="{row}">
              <el-input v-model="row.unit" placeholder="如: 小时; 杯 等" />
          </template>
        </el-table-column>
        <el-table-column  label="类型">
          <template slot-scope="{row}">
               <el-select v-model="row.type" placeholder="请选择">
                <el-option
                  v-for="item in menutype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </template>
        </el-table-column>
        <el-table-column  label="操作" type='index' width="100px">
          <template slot-scope="{row,$index}">
              <el-button
              type="danger"
              size="small"
              icon="el-icon-circle-close-outline"
              @click="delMenu(row,$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addmenu" type="warning">添加</el-button>
        <el-button @click="menuClose" >取 消</el-button>
        <el-button type="primary" @click="submitMenu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 活动弹框 -->
    <el-dialog :visible.sync="actPoupshow" title="活动" width='60%' :before-close="actClose" >
      <div style=" max-width:180px;margin:10px auto">
      <el-upload
        class="avatar-uploader"
        action="https://data.jesport.com/filecenter/image/upload"
        name='img'
        :show-file-list="false"
        :on-success="handleImgSuccess">
        <img v-if="actItem.img" :src="actItem.img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </div>
      <el-form label-width="80px" >
        <el-form-item :model="actItem" label="活动名称">
          <el-input v-model="actItem.name"></el-input>
        </el-form-item>
        <el-form-item :model="actItem" label="活动介绍">
          <el-input v-model="actItem.intro"></el-input>
        </el-form-item>
        <el-form-item :model="actItem.start_date" label="开始时间">
          <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="actItem.start_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="actClose" >取 消</el-button>
        <el-button type="primary" @click="submitAct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList:[],
			privilegelist:[],
      menuList:[],
      menuListupdate:[],
      menutype:[{value:'FOOD',label:'餐饮'},{value:'NET',label:'网络'}],
      activitylist:[],
      businessInfo:{},
			configureList:[],
      configure_ids:[],
      actPoupshow:false,
      actType:'create',
      actItem:{
        id:0,
        name: "",
        intro: "",
        img: "",
        start_date: ""},
      // 查看图片
      dialogImageUrl:'',
			dialogVisible:false,
      spaceimgList:[],
      // 菜单
      menuPoupshow:false,
    }
  },
  created() {
    this.getNetbarInfo();
  },
  methods: {
    // 活动弹框
		handleAddact(){
      var obj={
        id:0,
        name: "",
        intro: "",
        img: "",
        start_date: ""
      }
      this.actType='create'
      this.actPoupshow=true;
    },
    updataAct(row){
      this.actItem=row;
      this.actType='updata';
      this.actPoupshow=true;
    },
    delAct(row){
      var that=this;
      this.postAxios('boss/business/handler',{type:'delactivity',id:row.id}).then(res=>{
        if(res.code==0){
          that.$message({
            type:'success',
            message:'删除成功',
          })
          this.getActivityList();
        }
      })
    },
    actClose(){
      this.actItem={
        id:0,
        name: "",
        intro: "",
        img: "",
        start_date: ""};
      this.actPoupshow=false;
    },
    submitAct(){
      var data={},that=this;
      if(this.actType=='create'){
        data=this.actItem;
        data.type='addactivity'
      }else{
        data=this.actItem;
        data.type='editactivity'
      }
      this.postAxios('boss/business/handler',data).then(res=>{
        if(res.code==0){
          that.$message({
            type:'success',
            message:'添加成功',
          })
          this.getActivityList();
          this.actPoupshow=false;
        }
      })
    },
    handleImgSuccess(res){
      this.actItem.img=res.errMsg;
    },
    // 菜单
    menuClose(){
      var list=this.menuList
      this.menuListupdate =JSON.parse(JSON.stringify(list));
      this.menuPoupshow=false;
    },
    updataMenu(){
      this.menuPoupshow=true;
    },
    addmenu(){
      let obj={
        name:'',type:'NET',unit:'',num:'',id:0
      }
      this.menuListupdate.push(obj);
    },
    delMenu(row,index){
      var that=this;
      this.menuListupdate.splice(index,1);
      console.log(row)
      var data={
        type:'delmenu',
        id:row.id
      }
      this.postAxios('boss/business/handler',data).then(res=>{
        if(res.code==0){
          that.$message({
            type:'success',
            message:'添加成功',
          })
          this.getMenuList();
          this.menuPoupshow=false;
        }
      })
    },
    submitMenu(){
      var list=this.menuListupdate;
      var data={type:'addmenu',name:'',unit:'',num:'',menu_type:'',ids:''};
      let name=[],num=[],unit=[],type=[],ids=[];
      list.forEach(item=>{
        console.log(item)
        name.push(item.name)
        num.push(item.num)
        unit.push(item.unit)
        type.push(item.type)
        ids.push(item.id)
      })
      data.name=name.join(',')
      data.num=num.join(',')
      data.unit=unit.join(',')
      data.menu_type=type.join(',')
      data.ids=ids.join(',')
      var that=this;
      this.postAxios('boss/business/handler',data).then(res=>{
        if(res.code==0){
          that.$message({
            type:'success',
            message:'添加成功',
          })
          this.getMenuList();
          this.menuPoupshow=false;
        }
      })
    },
    // 优惠活动
    delprivilege(row){
      var that=this;
      this.postAxios('boss/business/handler',{type:'delprivilege',id:row.id}).then(res=>{
        if(res.code==0){
          that.$message({
            type:'error',
            message:'删除成功',
          })
          this.getprivilege();

        }
      })
    },
    handleAddprivilege(){
      let obj={name:'',info:'',oldinfo:'',oldname:'',edit:true,id:0};
      this.privilegelist.push(obj);
    },
    cancelEditprivilege(row,index){
      if(row.id==0){
        this.privilegelist.splice(index,1)
      }
    },
    submitprivilege(row){
      var that=this;
      var ids=this.configure_ids.join(',')
      this.postAxios('boss/business/handler',{type:'addprivilege',name:row.name,info:row.info}).then(res=>{
        if(res.code==0){
          this.getprivilege();
          that.$message({
            type:'success',
            message:'添加成功',
          })
        }
      })
    },
    // 提交服务信息
    onSubmitConfig(){
      var that=this;
      var list=this.configure_ids.slice(1)
      var ids=list.join(',');
      console.log(list)
      console.log(ids)
      this.postAxios('boss/business/handler',{type:'configure',ids:ids}).then(res=>{
        if(res.code==0){
          that.$message({
            type:'success',
            message:'修改成功',
          })
        }
      })
    },
    // 提交位置/电话
    onSubmitAddr(){
      var that=this;
      this.postAxios('boss/business/handler',{type:'info',addr:this.businessInfo.addr,tel:this.businessInfo.tel}).then(res=>{
        if(res.code==0){
          that.$message({
            type:'success',
            message:'修改成功',
            // onClose:function(){
            //   location.reload();
            // }
          })
        }
      })
    },
    // 提交展示图
		spaceImgUpload(data,file,fileList){
      var that=this;
      this.postAxios('boss/business/handler',{type:'addimg',img:data.errMsg}).then(res=>{
        if(res.code==0){
          that.$message({
            type:'success',
            message:'添加成功',
            onClose:function(){
              location.reload();
            }
          })
        }
      })
    },
    // 删除展示图
    spaceImgRemove(file,fileList){
      var that=this;
      console.log(file)
      console.log(fileList)
      this.postAxios('boss/business/handler',{type:'delimg',pos:file.name}).then(res=>{
        if(res.code==0){
          that.$message({
            type:'success',
            message:'删除成功',
            onClose:function(){
              location.reload();
            }
          })
        }
      })
    },
  // onSubmitRate(){
    //     var list=this.$refs.upload.fileList;
    //     var postData={apply_star:this.ratePost.apply_star,area_option_id:this.ratePost.area_option_id,mnum_option_id:this.ratePost.mnum_option_id,protocol_img:''};
    //     for(let x=0;x<5;x++){
    //         x<list.length?postData['building_img'+(x+1)]=list[x].url:postData['building_img'+(x+1)]='';
    //     }
    //     console.log(postData)
    //     this.postAxios('boss/rate/post',postData).then(res=>{
    //         if(res.code==0){
    //             this.$message.success({
    //                 duration:2000,
    //                 type:'success',
    //                 message:'提交评级资料成功！',
    //                 onClose:function(){
    //                     location.reload();
    //                 }
    //             })
    //         }
    //     })
  // },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    getNetbarInfo(){
        this.postAxios('boss/showinfo/get',{member_id:0}).then(res=>{
            if(res.code==0){
                this.businessInfo=res.data;
                var list=[];
                for(let x=1;x<6;x++){
                  if(res.data['building_img'+x]!=''){
                    var obj={}
                    obj.url=res.data['building_img'+x];
                    obj.name='building_img'+x
                    list.push(obj);
                  }
                }
                this.imgList=list; 
                // 服务列表
                let configure_ids=res.data.configure_ids.split(',');
                configure_ids.forEach(item=>{
                  this.configure_ids.push(Number(item));
                })
            }
        });
        this.postAxios('boss/configure/list',{}).then((res)=>{
          if(res.code==0){
            let rlist = res.list;
            this.configureList=rlist;
          }
        });
        this.getprivilege();
        this.getMenuList();
        this.getActivityList();
        this.postAxios('common/task/info',{member_id:this.$store.state.user.member_id,task_id:0}).then(res=>{
            if(res.code==0){
                this.stateInfo=res.info;
            }
        })
    },
    getMenuList(){
      this.postAxios('boss/menu/list',{}).then((res)=>{
          if(res.code==0){
            let rlist = res.list;
            rlist.forEach(item=>{
              item.typename=item.type=='NET'?'网络':'餐饮'
            })
            this.menuList=JSON.parse(JSON.stringify(rlist));
            this.menuListupdate=JSON.parse(JSON.stringify(rlist));
          }
        });
    },
    getprivilege(){
      this.postAxios('boss/privilege/list',{}).then((res)=>{
          if(res.code==0){
            let rlist = res.list;
            rlist.forEach(item => {
              item.edit=false;
              item.oldname=item.name;
              item.oldinfo=item.info;
            });
            this.privilegelist=rlist;
          }
        });
    },
    getActivityList(){
      this.postAxios('boss/activity/list',{}).then((res)=>{
          if(res.code==0){
            let rlist = res.list;
            this.activitylist=rlist;
          }
        });
    }
  }
}
</script>
<style lang="scss" scoped>
	.page-title{
		margin-bottom: 30px;
		font-weight:bolder;
	}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
  .borderItem{
    background-color: #ffffff;
    margin: 10px auto;
    border:1px solid #e5e5e5;
    border-radius:5px;
    padding:10px;
    .item-title{
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        color: cornflowerblue;
        font-size: 14px;
        margin-bottom: 10px;
        .name{
            font-weight: bold;
            color: darkblue;
            font-size: 18px;
        }
        span:last-child{
            cursor: pointer;
        }
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
</style>

