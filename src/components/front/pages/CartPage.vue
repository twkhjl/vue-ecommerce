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

                    <template v-for="(item,idx) in cart_items" :key="idx">
                    <tr class="">
                      <td class="">
                        <div class="product-info">
                          <img width="80" :src="item.imgs[0]" alt="" />
                          <a href="">{{item.name}}</a>
                        </div>
                      </td>
                      <td class="">${{item.price}}</td>
                      <td class="">{{item.qty}}</td>
                      <td class="">
                        <a class="product-remove" href="">取消</a>
                      </td>
                    </tr>
                    </template>
                    
                  </tbody>
                </table>
                <a href="#" class="btn btn-main pull-right" @click="checkout()">Checkout</a>
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
import store from '../../../store';
export default {

  async beforeCreate(){
    let result = await store.dispatch("postData", {
        url: store.state.api.apiShowSingleShoppingCartURL,
        body: {
          token: localStorage.getItem("token_front"),
        },
      });
      this.cart_items=result.items || [];
      console.log(this.cart_items);
  },
  data(){
    return {
      cart_items:[]
    }
  },
  methods:{
    checkout(){
      this.$router.push({name:'CheckoutPage'});return;
    }
  }
};
</script>

<style>
</style>