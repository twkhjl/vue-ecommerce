import { createStore } from 'vuex'
import router from '../router'

const apiRootURL = "http://twkhjl.duckdns.org:3001";
export default createStore({
  state: {
    api: {
      apiVerifyFrontUserTokenURL: `${apiRootURL}/jwt/front`,
      apiLoginFrontUserURL: `${apiRootURL}/login/front`,
      apiVerifyCpUserTokenURL: `${apiRootURL}/jwt/cp`,
      apiCatDataURL: `${apiRootURL}/cats`,

    },

    errMsg: {
      blank: "{0}欄位不可空白",
      emailFormat: '請輸入有效email格式',
      spaceBetween: "{0}欄位中間不可有空格",
      maxLength: "{0}欄位最大字元數為{1}",
      minLength: "{0}欄位最小字元數為{1}",
      exist: "{0} '{1}' 已存在",
      incorrect: "{0}不正確"
    },
    frontUser:{}

  },
  getters: {
  },
  mutations: {
    setFrontUserData(state,payload){
      state.frontUser = payload;
    },

    loginFrontUser(state, payload) {
      let frontUser = payload;
      frontUser.isLoggedIn = true;
      delete frontUser.token;
      delete frontUser.expiresIn;
      localStorage.setItem("user_front", JSON.stringify(frontUser));
      router.push({ name: "ShopPage" });
    },
    logoutFrontUser(state, payload) {
      localStorage.removeItem("token_front");
      localStorage.removeItem("user_front");

      state.frontUser = {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        isLoggedIn: false
      };

      // router.push({ name: "FrontLogin" });
    }
  },
  actions: {

    async verifyUserToken(context, payload) {
      let token_name = payload.token_name;
      let token = localStorage.getItem(token_name);
      let result = '';

      if (!token) {
        return Promise.resolve({ error: `blank:${token_name} do not exists` });
      }

      await fetch(payload.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 'token': token })
      }).then(res => res.json()).then(json => {
        result = Promise.resolve(json);
      }).catch(err=>{
        result = Promise.resolve(err);
      });
      return result;
    },
    async getData(context, payload) {
      
      let result='';
      await fetch(payload.url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then(res => res.json()).then(json => {
        result = Promise.resolve(json);
      }).catch(err=>{
        result = Promise.resolve(err);
      });
      return result;

    },
    async postData(context, payload) {
      
      let result='';
      await fetch(payload.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload.body)
      }).then(res => res.json()).then(json => {
        result = Promise.resolve(json);
      }).catch(err=>{
        result = Promise.resolve(err);
      });
      return result;

    },


  },
  modules: {
  }
})
