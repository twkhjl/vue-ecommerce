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
                ><i class="tf-ion-android-cart"></i>Cart</span>
              <div class="dropdown-menu cart-dropdown">
                <!-- Cart Item -->
                <div class="media">
                  <a class="pull-left" href="#">
                    <img
                      class="media-object"
                      src="/assets_front/images/shop/cart/cart-1.jpg"
                      alt="image"
                    />
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading"><a href="">Ladies Bag</a></h4>
                    <div class="cart-price">
                      <span>1 x</span>
                      <span>1250.00</span>
                    </div>
                    <h5><strong>$1200</strong></h5>
                  </div>
                  <a href="#" class="remove"><i class="tf-ion-close"></i></a>
                </div>
                <!-- / Cart Item -->
                <!-- Cart Item -->
                <div class="media">
                  <a class="pull-left" href="#">
                    <img
                      class="media-object"
                      src="/assets_front/images/shop/cart/cart-2.jpg"
                      alt="image"
                    />
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading"><a href="">Ladies Bag</a></h4>
                    <div class="cart-price">
                      <span>1 x</span>
                      <span>1250.00</span>
                    </div>
                    <h5><strong>$1200</strong></h5>
                  </div>
                  <a href="#" class="remove"><i class="tf-ion-close"></i></a>
                </div>
                <!-- / Cart Item -->

                <div class="cart-summary">
                  <span>Total</span>
                  <span class="total-price">$1799.00</span>
                </div>
                <ul class="text-center cart-buttons">
                  <li>
                    <router-link to="cart" class="btn btn-small"
                      >View Cart</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      to="checkout"
                      class="btn btn-small btn-solid-border"
                      >Checkout</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
            <!-- / Cart -->

            <!-- Search -->
            <li class="dropdown search dropdown-slide">
              <span
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                ><i class="tf-ion-ios-search-strong"></i> Search</span>
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
    this.reload;
  },
  data() {
    return {
      frontUser: JSON.parse(localStorage.getItem("user_front")) || {},
    };
  },
  methods: {
    
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
  },
  watch: {
    $route(to, from) {
      if(to.path=='/front/') this.$router.go(this.$router.currentRoute);
      // console.log(to.path);
      // console.log(from.path);
    },
  },
};
</script>

<style>
</style>