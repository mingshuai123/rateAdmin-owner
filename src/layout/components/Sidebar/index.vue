<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="(route,index) in routes" :key="index" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import {router,dynamicRouter} from '@/router'
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      var hasAdd=JSON.parse(sessionStorage.getItem('addRouter'));
      if(!hasAdd){
        var dR = new Array(),role=this.$store.state.user.routerRole;
        dynamicRouter.forEach((item) => {
          if((item.meta.roles<=role|| item.meta.roles==0) && item.children){
            let dR2=new Array();
            item.children.forEach(xx=>{
              if(xx.meta.roles <= role|| xx.meta.roles==0){
                dR2.push(xx)
              }
              dR2.length>0?item.children=dR2:false;
            })
            dR.push(item);
          }
        });
        // for (let i=0;i<dynamicRouter.length;i++){
        //   for (let j=0;j<dynamicRouter[i].meta.roles.length;j++){
        //     if (dynamicRouter[i].meta.roles[j] == this.$store.state.user.routerRole ){
        //       if(dynamicRouter[i].children && dynamicRouter[i].children.length>0){
        //         let dRc=new Array();
        //         for(let k=0;k<dynamicRouter[i].children.length;k++){
        //           if(dynamicRouter[i].children[k].meta.roles && dynamicRouter[i].children[k].meta.roles.indexOf(this.$store.state.user.routerRole)>0){
        //             console.log(dynamicRouter[i].children[k])
        //             dRc.push(dynamicRouter[i].children[k])
        //           }
        //         }
        //         dRc.length>0?dynamicRouter[i].children=dRc:false;
        //       }
        //       dR.push(dynamicRouter[i]);
        //     }
        //   }
        // }
        this.$router.addRoutes(dR);
        this.$router.options.routes=this.$router.options.routes.concat(dR);
      }
      sessionStorage.setItem('addRouter',false)
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
