<template>
  <div class="app-container">
    <marquee :lists='lists'></marquee>
    <el-row>
      <div class="borderItem">
        <div class="item-title">
            <span class="name"><i class="el-icon-menu" /> 相关文档</span>
        </div>
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="docname"
                label="文件"
                width="180">
            </el-table-column>
            <el-table-column
                prop="ver"
                label="版本"
                width="180">
            </el-table-column>
            <el-table-column
                prop="size"
                label="大小">
            </el-table-column>
            <el-table-column
                prop="download"
                label="下载">
                <template slot-scope="scope">
                    <el-button  type="text" size="small"><a :download="scope.row.docname" :href="scope.row.url?scope.row.url:'https://rate.iasac.org.cn/bossAdmin/docs/'+scope.row.filename">中文版</a></el-button>
                    <!-- <el-button  type="text" size="small"><a download="pic" href="https://game.gtimg.cn/images/lol/act/a20190702loltftwf/zb-box.png">英文版</a></el-button> -->
                </template>
            </el-table-column>
            <el-table-column
                prop="info"
                label="说明">
            </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import marquee from '@/components/marquee'
import datajson from '@/utils/json.json'
import axios from 'axios'
export default{
  data(){
    return {
      lists:[
        '公告：请按照官方文件进行评级操作。',
      ],
      tableData:[],
      
    };
  },
  created(){
    this.tableData=datajson;
    // axios('https://rate.iasac.org.cn/bossAdmin/docs/json.json?v=1').then(res=>{
    //   if(res){
    //     console.log(res)
    //     this.tableData=res;
    //   }
    // })
  },
  components:{
    marquee,
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
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
  }
</style>