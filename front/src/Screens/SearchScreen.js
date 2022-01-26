import {parseRequestUrl} from "../utils.js"

const SearchScreen = {
  async render() {
    const {id} = parseRequestUrl()
    const response = await fetch(`http://localhost:3000/api/search/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(!response || !response.ok) {
      return `<div>Nenhum resultado encontrado pela busca</div>`
    }
    const products = await response.json()
    console.log(products)
    return `
      <div class="main">
        ${products.map(product => `
          <div class="main_home">
            <a href="/#/product/${product.id}">
              <img class="main_img" src="${product.image}" alt="${product.name}" />
            </a>
            <h2 class="main_title">${product.name}</h2>
            <button class="btn_home" id="${product.id}">COMPRAR</button>
          </div>
        
        `).join("\n")}
      </div>
    `
  }
}

export default SearchScreen