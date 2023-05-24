<template lang="pug">
  section#navigation
    b-container
      b-navbar(toggleable="lg" type="light")
        b-navbar-brand
          nuxt-link(:to="{ path: '/',hash:'index'}")
            img(:src="logo" width="120")
        b-navbar-toggle(target="nav_bar_collapse")
        b-collapse(is-nav)#nav_bar_collapse
          b-navbar-nav.ml-auto
            b-nav-item(:to="{ path: '/', hash:'wear'}" @click.prevent)="ОДЕЖДА"
            b-nav-item(:to="{ path: '/', hash:'inventory'}" @click.prevent)="ИНВЕНТАРЬ"
            b-nav-item(:to="{ path: '/', hash:'accessories'}" @click.prevent)="АКСЕССУАРЫ"
            b-nav-item(:to="{ path: '/', hash:'reviews'}" @click.prevent)="ОТЗЫВЫ"
            b-nav-item(:to="{ path: '/', hash:'contacts'}" @click.prevent)="КОНТАКТЫ"
            b-nav-item(href="https://topstretching.by/")="КЛУБ"
</template>

<script>
export default {
    name: "HComponent",
    data(){
      return {
        logo: require('../../assets/images/logo.png')
      }
    }
}
</script>

<style lang="sass" scoped>
  @import "../../assets/styles/variables"
  #navigation
    background-color: rgba(200, 200, 200, 0.8)
    box-shadow: rgba(0, 0, 0, 0) 0px 1px 3px
    position: fixed
    width: 100%
    z-index: 99
    .nav-item
      a
        text-transform: uppercase
        color: #222
        font-weight: bold
        transition: .3s
        &:hover
          color: $fucsia
        &.nuxt-link-active
          color: $fucsia
</style>
