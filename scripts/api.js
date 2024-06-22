const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "fc7ad7f54emsh1fe9f36c8af42e6p10c4e3jsn6f81a600f0a5",
    "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
  },
};

const baseURL = "https://twitter-api45.p.rapidapi.com";

export class API {
  constructor() {}

  // kullanici detaylarini alma
  async getUser(username) {
    try {
      const res = await fetch(
        `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
        options
      );

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  // diger api istekleri

  async fetchData(endpoint, paramName, paramValue) {
    try {
      //parametre olarak gelen linke
      //yine parametre olarak gelen url parametresini ekleyip istek atiyoruz
      const res = await fetch(
        `${baseURL}${endpoint}?${paramName}=${paramValue}`,
        options
      );

      const data = await res.json();

      // console.log(data);
      return data;

    } catch (err) {
      console.log(err);
    }
  }
}
