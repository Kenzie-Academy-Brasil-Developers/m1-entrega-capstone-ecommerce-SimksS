import { data } from "./database.js";
headerCreate()
function headerCreate(){
    //Criando menu header e h1
    let header = document.createElement('header')
    document.querySelector('body').appendChild(header)
    let nav = document.createElement('nav')
    nav.setAttribute("id","menu-top")
    document.querySelector("header").appendChild(nav)
    let shopTitle = document.createElement("h1")
    document.querySelector("#menu-top").appendChild(shopTitle)
    let shopName = document.createTextNode("Weartake")
    document.querySelector("h1").appendChild(shopName)
    //Criando menu de navegação
    let navigationMenu = document.querySelector("#menu-top")
    navigationMenu.innerHTML += `
    <ul>
    <li class = "navigation-Menu"><a class="nav-item">Todos</a></li>
    <li class = "navigation-Menu"><a class="nav-item">Acessórios</a></li>
    <li class = "navigation-Menu"><a class="nav-item">Calçados</a></li>
    <li class = "navigation-Menu"><a class="nav-item">Camisetas</a></li>
    </ul>`
    shopInit()
}
function shopInit (){ 
    //criando containeres de armazenamento do conteudo
   let mainTag = document.createElement("main")
   document.querySelector('body').appendChild(mainTag)
   let sectionAll = document.createElement('section')
   sectionAll.setAttribute("id","products-grid")
   sectionAll.setAttribute("class","product-grid") 
   document.querySelector("main").appendChild(sectionAll)
   //criando as grids com os produtos
   let productMaker = document.querySelector("#products-grid")
   for (let i = 0 ; i < data.length ; i++){
       productMaker.innerHTML += `
       <section class="product-item `+data[i].tag+`">
       <figure class="product-img">
           <img src="`+data[i].img+`" alt="`+data[i].nameItem+`" class = "iten-img">
       </figure>
       <p class="category" >`+data[i].tag+`</p>
       <h2 class = "product-title">`+data[i].nameItem+`</h2>
       <p class="description">`+data[i].description+`</p>
       <ul>
           <li class="price" >R$ `+data[i].value+`,00</li>
           <li><button class = "addTo">Adicionar ao carrinho</button></li>
       </ul>
   </section> 
       `
   }
   cartInit()
}
function cartInit(){
    //criando containers externos do carrinho
    let sectionAside = document.createElement('section')
    sectionAside.setAttribute("id","menu-aside")
    document.querySelector("main").appendChild(sectionAside)
   
    let searchPlace = document.createElement('section')
    searchPlace.setAttribute("class","search-aside-menu")
    document.querySelector("#menu-aside").appendChild(searchPlace)
    let searchInput = document.createElement("input")
    searchInput.type = "text"
    searchInput.placeholder = "Digite aqui sua pesquisa"
    searchInput.setAttribute ("class","input-field" )
    document.querySelector(".search-aside-menu").appendChild(searchInput)
    let searchButton = document.createElement("button")
    searchButton.className = "search-button"
    let searchText = document.createTextNode("Pesquisar")
    document.querySelector(".search-aside-menu").appendChild(searchButton)
    document.querySelector(".search-button").appendChild(searchText)
    
    let buyCart = document.createElement('section')
    buyCart.setAttribute("class","shop-cart")
    document.querySelector("#menu-aside").appendChild(buyCart)
  //------------------------------------------------------------- 
    
    //criando containers internos do carrinho
    let cartTitle = document.createElement("section")
    cartTitle.setAttribute("class","shop-cart-title")
    document.querySelector(".shop-cart").appendChild(cartTitle)

    let cartItens = document.createElement("section")
    cartItens.setAttribute("class","shop-cart-itens")
    document.querySelector(".shop-cart").appendChild(cartItens)

    //-----------------------------------------------------------
   
    //Adicionando elementos às sections
    let carName = document.createElement("h2")
    carName.setAttribute("class","ShopTitle")
    let carNameShop = document.createTextNode("Carrinho de compras")
    document.querySelector(".shop-cart-title").appendChild(carName)
    document.querySelector(".ShopTitle").appendChild(carNameShop)

    let noItens =  document.createElement("section")
    noItens.setAttribute("class","no-itens")
    document.querySelector(".shop-cart-itens").appendChild(noItens)
    let noItensName = document.createElement("h3")
    noItensName.className = "noitens-name"
    let noItensNameAdd = document.createTextNode("Carrinho vazio")
    document.querySelector(".no-itens").appendChild(noItensName)
    document.querySelector(".noitens-name").appendChild(noItensNameAdd)
    let noItensSub = document.createElement("p")
    noItensSub.className = "noitens-sub"
    let noItensSubAdd = document.createTextNode("Adicione itens")
    document.querySelector(".no-itens").appendChild(noItensSub)
    document.querySelector(".noitens-sub").appendChild(noItensSubAdd)
    let carrinho = document.querySelector(".shop-cart")
    carrinho.innerHTML += `
    <section class="checkout-view invisible">
        <section class="quantity">
            <p class="quantity-title">Quantidade: </p>
            <p class="quantity-value">0</p>
        </section>
        <section class="price-checkout">
            <p class="price-title">Total: </p>
            <ul class="price-value">
                <li class="coin">R$</li>
                <li class="total-price">0,00</li>
            </ul>
        </section>
    </section> `
    let sectionProduct = document.createElement('section')
    sectionProduct.setAttribute("class","cart-itens")
    document.querySelector(".shop-cart-itens").appendChild(sectionProduct)
    let cartProduct = document.createElement("section")
    cartProduct.setAttribute("class","cart-product")
    document.querySelector(".cart-itens").appendChild(cartProduct)
    
    ready()
}

