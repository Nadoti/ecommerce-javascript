import CartScreen from "./src/Screens/CartScreen.js";
import Error404Screen from "./src/Screens/Error404Screen.js";
import HomeScreen from "./src/Screens/HomeScreen.js";
import ProductScreen from "./src/Screens/ProductScreen.js";
import { parseRequestUrl } from "./src/utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart": CartScreen
}

const router = async () => {
  const request = parseRequestUrl()

  const parseUrl = 
    (request.resource ? `/${request.resource}` : "/") + 
    (request.id ? `/:id` : "") + 
    (request.verb ? `/${request.verb}` : "")
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen
  const main = document.querySelector(".main_container")
  main.innerHTML = await screen.render()
  screen.after_render()
}

window.addEventListener("load", router)
window.addEventListener("hashchange", router)