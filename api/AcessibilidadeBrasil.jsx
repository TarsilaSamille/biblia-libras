// import axios from "axios";
// var cors = require('cors')

// export default class AcessibilidadeBrasil {
//   constructor() {
//     this.api = axios.create({
//         baseURL: `http://www.acessibilidadebrasil.org.br/libras_3/ajax/`,
//       });
//       this.pathRest = `http://www.acessibilidadebrasil.org.br/libras_3/ajax/`;
//       this.auth = {
//         headers: {
//           'Access-Control-Allow-Origin': '*'
//         },
//       };
//   }
//   getPalavras(palavra, pagina) {
//     return new Promise((resolve, reject) => {
//       this.api
//         .get(`search/palavra/${palavra}/${pagina}`, this.auth)
//         .then((response) => {
//           resolve(response.data);
//           console.log(response)
//         })
//         .catch((e) => {
//           reject(e);
//         });
//     });
//   }
// }
