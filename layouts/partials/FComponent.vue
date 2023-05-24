<template lang="pug">
  footer#contacts.py-3
    b-container
      hr
      div.d-flex.justify-center.align-center.justify-content-center.align-items-center.my-3.flex-column
        img(:src="logo" alt="TopStraching Store" width="150")
        p.mt-1.mb-0="+{{siteData.phone_1}}"
        p.mt-1.mb-0="+{{siteData.phone_2}}"
        a(href="http://topstretching.by/storage/app/media/docs/public_oferta.pdf")="Договор об оказании услуг"
      p(v-html="siteData.legal_info").text-center.legal.mt-5
      p(v-html="'© 2020 TOPSTRETCHING®STORE'").text-center.copy.mt-3
</template>

<script>
export default {
    name: "FComponent",
    data(){
      return {
        logo: require('../../assets/images/logo_ts.svg')
      }
    },
    props: {
      siteData: {
        type: Object,
      }
    }
}
</script>

<style lang="sass" scoped>

</style>
