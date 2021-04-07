<template></template>


<script>
import store from "../store";
export default {
  async beforeCreate() {
    

    $(document).ready(function () {
     Swal.fire('Hello world!')
      
    });
  },
  mounted() {},
  data() {},
}; //end export default
</script>