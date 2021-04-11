<template>
  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">Cart</h1>
            <ol class="breadcrumb">
              <li><a href="#">Home</a></li>
              <li class="active">cart</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="page-wrapper">
    <div class="cart shopping">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div class="block">
              <template v-if="getCartItemsFn.length > 0">
                <div class="product-list">
                  <form method="post">
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="">商品名稱</th>
                          <th class="">價格</th>
                          <th class="">數量</th>
                          <th class="">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template
                          v-for="item in getCartItemsFn"
                          :key="item.product_id"
                        >
                          <tr class="">
                            <td class="">
                              <div class="product-info">
                                <img width="80" :src="item.imgs[0]" alt="" />
                                <router-link
                                  :to="{
                                    name: 'ProductDetailPage',
                                    params: { id: item.product_id },
                                  }"
                                  >{{ item.name }}
                                </router-link>
                              </div>
                            </td>
                            <td class="">${{ item.price }}</td>
                            <td class="">
                              <button
                                @click.prevent="
                                  changeQty({
                                    type: '-',
                                    product_id: item.product_id,
                                  })
                                "
                              >
                                -
                              </button>
                              {{ item.qty }}
                              <button
                                @click.prevent="
                                  changeQty({
                                    type: '+',
                                    product_id: item.product_id,
                                  })
                                "
                              >
                                +
                              </button>
                            </td>
                            <td class="">
                              <a
                                class="product-remove"
                                href=""
                                @click.prevent="removeItem(item.product_id)"
                                >取消</a
                              >
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                    <a
                      href="#"
                      class="btn btn-main pull-right"
                      @click.prevent="checkout()"
                      >確認無誤,進行結帳
                      </a>

                    <router-link
                      to="/front/shop"
                      class="btn btn-main pull-right"
                      style="background: #fff; color: black"
                      >繼續購物
                    </router-link>
                  </form>
                </div>
              </template>
              <template v-else>
                <h3>購物車無內容...</h3>
                <router-link to="/front/shop" class="btn btn-main"
                  >繼續購物</router-link
                >
              </template>
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
    const isloggedIn = await store.dispatch('verifyUserToken',{
      token_name:'token_front'
    });
    if(isloggedIn.error){
      this.$router.push({name:'FrontLogin'});
      return;
    }
    
    let result = await store.dispatch("handleData", {
      method: "GET",
      url: store.state.api.apiShowSingleShoppingCartURL,
      headers: { authorization: localStorage.getItem("token_front") },
    });
    this.cart_items = JSON.parse(JSON.stringify(result.items)) || [];
    store.state.cart_items = this.cart_items;
  },
  data() {
    return {
      cart_items: [],
    };
  },
  computed: {
    getCartItemsFn() {
      return store.state.cart_items;
    },
  },
  methods: {
    changeQty(params) {
      this.cart_items = store.state.cart_items;

      let idx = this.cart_items.findIndex(
        (o) => o.product_id == params.product_id
      );

      if (params.type == "-") {
        if (this.cart_items[idx].qty > 1) {
          this.cart_items[idx].qty--;
        }
      }
      if (params.type == "+") {
        this.cart_items[idx].qty++;
      }

      store.state.cart_items = this.cart_items;
      return;
    },
    async checkout() {
      this.cart_items = store.state.cart_items;

      // update cart before goto checkout page
      let result = await store.dispatch("postData", {
        url: store.state.api.apiUpdateCartItemsURL,
        body: {
          token: localStorage.getItem("token_front"),
          items: JSON.stringify(this.cart_items),
        },
      });
      this.$router.push({ name: "CheckoutPage" });
      return;
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
      let idx = this.cart_items.findIndex((v) => v.product_id == product_id);
      this.cart_items.splice(idx, 1);
      store.state.cart_items = this.cart_items;
      return;
    },
  },
};
</script>

<style>
</style>