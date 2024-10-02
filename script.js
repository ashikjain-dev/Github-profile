const APIURL = "https://api.github.com/users/";

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
  } catch (err) {
    console.log(err);
    if (err.response.status === 404) {
      createErrorCard("No GitHub Profile with user name");
    }
  }
}

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});

async function createUserCard(user) {
  console.log(user);
  const repoArrayList = await getRepos(user.repos_url);
  console.log(repoArrayList.slice(0, 6));
  const cardHtml = `<div class="card">
        <div>
          <img
            class="avatar"
            src="${user.avatar_url}"
            alt="${user.name}"
          />
        </div>
        <div class="user-info">
          <h2>${user.login}</h2>
          <p>
            ${user.bio ? user.bio : "bio is not updated"}

          </p>
          <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>repos</strong></li>
          </ul>
          <div id="repos"> </div>
        </div>
      </div>`;

  main.innerHTML = cardHtml;

  const reposDiv = document.getElementById("repos");
  repoArrayList.slice(0, 6).forEach((repository) => {
    const aTag = document.createElement("a");
    aTag.classList.add("repo");
    aTag.href = repository.url;
    aTag.target = "_blank";
    aTag.text = repository.name;
    reposDiv.appendChild(aTag);
  });
}

async function getRepos(repoURL) {
  const arrayList = [];
  try {
    const { data } = await axios.get(repoURL);
    if (data.length > 0) {
      for (let i of data) {
        arrayList.push({ name: i.name, url: i.html_url });
      }
    }
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard("Problem fetching repos");
    }
  }
  return arrayList;
}

function createErrorCard(msg) {
  const cardHtml = `
  <div class='card'>
  <h1>${msg}</h1>
  </div>
  `;
  main.innerHTML = cardHtml;
}
const headerArr = [
  "S",
  "e",
  "a",
  "r",
  "c",
  "h",
  " ",
  "f",
  "o",
  "r",
  " ",
  "G",
  "i",
  "t",
  "H",
  "u",
  "b",
  " ",
  "P",
  "r",
  "o",
  "f",
  "i",
  "l",
  "e",
  ".",
  ".",
  ".",
];
function getHeader(headerArr) {
  const h1El = document.getElementById("header");
  h1El.classList.add("header");

  function writeEl(nextEl) {
    const spanEl = document.createElement("span");
    spanEl.innerHTML = nextEl;
    h1El.appendChild(spanEl);
  }

  for (let i = 0; i < headerArr.length; i++) {
    setTimeout(() => {
      writeEl(headerArr[i]);
    }, i * 500);
  }
}

getHeader(headerArr);
