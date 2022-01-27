import { parseRequestUrl } from "../utils.js"
import { getProduct } from "../api.js"

const ProductScreen = {
  after_render() {
    const request = parseRequestUrl()
    document.querySelector(".btn_product").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`
    })
  },
  async render() {
    const request = parseRequestUrl()
    const product = await getProduct(request.id)
    console.log(request)
    if(product.error) {
      return `<div>${product.error}</div>`
    }
    
    return `
      <div class="main_product">
        <figure class="main_product_img">
          <img src="${product.image}">
        </figure>
        <section class="main_product_abstract">
          <h1 class="main_product_title">${product.name}</h1>
          <p class="main_product_price"><span>Price:</span> $${product.price}</p>
          <p class="main_product_status">Status: ${product.countInStock > 0 ?
            `<span class="product_stock">In Stock</span>`:
            `<span class="product_unavailable">Unavailable</span>`
          }</p>
          <button class="btn_product">COMPRAR </button>
        </section>
      </div>
    `
  }
}

export default ProductScreen