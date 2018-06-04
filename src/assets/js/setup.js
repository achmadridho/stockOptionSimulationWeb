const devUrl="localhost";
const productionUrl="167.205.7.233";
const globalURL= "http://"+devUrl+":8182";
const globalSetup = {
    app_id:4501
};
const restAPI = {
  submitStockOption:globalURL+"/stocks/option/submit",
  loadStockOption:globalURL+"/stocks/option",

};

module.exports={restAPI,globalSetup};
