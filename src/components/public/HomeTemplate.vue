<template>
  <section>
    <h1>Stock Option Simulation</h1>
    <main-content></main-content>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import MainContent from './HomeContent.vue';

    import global_json from '../../assets/js/globalVariable.json';

    export default {
      name: "index",
      beforeCreate:function () {

      },
      created () {

          document.title = 'Tunaiku';
        },
      data(){
        return{

        }
        },
      components: {
          MainContent,
          'main-content' : MainContent
        }
    }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
