import { login, logout, getInfo, taskInfo } from '@/api/user'
import { getToken, setToken, removeToken ,setsessionInfo,getsessionInfo} from '@/utils/auth'
import { resetRouter } from '@/router'
const info=(getsessionInfo()== 'null'|| getsessionInfo()== null || !getsessionInfo())?{name:'',roleid:'',token:''}:JSON.parse(getsessionInfo());
const state = {
  viewDirection :'left',
  token: info.token,
  mobile: info.mobile,
  rank:info.rank,
  role_id:info.role_id,
  routerRole:info.routerRole,
  member_id:info.member_id,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, mobile) => {
    state.name = mobile
  },
  SET_ROLE: (state, roleid) => {
    state.roleid = roleid
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { mobile, code } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: mobile, code: code }).then(response => {
        
          const { data } = response;
          state.mobile=data.mobile;
          state.rank=data.rank;
          state.role_id=data.role_id;
          state.token=data.token;
          state.member_id=data.member_id;
          if(data.role_id==5){
            data.rank==-1?state.routerRole=2:state.routerRole=1;
          }else if(data.role_id==6){
            state.routerRole=3
          }else{
            state.routerRole=0
          }
          setsessionInfo(JSON.stringify(state));
          setToken(data.token)
          if(response.data.role_id!=7){
            logout().then(res=>{
              setsessionInfo(null);
              commit('SET_TOKEN', '')
              removeToken()
              resetRouter()
              resolve({code:404})
            });
          }else{
            resolve(data)
          }
        
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  taskInfo(){
    return new Promise((resolve, reject) => {
      taskInfo({task_id:0,member_id:state.member_id}).then(res => {
        res.code==0?state.routerRole=1:state.routerRole=0;
        setsessionInfo(JSON.stringify(state));
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response;
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { mobile, avatar } = data
        commit('SET_NAME', mobile)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        setsessionInfo(null);
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

