<template>
  <section class="single-product">
    <div class="container">
      <div class="row mt-20">
        <div class="col-md-5">
          <div class="single-product-slider">
            <div
              id="carousel-custom"
              class="carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-outer">
                <!-- me art lab slider -->
                <div class="carousel-inner">
                <template v-for="(img,idx) in product.imgs" :key="idx">
                  <div class="item" :class="idx==0 ?'active':''">
                    <img
                      :src="img"
                      alt=""
                      :data-zoom-image="img"
                    />
                  </div>
                </template>
                  
                </div>

                <!-- sag sol -->
                <a
                  class="left carousel-control"
                  href="#carousel-custom"
                  data-slide="prev"
                >
                  <i class="tf-ion-ios-arrow-left"></i>
                </a>
                <a
                  class="right carousel-control"
                  href="#carousel-custom"
                  data-slide="next"
                >
                  <i class="tf-ion-ios-arrow-right"></i>
                </a>
              </div>

              <!-- thumb -->
              <ol class="carousel-indicators mCustomScrollbar meartlab">
                <template v-for="(img,idx) in product.imgs" :key="idx">
                <li 
                data-target="#carousel-custom" 
                :data-slide-to="idx+1"
                :class="idx==0 ?'active':''"
                >

                  <img
                    :src="img"
                    alt=""
                  />
                </li>
                  </template>
                
              </ol>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="single-product-details">
            <h2>{{product.name}}</h2>
            <p class="product-price">${{product.price}}</p>

            <p class="product-description mt-20">
              {{product.description}}
            </p>
            
            <div class="color-swatches">
              <span>color:</span>
              <ul>
                <li>
                  <a href="" class="swatch-violet"></a>
                </li>
                <li>
                  <a href="" class="swatch-black"></a>
                </li>
                <li>
                  <a href="" class="swatch-cream"></a>
                </li>
              </ul>
            </div>
            <div class="product-size">
              <span>Size:</span>
              <select class="form-control">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div class="product-quantity">
              <span>Quantity:</span>
              <div class="product-quantity-slider">
                <input
                  id="product-quantity"
                  type="text"
                  :value="product.qty"
                  name="product-quantity"
                />
              </div>
            </div>
            <div class="product-category">
              <span>Categories:</span>
              <ul>
                <li><a href="#">Products</a></li>
                <li><a href="#">Soap</a></li>
              </ul>
            </div>
            <a href="cart.html" class="btn btn-main mt-20">Add To Cart</a>
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
    if(!this.$route.params.id){
      this.$router.push({name:'ShopPage'});
      return;
    }
    this.productId = this.$route.params.id;
    let result = await store.dispatch('getData',{url:store.state.api.apiGetSingleProductURL+this.productId});
    
    if(result.error) {
      this.$router.push({name:'ShopPage'});
      return;
    }
    this.product = result;
  },
  data() {
    return {
      productId: "",
      product:""
    };
  },
  methods: {
    addToCart() {},
  },
};
</script>

<style>
</style>