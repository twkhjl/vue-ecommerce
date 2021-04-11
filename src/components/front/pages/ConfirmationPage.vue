<template>
<!-- Page Wrapper -->
<section class="page-wrapper success-msg">
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="block text-center">
        	<i class="tf-ion-android-checkmark-circle"></i>
          <h2 class="text-center">感謝您的訂購</h2>
          <h5 class="text-center">您的訂單號碼是:{{$route.params.order_number}}</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, sed.</p>
          <a href="#" class="btn btn-main mt-20" @click.prevent="backToShop()">繼續購物</a>
        </div>
      </div>
    </div>
  </div>
</section><!-- /.page-warpper -->
</template>

<script>
export default {
  beforeCreate(){
    console.log(this.$route.params.order_number);
  },
  methods:{
    backToShop(){
      this.$router.push({name:'ShopPage'});return;
    }
  }
};
</script>

<style>
</style>