<template lang="pug">
  section.goods.py-3(:id="anchor")
    b-container
      h2.text-center.section-slide="{{title}}"
      b-row
        b-col(sm="12" md="4" lg="4" v-for="(i, key) in items" :key="key")
          div(@click.prevent="showModal(`modal_store_${i.id}`)").card-item.mb-3
            div.media-top
              span(v-if="i.is_new").is_new="New"
              b-carousel(:id="`carusel_${i.id}`" controls fade img-width="1024" img-height="480").carusel-rider
                b-carousel-slide(v-for="(img, ikey) in i.images" :key="ikey" :img-src="`https://topstretching.by/storage/app/media/${img.image}`")
            div.info.p-2.d-flex.justify-center.align-center.flex-column
              p.text-center.title.mb-1="{{i.name}}"
              div.price-wrapper
                p(v-if="i.price && i.price > 0").text-center.price="{{i.price}} Br."
                  span(v-if="i.price < i.old_price").old_price="{{i.old_price}} Br."
                p(v-else).text-center.price.error="ОЖИДАЕТСЯ"
            div.action
              a(@click.prevent="showModal(`modal_store_${i.id}`)" href="#").buy="КУПИТЬ"
              b-modal(size="xl" :id="`modal_store_${i.id}`" :title="i.name" hide-footer)
                div.modalero
                  b-row
                    b-col(sm="12" md="6" lg="4")
                      b-carousel(:id="`carusel_${i.id}`" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480")
                        b-carousel-slide(v-for="(img, ikey) in i.images" :key="ikey" :img-src="`https://topstretching.by/storage/app/media/${img.image}`")
                    b-col(sm="12" md="6" lg="8")
                      h4.title_modal="{{i.name}}"
                      div.price-wrapper_modal
                        p(v-if="i.price && i.price > 0").text-center.price="{{i.price}} Br."
                          span(v-if="i.price < i.old_price").old_price="{{i.old_price}} Br."
                        p(v-else).price_modal.error="ОЖИДАЕТСЯ"
                      div(v-html="i.description").description
                      div(v-if="prepareSizes(i.sizes).length").mb-3
                        b-form-select(:options="prepareSizes(i.sizes)" v-if="prepareSizes(i.sizes).length > 1" v-model="i.selected_size")
                        p(v-else)="{{prepareSizes(i.sizes)[0].text}}"
                      div(v-if="prepareColors(i.colors).length").mb-3
                        b-form-select(:options="prepareColors(i.colors)" v-if="prepareColors(i.colors).length > 1" v-model="i.selected_color")
                        p(v-else)="{{prepareSizes(i.colors)[0].text}}"
                      div(v-if="i.price && i.price > 0").action
                        a(@click.prevent="addToCart(i)" href="#").buy.w-100.text-center="ДОБАВИТЬ В КОРЗИНУ"

      hr
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "storeSection",
    computed: {
      ...mapGetters(['cart'])
    },
    props:{
      items: {
        type: Array
      },
      title: {
        type: String
      },
      anchor: {
        type: String,
        default: ''
      }
    },
    methods: {
      ...mapActions(['setNewCart']),
      addToCart(item){
        let errors = 0
        let currCart = this.cart
        if (item.price && item.price > 0) {
          if (item.sizes.length > 1) {
            if (item.selected_size === 'def') {
              errors++
              this.$bvToast.toast('Выберете размер', {
                title: 'Ошибка',
                variant: 'danger',
                solid: true
              });
            }
          }
          if (item.colors.length > 1) {
            if (item.selected_color === 'def') {
              errors++
              this.$bvToast.toast('Выберете цвет', {
                title: 'Ошибка',
                variant: 'danger',
                solid: true
              });
            }
          }
          if (errors === 0){
            currCart.push({
              id: item.id,
              name: item.name,
              selected_size: item.selected_size !== 'def' ? item.selected_size : '',
              selected_color: item.selected_color !== 'def' ? item.selected_color : '',
              image: item.images[0].image,
              price: item.price
            });
            this.setNewCart(currCart);
            this.$bvModal.hide(`modal_store_${item.id}`)
            this.$bvToast.toast('Товар добавлен в корзину', {
              title: 'Успех',
              variant: 'success',
              solid: true
            });
          }
        }else{
          this.$bvToast.toast('товара нет в наличии или он не доступен для покупки', {
            title: 'Ошибка',
            variant: 'danger',
            solid: true
          });
        }
      },
      prepareSizes(sizes){
        let res = [];
        if (sizes && sizes.length > 0){
          sizes.map(el=>{
            if (el.sizes != ''){
              res.push({text: el.sizes, value: el.sizes})
            }
          })
        }
        return res;
      },
      prepareColors(colors){
        let res = [];
        if (colors && colors.length > 0){
          colors.map(el=>{
            if (el.color != ''){
              res.push({text: el.color, value: el.color})
            }
          })
        }
        return res;
      },
      showModal(id) {
        this.$bvModal.show(id)
      },
    }
}
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .media-top
    height: 300px
    overflow: hidden
    position: relative
    @media screen and (max-width: 1152px)
      height: 200px
    @media screen and (max-width: 767px)
      height: inherit
    .is_new
      position: absolute
      top: 3px
      right: 3px
      z-index: 100
      color: $fucsia
      background: rgba(255,255,255,.8)
      padding: 5px 10px 3px
      border-radius: 5px
      line-height: 1
    .carusel-rider
        height: 300px
        @media screen and (max-width: 1152px)
          height: 200px
        @media screen and (max-width: 767px)
          height: inherit
  .goods
    background: $pbc
    .section-slide
      font-size: 3rem
      font-weight: 900
      @media screen and (max-width: 500px)
        font-size: 2rem
  .card-item
    cursor: pointer
    background: #fff
    .media
      min-height: 350px
      background-position: center
      background-repeat: no-repeat
      background-size: cover
    .info
      min-height: 120px
      .title
        color: #1c1c1e
        font-weight: 500
      .price-wrapper
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        .price
          color: #848484
          font-size: 14px
          font-weight: 400
          position: relative
          padding-top: 10px
          display: inline-flex
          .old_price
            position: absolute
            text-decoration: line-through
            text-decoration-color: $fucsia
            color: #cdcdcd
            font-size: 12px
            top: 0
            right: -10px
          &.error
            color: $fucsia
  .action
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    padding: 0 0 20px
    .buy
      color: #111111
      border: 1px solid #1c1c1e
      background-color: #ffffff
      padding: 9px 25px 5px
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0)
      line-height: 1
      text-decoration: none
      transition: .3s
      &:hover
        background-color: #111111
        color: #fff
  .price-wrapper_modal
    display: flex
    justify-content: flex-start
    align-items: flex-start
    flex-direction: column
    .price
      color: #848484
      font-size: 14px
      font-weight: 400
      position: relative
      padding-top: 10px
      display: inline-flex
      .old_price
        position: absolute
        text-decoration: line-through
        text-decoration-color: $fucsia
        color: #cdcdcd
        font-size: 12px
        top: 0
        right: -10px
      &.error
        color: $fucsia
</style>
