<template>
  <!-- Start Top Header Bar -->
  <section class="top-header">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-xs-12 col-sm-4">
          <div class="contact-number">
            <i class="tf-ion-ios-telephone"></i>
            <span>0900-000-000</span>
          </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-4">
          <!-- Site Logo -->
          <div class="logo text-center">
            <a href="#">
              <h1>TWKHJL</h1>
            </a>
          </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-4">
          <ul class="top-menu text-right list-inline">
            <!-- User -->
            <li class="dropdown cart-nav dropdown-slide">
              <template v-if="frontUser.isLoggedIn">
                {{ frontUser.lastName + frontUser.firstName }}
              </template>
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                ><i class="fas fa-user"></i
              ></a>
              <div class="dropdown-menu cart-dropdown">
                <!-- Cart Item -->
                <div class="media">
                  <div class="media-body">
                    <h4 class="media-heading"><a href=""></a></h4>
                    <div class="cart-price">
                      <span></span>
                      <span></span>
                    </div>
                    <h5><strong></strong></h5>
                  </div>
                  <!-- <a href="#" class="remove"><i class="tf-ion-close"></i></a> -->
                </div>
                <!-- / Cart Item -->
                <div class="cart-summary">
                  <template v-if="frontUser.isLoggedIn">
                    <span
                      >您好,{{ frontUser.lastName + frontUser.firstName }}</span
                    >
                  </template>

                  <span class="total-price"></span>
                </div>
                <ul class="text-center cart-buttons">
                  <template v-if="frontUser.isLoggedIn">
                    <li>
                      <router-link
                        to="/front/dashboard"
                        class="btn btn-medium btn-solid-border"
                        >會員中心</router-link
                      >
                    </li>
                    <li>
                      <a
                        href=""
                        class="btn btn-medium btn-solid-border"
                        @click.prevent="logout()"
                        >登出</a
                      >
                    </li>
                  </template>
                  <template v-else>
                    <router-link
                      to="login"
                      class="btn btn-medium btn-solid-border"
                      >登入</router-link
                    >
                  </template>
                </ul>
              </div>
            </li>

            <!--  Cart -->
            <li class="dropdown cart-nav dropdown-slide">
              <span
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                ><i class="tf-ion-android-cart"></i>Cart</span
              >
              <div class="dropdown-menu cart-dropdown">
                <template v-if="getCartItemsFn.length > 0">
                  <template v-for="item in getCartItemsFn" :key="item.product_id">
                    <!-- Cart Item -->
                    <div class="media">
                      <a class="pull-left" href="#">
                        <img
                          class="media-object"
                          :src="item.imgs[0]"
                          alt="image"
                        />
                      </a>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <a href="">{{ item.name }}</a>
                        </h4>
                        <div class="cart-price">
                          <span>{{ item.qty }} x</span>
                          <span>{{ item.price }}</span>
                        </div>
                        <h5>
                          <strong>${{ item.price }}</strong>
                        </h5>
                      </div>
                      <a
                        href="#"
                        class="remove"
                        @click.prevent="removeItem(item.product_id)"
                        ><i class="tf-ion-close"></i
                      ></a>
                    </div>
                    <!-- / Cart Item -->
                  </template>

                  <div class="cart-summary">
                    <span>總計</span>
                    <span class="total-price">${{ getTotalPriceFn }}</span>
                  </div>
                  <ul class="text-center cart-buttons">
                    <li>
                      <router-link to="/front/cart" class="btn btn-small"
                        >查看購物車</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        to="/front/checkout"
                        class="btn btn-small btn-solid-border"
                        >結帳</router-link
                      >
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <span>購物車無內容...</span>
                </template>
              </div>
            </li>
            <!-- / Cart -->

            <!-- Search -->
            <li class="dropdown search dropdown-slide">
              <span
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                ><i class="tf-ion-ios-search-strong"></i> Search</span
              >
              <ul class="dropdown-menu search-dropdown">
                <li>
                  <form action="post">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search..."
                    />
                  </form>
                </li>
              </ul>
            </li>
            <!-- / Search -->

            <!-- Languages -->
            <li class="commonSelect">
              <select class="form-control">
                <option>EN</option>
                <option>DE</option>
                <option>FR</option>
                <option>ES</option>
              </select>
            </li>
            <!-- / Languages -->
          </ul>
          <!-- / .nav .navbar-nav .navbar-right -->
        </div>
      </div>
    </div>
  </section>
  <!-- End Top Header Bar -->
  <!-- Main Menu Section -->
  <section class="menu">
    <nav class="navbar navigation">
      <div class="container">
        <div class="navbar-header">
          <h2 class="menu-title">Main Menu</h2>
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <!-- / .navbar-header -->

        <!-- Navbar Links -->
        <div id="navbar" class="navbar-collapse collapse text-center">
          <ul class="nav navbar-nav">
            <li>
              <a href="#" @click.prevent="home()">首頁</a>
            </li>
            <li>
              <router-link to="/front/shop">商店</router-link>
            </li>
            <li>
              <router-link to="/front/about">關於</router-link>
            </li>
            <li>
              <router-link to="/front/contact">聯繫我們</router-link>
            </li>
          </ul>
          <!-- / .nav .navbar-nav -->
        </div>
        <!--/.navbar-collapse -->
      </div>
      <!-- / .container -->
    </nav>
  </section>
  <router-view></router-view>

  <footer class="footer section text-center">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="social-media">
            <li>
              <a href="">
                <i class="tf-ion-social-facebook"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i class="tf-ion-social-instagram"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i class="tf-ion-social-twitter"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i class="tf-ion-social-pinterest"></i>
              </a>
            </li>
          </ul>
          <ul class="footer-menu">
            <li>
              <a href="">CONTACT</a>
            </li>
            <li>
              <a href="">SHIPPING</a>
            </li>
            <li>
              <a href="">TERMS OF SERVICE</a>
            </li>
            <li>
              <a href="">PRIVACY POLICY</a>
            </li>
          </ul>
          <p class="copyright-text">Powered by Bootstrap</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import store from "../../store";
