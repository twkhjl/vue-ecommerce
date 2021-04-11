<template>
  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">Checkout</h1>
            <ol class="breadcrumb">
              <li><a href="#">Home</a></li>
              <li class="active">checkout</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="page-wrapper">
    <div class="checkout shopping">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="block billing-details">
              <h4 class="widget-title">訂購人資料</h4>
              <form class="checkout-form">
                <div class="form-group">
                  <label for="full_name">收件人姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="full_name"
                    placeholder=""
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <label for="full_name">電話</label>
                  <input
                    type="text"
                    class="form-control"
                    id="full_name"
                    placeholder=""
                    v-model="mobile"
                  />
                </div>
                <div class="form-group">
                  <label for="user_address">地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="user_address"
                    placeholder=""
                    v-model="address"
                  />
                </div>
              </form>
            </div>
            <div class="block">
              <div class="checkout-product-details">
                <div class="payment">
                  <div class="card-details">
                    <form class="checkout-form">
                      <a
                        href="#"
                        class="btn btn-main mt-20"
                        @click.prevent="placeOrder()"
                        >確認訂購</a
                      >
                      <router-link to="/front/cart" class="btn mt-20"
                        >回到購物車</router-link
                      >
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="product-checkout-details">
              <div class="block">
                <h4 class="widget-title">訂購明細</h4>
                <template v-for="item in cart_items" :key="item.product_id">
                  <div class="media product-card">
                    <a class="pull-left" href="product-single.html">
                      <img
                        class="media-object"
                        :src="item.imgs[0]"
                        alt="Image"
                      />
                    </a>
                    <div class="media-body">
                      <h4 class="media-heading">
                        <a href="#">{{ item.name }}</a>
                      </h4>
                      <p class="price">{{ item.qty }} x ${{ item.price }}</p>
                    </div>
                  </div>
                </template>

                <ul class="summary-prices">
                  <!-- <li>
                           <span>Subtotal:</span>
                           <span class="price">$190</span>
                        </li>
                        <li>
                           <span>Shipping:</span>
                           <span>Free</span>
                        </li> -->
                </ul>
                <div class="summary-total">
                  <span>總計</span>
                  <span>${{ getTotalPrice() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../../store";
export default {
  async beforeCreate() {
    let result = await store.dispatch("postData", {
      url: store.state.api.apiShowSingleShoppingCartURL,
      body: {
        token: localStorage.getItem("token_front"),
      },
    });
    this.cart_items = JSON.parse(JSON.stringify(result.items)) || [];
  },
  data() {
    return {
      cart_items: [],
      name: "",
      mobile: "",
      address: "",
    };
  },
  methods: {
    async placeOrder() {
      let result = await store.dispatch("handleData", {
        url: store.state.api.apiPlaceOrderURL,
        method: "POST",
        headers: {
          authorization: `${localStorage.getItem("token_front")}`,
          "content-type": "application/json",
        },

        body: {
          order_details: this.cart_items,
          total: this.getTotalPrice(),
          recpient_details: {
            name: this.name,
            mobile: this.mobile,
            addres: this.address,
          },
        },
      });
      if(result.error){
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
      };
      let clearCart = await store.dispatch("handleData", {
        url: store.state.api.apiClearCartURL,
        method: "DELETE",
        headers: {
          authorization: `${localStorage.getItem("token_front")}`,
          "content-type": "application/json",
        },
      });
      if(clearCart.error){
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
      
      this.$router.push({
        name: "ConfirmationPage",
        params: {
          order_number: result.order_number,
        },
      });
      return;
    },
    getTotalPrice() {
      return store.getters.getTotal(this.cart_items);
    },
  }, //end methods
};
</script>

<style>
</style>