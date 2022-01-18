import { getProduct } from "../api.js"
import { getCartItems, setCartItems } from "../LocalStorage.js"
import { parseRequestUrl, rerender } from "../utils.js"

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems()
  const existItem = cartItems.find(x => x.product === item.product)
  console.log(cartItems)
  if(existItem) {
    if(forceUpdate) {
      cartItems = cartItems.map(x => x.product === existItem.product ? item : x)
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
    const qtdSelects = document.getElementsByClassName("qtd-select")
    Array.from(qtdSelects).forEach(qtdSelect => {
      qtdSelect.addEventListener('change', (e) => {
        const item = getCartItems().find(x => x.product === qtdSelect.id)
        addToCart({...item, qtd: Number(e.target.value)}, true)
      })
    })
    const deleteButtons

    Array.from(deleteButtons).forEach(deleteButton => {
      deleteButton.addEventListener('click', () => {
        removeFromCart(deleteButton.id)
      })
    })
    document.getElementById("checkout-button").addEventListener("click", () => {
      document.location.hash = "/signin"
    })
  },
  render() {
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
  }
  
}


export default CartScreen