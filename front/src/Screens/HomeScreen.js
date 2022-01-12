const HomeScreen = {
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
    console.log(products)
    return `
      ${products.map(product => `

        <div class="main_product">
          <img class="main_img" src="${product.image}" alt="">
          <h2 class="main_title">${product.name}</h1>
          <button class="main_btn">COMPRAR</button>
        </div>
      
      `).join("\n")}
    `
  } 
}

export default HomeScreen