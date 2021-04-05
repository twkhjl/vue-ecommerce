<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#">後台登入</a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">請輸入使用者帳號密碼</p>

          <form action="#" method="post">
            <span class="text-danger" v-if="usernameError"
              >*{{ usernameError }}</span
            >
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="username"
                v-model="username"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <span class="text-danger" v-if="passwordError"
              >*{{ passwordError }}</span
            >
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label for="remember"> 記住我 </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  @click.prevent="login"
                >
                  用戶登入
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
    };
  },
  methods: {
    async login() {
      let result = await store.dispatch("postData", {
        url: store.state.api.apiLoginCpUserURL,
        body: { username: this.username, password: this.password },
      });
      if(!result){
        this.usernameError = "系統錯誤,請聯繫管理員";
        return;
      }

      if (result.error) {
        let err = result.error;
        if (err == "user name not exist") {
          this.passwordError = "";
          this.usernameError = "無效的使用者名稱";
        } else if (err == "password incorrect") {
          this.usernameError = "";
          this.passwordError = "密碼錯誤";
        } else {
          this.usernameError = res.error;
        }
        return;
      }
      if (result.token) {
        localStorage.setItem("token_cp", result.token);
        window.location.href = "/cp/";
        // this.$router.push('/cp/');
      }
      
    },
  },
};
</script>

<style>
</style>