export default {

  created() {
    store.commit("appendScripts", { type: "front" });
    this.getCartItems();
  },
  data() {
    return {
      frontUser: JSON.parse(localStorage.getItem("user_front")) || {},
      cart_items: store.state.cart_items,
    };
  },
  computed:{
    getCartItemsFn(){
      return store.state.cart_items || [];
    },
    getTotalPriceFn() {
      return store.getters.getTotal(store.state.cart_items);
    },
  },

  methods: {
    async getCartItems() {
      let cart = await store.dispatch("getCart");
      if(!cart || !cart.items || cart.items.length<=0){
        store.state.cart_items = [];
        this.cart_items = [];
      }

      if (!cart.error){
        store.state.cart_items = cart.items;
        this.cart_items = cart.items;
      }
    },
    async home() {
      await this.$router.push({ name: "FrontHomePage" });
      // this.$router.go(this.$router.currentRoute);
      // location.reload();
    },
    async logout() {
      await store.commit("logoutFrontUser");
      this.$router.push({ name: "ShopPage" });
      this.frontUser = {};
      // this.$router.go(this.$router.currentRoute);
      // localStorage.removeItem("token_front");
      // this.$router.push({ name: "FrontLogin" });
    },
    
    async removeItem(product_id) {
      let token = localStorage.getItem("token_front");
      if (!token) {
        return this.$router.push({ name: "FrontLogin" });
      }
      let result = await store.dispatch("handleData", {
        url: `${store.state.api.apiRemoveItemFromCartURL}/${product_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.error) {
        swal.fire({
          title: "刪除失敗: 系統錯誤,請聯絡管理員",
          showClass: {
            popup: "",
            icon: "",
          },
          hideClass: {
            popup: "",
          },
        });
        return;
      }
      // let idx = this.cart_items.findIndex((v) => v.product_id == product_id);
      // this.cart_items.splice(idx, 1);
      this.cart_items = result.items;
      store.state.cart_items = this.cart_items;
      return;
    },

  },
  watch: {
    $route(to, from) {
      if (to.path == "/front/") this.$router.go(this.$router.currentRoute);
      // console.log(to.path);
      // console.log(from.path);
    },
  },
};
</script>

<style>
</style>