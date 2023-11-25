const url = "https://api.github.com/users" ;

const searchInputEl = document.getElementById("searchInput") ;
const SearchButtonEl = document.getElementById("searchButton") ;

const profileContainerEl = document.getElementById("profileContainer")
const loadingEl = document.getElementById("loading")


const profileGenerator = (profile) => {
 return ` 
 <div class="profile-box">
    <div class="top-section">
        <div class="left">
            <div class="avatar">
                <img class="avatar-image" src="${profile.avatar_url}" alt="avatar">
            </div>
            <div class="left-content">
                <h1>${profile.name}</h1>
                <h1 class="account-name">@${profile.login}</h1>
            </div>
        </div>
        <a href="${profile.html_url}" target=_blank>
        <button id="check-profile" class="primary-button">Check Profile</button>
        </a>
    </div>
    <div class="about">
        <h1>About</h1>
        <p>${profile.bio}</p>
    </div>
  <div class="status">
    <div class="status-item">
        <h3>Followers</h3>
        <p>${profile.followers}</p>
       </div>
       <div class="status-item">
        <h3>${profile.following}</h3>
        <p>100</p>
       </div>
       <div class="status-item">
        <h3>Repos</h3>
        <p>${profile.public_repos}</p>
       </div>
  </div>
</div>
    `
}

const fetchProfile = async () => {
    const username = searchInputEl.value ;

    loadingEl.innerText = "loading....."
    loadingEl.style.color = "black" ;

  try {
    const response = await fetch(`${url}/${username}`) ;
    const data = await response.json() ;
    
       if(data.bio){
        loadingEl.innerText = "" ;
        profileContainerEl.innerHTML = profileGenerator(data);
       }
       else{
        loadingEl.innerText = data.message;
        loadingEl.style.color= "red";
        profileContainerEl.innerHTML = "";
       }

    console.log("data", data) ;
  } catch (error) {
    console.log({error})
    loadingEl.innerText = "" ;
  }
};


SearchButtonEl.addEventListener("click",fetchProfile);