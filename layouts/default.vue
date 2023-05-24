<template lang="pug">
  div#app
    h-component
    section
      Nuxt
    f-component(:siteData="siteData")
</template>

<script>
  import HComponent from "@/layouts/partials/HComponent";
  import FComponent from "@/layouts/partials/FComponent";
  export default {
    components: {
      HComponent,
      FComponent
    },
    data(){
      return {
        goods: {
          sportswear: [],
          accessories: [],
          inventory: [],
          other: []
        },
        siteData: {},
        reviews: [],
        slider: []
      }
    },
    methods: {
    },
    created() {
      let data = require('../data.json').data;
      this.goods = data.goods ? data.goods : {};
      this.siteData = data.siteData ? data.siteData : {};
      this.reviews = data.reviews ? data.reviews : [];
      this.slider = data.slider ? data.slider : [];
    }
  };
</script>
