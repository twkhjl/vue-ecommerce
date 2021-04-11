<template>
  <button @click="changeTtt()">click me</button>
</template>


<script>
import store from "../store";
export default {
  async beforeCreate() {
    this.$store.watch(
      (state) => {
        return this.$store.state.VALUE_TO_WATCH; // could also put a Getter here
      },
      (newValue, oldValue) => {
        //something changed do something
        console.log(oldValue);
        console.log(newValue);
      },
      //Optional Deep if you need it
      {
        deep: true,
      }
    );
  },
  mounted() {},
  data() {
    return {
      ttt: store.state.ttt,
    };
  },
  methods: {
    changeTtt() {
      store.state.ttt += "t";
      this.ttt = store.state.ttt;
    },
  },
  watch: {
    ttt: {
      handler: (newv, oldv) => {
        console.log(`old:${newv},new:${oldv}`);
      },
      deep: true,
    },
  },
}; //end export default
</script>