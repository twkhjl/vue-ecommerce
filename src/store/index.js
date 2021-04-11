import { createStore } from 'vuex'
import router from '../router'

const apiRootURL = process.env.VUE_APP_API_ROOT_URL;
const apiVerifyFrontUserTokenURL=apiRootURL + process.env.VUE_APP_API_VERIFY_FRONT_USER_TOKEN_URL;
const apiVerifyCpUserTokenURL=apiRootURL + process.env.VUE_APP_API_VERIFY_CP_USER_TOKEN_URL;

const apiShowSingleShoppingCartURL = apiRootURL + process.env.VUE_APP_API_SHOW_SINGLE_SHOPPING_CART_URL;
const apiAddItemToCartURL = apiRootURL + process.env.VUE_APP_API_ADD_ITEM_TO_CART_URL;

const apiGetUserOrderURL = apiRootURL+process.env.VUE_APP_API_GET_USER_ORDER_URL;
const apiCancelOrderURL = apiRootURL+process.env.VUE_APP_API_CANCEL_ORDER_URL;
export default createStore({
  state: {
    ttt:'',
    commFn: {
      isJSON(str) {
        try {
          return (JSON.parse(str) && !!str);
        } catch (e) {
          return false;
        }
      },
      mergeObjArr(a, b, p) {
        return a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);
      }
    },
    scripts: {
      front: [
        // Main jQuery
        // {
        //   src: "/assets_front/plugins/jquery/dist/jquery.min.js",
        // },

        // Bootstrap 3.3.7
        {
          src: "/assets_front/plugins/bootstrap/js/bootstrap.min.js",
        },

        // Bootstrap Touchpin
        {
          src: "/assets_front/plugins/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js",
        },

        // Instagram Feed Js
        {
          src: "/assets_front/plugins/instafeed-js/instafeed.min.js",
        },

        // Video Lightbox Plugin
        {
          src: "/assets_front/plugins/ekko-lightbox/dist/ekko-lightbox.min.js",
        },

        // Count Down Js
        {
          src: "/assets_front/plugins/SyoTimer/build/jquery.syotimer.min.js",
        },

        // Revolution Slider
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/jquery.themepunch.tools.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/jquery.themepunch.revolution.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/jquery.themepunch.tools.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/jquery.themepunch.revolution.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.actions.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.carousel.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.kenburn.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.layeranimation.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.migration.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.navigation.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.parallax.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.slideanims.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.video.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/revolution/js/extensions/revolution.extension.video.min.js",
        // },
        // {
        //   src: "/assets_front/plugins/revolution-slider/assets/warning.js",
        // },


        // Google Mapl
        // {
        //   src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCC72vZw-6tGqFyRhhg5CkF2fqfILn2Tsw",
        // },
        // {
        //   src: "/assets_front/plugins/google-map/gmap.js",
        // },

        // Main Js File
        {
          src: "/assets_front/js/script.js",
        },



      ],
      cp: [
        // {
        //   src: "https://code.jquery.com/jquery-3.6.0.min.js",
        //   integrity: "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=",
        //   crossorigin: "anonymous",
        // },
        {
          src:
            "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns",
          crossorigin: "anonymous",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/dropzone@5.9.2/dist/dropzone.min.js"
        },
        {
          src: "https://cdn.jsdelivr.net/npm/admin-lte@3.1.0/dist/js/adminlte.min.js"
        }
      ],

    },

    api: {
      apiLoginCpUserURL: `${apiRootURL}/login/cp`,
      apiVerifyFrontUserTokenURL: `${apiRootURL}/jwt/front`,
      apiLoginFrontUserURL: `${apiRootURL}/login/front`,
      apiVerifyCpUserTokenURL: `${apiRootURL}/jwt/cp`,

      apiCatDataURL: `${apiRootURL}/cats`,

      apiProductsURL: `${apiRootURL}/products`,
      apiGetSingleProductURL: `${apiRootURL}/product/`,

      // apiGetShoppingCartsURL: `${apiRootURL}/shoppingCarts/`,
      apiShowSingleShoppingCartURL: `${apiRootURL}/shoppingCart/show/`,
      apiUpdateCartItemsURL: `${apiRootURL}/shoppingCart/items/update`,
      apiAddItemToCartURL: `${apiRootURL}/shoppingCart/item/add`,
      apiRemoveItemFromCartURL: `${apiRootURL}/shoppingCart/item/remove`,
      apiClearCartURL: `${apiRootURL}/shoppingCart/cart/items/remove/all`,

      apiPlaceOrderURL: `${apiRootURL}/order/add`,



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
    frontUser: {},
    cart_items:[]
  },
  getters: {
    getTotal: (state) => (cart_items) => {
      if (!cart_items || cart_items.length <= 0) return 0;
      let total = 0;

      cart_items.forEach((v) => {
        total += v.price * v.qty * 1 || 0;
      });
      return total;
    },
    alert: (state) => (title) => {
      swal.fire({
        title: title,
        showClass: {
          popup: "",
          icon: "",
        },
        hideClass: {
          popup: "",
        },
      });

    },
    errorAlert:(state)=>{
      swal.fire({
        title: "系統錯誤,請聯絡管理員",
        showClass: {
          popup: "",
          icon: "",
        },
        hideClass: {
          popup: "",
        },
      });
    }
    
  },
  mutations: {

    appendScripts(state, payload) {

      const scripts = state.scripts[payload.type] || [];
      if (scripts.length <= 0 || !scripts) return;

      scripts.forEach((o) => {
        let recaptchaScript = document.createElement("script");
        for (let k in o) {
          recaptchaScript.setAttribute(k, o[k]);
        }
        document.body.appendChild(recaptchaScript);
      });
    },
    setFrontUserData(state, payload) {
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
    },
    removeFrontUserLocalData(state, payload) {
      localStorage.removeItem(`token_front`);
      localStorage.removeItem(`user_front`);
      localStorage.removeItem(`cart`);

      // router.push({ name: "FrontLogin" });
    }
  },
  actions: {

    async verifyUserToken(context, payload) {
      let token_name = payload.token_name;
      let token = localStorage.getItem(token_name);
      let result = '';
      let url='';
      
      if(!token_name || !['token_front','token_cp'].includes(token_name)){
        return Promise.resolve({ error: `invalid token name` });
      }
      if (!token) {
        return Promise.resolve({ error: `blank:${token_name} do not exists` });
      }
      if(token_name=='token_front'){
        url=apiVerifyFrontUserTokenURL;
      }else{
        url=apiVerifyCpUserTokenURL;
      }

      await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 'token': token })
      }).then(res => res.json()).then(json => {
        result = Promise.resolve(json);
      }).catch(err => {
        result = Promise.resolve(err);
      });
      return result;
    },
    async getData(context, payload) {
      function isJSON(str) {
        try {
          return (JSON.parse(str) && !!str);
        } catch (e) {
          return false;
        }
      }

      let result = '';
      await fetch(payload.url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then(res => res.json()).then(res => {
        result = Promise.resolve(res);
      }).catch(err => {
        result = Promise.resolve({ error: err });
      });
      return result;

    },
    async postData(context, payload) {

      let result = '';
      await fetch(payload.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload.body)
      }).then(res => res.json()).then(json => {
        result = Promise.resolve(json);
      }).catch(err => {
        result = Promise.resolve({ error: err });
      });
      return result;

    },
    async handleData(context, payload) {

      let result = '';
      await fetch(payload.url, {
        method: payload.method,
        headers: payload.headers,
        body: JSON.stringify(payload.body)
      }).then(res => res.json()).then(res => {
        result = Promise.resolve(res);
      }).catch(err => {
        result = Promise.resolve({ error: err });
      });
      return result;

    },
    async getCart(context, payload) {

      let result = '';
      const url = apiShowSingleShoppingCartURL;
      await fetch(url, {
        method: 'GET',
        headers: { authorization: localStorage.getItem("token_front") },
      }).then(res => res.json()).then(res => {
        result = Promise.resolve(res);
      }).catch(err => {
        result = Promise.resolve({ error: err });
      });
      return result;

    },
    async addToCart(context, payload) {
      let result = '';
      const url = apiAddItemToCartURL;
      await fetch(url, {
        method: 'POST',
        headers: {
          authorization: localStorage.getItem("token_front"),
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          item: {
            product_id: payload.product.id,
            name: payload.product.name,
            imgs: payload.product.imgs,
            qty: payload.product.qty || 1,
            price: payload.product.price,
          }
        })
      }).then(res => res.json()).then(res => {
        result = Promise.resolve(res);
      }).catch(err => {
        result = Promise.resolve({ error: err });
      });
      return result;

    },
    async getUserOrder(context, payload) {
      let result = '';
      const url = apiGetUserOrderURL;
      await fetch(url, {
        method: 'GET',
        headers: {
          authorization: localStorage.getItem("token_front"),
          'content-type': 'application/json'
        }
        
      }).then(res => res.json()).then(res => {
        result = Promise.resolve(res);
      }).catch(err => {
        result = Promise.resolve({ error: err });
      });
      return result;

    },
    async cancelOrder(context, payload) {
      let result = '';
      const url = apiCancelOrderURL+'/'+payload.order_id;
      await fetch(url, {
        method: 'DELETE',
        headers: {
          authorization: localStorage.getItem("token_front"),
          'content-type': 'application/json'
        }
        
      }).then(res => res.json()).then(res => {
        result = Promise.resolve(res);
      }).catch(err => {
        result = Promise.resolve({ error: err });
      });
      return result;

    },


  },
  modules: {
  }
})
