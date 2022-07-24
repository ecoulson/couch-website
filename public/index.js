const scrapingUrl = "https://couch-website.herokuapp.com/images";
const app = document.getElementById("app");

class Couch {
  constructor(url) {
    this.url = url;
  }

  imageUrl() {
    return this.url;
  }
}

function renderCouch(couch) {
  const container = document.createElement("div");
  const image = document.createElement("img");
  image.src = couch.imageUrl();
  container.appendChild(image);
  return container;
}

function renderCouches(couches) {
  couches.forEach((couch) => {
    app.appendChild(renderCouch(couch));
  });
}

function getImages() {
  return fetch(scrapingUrl, {}).then((res) => res.json());
}

function render() {
  renderLoading();
  getImages().then((images) => {
    removeLoading();
    renderCouches(images.map((image) => new Couch(image)));
  });
}

function renderLoading() {
  const text = document.createElement("p");
  text.id = "loading-status";
  text.textContent = "Loading...";
  app.appendChild(text);
}

function removeLoading() {
  const node = document.getElementById("loading-status");
  app.removeChild(node);
}

render();
