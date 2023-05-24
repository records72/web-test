<template lang="pug">
  main
    jumbo-main(:slides="$parent.$parent.slider")
    div#store
      store-section(v-if="$parent.$parent.goods.inventory.length" :items="$parent.$parent.goods.inventory" :title="'Инвентарь'" anchor="inventory")
      store-section(v-if="$parent.$parent.goods.sportswear.length" :items="$parent.$parent.goods.sportswear" :title="'Спортивная одежда'" anchor="wear")
      store-section(v-if="$parent.$parent.goods.accessories.length" :items="$parent.$parent.goods.accessories" :title="'Аксессуары'" anchor="accessories")
      store-section(v-if="$parent.$parent.goods.other.length" :items="$parent.$parent.goods.other" :title="''" anchor="other")
    reviews-component(:list="$parent.$parent.reviews")
    div(v-if="notEmptyCart" v-b-modal.cart)#cart_button
      img(:src="cart_img" alt="cart")
      div.count
        p="{{cart.length}}"
    b-modal(size="md" title="Корзина" hide-footer)#cart
      div.items_in_cart
        div(v-for="(c, cdx) in cart" :key="cdx").item
          div.d-flex.align-items-center.justify-content-between
            div.d-flex.justify-center.align-items-center.w-75
              img(:src="`https://topstretching.by/storage/app/media/${c.image}`" width="70").item-pic
              div.ml-2
                h5.text-uppercase.m-0="{{c.name}}"
                p(v-if="c.selected_size !== 'def'").m-0="{{c.selected_size}}"
                p(v-if="c.selected_color !== 'def'").m-0="{{c.selected_color}}"
            div.d-flex.justify-center.align-items-center
              p.mb-0.mt-2="{{c.price}} Br."
            div.d-flex.justify-center.align-items-center
              a(@click.prevent="removeItemFromCart(c.id, c.selected_size, c.selected_color)")
                img(:src="remove" width="20")

      hr
      div
        p="Контактные данные для заказа:"
        b-form
          b-form-group
            b-form-input(v-model="name" placeholder="Ваше имя")
          b-form-group
            vue-phone-number-input(default-country-code="BY" :only-countries="['BY']"  @input="onPhoneChange" ref="phone_input" v-model="ph" id="callback_phone" :clearable="true" :translations="{countrySelectorLabel: 'код страны',countrySelectorError: 'нет такого кода',phoneNumberLabel: 'Номер телефон',example: 'пример'}")
          b-form-group
            b-form-textarea(v-model="comment").no-resize
          b-form-group
            div.action
              a(@click.prevent="buy()" href="#").buy.w-100.text-center="КУПИТЬ"
</template>

<script>
import jumboMain from "../components/jumboMain"
import reviewsComponent from "../components/reviewsComponent"
import storeSection from "../components/storeSection"
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    jumboMain,
    reviewsComponent,
    storeSection
  },
  data(){
    return {
      cart_img: require('../assets/images/cart.svg'),
      remove: require('../assets/images/arrows_circle_remove.svg'),
      ph: '',
      phone_number: '',
      name: '',
      comment: '',
    }
  },
  computed:{
    ...mapGetters(['cart']),
    notEmptyCart(){
      return this.cart.length > 0;
    }
  },
  methods: {
    ...mapActions(['setNewCart']),
    buy(){
      if (this.phone !== '') {
        let data_cart = {
          name: this.name === '' ? 'не указано' : this.name,
          phone: this.phone_number,
          comment: this.comment,
          cart: this.cart
        }
        this.$axios.post('/order/', data_cart)
          .then(res => {
            if (res.data.status === 'success') {
              this.ph = '';
              this.phone = '';
              this.name = '';
              this.comment = '';
              this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                title: 'Заявка отправлена',
                variant: 'success',
                solid: true
              });
              this.setNewCart([]);
              this.$bvModal.hide("cart")
            }
          }).catch(err => {
          if (err) {
            this.$bvToast.toast('Произошла ошибка', {
              title: 'Ошибка',
              variant: 'danger',
              solid: true
            });
          }
        })
      }else{
        this.$bvToast.toast('Данные не заполнены или товара нет в наличии', {
          title: 'Ошибка',
          variant: 'danger',
          solid: true
        });
      }
    },
    onPhoneChange(){
      this.phone_number = this.$refs.phone_input.phoneFormatted;
    },
    removeItemFromCart(id, selected_size, selected_color){
      let newCart = this.cart.filter(el => {
        if (el.id === id){
          if(el.selected_size === selected_size){
            return el.selected_color !== selected_color
          }
        }else{
          return true
        }
      })
      this.setNewCart(newCart);
      if(!newCart.length){
        this.$bvModal.hide('cart')
      }
    }
  },
  mounted(){
  }
}
</script>

<style lang="sass">
@import "../assets/styles/variables"
.items_in_cart
  .item
    margin-bottom: 10px
    .item-pic
      border-radius: 10px
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1)
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
#cart_button
  position: fixed
  top: 100px
  right: 50px
  z-index: 4000
  background: #ffffff
  border: 1px solid #848484
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1)
  border-radius: 50%
  padding: 10px
  width: 60px
  height: 60px
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  &:focus
    outline: 0
  img
    width: 35px
    height: auto
    &:focus
      outline: 0
  .count
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    width: 25px
    height: 25px
    border-radius: 50%
    background: $fucsia
    color: #fff
    position: absolute
    bottom: 0px
    right: 0px
    p
      margin-bottom: 0
      margin-top: 2px
      font-size: 14px
      font-weight: 500
</style>
