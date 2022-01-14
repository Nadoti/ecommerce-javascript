
import { apiUrl } from "./config.js"

export const getProduct = async (id) => {
  try {
    const request = await fetch(`${apiUrl}/api/products/${id}`,{
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(!request) {
      throw new Error("DANDO ERRO")
    }
    const response = await request.json()
    
    
    return response
  } catch(err) {
    return {error: "DEU ERRO"}
  }
}