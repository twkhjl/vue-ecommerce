<template>
  <section class="user-dashboard page-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="dashboard-wrapper user-dashboard">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>訂單單號</th>
                    <th>訂購日期</th>
                    <th>項目數量</th>
                    <th>總計</th>
                    <th>訂單狀態</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="order in orders" :key="order.order_number">
                    <tr>
                      <td>{{ order.order_number }}</td>
                      <td>{{ order.created_at }}</td>
                      <td>{{ order.order_details.length }}</td>
                      <td>${{ order.total }}</td>
                      <td>{{ getOrderStatusName(order.status) }}</td>
                      <!-- <td>{{ {'pending':'處理中'}[order.status] }}</td> -->
                      <td>
                        <a
                          href="#"
                          :ref="'link_' + order.order_number"
                          class="btn btn-success"
                          @click.prevent="toggleDetails(order.order_number)"
                          >
                            <i class="fas fa-angle-double-down"></i>
                          </a>
                        <a
                          href="#"
                          class="btn btn-warning"
                          style="margin-left: 10px"
                          @click.prevent = "cancelOrder(order.order_id)"
                          >取消訂單</a>
                      </td>
                    </tr>
                    <div :ref="order.order_number" class="d-none">
                      <template
                        v-for="item in order.order_details"
                        :key="item.product_id"
                      >
                        <div class="order_details">
                          <div><img :src="item.imgs[0]" width="50" /></div>
                          <div>{{ item.name }}</div>
                          <div>x{{ item.qty }}</div>
                          <div>${{ item.price }}</div>
                        </div>
                      </template>
                    </div>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store";
export default {
  async beforeCreate() {
    let orders = await store.dispatch("getUserOrder");
    if (!orders.error) this.orders = orders;
  },
  data() {
    return {
      orders: [],
    };
  },
  computed: {
    getOrderStatusName() {
      return (status) => {
        return {
          pending: "處理中",
          delivered: "已出貨",
          completed: "已完成",
        }[status];
      };
    },
  },
  methods: {
    toggleDetails(order_number) {
      let el_link = this.$refs[`link_${order_number}`];

      let el_detail = this.$refs[order_number];

      if (el_detail.classList.contains("d-none")) {
        el_detail.classList.remove("d-none");
        el_link.innerHTML = `<i class="fas fa-angle-double-up"></i>`;
        return;
      } else {
        el_detail.classList.add("d-none");
        el_link.innerHTML = `<i class="fas fa-angle-double-down"></i>`;
        return;
      }
    },
    async cancelOrder(order_id){
      let result = await store.dispatch('cancelOrder',{
        order_id:order_id
      });
      store.getters.alert(`訂單單號${result.order_number}已刪除`);

      let orders = await store.dispatch("getUserOrder");
      if (!orders.error) this.orders = orders;

    }
  },
};
</script>

<style lang="scss" scoped>
.order_details {
  display: flex;
  align-items: center;
  div {
    margin: 10px;
  }
}
.d-none {
  display: none;
}
</style>