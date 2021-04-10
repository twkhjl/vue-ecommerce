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
              <h4 class="widget-title">Billing Details</h4>
              <form class="checkout-form">
                <div class="form-group">
                  <label for="full_name">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="full_name"
                    placeholder=""
                  />
                </div>
                <div class="form-group">
                  <label for="user_address">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="user_address"
                    placeholder=""
                  />
                </div>
                <div class="checkout-country-code clearfix">
                  <div class="form-group">
                    <label for="user_post_code">Zip Code</label>
                    <input
                      type="text"
                      class="form-control"
                      id="user_post_code"
                      name="zipcode"
                      value=""
                    />
                  </div>
                  <div class="form-group">
                    <label for="user_city">City</label>
                    <input
                      type="text"
                      class="form-control"
                      id="user_city"
                      name="city"
                      value=""
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="user_country">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    id="user_country"
                    placeholder=""
                  />
                </div>
              </form>
            </div>
            <div class="block">
              <h4 class="widget-title">Payment Method</h4>
              <p>Credit Cart Details (Secure payment)</p>
              <div class="checkout-product-details">
                <div class="payment">
                  <div class="card-details">
                    <form class="checkout-form">
                      <div class="form-group">
                        <label for="card-number"
                          >Card Number <span class="required">*</span></label
                        >
                        <input
                          id="card-number"
                          class="form-control"
                          type="tel"
                          placeholder="•••• •••• •••• ••••"
                        />
                      </div>
                      <div class="form-group half-width padding-right">
                        <label for="card-expiry"
                          >Expiry (MM/YY) <span class="required">*</span></label
                        >
                        <input
                          id="card-expiry"
                          class="form-control"
                          type="tel"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div class="form-group half-width padding-left">
                        <label for="card-cvc"
                          >Card Code <span class="required">*</span></label
                        >
                        <input
                          id="card-cvc"
                          class="form-control"
                          type="tel"
                          maxlength="4"
                          placeholder="CVC"
                        />
                      </div>
                      <a
                        href="#"
                        class="btn btn-main mt-20"
                        @click.prevent="placeOrder()"
                        >確認訂購</a
                      >
                      <router-link
                        to="/front/cart"
                        class="btn mt-20"
                        >回到購物車</router-link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="product-checkout-details">
              <div class="block">
                <h4 class="widget-title">Order Summary</h4>
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
                  <span>Total</span>
                  <span>${{ getTotalPrice() }}</span>
                </div>
                <div class="verified-icon">
                  <img src="/assets_front/images/shop/verified.png" />
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
    };
  },
  methods: {
    placeOrder() {
      this.$router.push({ name: "ConfirmationPage" });
      return;
    },
    getTotalPrice() {
      return store.getters.getTotal(this.cart_items);
      
    },
  },//end methods
};
</script>

<style>
</style>