//Funçao Secretária que chama as demais funções de acordo com
 // evento capturado
function ready(){
    let addCart = document.getElementsByClassName("addTo")
    for (let i = 0 ; i < addCart.length ; i++){
        let add = addCart[i]
        add.addEventListener('click',adicionarCarrinho)
        
    }
    let navFilter = document.getElementsByClassName("navigation-Menu")
    for (let i = 0 ; i < navFilter.length ; i++){
        let filterNav = navFilter[i]
        filterNav.addEventListener('click',filterCat)
    }
    let KeySearch = document.querySelector(".input-field")
    KeySearch.addEventListener("keyup",captureText)
   
}
function adicionarCarrinho(event){
    //obtendo o elemento pai atraves do comando parentNode em cadeia
    let addCart = event.target
    let productShop = addCart.parentNode
    let fatherProduc = productShop.parentNode
    let aboveProduct = fatherProduc.parentNode
    //obtido o elemento pai solicitado, utilizamos o queryselector para pegar o elementos necessários
    let title = aboveProduct.querySelector(".product-title").innerText
    let price = aboveProduct.querySelector(".price").innerText.replace(",",".")
    let img = aboveProduct.querySelector(".iten-img").src
    produtosCarrinho(title,price,img)
}

function produtosCarrinho(title,price,img){
    //recido os parametros,devolvemos a visibilidade dos elementos
    //que compõe a utilização adequada do carrinho de compras
    let invisible = document.querySelector(".no-itens")
    invisible.classList.add("invisible")
    let checkout = document.querySelector(".checkout-view")
    checkout.classList.remove("invisible")
    //utilizamos o recurso
     let ulProduct = document.createElement ("ul")
     ulProduct.setAttribute("class","cart-product-item")
     let placeSelector = document.getElementsByClassName("cart-product")[0]
     let addCarrinho =`
         <li class="cart-image">
            <img src=${img} alt="">
         </li>
            <li>
                    <ul class="cart-description">
                        <li class="cart-product-title">${title}</li>
                        <li class="cart-product-price">${price}</li>
                        <li class="cart-remove"><button>Remover produto</button></li>
                    </ul>   
            </li>`
    ulProduct.innerHTML = addCarrinho
    placeSelector.appendChild(ulProduct)
    onlyRemove()
    atualizarTotal()
}
//função cujo parametro é receber as informações de remoção
// do carrinho e repassar para função que faz o procedimento
function onlyRemove (){
    let cartRemove = document.querySelectorAll(".cart-remove")
    for (let i = 0 ; i < cartRemove.length; i++){
        let remove = cartRemove[i]
        remove.addEventListener('click',removerCarrinho)
    }
}
//função que remove os itens do carrinho
function removerCarrinho(event){
    let removeCart = event.target
    let productShop = removeCart.parentNode
    let fatherProduc = productShop.parentNode
    let aboveFather = fatherProduc.parentNode
    aboveFather.parentNode.remove()  
    atualizarTotal()
}
//função para atualizar o total 
function atualizarTotal() {
    let productItens = document.querySelectorAll(".cart-product-item")
    let total = 0
    let quantidade = 0
    for (let i = 0 ; i < productItens.length; i++){
        let productItem = productItens[i]
        let precoElemento = productItem.querySelector('.cart-product-price')
    
        let preco = parseFloat(precoElemento.innerText.replace("R$ ",""))
        total += preco
        quantidade += 1
    }
    document.querySelector(".total-price").innerHTML = total.toFixed(2).replace(".",",")
    document.querySelector(".quantity-value").innerHTML = quantidade
    emptyCart (quantidade)
}
//função que mudar o visual do carrinho quando está vazio
function emptyCart(quantidade){
    if(quantidade == 0){
        let invisible = document.querySelector(".no-itens")
        invisible.classList.remove("invisible")
        let checkout = document.querySelector(".checkout-view")
        checkout.classList.add("invisible")
        // document.location.reload(true)
    }
}
//função que filtra por categoria
function filterCat (event) {
    let styleRemove = document.getElementsByClassName("nav-item")
    for (let i = 0 ; i < styleRemove.length ; i++){
       if(styleRemove[i].classList.contains("bold-style") == true){
            let remove = styleRemove[i]
           remove.classList.remove("bold-style")
       }
    }
    let categoryFilter = event.target
    let SearchBy = categoryFilter.innerText
    let filtro = data.filter((item)=>item.tag[0] === SearchBy)
    let reordered = document.querySelector("#products-grid")
        if (SearchBy == "Todos"){
            categoryFilter.classList.add("bold-style")
            remakeGrid(data)
        }
        else {
            if (filtro.length == 0){
                categoryFilter.classList.add("bold-style")
            }
            else if (filtro.length > 0 ) {
                categoryFilter.classList.add("bold-style")
                remakeGrid(filtro)
            }
        }
    }
