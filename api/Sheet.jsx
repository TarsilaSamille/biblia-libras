import axios from "axios";
const CSVToJSON = require("csvtojson");

export default class Sheet {
  constructor() {
    this.api = axios.create({
      baseURL: "https://docs.google.com/spreadsheets/d/e/",
    });
    this.pathRest = `https://docs.google.com/spreadsheets/d/e/`;
  }

  getDados() {
    return new Promise((resolve, reject) => {
      this.api
        .get(
          `/2PACX-1vTQrxSX15xpJgo2eZuHFhEme1BA_KmEIEdXin7xsjpp-KS6-hd113HFylD2ZF7w3aIMftZyRqjdH-Sx/pub?output=csv`
        )
        .then((response) => {
          CSVToJSON()
            .fromString(response.data)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((e) => {
          reject(e);
          console.log(e);
        });
    });
  }
}
