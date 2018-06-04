<template>
    <section class="ui grid main container">
      <div class="three wide column">
        <form class="ui form">
          <div class="ui negative message" v-if="hasError">
            <p>{{errorText}}</p>
            <div v-for="error,key in errorList">
              <li>{{error}}</li>
            </div>
          </div>
          <div class="field">
            <label>Date</label>
            <datePicker v-model="startDate"></datePicker>
          </div>
          <div class="field">
            <label>Open</label>
            <input type="text" v-model="open">
          </div>
          <div class="field">
            <label>High</label>
            <input type="text" v-model="high">
          </div>
          <div class="field">
            <label>Low</label>
            <input type="text" v-model="low">
          </div>
          <div class="field">
            <label>Close</label>
            <input type="text" v-model="close">
          </div>
          <div class="field">
            <label>Volume Trade</label>
            <input type="text" v-model="volume_trade">
          </div>
          <button class="ui basic blue button" v-on:click.prevent="submit" type="submit">Submit</button>
        </form>
      </div>
      <div class="twelve wide column">
        <label>Stock Options</label>
        <table class="ui celled padded table">
          <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume Trade</th>
            <th>Action</th>

          </tr></thead>
          <tbody>
          <tr v-for="stock,key in stockOptionList">
            <td>
              {{new Date(stock.date).getDate()}}/{{new Date(stock.date).getMonth()}}/{{new Date(stock.date).getFullYear()}}
            </td>
            <td>
              ${{stock.open}}
            </td>
            <td>
              ${{stock.high}}
            </td>
            <td>
              ${{stock.low}}
            </td>
            <td>
              ${{stock.close}}
            </td>
            <td>
              {{stock.volume_trade}}&nbsp pieces
            </td>
            <td>
              {{stock.action}}
            </td>
          </tr>
          </tbody>
        </table>
        <h3>{{conclusion}}</h3>
      </div>
    </section>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  import datePicker from 'vuejs-datepicker';
  import moment from 'moment';
  export default {
    name: "konten",
    data(){
      return{
        errorText:"",
        errorList:[],
        hasError:false,
        startDate: new Date(),
        tanggalMulaiText:"",
        open:0,
        high:0,
        low:0,
        close:0,
        volume_trade:0,
        stockOptionList:[],
        conclusion:""
      }
    },
    mounted () {
      this.loadData();
    },
    methods: {
      submit:function () {
        this.$http.post(restAPI.submitStockOption,{
          date:moment(this.startDate),
          open:this.open,
          high:this.high,
          low:this.low,
          close:this.close,
          volume_trade:this.volume_trade
          },{
            headers:{
            },
          }
        ).then(function (data) {
          if(data.body.success === true){
            console.log(data.body)
            this.conclusion=data.body.conclusion;
            this.stockOptionList=data.body.results;
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
            this.errorList=data.body.error;
          }
        });
      },
      loadData:function () {
        this.$http.get(restAPI.loadStockOption
        ).then(function (data) {
          if(data.body.success === true){
            console.log(data.body)
            this.conclusion=data.body.conclusion;
            this.stockOptionList=data.body.results;

          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
            this.errorList=data.body.error;
          }
        });
      },
    },
    components: {
      datePicker
    },
  }
</script>

<style scoped>

</style>
