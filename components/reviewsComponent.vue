<template lang="pug">
  section#reviews.py-3
    b-container
      h2.text-center.section-slide="Отзывы"
      b-row
        b-col(sm="12" md="6" lg="6" v-for="(item, key) in list" :key="key")
          div.block-review
            div.speach.px-5.py-3
              p="{{item.text}}"
            div.author.p-4
              img(:src="`${item.avatar}`").avatar
              span.ml-2.author="{{item.author}}"
        b-col(sm="12" md="12" lg="12")
          div.w-100.d-flex.justify-content-center.align-items-center.flex-row
            b-button(v-b-modal.leaveReview).clickerReview="Оставить Отзыв"
          b-modal(size="md" title="Оставить отзыв" hide-footer)#leaveReview
            div.d-flex.justify-content-center.align-items-center
              img(:src="this.pvb ? this.pvb : this.noava").bvb-avatar
            b-form
              b-form-group
                b-form-input(v-model="name" placeholder="Ваше имя")
              b-form-group
                vue-phone-number-input(default-country-code="BY"  @input="onPhoneChange" ref="phone_rev_input" v-model="ph" id="review_phone" :clearable="true" :translations="{countrySelectorLabel: 'код страны',countrySelectorError: 'нет такого кода',phoneNumberLabel: 'Номер телефон',example: 'пример'}")
              b-form-group
                b-form-file(placeholder="Аватар" :file-name-formatter="formatNames" v-model="avatar" accept=".jpg, .png, .gif" browse-text="Загрузить" lang="ru")
              b-form-group
                b-form-textarea(v-model="comment").no-resize
              b-form-group
                div.action
                  a(@click.prevent="send()" href="#").buy.w-100.text-center="ОТПРАВИТЬ"

</template>

<script>
export default {
    name: "reviewsComponent",
    props: {
      list: {
        type: Array
      }
    },
  data(){
      return {
        name: '',
        phone: '',
        ph: '',
        comment: '',
        avatar: null,
        pvb: false,
        noava: require('../assets/images/noava.jpg')
      }
  },
  watch:{
    avatar(){
      this.processFile();
    }
  },
  methods:{
    formatNames(files) {
      if (files.length === 1) {
        return files[0].name
      } else {
        return `${files.length} файл(ов) выбрано`
      }
    },
    processFile(){
      const reader = new FileReader();
      reader.readAsDataURL(this.avatar);
      reader.onload = () => {
        this.pvb = reader.result
      };
      return true;
    },
    onPhoneChange(){
      this.phone = this.$refs.phone_rev_input.phoneFormatted;
    },
    send(){
      let fd = new FormData();
      fd.append('avatar', this.avatar);
      fd.set('name', this.name);
      fd.set('phone', this.phone);
      fd.set('comment', this.comment);
      this.$axios.post('/rm/', fd)
        .then(res => {
          if (res.data.status === 'success'){
            this.$bvModal.hide('leaveReview')
            this.$bvToast.toast('Отзыв отправлен на модерацию', {
              title: 'Успех',
              variant: 'success',
              solid: true
            });
          }else{
            this.$bvToast.toast('Попробуйте позже', {
              title: 'Ощибка',
              variant: 'danger',
              solid: true
            });
          }
        })
        .catch(err => {
          console.error(err)
          this.$bvToast.toast('Попробуйте позже', {
            title: 'Ощибка',
            variant: 'danger',
            solid: true
          });
        })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .clickerReview
    background-color: transparent
    border: 1px solid #000000
    border-radius: 0
    color: #000000
    transition: 0.3s
    text-transform: uppercase
    font-weight: 500
    padding: 12px 20px 8px
    line-height: 1
    &:hover
      background-color: #000000
      color: #fff
  h2
    font-size: 3rem
    font-weight: 900
    @media screen and (max-width: 500px)
      font-size: 2rem
  #reviews
    background: $pbc
    .speach
      background: #ffffff
      border-radius: 15px
      position: relative
      &:after
        content: ''
        position: absolute
        bottom: -22px
        left: 15px
        width: 0
        height: 0
        margin-left: 35px
        border: 12px solid
        border-color: #fff transparent transparent #fff
    .avatar
      border-radius: 50px
      width: 50px
      height: 50px
    .author
      color: #666
      font-weight: 700
  .bvb-avatar
    margin: 10px
    border-radius: 50px
    width: 75px
    height: 75px
</style>
