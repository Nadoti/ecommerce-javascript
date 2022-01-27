import { getProduct } from "../api.js"
import { getCartItems, setCartItems } from "../LocalStorage.js"
import { parseRequestUrl, rerender } from "../utils.js"

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems()
  const existItem = cartItems.find(x => x.product === item.product)
  if(existItem) {
    if(forceUpdate) {
      cartItems = cartItems.map((x) => x.product ===  existItem.product ? item : x)
    }
  } else {
    cartItems = [...cartItems, item]
  }
  setCartItems(cartItems)
  if(forceUpdate) {
    rerender(CartScreen)
  }
}

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter(x => x.product !== id))
  if(id === parseRequestUrl().id) {
    document.location.hash = "/cart"
  } else {
    rerender(CartScreen)
  }
}


const CartScreen = {
  after_render() {
    const qtdSelects = document.getElementsByClassName("qtd_select")
    Array.from(qtdSelects).forEach(select => {
      select.addEventListener("change", (e) => {
        const item = getCartItems().find(x => x.product === select.id)
        addToCart({...item, qtd: Number(e.target.value)}, true)
      })
    })
    const btnDelete = document.getElementsByClassName("btn_delete")
    Array.from(btnDelete).forEach((d) => {
      d.addEventListener("click", () => {
        removeFromCart(d.id)
      })
    })

    
  },
  async render() {
    const request = parseRequestUrl()
    if(request.id) {
      const product = await getProduct(request.id)
      addToCart({
        product: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qtd: 1  
      })
    }

    const cartItems = getCartItems()
    return `
      <div class="cart_container">
        <div class="cart_sub">
          <ul class="cart-list-container">
            <li class="cart_title">
              <h3>Shoping Cart</h3>
              <h4>Price</h4>
            </li>
            ${
              cartItems.length === 0 ?
                "<div>Cart is empty. <a href='/#/'>Go Shopping</a></div>" :
                cartItems.map(item => `
                  <li class="cart_product">
                    <div>
                      <img src="${item.image}" alt="${item.name}"/>
                    </div>
                    <div class="cart_details">
                      <div class="cart_name">
                        <a href="/#/product/${item.product}">
                          ${item.name}
                        </a>
                      </div>
                      <div class="cart_content">
                        <div class="cart_qtd">
                          Qtd: <select class="qtd_select" id="${item.product}">
                          ${
                            [...Array(item.countInStock).keys()].map(x => 
                              item.qtd === x+1 ?
                              `<option selected value="${x+1}">${x+1}</option>` :
                              `<option value="${x+1}">${x+1}</option>`
                            )
                          }
                          </select>
                        </div>
                        <button type="button" class="btn_delete" id="${item.product}">Delete</button>
                      </div>
                    </div>
                    <div class="cart_price">
                          $${item.price}
                      </div>
                  </li>
                `).join('\n')
            }
          </ul>
        </div>
        <div>
          <h4>
            Sub-Total (${cartItems.reduce((a, c) => a + c.qtd, 0)} items)
            :
            $${cartItems.reduce((a, c) => a + c.price * c.qtd, 0)}
          </h4>
          <button>
            finalize purchase
          </button>
        </div>
      </div>
    `
  }
  
}


export default CartScreen