<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>{{ pageTitle || "page title"}}</h1>
        </div>
        <div class="col-sm-6">
          <ol
            class="breadcrumb float-sm-right"
            v-for="(item, idx) in breadcrumbs.slice().reverse()"
          >
            <li class="breadcrumb-item" :class="item.isActive ? 'active' : ''">
              <template v-if="item.href">
                <a :href="item.href || '#'">{{ item.name }}</a>
              </template>
              <template v-else>
                {{ item.name }}
              </template>
              <span v-if="idx==breadcrumbs.length-1" class="ml-2 mr-2">/</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <!-- /.container-fluid -->
  </section>
</template>

<script>
export default {
  props:['pageTitle','breadcrumbs'],
  
};
</script>

<style>
</style>