import router  from './router' 
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register'] // no redirect whitelist

var routerjs= require('./router/index.js')
// var getLastUrl=(str,yourStr)=>str.slice(str.lastIndexOf(yourStr));
router.beforeEach(async(to, from, next) => {
  if(to.name === undefined){
    var c = sessionStorage.getItem('pathName');
    var dynamicRouter=routerjs.dynamicRouter;
    var dR = new Array(),role=store.state.user.routerRole;
    // for (let i=0;i<dynamicRouter.length;i++){
    //   for (let j=0;j<dynamicRouter[i].meta.roles.length;j++){
    //     if (dynamicRouter[i].meta.roles[j] == store.state.user.routerRole ){
    //       if(dynamicRouter[i].children && dynamicRouter[i].children.length>0){
    //         let dRc=new Array();
    //         for(let k=0;k<dynamicRouter[i].children.length;k++){
    //           if(dynamicRouter[i].children[k].meta.roles && dynamicRouter[i].children[k].meta.roles.indexOf(store.state.user.routerRole)>0){
    //             dRc.push(dynamicRouter[i].children[k])
    //           }
    //         }
    //         dRc.length>0?dynamicRouter[i].children=dRc:false;
    //       }
    //       dR.push(dynamicRouter[i]);
    //     }
    //   }
    // }

    dynamicRouter.forEach((item) => {
      if((item.meta.roles<= role || item.meta.roles==0) && item.children){
        let dR2=new Array();
        item.children.forEach(xx=>{
          if(xx.meta.roles <= role || xx.meta.roles==0){
            dR2.push(xx)
          }
          dR2.length>0?item.children=dR2:false;
        })
        dR.push(item);
      }
    });
    router.addRoutes(dR);
    router.options.routes=router.options.routes.concat(dR);
    sessionStorage.setItem('addRouter',true)
    router.push({path:c})
  }

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

// 切换效果start
  const list = ['login', 'register','Apply']  // 将需要切换效果的路由名称组成一个数组
  const toName = to.name  // 即将进入的路由名字
  const fromName = from.name  // 即将离开的路由名字
  const toIndex = list.indexOf(toName)  // 进入下标
  const fromIndex = list.indexOf(fromName)  // 离开下标
  let direction = ''
 
  if (toIndex > -1 && fromIndex > -1) {  // 如果下标都存在
   if (toIndex < fromIndex) {     // 如果进入的下标小于离开的下标，那么是左滑
    direction = 'left'
   } else {
    direction = 'right'     // 如果进入的下标大于离开的下标，那么是右滑
   }
  }
  store.state.user.viewDirection = direction //这里使用vuex进行赋值
// 切换效果end

  // determine whether the user has logged in
  const hasToken = getToken()
  // const roleid=store.state.user.role_id;
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done();
    } 
    else {
      // const hasGetUserInfo = store.state.user.netbarState
      // if (!hasGetUserInfo && (to.path != '/Apply')) {
      //   next({ path: '/Apply' });
      // } else if(hasGetUserInfo  && to.path == '/Apply'){
      //   next({path:'/'});
      // }else{
      //   next();
      // }
      next();
      NProgress.done();
    }

  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
