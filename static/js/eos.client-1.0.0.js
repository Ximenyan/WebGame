import EOS from "/static/js/eosjs"
document.addEventListener(`scatterLoaded`, this.onScatterLoad);
onScatterLoad = () => {
console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
const scatter = window.scatter;
window.scatter = null;
// Here, we are connecting scatter with eosjs so that the transactions can be signed using keys present in scatter
this.eosClient = scatter.eos(
EOS_CONFIG.network,
EOS,
EOS_CONFIG.eosOptions,
EOS_CONFIG.network.protocol
);
// scatter object to collect the information present in wallet like accounts or public key
this.scatter = scatter;
// to load the data present in our table
this.loadTodos();
};
 
