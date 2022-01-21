const HomeScreen = {
  after_render() {
    const btnHome = document.querySelectorAll(".btn_home")
    btnHome.forEach(valor => {
      valor.addEventListener("click", (e) => {
        document.location.hash = `/cart/${e.target.id}`
      })
    })
  },
  async render() {
    const response = await fetch("http://localhost:3000/api/products", {
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(!response || !response.ok) {
      return `<div>Page Not Found</div>`
    }
    const products = await response.json()
    return `
    <div class="main">
      ${products.map(product => `
        
          <div class="main_home">
            <a href="/#/product/${product.id}">
              <img class="main_img" src="${product.image}" alt="">
            </a>
            <h2 class="main_title">${product.name}</h1>
            <button class="btn_home" id="${product.id}">COMPRAR</button>
          </div>
        
      
      `).join("\n")}
    </div>
    `
  } 
}

export default HomeScreen