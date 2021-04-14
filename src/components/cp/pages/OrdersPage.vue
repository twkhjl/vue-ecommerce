<template>
<h3>訂單商品數量統計</h3>
  <canvas
    id="pieChart"
    style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%"
  ></canvas>
</template>

<script>
import store from "../../../store";

export default {
  async beforeCreate() {
    let result = await store.dispatch("getAllOrders");
    console.log(result);
  },
  mounted() {
    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var donutData = {
      labels: ["Chrome", "IE", "FireFox", "Safari", "Opera", "Navigator"],
      datasets: [
        {
          data: [70, 50, 40, 60, 30, 10],
          backgroundColor: [
            "#f56954",
            "#00a65a",
            "#f39c12",
            "#00c0ef",
            "#3c8dbc",
            "#d2d6de",
          ],
        },
      ],
    };
    var donutOptions = {
      maintainAspectRatio: false,
      responsive: true,
    };

    var pieChartCanvas = $("#pieChart");
    // var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieData = donutData;
    var pieOptions = {
      maintainAspectRatio: false,
      responsive: true,
    };

    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    new Chart(pieChartCanvas, {
      type: "pie",
      data: pieData,
      options: pieOptions,
    });
  },
};
</script>

<style>
</style>