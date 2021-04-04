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
            <li><router-link class="active" to="/">Dashboard</router-link></li>
            <li><router-link to="order">Orders</router-link></li>
            <li><router-link to="profileDetail">Profile Details</router-link></li>
          </ul>

          <router-view></router-view>



        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>