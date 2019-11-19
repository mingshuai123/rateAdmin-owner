<template>
  <div class="credits-container">
    <div class="page-title">
        <div class="left"><i class="el-icon-bell" /> 积分兑换</div>
        <div class="right">可用积分 {{amount}}</div>
    </div>
    <div class="content" >
      <div class="title">五星场所可兑换</div>
        <div class="shopList" id="shopList" >
            <div class="item" v-for="item in shopList" :key='item.id'>
                <div><img :src="item.img" alt=""></div>
                <router-link :to="'/credits/creditsInfo?id='+item.id"><div class="shopbtn">{{item.amount}}积分 兑换</div></router-link>
            </div>
        </div>
    </div>
    <div class="content" >
      <div class="title">四星场所可兑换</div>
        <div class="shopList" id="shopList" >
            <div class="item" v-for="item in shopList" :key='item.id'>
                <div><img :src="item.img" alt=""></div>
                <router-link :to="'/credits/creditsInfo?id='+item.id"><div class="shopbtn">{{item.amount}}积分 兑换</div></router-link>
            </div>
        </div>
    </div>
    <div class="content" >
      <div class="title">三星场所可兑换</div>
        <div class="shopList" id="shopList" >
            <div class="item" v-for="item in shopList" :key='item.id'>
                <div><img :src="item.img" alt=""></div>
                <router-link :to="'/credits/creditsInfo?id='+item.id"><div class="shopbtn">{{item.amount}}积分 兑换</div></router-link>
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
      amount:0,
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
      display: flex;
      justify-content: space-between;
      .right{
        font-size: 20px;
        font-weight: normal;
      }
    }
    .content{
      padding: 10px;
      .title{
        margin-bottom: 10px;
        font-size: 20px;
        color: #409EFF;
        font-weight: bolder;
      }
      .shopList{
        margin: 10px;
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        .item{
          width: 260px;
          display: flex;
          flex-direction: column;
          margin: 10px;
          img{
            width: 260px;
          }
          .shopbtn{
            text-align: center;
            width: 160px;
            height: 40px;
            line-height: 40px;
            margin: 20px auto;
            border: 1px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            background-color: #409EFF;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