//função que refaz a tela baseado nos parametros recebidos    
function remakeGrid (filter){
    let maxDatabaseCount = data.length
    let removeAll = document.querySelectorAll(".product-item")
    for (let i = 0 ; i < removeAll.length ; i++){
        let removeItem = removeAll[i]
        removeItem.remove()
    }
    if (filter.length < maxDatabaseCount - 1) {
        let reorder = document.querySelector("#products-grid")
        reorder.style.justifyContent = "flex-start"
        reorder.className = "remake-grid"
    }
    let addFiltered = document.querySelector("#products-grid")
    if (filter.length == 0){
        let styleRemove = document.getElementsByClassName("nav-item")
        for (let i = 0 ; i < styleRemove.length ; i++){
           if(styleRemove[i].classList.contains("bold-style") == true){
                let remove = styleRemove[i]
                let lastRemove = styleRemove[0]
               remove.classList.remove("bold-style")
               lastRemove.classList.add("bold-style")
           }
        }
        for (let i = 0 ; i < data.length; i++){
            addFiltered.innerHTML += `
            <section class="product-item `+data[i].tag+`">
                <figure class="product-img">
                    <img src="`+data[i].img+`" alt="`+data[i].nameItem+`" class = "iten-img">
                </figure>
                <p class="category" >`+data[i].tag+`</p>
                <h2 class = "product-title">`+data[i].nameItem+`</h2>
                <p class="description">`+data[i].description+`</p>
                <ul>
                    <li class="price" >R$ `+data[i].value+`,00</li>
                    <li><button class = "addTo">Adicionar ao carrinho</button></li>
                </ul>
            </section> 
            `
    }
}
    if (filter.length > 0){
        for (let i = 0 ; i < filter.length; i++){
        addFiltered.innerHTML += `
        <section class="product-item `+filter[i].tag+`">
            <figure class="product-img">
                <img src="`+filter[i].img+`" alt="`+filter[i].nameItem+`" class = "iten-img">
            </figure>
            <p class="category" >`+filter[i].tag+`</p>
            <h2 class = "product-title">`+filter[i].nameItem+`</h2>
            <p class="description">`+filter[i].description+`</p>
            <ul>
                <li class="price" >R$ `+filter[i].value+`,00</li>
                <li><button class = "addTo">Adicionar ao carrinho</button></li>
            </ul>
        </section> 
        `
    }
}
    
    ready ()
    onlyRemove()
}

//função para ler o que é escrito na  barra de pesquisa
function captureText(event){
     let x = document.querySelector(".input-field").value
     let y = []
    for(let i = 0 ; i < data.length; i++){
        if (x.length > 0){
            if(data[i].nameItem[0][0] == x[0].toUpperCase() || data[i].tag[0][0][0] == x[0].toUpperCase()){
                y.push(data[i])
            }
        }
    }
    remakeGrid(y)
}
