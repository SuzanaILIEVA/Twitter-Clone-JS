export const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passInp: document.querySelector("#pass"),
  nameArea: document.querySelector(".name-warning"),
  passArea: document.querySelector(".pass-warning"),
};

export const mainEle = {
  pics: document.querySelectorAll("#profile-pic"),
  userName: document.querySelector(".user-info #user-name"),
  userTag: document.querySelector(".user-info #user-tag"),
  logoutBtn: document.querySelector("#logout-btn"),
  tweetsArea: document.querySelector(".tweets-area"),
  main: document.querySelector("main"),
  searchForm: document.querySelector(".news form"),
  newsArea: document.querySelector(".news-area"),
};

export const renderUserInfo = (user) => {
  // kullanici resimlerini ekrana basar
  mainEle.pics.forEach((img) => (img.src = user.avatar));

  // kullanici ismini ekrana basar
  //   console.log(user);
  mainEle.userName.innerText = user.name;
  mainEle.userTag.innerText = "@" + user.profile;
};

// media icerigine gore html dondurur
const getMedia = (media) => {
  // console.log(media);
  if (media.photo) {
    return `<img src=${media.photo[0].media_url_https}>`;
  }

  if (media.video) {
    // diziden sadece mp4 leri al
    const filtred = media.video[0].variants.filter(
      (item) => item.content_type === "video/mp4"
    );
    // diziyi bitrate degerine gore artandan azalana siralar
    const sorted = filtred.sort((a, b) => b.bitrate - a.bitrate);
    //  console.log(sorted);

    return ` <video controls ><source src=${sorted[1]?.url}></video>`;
  }
  return "";
};

// kullanicinin tweetlerini ekrana basma
export const renderTimeline = (user, tweets, outlet) => {
  console.log(tweets);
  // console.log(user);
  moment.locale("tr");
  let timelineHTML = tweets
    .map((tweet, i) => {
      // Varsayılan kullanıcı değerlerini ayarla
      const userAvatar =
        user && user.avatar ? user.avatar : `https://picsum.photos/20${i}`;
      const userName = user && user.name ? user.name : tweet.screen_name;
      const userProfile =
        user && user.profile ? user.profile : tweet.screen_name;

      return `
      <div class="tweet">
        <img id="profile-pic" src="${userAvatar}">
        <div class="body">
          <div class="user">
            <a href="?user#${userProfile}" class="info">
              <h6 id="user-name">${userName}</h6>
              <p id="user-tag">@${userProfile}</p>
              <p>${moment(tweet.created_at).fromNow()}</p>
            </a>
            <i class="bi bi-three-dots"></i>
          </div>
          <a href="?status/${userProfile}#${tweet.tweet_id}" class="content">
            <p>${tweet.text}</p>
            ${getMedia(tweet.media)}
          </a>
          <div class="buttons">
            <button><i class="bi bi-chat"></i><span>${
              tweet.replies
            }</span></button>
            <button><i class="bi bi-recycle"></i><span>${
              tweet.retweets + tweet.quotes
            }</span></button>
            <button><i class="bi bi-heart"></i><span>${
              tweet.favorites
            }</span></button>
            <button><i class="bi bi-bookmark"></i><span>${
              tweet.bookmarks
            }</span></button>
          </div>
        </div>
      </div>
    `;
    })
    .join(" ");

  outlet.innerHTML = timelineHTML;
};

// ekrana loader basma
export const renderLoader = (outlet) => {
  outlet.innerHTML = `
    <div class="d-flex justify-content-center mt-5">
  <div class="spinner-border" role="status">
    <span class="sr-only"></span>
  </div>
  </div>
    `;
};

// apiden cvp gelene kadar gozukecek kisim
export const renderEmptyInfo = () => {
  mainEle.main.innerHTML = `
         <div class="top loading-top"> 
       <a><i class="bi bi-arrow-left"></i></a>
        <h3>Gönderi</h3>
       </div>

        <div class="d-flex justify-content-center mt-5">
  <div class="spinner-border" role="status">
    <span class="sr-only"></span>
  </div>
  </div>
    `;
};

// tweet detayini ekrana basar
export const renderInfo = (info, userName) => {
  // console.log(info);
  const html = `
    <div class="info-area"> 
    <div class="top"> 
       <a ><i class="bi bi-arrow-left"></i></a>
        <h3>Gönderi</h3>
    </div>
    <div class="tweet-info">
      <div class="user">
      <div class="info">
      <img src="/images/defaultt.png"/>
        <h6 id="user-name">${userName}</h6>
        <p id="user-tag">@${userName}</p>
      </div>
      <button>Abone Ol</button>
      </div>
      <div class="content">
      <p>${info.text}</p>
     </div>

     <div class="data">
        <p>
        <span class="count">${info.retweets}</span>
        <span>Yeni Gönderi</span>
        </p>
         <p>
        <span class="count">${info.quotes}</span>
        <span>Alıntılar</span>
        </p>
         <p>
        <span class="count">${info.likes}</span>
        <span>Beğeni</span>
        </p>
         <p>
        <span class="count">${info.bookmarks}</span>
        <span>Yer İşareti</span>
        </p>
     </div>


       <div class="buttons">
              <button><i class="bi bi-chat"></i></button>
              <button><i class="bi bi-recycle"></i></button>
              <button><i class="bi bi-heart"></i></button>
              <button><i class="bi bi-bookmark"></i></button> 
            </div>
    </div>
    </div>
       
    `;

  mainEle.main.innerHTML = html;
};

// tiklanilan kullanici hakkinda bilgileri ekrana basar
export const renderUserPage = (user) => {
  mainEle.main.innerHTML = `
    <div class="user-page">
     <div class="top">
     <a><i class="bi bi-arrow-left"></i></a>
     <h3>${user.name}</h3>
    </div>

    <div class="banner">
    <img src="https://picsum.photos/900/200"/>
     <img  class="user-pp" src="${user.avatar}"/>
    </div>

    <div class="buttons">
        <i class="bi bi-three-dots"></i>
        <i class="bi bi-envelope"></i>
        <button>Takip et</button>
    </div>

     <div class="user-page-info">
    <h4>${user.name}</h4>
    <p>@${user.profile}</p>

    <p>${user.desc}</p>
    <div>
      <p>
        <span>${user.friends}</span>
        <span>Takip Edilen</span>
      </p>
      <p>
        <span>${user.sub_count}</span>
        <span>Takipçi</span>
      </p>
    </div>
   </div>

   <div class="user-tweets">
   
   </div>
    </div>
    `;
};

// taniyor olabileceklerin kismini ekrana basar
export const renderNews = (tweets) => {
  //  console.log(tweets.retweets);
  const tweetsArr = tweets.retweets;
  //  console.log(tweetsArr);
  const filtred = tweetsArr.filter((tweet) => tweet.user_id !== null);

  const box = filtred
    .map(
      (item) => `
     <li class="news-box">
          <div>
         <img src="${item.profile_image}">
          <p>${item.name}</p>
          </div>
          <p>${item.description}</p>
         <div class="btnn">
          <button>Takip et</button>
         </div>
        </li>
  `
    )
    .join("");

  mainEle.newsArea.innerHTML = box;
};
