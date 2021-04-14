<template>
  <section class="single-product">
    <div class="container">
      <div class="row mt-20">
        <div class="col-md-5">
          <div class="single-product-slider">
            <div
              id="carousel-custom"
              class="carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-outer">
                <!-- me art lab slider -->
                <div class="carousel-inner">
                  <template v-for="(img, idx) in product.imgs" :key="idx">
                    <div class="item" :class="idx == 0 ? 'active' : ''">
                      <img :src="img" alt="" :data-zoom-image="img" />
                    </div>
                  </template>
                </div>

                <!-- sag sol -->
                <a
                  class="left carousel-control"
                  href="#carousel-custom"
                  data-slide="prev"
                >
                  <i class="tf-ion-ios-arrow-left"></i>
                </a>
                <a
                  class="right carousel-control"
                  href="#carousel-custom"
                  data-slide="next"
                >
                  <i class="tf-ion-ios-arrow-right"></i>
                </a>
              </div>

              <!-- thumb -->
              <ol class="carousel-indicators mCustomScrollbar meartlab">
                <template v-for="(img, idx) in product.imgs" :key="idx">
                  <li
                    data-target="#carousel-custom"
                    :data-slide-to="idx + 1"
                    :class="idx == 0 ? 'active' : ''"
                  >
                    <img :src="img" alt="" />
                  </li>
                </template>
              </ol>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="single-product-details">
            <h2>{{ product.name }}</h2>
            <p class="product-price">${{ product.price }}</p>

            <p class="product-description mt-20">
              {{ product.description }}
            </p>

            
            <div class="product-quantity">
              <span>數量:</span>
              <div class="product-quantity-slider">
                <input
                  id="product-quantity"
                  type="number"
                  min=1
                  v-model="qty"
                  name="product-quantity"
                />
              </div>
            </div>
            
            <a
              href="#"
              class="btn btn-main mt-20"
              @click.prevent="addToCart(product)"
              >加到購物車</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store";

export default {
  async beforeCreate() {
    if (!this.$route.params.id) {
      this.$router.push({ name: "ShopPage" });
      return;
    }
    this.productId = this.$route.params.id;
    let result = await store.dispatch("getData", {
      url: store.state.api.apiGetSingleProductURL + this.productId,
    });

    if (result.error) {
      this.$router.push({ name: "ShopPage" });
      return;
    }
    this.product = result;
    this.price = this.product.price;
  },
  data() {
    return {
      productId: "",
      price: "",
      product: "",
      qty: 1,
    };
  },
  watch:{
    qty:{
      handler(val,oldVal){
        if(val<=0) this.qty=1;

      }
    }
  },
  
  methods: {
    
    ttt(){
      console.log(this.qty);
    },
    async addToCart(product) {
      let userToken = localStorage.getItem("token_front");
      let user = localStorage.getItem(`user_front`);
      if (!userToken || !user) {
        this.showAlert();
        return;
      }
      let isTokenValid = await store.dispatch("verifyUserToken", {
        url: store.state.api.apiVerifyFrontUserTokenURL,
        token_name: "token_front",
      });
      if (!isTokenValid.pass) {
        this.showAlert();
        return;
      }

      this.product.qty = this.qty;
      let result = await store.dispatch("addToCart", {
        product: this.product,
        qty: this.qty,
      });
      if (!result.error) {
        store.getters.alert("已加到購物車");
        store.state.cart_items = result.items;
      } else if (result.type && result.type == "exist_error") {
        //item exists, update cart
        let result = await store.dispatch("postData", {
          url: store.state.api.apiUpdateCartItemsURL,
          body: {
            token: localStorage.getItem("token_front"),
            items: JSON.stringify([
              {
                product_id: this.product.id,
                name: this.product.name,
                imgs: this.product.imgs,
                qty: this.qty,
                price: this.product.price,
              },
            ]),
          },
        });
        if (result.error) {
          console.log(result);
          store.getters.errorAlert();
          return;
        }
        let myCart =await store.dispatch('getCart');
        store.state.cart_items = myCart.items;
        store.getters.alert("已更新購物車");
        return;
      } else {
        console.log(result);
        store.getters.errorAlert();
        return;
      }
    },
    async showAlert() {
      Swal.fire({
        title: "需要會員身分才能進行購物",
        text: "尚未登入會員,是否需要跳轉至登入頁面?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "好的",
        cancelButtonText: "先不用,我想再看一下",
      }).then((result) => {
        store.commit("removeFrontUserLocalData");
        if (result.isConfirmed) {
          this.$router.push({ name: "FrontLogin" });
        }
      });
    },
  },
};
</script>

<style>
</style>