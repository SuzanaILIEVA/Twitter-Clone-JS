import { authEle } from "./ui.js";
import { API } from "./api.js";
import { setLocal } from "./helpers.js";

// console.log(authEle);

const api = new API();

// şifre için kuralları içeren tanım
// min 1 küçük harf
// min 1 büyük harf
// min 1 sayı
// min 1 özel karakter
// min 6 karakter
const regex =
  "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$";

// isim uyarisi varsa ekrana bas yoksa eski uyariyi sil
const renderWarns = (nameWarning, passWarning) => {
  if (nameWarning) {
    authEle.nameArea.innerHTML = ` <p class="warning">${nameWarning}</p>`;
  } else {
    authEle.nameArea.innerHTML = "";
  }

  // sifre uyarisi varsa ekrana bas yoksa eski uyariyi sil
  if (passWarning) {
    authEle.passArea.innerHTML = `<p class="warning">${passWarning}</p> `;
  } else {
    authEle.passArea.innerHTML = "";
  }
};

// formun gonderilme olayini izler
 authEle.loginForm.addEventListener("submit", async(e) => {
  e.preventDefault();

  let nameWarning = null;
  let passWarning = null;

  //input degerlerine erisme
  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;
  //    console.log(name,pass);

  // ismi kontrol etme
  if (!name) {
    nameWarning = "İsim alanı zorunludur";
  } else if (name.length <= 3) {
    nameWarning = "İsim 4 karakterden kısa olamaz";
  } else {
    nameWarning = null;
  }

  // sifre kontrol etme
  if (!pass) {
    passWarning = "Şifre alanı zorunludur";
  } else if (pass.length < 6) {
    passWarning = "Şifre 6 karakterden kısa olamaz";
  } else if (!pass.match(regex)) {
    passWarning =
      "Şifre en az 1 küçük harf, 1 büyük harf, 1 sayı, 1 özel karakter içermeli";
  } else {
    passWarning = null;
  }



 
  //uyarilari ekrana bas
  renderWarns(nameWarning, passWarning);

  //uyari yoksa formu gonder
  if (!nameWarning && !passWarning) {
    const userData = await api.getUser(name)
   
   
    // kullaniciyi lacal'e ekler
    setLocal("user", userData)


    if(name && pass) {
      Toastify({
        text: "giris Yaptınız",
        duration: 3000,
        close: true,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right,  #5755FE,  #373A40)",
          color:"FFF7FC"
        },
      }).showToast();
    }
  
    setTimeout(() => {
      window.location = "/";
    }, 3000);

    // kullaniciyi anasayfaya yonlendirir
       
        
  }


});

console.log(window.location);