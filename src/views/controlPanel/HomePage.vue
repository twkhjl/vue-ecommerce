<template>
  <!-- Site wrapper -->
  <div class="wrapper">
    <!-- Navbar -->
    <Navbar></Navbar>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <MainSidebar></MainSidebar>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <ContentHeader pageTitle="Home" :breadcrumbs="breadcrumbs"></ContentHeader>

      <!-- Main content -->
      <section class="content">
        <DefaultCard title="Hello">
          <template v-slot:card-body> Hello Vue!!! </template>
        </DefaultCard>
      </section>

      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <Footer></Footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import DefaultCard from "@/components/controlPanel/HTMLs/DefaultCard.vue";
import Navbar from "@/components/controlPanel/HTMLs/Navbar.vue";
import MainSidebar from "@/components/controlPanel/HTMLs/MainSidebar.vue";
import ContentHeader from "@/components/controlPanel/HTMLs/ContentHeader.vue";
import Footer from "@/components/controlPanel/HTMLs/Footer.vue";

export default {
  components: { DefaultCard, Navbar, MainSidebar, ContentHeader, Footer },
  data() {
    return {
      breadcrumbs: [
        { name: "Home", href: "#", isActive: true },
        { name: "Blank Page"},
      ],
    };
  },
};
</script>

<style>
</style>