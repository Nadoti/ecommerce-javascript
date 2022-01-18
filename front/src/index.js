import AboutScreen from "./Screens/AboutScreen.js";
import CartScreen from "./Screens/CartScreen.js";
import Error404Screen from "./Screens/Error404Screen.js";
import HomeScreen from "./Screens/HomeScreen.js";
import LoginScreen from "./Screens/LoginScreen.js";
import ProductScreen from "./Screens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart": CartScreen,
  "/cart/:id": CartScreen,
  "/about": AboutScreen,
  "/login": LoginScreen
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
