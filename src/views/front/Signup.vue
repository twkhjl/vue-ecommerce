<template>
  <section class="signin-page account">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="block text-center">
            <a class="logo" href="index.html">
              <img src="images/logo.png" alt="" />
            </a>
            <h2 class="text-center">建立帳戶</h2>
            <form class="text-left clearfix" action="index.html">
              <span class="text-danger" v-if="lastName.error">{{
                lastName.error
              }}</span>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="姓"
                  v-model="lastName.value"
                />
              </div>

              <span class="text-danger" v-if="firstName.error">{{
                firstName.error
              }}</span>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="名"
                  v-model="firstName.value"
                />
              </div>
              <span class="text-danger" v-if="email.error">{{
                email.error
              }}</span>

              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email.value"
                />
              </div>

              <span class="text-danger" v-if="firstName.error">{{
                password.error
              }}</span>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="密碼"
                  v-model="password.value"
                />
              </div>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-main text-center"
                  @click.prevent="register()"
                >
                  註冊
                </button>
              </div>
            </form>
            <p class="mt-20">
              已經註冊 ?<router-link to="/front/login"> 登入</router-link>
            </p>
            <p><a href="#"> 忘記密碼?</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from '../../store';
export default {
  data() {
    return {
      firstName: { value: "", name:"名字", error: "" },
      lastName: { value: "", name:"姓氏",  error: "" },
      email: { value: "", name:"email",  error: "" },
      password: { value: "", name:"密碼",  error: "" },
      errMsg:this.$store.state.errMsg
    };
  },

  methods: {
    register() {
      let bodyData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
      };
      // clear err message
      for(let k in bodyData){
        this[k].error="";
      }

      fetch(store.state.api.apiCreateNewFrontUserURL, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.json())
        .then((json) => {
          if(json.hasError){
            let err=json.error;
            for(let k in err){
              let errType = err[k].split(":")[1];
              this[k].error = this.errMsg[errType].format(this[k].name);
              if(k=='email'){
                this[k].error = this.errMsg[errType].format(this[k].name,this[k].value);
              }
            }
            return;
          }
          console.log(json);return;
          
        });
    },
  },
};
</script>

<style>
</style>