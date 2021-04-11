<template>
  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">Dashboard</h1>
            <ol class="breadcrumb">
              <li><a href="#">Home</a></li>
              <li class="active">my account</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="user-dashboard page-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-inline dashboard-menu text-center">
            <li><router-link :class="setActive('dashboard')" to="/front/dashboard/">會員中心</router-link></li>
            <li><router-link :class="setActive('order')" to="/front/dashboard/order">訂單</router-link></li>
            <li><router-link :class="setActive('profileDetail')" to="/front/dashboard/profileDetail">個人資料</router-link></li>
          </ul>

          <router-view></router-view>



        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      activeTab: 'dashboard'
    }
  },
  methods:{
    setActive(tabName){
      if(this.activeTab==tabName) return 'active';
      return '';
    }
  },

  watch: {
    $route(to, from) {
      // if (to.path == "/front/") this.$router.go(this.$router.currentRoute);
      // console.log(to.path);
      // console.log(from.path);
      this.activeTab='dashboard';
      if(to.path.includes('/dashboard/order')) this.activeTab='order';
      if(to.path.includes('/dashboard/profileDetail')) this.activeTab='profileDetail';
    },
  },
};
</script>

<style>
</style>