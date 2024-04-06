let xht

// Validacion para navegadores INTERNET EXPLORER - MICROSOFT
if (window.XMLHttpRequest) {
  xht = new XMLHttpRequest()
} else {
  xht = new ActiveXObject("Microsoft.XMLHTTP")
}

// READY STATE
// 0	UNINITIALIZED	todavía no se llamó a open().
// 1	LOADING	todavía no se llamó a send().
// 2	LOADED	send() ya fue invocado, y los encabezados y el estado están disponibles.
// 3	INTERACTIVE	Descargando; responseText contiene información parcial.
// 4	COMPLETED	La operación está terminada.

// STATUS CODE
// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

// RESPONSE - content of response

// Esta al pendiente al cambio de "readyState"
// peticion.addEventListener("readystatechange", () => {
//   console.log("peticion.readyState")
//   console.log(peticion.readyState)
//   console.log("peticion.response")
//   console.log(peticion.response)
//   console.log("peticion.status")
//   console.log(peticion.status)
// })

// Este se llama cuando la operacion se ha completado READY STATE => 4
// xht.addEventListener("load", () => {
//   console.log("xht.readyState")
//   console.log(xht.readyState)
//   console.log("xht.response")
//   console.log(JSON.parse(xht.response))
//   console.log("xht.status")
//   console.log(xht.status)
// })

// GET
// xht.open("GET", "./txt/products.txt")
// xht.send()

// xht.open("GET","https://reqres.in/api/users?page=2")
// xht.send()

// POST
// xht.open("POST", "https://reqres.in/api/users")
// xht.setRequestHeader("Content-type", "application/json;charset=UTF8")
// xht.send(
//   JSON.stringify({
//     name: "Rene Edgard",
//     job: "Developer",
//   })
// )

// FETCH
const getFetchTxt = () => {
  const div = document.querySelector("#containerB")
  const p = document.createElement("p")

  fetch("./txt/products.txt")
    .then((res) => res.text())
    .then((resp) => {
      const textNode = document.createTextNode(resp)
      p.appendChild(textNode)
      div.appendChild(p)
    })
}

const getFetchUsers = () => {
  const div = document.querySelector("#containerA")
  const ul = document.createElement("ul")
  const fragment = document.createDocumentFragment()

  fetch("https://reqres.in/api/users?page=2")
    .then((res) => res.json())
    .then((resp) => {
      resp.data.forEach((e, index) => {
        const element = document.createElement("li")
        const textNode = document.createTextNode(
          `${index} Name: ${e.first_name} ${e.last_name} - Email: ${e.email}`
        )
        element.appendChild(textNode)
        fragment.appendChild(element)
      })

      ul.appendChild(fragment)
      div.appendChild(ul)
    })
}

const postFetchUser = (body) => {
  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
    .then((res) => res.json())
    .then((resp) => console.log(resp))
}

// getFetchUsers()
// getFetchTxt()

// AXIOS
const getAxiosTxt = () => {
  const div = document.querySelector("#containerB")
  const p = document.createElement("p")

  axios.get("./txt/products.txt").then((res) => {
    const textNode = document.createTextNode(res.data)
    p.appendChild(textNode)
    div.appendChild(p)
  })
}

const getAxiosUsers = () => {
  const div = document.querySelector("#containerA")
  const ul = document.createElement("ul")
  const fragment = document.createDocumentFragment()

  axios.get("https://reqres.in/api/users?page=2").then((res) => {
    res.data.data.forEach((e, index) => {
      const element = document.createElement("li")
      const textNode = document.createTextNode(
        `${index} Name: ${e.first_name} ${e.last_name} - Email: ${e.email}`
      )
      element.appendChild(textNode)
      fragment.appendChild(element)
    })

    ul.appendChild(fragment)
    div.appendChild(ul)
  })
}

const postAxiosUser = (body) => {
  // OPTION 1
  axios
    .post(
      "https://reqres.in/api/users",
      { ...body },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => console.log(res.data))

  // OPTION 2
  // axios("https://reqres.in/api/users", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: body,
  // }).then((res) => console.log(res.data))

  // OPTION 3
  // axios({
  //   method: "POST",
  //   url: "https://reqres.in/api/users",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: body,
  // }).then((res) => console.log(res.data))
}

getAxiosTxt()
getAxiosUsers()

const formA = document.querySelector("#formA")
formA.addEventListener("submit", (e) => {
  e.preventDefault()

  // Dos formas de obtener el objeto HTML
  // console.log("e.target", e.target)
  // console.log(formA)

  const data = Object.fromEntries(new FormData(e.target))

  // FETCH
  // postFetchUser(data)

  // AXIOS
  postAxiosUser(data)
})
