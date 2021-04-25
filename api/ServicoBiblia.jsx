import axios from "axios";
//https://github.com/marciovsena/abibliadigital/blob/master/DOCUMENTATION.md/
export default class ServicoBiblia {
  constructor() {
    this.api = axios.create({
      baseURL: `https://www.abibliadigital.com.br/api/`,
    });
    this.pathRest = `https://www.abibliadigital.com.br/api/`;
    this.token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhdCBBcHIgMjQgMjAyMSAxODozNjowMSBHTVQrMDAwMC50YXJzaWxsYXNhbWlsZUBnbWFpbC5jb20iLCJpYXQiOjE2MTkyODkzNjF9.NJMY_P1GtoRehWHkuRRp1RS0GvrxmdgOQ-5AHog6z-4";
    this.auth = {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    };
  }

  login() {
    return new Promise((resolve, reject) => {
      this.api
        .get(`users/tarsillasamile@gmail.com`, this.auth)
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((e) => {
          reject(e);
          console.log(e);
        });
    });
  }

  getChapterText(version, abbrev, chapter) {
    return new Promise((resolve, reject) => {
      this.api
        .get(`verses/${version}/${abbrev}/${chapter}`, this.auth)
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getBooks() {
    return new Promise((resolve, reject) => {
      this.api
        .get(`books`, this.auth)
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getBook(book_abbrev) {
    return new Promise((resolve, reject) => {
      this.api
        .get(`books/${book_abbrev}`, this.auth)
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getVersions() {
    return new Promise((resolve, reject) => {
      this.api
        .get(`versions`, this.auth)
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
