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
                        v-for="item in cart_items"
                        :key="item.product_id"
                      >
                        <tr class="">
                          <td class="">
                            <div class="product-info">
                              <img width="80" :src="item.imgs[0]" alt="" />
                              <a href="">{{ item.name }}</a>
                            </div>
                          </td>
                          <td class="">${{ item.price }}</td>
                          <td class="">{{ item.qty }}</td>
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
                    @click="checkout()"
                    >Checkout</a
                  >
                </form>
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
    checkout() {
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
      this.cart_items.splice(idx,1);return;
      let tmp_items = this.cart_items;
      this.cart_items = [];
      this.cart_items = tmp_items.filter((v) => v.product_id !== product_id);
      // if(idx && idx!==-1) this.cart_items.splice(idx,1);

      // if(idx && idx!==-1) this.cart_items[idx]="";
    },
  },
};
</script>

<style>
</style>