import {
  mainEle,
  renderEmptyInfo,
  renderInfo,
  renderLoader,
  renderNews,
  renderTimeline,
  renderUserInfo,
  renderUserPage,
} from "./scripts/ui.js";
import { getLocal } from "./scripts/helpers.js";
import { API } from "./scripts/api.js";

const api = new API();

//! olay izleyiciler
// sayfanin yuklenmesi
document.addEventListener("DOMContentLoaded", async () => {
  // local'den kullanici bilgilerini alma ve ekrana basma
  const user = getLocal("user");
  // console.log(mainEle.pics,user);
  renderUserInfo(user);
});

// cikis butonuna tiklanma
mainEle.logoutBtn.addEventListener("click", () => {
  // kullaniciyi localden sil
  localStorage.removeItem("user");

  Toastify({
    text: "Çıkış Yaptınız",
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right,  #5755FE,  #373A40)",
      color: "FFF7FC",
    },
  }).showToast();

  // 2 saniye bekleyip sonra yönlendirme yap
  setTimeout(function () {
    // giris sayfasina yonlendir
    window.location = "/auth.html";
  }, 3000);
});

// detay alanini ekrana bas
const controlURL = async () => {
  // kullanicinin url konumuna erisme
  const path = location.search.split("/")[0];
  const userName = location.search.split("/")[1];
  const id = location.hash.replace("#", "");

  const user = getLocal("user");

  // kullanici cikis yaptiysa(localde yoksa) calisir login'e yonlendirir
  if (!user) {
    location = "/auth.html";
  }

  // kullanici anasayfada ise calisir
  if (!path) {
    //ekrana loader basar
    renderLoader(mainEle.tweetsArea);

    //anasayfa twetlerini alma
    //   console.log(user);
    const data = await api.fetchData(
      "/timeline.php",
      "screenname",
      user.profile
    );
    //    console.log(data.timeline);
    // twetleri ekrana basmaa
    renderTimeline(user, data.timeline, mainEle.tweetsArea);
  }

  // status sayfasinda ise ve id bulunuyorsa
  //tweet detaylarini al ekrana bas
  if (path === "?status" && id) {
    // apiden cvp beklemeden arayuzu hazirlama
    renderEmptyInfo();

    //api'ye istek atar
    // console.log("detay");
    const info = await api.fetchData("/tweet.php", "id", id);

    // tweet detaylarini  ekrana basar
    // console.log(info);
    renderInfo(info, userName);

    //arama kismi
    if (path === "?search" && id) {
      // console.log(id);
      // ekrana loader bas
      renderLoader(mainEle.main);

      // aratilan kelime ile ilgili tweetleri getir
      const data = await api.fetchData("/search.php", "query", id);
      console.log(data);

      //tweetleri ekrana bas
      renderTimeline(null, data.timeline, mainEle.main);
    }

    // hesap detay alani
    if (path === "?user" && id) {
      renderLoader(mainEle.main);

      const userInfo = await api.getUser(id);
      // console.log(userInfo);

      renderUserPage(userInfo);
    }

    // kullanici twitlweini al ve ekrana bas
    //tweetlwei gonderecegimiz yeri cagirma
    const outlet = document.querySelector(".user-tweets");
    // console.log(outlet);

    //ekrana loader basma
    renderLoader(outlet);

    //kullanicinin attigi tweetlere erisme
    const userTweets = await api.fetchData("/timeline.php", "screenname", id);
    console.dir(userTweets);

    renderTimeline(userInfo, userTweets.timeline, outlet);
  }
};

//hem sayfa yuklendiginde hem hashtag kismi degistiginde iki olayi ayni anda izleme
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});

//arama formunun gonderilmesi
mainEle.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.dir(e.target[0].value);
  // inputun verisine erisme
  const query = e.target[0].value;

  // arama sayfasina url'den yonlendirme
  // console.log(location);
  location = `?search#${query}`;
});

// geri butonuna tiklanma olayini izleme
mainEle.main.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-arrow-left")) {
    // 1 geri sayfaya gitmeyi saglar
    history.back();
  }
});

// Tanıyor Olabileceklerin kısmı
const news = async () => {
  const retweet = await api.fetchData(
    "/retweets.php",
    "id",
    "1700199139470942473"
  );
  // console.log(retweet);

  renderNews(retweet);
};
news();
