<template>
  <div class="credits-container">
    <div class="page-title">
        <div class="left"><i class="el-icon-bell" /> 商品详情</div>
    </div>
    <div class="content" >
      <div class="nowitem">
        <img :src="nowitem.img?nowitem.img:'//static.iasac.org.cn/svrbackend/bms/images/1.png'" alt="" style="width: 260px;margin-bottom:20px">
        <div class="item"> <div class="name">商品名称</div><div class="info">{{nowitem.name}}</div></div>
        <div class="item"> <div class="name">所需积分</div><div class="info">{{nowitem.price}}</div></div>
        <div class="item"> <div class="name">兑换方式</div><div class="info">兑换后，请联系客服，确认时间。</div></div>
        <div class="item"> <div class="name">兑换要求</div><div class="info">五星场所</div></div>
        <div class="actionBar" style="text-align: center;margin-top:20px;">
            <el-button type='success' class="buttonNext btn btn-success" @click="confirm()">确认兑换</el-button>
            <el-button type='danger' class="buttonNext btn btn-danger" @click="cancel()">取消兑换</el-button>
        </div>
      </div>
    </div>
    
</div>
</template>
<script>
export default {
  name:'credits',
  data(){
    return {
      shopid:0,
      nowitem:{},
       shopList: [
        {
          "id": 8,
          "netbarId": -1,
          "netbarName": "官方",
          "memberId": 0,
          "officialGoodsId": 0,
          "name": "王者荣耀服务器特权",
          "memo": "",
          "img": "https://static.iasac.org.cn/images/officil_goods/2018-07-13/1531465353111M5T.jpg",
          "amount": 500,
          "stock": 0,
          "validDays": 30,
          "orderCnt": 0,
          "state": 0,
          "createdDate": "2018-07-02 15:44:31",
          "endDate": "2018-08-01 15:44:31",
          "price": "500"
        }, {
          "id": 7,
          "netbarId": -1,
          "netbarName": "官方",
          "memberId": 0,
          "officialGoodsId": 0,
          "name": "英雄联盟服务器特权",
          "memo": "",
          "img": "https://static.iasac.org.cn/images/officil_goods/2018-07-13/1531465339389MDU.jpg",
          "amount": 500,
          "stock": 0,
          "validDays": 30,
          "orderCnt": 0,
          "state": 0,
          "createdDate": "2018-07-02 15:44:31",
          "endDate": "2018-08-01 15:44:31",
          "price": "500"
        }, {
          "id": 2,
          "netbarId": -1,
          "netbarName": "官方",
          "memberId": 0,
          "officialGoodsId": 0,
          "name": "绝地求生服务器特权",
          "memo": "",
          "img": "https://static.iasac.org.cn/images/officil_goods/2018-07-13/1531465319255NRS.jpg",
          "amount": 500,
          "stock": 0,
          "validDays": 30,
          "orderCnt": 0,
          "state": 0,
          "createdDate": "2018-07-02 15:44:31",
          "endDate": "2018-08-01 15:44:31",
          "price": "500"
        }
      ],
    }
  },
  created(){
    var data=this.$route.query
    this.shopid=data.id;
    this.shopList.forEach(item=>{
        console.log(item)
      if(item.id==this.shopid){
        this.nowitem=item;
      }
    })
  },
  methods:{
    confirm(){
      this.$message.error("积分不足")
    },
    cancel(){
      this.$router.back(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
.credits {
  &-container {
    padding: 30px;
    .page-title{
      font-size: 28px;
      margin-bottom: 30px;
      font-weight:bolder;
    }
    .content{
      background: #fff;
      padding: 10px;
      .nowitem{
        display: flex;
        flex-direction: column;
        width: 400px;
        img{
          margin: 0 auto;
        }
        .item{
          display: flex;
          line-height: 30px;
          .name{
            width: 100px;
            margin-right: 20px;
            text-align: right;
          }
          .info{
            flex: 1;
            padding-left: 10px;
            font-weight: bold;
          }
        }
      }
      
    }
  }
}
</style>

