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
    
  },
  async render() {
    const request = parseRequestUrl()
    if(request.id) {
      const product = getProduct(request.id)
      addToCart({
        product: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        countInStock: product.countInStock,
        qtd: 1
      })
    }

    const cartItems = getCartItems()
  }
  
}


export default CartScreen