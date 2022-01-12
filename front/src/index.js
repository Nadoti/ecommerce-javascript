import { parseRequestUrl } from "./utils"
console.log('ola')
const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen
}

const router = () => {
  const request = parseRequestUrl()
  const parseUrl = (request.resource ? `/${request.resource}` : '/') +
                   (request.id ? '/:id': '') + 
                   (request.verb ? `/${request.verb}` : '')
}
