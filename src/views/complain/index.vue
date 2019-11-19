<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ memberInfo.name }}</div> -->
    <div class="page-title">
      <div class="left">投诉与反馈</div>
    </div>
    
    <div class="filter-container" style="">
      <div class="item">
        <span>项 目 </span>
        <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="item">
        <span>子项目 </span>
        <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
        </el-select>
      </div>
      <div class="item">
        <span>处理状态 </span>
        <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </div>
      <div class="item">
        <span class="demonstration">提交时间：</span>
        <el-date-picker
          v-model="searchDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="item">
        <el-button v-waves class="filter-item"  type="primary" icon="el-icon-search" @click="handleFilter">Search</el-button>
      </div>
    </div>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      empty-text='暂无数据'
      >

      <el-table-column label="编号" prop="id"  align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投诉项目"  align="center">
        <template slot-scope="scope">
          <span>{{ roletype[scope.row.role_id]  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="子项目"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pending_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.working_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timeout_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.finish_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.finish_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDel(row,'deleted')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
export default {
  name: 'Myspace',
  directives: { waves },
  data() {
    return {
      list:[],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '0'
      },
      filtrate:{pn:1,type:'',status:'',subtype:'',startdate:'',enddate:'',days:''},
      searchDate:'',
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: '全部', key: '0' },{ label: '已处理', key: '1' }, { label: '未处理', key: '2' }],
      statusOptions: ['published', 'draft', 'deleted'],
    }
  },
  watch:{
    searchDate:function(val){
      console.log(val)
    }
  },
  created (){
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px;
  .page-title{
    margin-bottom: 30px;
    font-weight:bolder;
  }
  .filter-container{
    margin-bottom:20px;
    display:flex;
    flex-wrap:wrap;
    .item{
      margin: 10px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>
