<template>
  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">Shop</h1>
            <ol class="breadcrumb">
              <li><a href="#">Home</a></li>
              <li class="active">shop</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="products section">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="widget">
            <h4 class="widget-title">主分類</h4>
            <form method="post" action="#">
              <select class="form-control" v-model="selectedOption">
                <template v-for="option in options" :key="option.value">
                  <option :value="option.value">{{ option.name }}</option>
                </template>
              </select>
            </form>
          </div>
          <div class="widget product-category">
            <h4 class="widget-title">商品分類</h4>
            <div
              class="panel-group commonAccordion"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              <template v-for="cat in cats[selectedOption]" :key="cat.id">
                <div class="panel panel-default" v-if="cat.id">
                  <div
                    class="panel-heading"
                    role="tab"
                    :id="'heading' + cat.id"
                  >
                    <h4 class="panel-title">
                      <a
                        class="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        :href="'#collapse' + cat.id"
                        aria-expanded="false"
                        :aria-controls="'collapse' + cat.id"
                      >
                        {{ cat.name }}
                      </a>
                    </h4>
                  </div>
                  <div
                    :id="'collapse' + cat.id"
                    class="panel-collapse collapse"
                    role="tabpanel"
                    :aria-labelledby="'heading' + cat.id"
                  >
                    <div class="panel-body">
                      <ul>
                        <template v-for="(v, i) in cat.subcat1" :key="i">
                          <li>
                            <a href="">{{ v.name }}</a>
                          </li>
                        </template>
                      </ul>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <template v-for="product in products" :key="product.id">
              <div class="col-md-4">
                <div class="product-item">
                  <div class="product-thumb">
                    <!-- <span class="bage">Sale</span> -->
                    <img
                      class="img-responsive"
                      :src="product.imgs[0]"
                      alt="product-img"
                    />
                    <div class="preview-meta">
                      <ul>
                        <li>
                          <span
                            data-toggle="modal"
                            data-target="#product-modal"
                          >
                            <i class="tf-ion-ios-search-strong"></i>
                          </span>
                        </li>
                        <li>
                          <a href="#"><i class="tf-ion-ios-heart"></i></a>
                        </li>
                        <li>
                          <a href="" @click.prevent="addToCart(product)"
                            ><i class="tf-ion-android-cart"></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link
                        :to="{
                          name: 'ProductDetailPage',
                          params: { id: product.id },
                        }"
                        >{{ product.name }}
                      </router-link>
                    </h4>
                    <p class="price">${{ product.price }}</p>
                  </div>
                </div>
              </div>
            </template>

            <!-- Modal -->
            <div class="modal product-modal fade" id="product-modal">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="tf-ion-close"></i>
              </button>
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-8 col-sm-6 col-xs-12">
                        <div class="modal-image">
                          <img
                            class="img-responsive"
                            src="images/shop/products/modal-product.jpg"
                            alt="product-img"
                          />
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 col-xs-12">
                        <div class="product-short-details">
                          <h2 class="product-title">GM Pendant, Basalt Grey</h2>
                          <p class="product-price">$200</p>
                          <p class="product-short-description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Rem iusto nihil cum. Illo laborum numquam rem
                            aut officia dicta cumque.
                          </p>
                          <a href="cart.html" class="btn btn-main"
                            >Add To Cart</a
                          >
                          <a
                            href="product-single.html"
                            class="btn btn-transparent"
                            >View Product Details</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.modal -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store";
export default {
  async created() {
    await this.$store
      .dispatch("getData", { url: store.state.api.apiCatDataURL })
      .then((json) => {
        this.cats = json;
        let tmpArr = Object.keys(this.cats);
        tmpArr.forEach((v) => {
          if (v == -1) {
            this.options.unshift({ name: this.cats[v].name, value: v });
          } else {
            this.options.push({ name: this.cats[v].name, value: v });
          }
        });
      });
    await this.$store
      .dispatch("getData", { url: store.state.api.apiProductsURL })
      .then((json) => {
        this.products = json;
      });
  },
  data() {
    return {
      cats: "",
      products: "",
      filterProfucts: "",
      options: [],
      selectedOption: -1,
    };
  },
  
  methods: {
    async addToCart(product) {
      let result = await store.dispatch("addToCart", { product: product });

      if (!result.error) {
        store.getters.alert("已加到購物車");
        store.state.cart_items = result.items;         
      } else if (result.type && result.type == "exist_error") {
        store.getters.alert("物品已存在於購物車");

      } else {
        console.log(result);
        store.getters.errorAlert();
        
      }
    },
  },
};
</script>

<style>
</style>