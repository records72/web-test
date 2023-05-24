<template lang="pug">
  b-carousel#index(fade indicators controls)
    b-carousel-slide(v-for="(i, key) in slides" :key="key" :img-src="`https://topstretching.by/storage/app/media/${i.slide}`")
      div.alt-caption
        p.m-0="{{i.capition_small}}"
        h2="{{i.capition_big}}"
</template>

<script>
export default {
  name: "jumboMain",
  props: {
    slides: {
      type: Array
    }
  }
}
</script>

<style lang="sass" scoped>
  #index
    height: 850px
    overflow: hidden
    position: relative
    @media screen and (max-width: 1600px)
      height: inherit
    .alt-caption
      position: absolute
      z-index: 20
      left: 0
      width: 100%
      height: 100%
      padding-top: 20%
      @media screen and (max-width: 500px)
        padding-top: 20%
      p
        font-size: 2rem
        font-weight: 500
        @media screen and (max-width: 933px)
          font-size: 1rem
        @media screen and (max-width: 500px)
          font-size: 0.8rem
      h2
        font-size: 5rem
        font-weight: 900
        @media screen and (max-width: 933px)
          font-size: 3.5rem
        @media screen and (max-width: 500px)
          font-size: 2rem
</style>
