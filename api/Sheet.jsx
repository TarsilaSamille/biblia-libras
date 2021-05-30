import axios from "axios";
const CSVToJSON = require("csvtojson");

export default class Sheet {
  constructor() {
    this.api = axios.create({
      baseURL: "https://docs.google.com/spreadsheets/d/e/",
    });
    this.pathRest = `https://docs.google.com/spreadsheets/d/e/`;
  }

  getVideos2Id() {
    return new Promise((resolve, reject) => {
      this.api
        .get(
          `/2PACX-1vTkGtQEl4TrbIigi-ebyvcn8zY6yq-0r7FCqtHdFXKxCxhM1d4IRI9EzXjAsJp001d4d5pDBrSHaKFY/pub?output=csv`
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
  getVideosId() {
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
  getGlossario() {
    return new Promise((resolve, reject) => {
      this.api
        .get(
          "/2PACX-1vQrV5GCfTc92veY-Scu5zutApaMsYSzX--TzNaPRoaK8UDnOEYUlwAjSkKDbx0YMceI1N9Xxv7PK59J/pub?output=csv"
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
