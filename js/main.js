// Declaraciones
const d = document;
const main = d.querySelector('main');

// ------------------------------------------------------- //
//          Botones BackToTop y Modo Oscuro                //
// ------------------------------------------------------- //

let btnBTT = d.querySelector('#btnBTT');
let btnOscuro = d.querySelector('#btnOscuro')

// Cuando el usuario baja 350px desde el inicio del documento, muestra botones.
window.addEventListener('scroll', function(){
    if (d.body.scrollTop > 200 || d.documentElement.scrollTop > 200) {
        btnBTT.style.display = "block";
        btnOscuro.style.display = "block";
        } else {
        btnBTT.style.display = "none";
        btnOscuro.style.display = "none";
    }
})

// Cuando clickea, vuelve al inicio.
btnBTT.addEventListener('click', function(){
    d.body.scrollTop = 0;
    d.documentElement.scrollTop = 0;
});

// Al hacer click, cambia a modo oscuro.
btnOscuro.addEventListener('click', e =>{
  main.classList.toggle('darkmode');
  btnOscuro.classList.toggle('bi-sun');
  btnBTT.classList.toggle('darkmode');
  store(main.classList.contains('darkmode'));
});

// Para ver si está o no el darkmode
function load(){
  const darkmode = localStorage.getItem('darkmode');

  if (!darkmode){
    store('false');
  } else if(darkmode == 'true'){
    body.classList.add('darkmode');
  }
}

function store(value){
  localStorage.setItem('darkmode', value);
}

// ------------------------------------------------------- //
// ------------------------------------------------------- //

function ajax(url, metodo ='get'){
  let httpMetodo = metodo
  let xhr = new XMLHttpRequest
  xhr.open(httpMetodo, url)
  xhr.send()

  return xhr
}


function cargarNav(){
  const nav = d.querySelector('nav')
  let xhr = ajax('navbar.html')
  console.log(xhr);
  
  xhr.addEventListener('load', ()=> { // cuando readyState === 4
      if (xhr.status === 200){
          nav.innerHTML = xhr.response
      }
      //getPlantillaSinHistory()
      getPlantillaConHistoryHash()
  })
}


function getPlantillaConHistoryHash(){

  // Cargar Home
  let hash = location.hash
  let archivo = hash ? hash.slice(1) + '.html' : 'home.html'  //ternario = IF --> si hash esta vacío va a ser home --> condicion ? true : false
  // slice lo que hace es si me viene "#perfil" lo deja en "perfil", por eso
  // el slice(1) el 1 es por el caracter que saca, despues suma ".html" y queda 
  // "#perfil" pasa a ser "perfil.html" 
  
  // console.log(archivo)
  let xhr = ajax(archivo)
  xhr.addEventListener('load', ()=>{
      if (xhr.status === 200){
          // console.log(xhr.response)
          main.innerHTML = xhr.response
      }
  })

  // Cargar las páginas restantes
  const links = d.querySelectorAll('a') 
  links.forEach(link =>{
      link.addEventListener('click', e=>{
          e.preventDefault()
          let id = link.id
          // console.log(id);
          location.hash = id

      })
  })

  // Registro de evento de cambio de hash/url
  window.addEventListener('hashchange',()=>{
      // console.log('cambio la URL')
      let hash = location.hash
      // console.log(hash)
      let archivo = hash ? hash.slice(1) + '.html' : 'home.html'
      // console.log(archivo)
      let xhr = ajax(archivo)
      xhr.addEventListener('load', ()=>{
          if (xhr.status === 200){
              main.innerHTML = xhr.response
          }
      })
  })
}

function start(){
  cargarNav()
}

start()

