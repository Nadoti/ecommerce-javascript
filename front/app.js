import HomeScreen from "./src/Screens/HomeScreen.js";
import { parseRequestUrl } from "./src/utils.js";

const routes = {
  "/": HomeScreen
}

const router = async () => {
  const request = parseRequestUrl()

  const parseUrl = (request.resource ? `/${request.resource}` : "/") + (request.id ? `/:id` : "") + (request.verb ? `/${request.verb}` : "")
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen
  const main = document.querySelector(".main")
  main.innerHTML = await screen.render()
}

window.addEventListener("load", router)