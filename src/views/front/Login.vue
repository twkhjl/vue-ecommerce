<template>
<section class="signin-page account">
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="block text-center">
          <a class="logo" href="index.html">
            <img src="images/logo.png" alt="">
          </a>
          <h2 class="text-center">歡迎回來</h2>
          <form class="text-left clearfix" action="index.html" >
            <span class="text-danger" v-if="emailError">{{emailError}}</span>
            <div class="form-group">
              <input type="email" class="form-control"  placeholder="Email" v-model="email">
            </div>
            <span class="text-danger" v-if="passwordError">{{passwordError}}</span>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="密碼" v-model="password">
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-main text-center" @click.prevent="login()">Login</button>
            </div>
          </form>
          <p class="mt-20">New in this site ?
            <router-link to="/front/signup"> 建立新帳號</router-link>
            </p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
  import store from '../../store';
export default {
  beforeCreate(){
    let result = this.$store.dispatch('verifyUserToken',{
      token_name:'token_front',
      url: store.state.api.apiVerifyFrontUserTokenURL,
    });

    result.then(json=>{
      if(json.pass){
        this.$router.push({name: 'FrontMain'});
        return;
      }
    });
  },
  data(){
    return {
      email:'',
      password:'',
      emailError:'',
      passwordError:''
    }
  },
  methods:{
   login() {
      let bodyData = { email: this.email, password: this.password };

      fetch("http://twkhjl.duckdns.org:3001/login/front", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            let err = res.error;
            if (err == "user email not exist") {
              this.passwordError = "";
              this.emailError = "email名稱錯誤或不存在";
            }
            if (err == "password incorrect") {
              this.emailError = "";
              this.passwordError = "密碼錯誤";
            }
            return;
          }
          if (res.token) {
            localStorage.setItem("token_front", res.token);
            this.$store.commit('loginFrontUser',res);
            
            router.push({ name: "FrontHomePage" });
            // location.reload();
            // this.$router.push({ name: "FrontMain" });
            return;
          }
        })
        .catch((err) => console.log(err));
    },
  }
};
</script>

<style>
</style>