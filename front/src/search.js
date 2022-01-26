function search() {
  const inputSearch = document.getElementsByName("busca")
  document.querySelector(".header_lupa").addEventListener("click", (e) => {
    e.preventDefault()
    if(inputSearch[0].value == "") {
      document.location.hash = ""
    } else {
      document.location.hash = `/search/${inputSearch[0].value.toLowerCase()}`
      inputSearch[0].value = ''
    }
    
  })
}

export default search