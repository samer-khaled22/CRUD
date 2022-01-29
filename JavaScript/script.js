// Regular expressions used to validate inputs
let nameRegex = /^([a-zA-Z ]{3,}$)/
let priceRegex = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/
let categoryRegex = /^([a-zA-Z ]{2,}$)/
let descRegex = /([a-zA-Z\d\.\-_\!\@\#\$\%\&\*]{3,})/
// ****************************************************

let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let alertBox = document.getElementById("alertBox");
let addBtn = document.getElementById("addBtn");
let updateName = document.getElementById("updateName");
let updatePrice = document.getElementById("updatePrice");
let updateCategory = document.getElementById("updateCategory");
let updateDesc = document.getElementById("updateDesc");
let allProducts ;

if (localStorage.getItem("productsData") == null){
    allProducts = []
}else {
    allProducts = JSON.parse(localStorage.getItem("productsData"));
    displayProducts();

}

// Creating object for product and pushing it to allProducts array :

function addProduct(){
    if(nameCheck()==true && priceCheck()==true && categoryCheck()==true && descCheck()==true){
        let product = {
            name:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            desc:productDesc.value
             }
        allProducts.push(product);
        localStorage.setItem("productsData", JSON.stringify(allProducts));
        clearForm()
        displayProducts()
    }
}
document.getElementById("addBtn").addEventListener("click",addProduct);

// Clearing form after adding the product :

function clearForm(){
        productName.value = "";
        productPrice.value= "";
        productCategory.value = "";
        productDesc.value = "" ;
}

// Displaying products in the table under form :

function displayProducts(){
    let container=``
    for(let i =0 ; i<allProducts.length ; i++){
    container+=`<tr>
    <td>${i+1}</td>
    <td>${allProducts[i].name}</td>
    <td>${allProducts[i].price}</td>
    <td>${allProducts[i].category}</td>
    <td>${allProducts[i].desc}</td>
    <td><button onclick="update(${i})" class="btn btn-outline-warning">Update</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
</tr>`

    }
document.getElementById("tBody").innerHTML=container
}

// Inputs validation functions 
// Product Name validation :
function nameCheck(){
  if(nameRegex.test(productName.value)==true){
      document.getElementById("nameWarning").classList.replace("d-block", "d-none")
      return true
  }else {
      document.getElementById("nameWarning").classList.replace("d-none", "d-block")
      return false  
  }
}
productName.addEventListener("keyup",nameCheck)

// ************ Price validation :

function priceCheck(){
    if(priceRegex.test(productPrice.value)==true){
        document.getElementById("priceWarning").classList.replace("d-block", "d-none")
        return true
    }else {
        document.getElementById("priceWarning").classList.replace("d-none", "d-block")
        return false  
    }
  }
  productPrice.addEventListener("keyup",priceCheck)

//   ***************** Category validation :


  function categoryCheck(){
    if(categoryRegex.test(productCategory.value)==true){
        document.getElementById("categoryWarning").classList.replace("d-block", "d-none")
        return true
    }else {
        document.getElementById("categoryWarning").classList.replace("d-none", "d-block")
        return false  
    }
  }
  productCategory.addEventListener("keyup",categoryCheck)

//   ***************** description validation :

  function descCheck(){
    if(descRegex.test(productDesc.value)==true){
        document.getElementById("descWarning").classList.replace("d-block", "d-none")
        return true
    }else {
        document.getElementById("descWarning").classList.replace("d-none", "d-block")
        return false  
    }
  }
  productDesc.addEventListener("keyup",descCheck)

//   ****

// Delete Function :

function deleteProduct(prodIndex){
    allProducts.splice(prodIndex,1);
    localStorage.setItem("productsData", JSON.stringify(allProducts));
    displayProducts()
}


// Search products by name :

function searchProducts(searchTerm){
    let container=``
    for ( let i =0 ; i < allProducts.length ; i++){
    if(allProducts[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true){
       container+=`<tr>
       <td>${i+1}</td>
       <td>${allProducts[i].name}</td>
       <td>${allProducts[i].price}</td>
       <td>${allProducts[i].category}</td>
       <td>${allProducts[i].desc}</td>
       <td><button onclick="update(${i})" class="btn btn-outline-warning">Update</button></td>
       <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
   </tr>`
    }
    }
    document.getElementById("tBody").innerHTML=container;
}


// Update function

function update(prodIndex , e){
    document.getElementById("overlay").classList.replace('d-none' , 'd-flex')
    updateName.value = allProducts[prodIndex].name;
    updatePrice.value = allProducts[prodIndex].price;
    updateCategory.value = allProducts[prodIndex].category ;
    updateDesc.value = allProducts[prodIndex].desc;
    localStorage.setItem("productIndex" , prodIndex)
   }

// Confirm Update

function confirm(){
    let productIndex = localStorage.getItem("productIndex");
    console.log(productIndex);
    let product = {
            name:updateName.value,
            price:updatePrice.value,
            category:updateCategory.value,
            desc:updateDesc.value
             };
    allProducts.splice(productIndex,1,product)
    localStorage.setItem("productsData", JSON.stringify(allProducts));
    document.getElementById("overlay").classList.replace('d-flex' , 'd-none');
    displayProducts()
}
document.getElementById("confirmUpdate").addEventListener("click",confirm);

// Cancel update and close window  

function cancelUpdate(){
    updateName.value = "";
    updatePrice.value = "";
    updateCategory.value = "" ;
    updateDesc.value = "";
    document.getElementById("overlay").classList.replace('d-flex' , 'd-none');
}
document.getElementById("closeIcon").addEventListener("click",cancelUpdate)




function scrollToTop() {
    window.scrollTo(0, 0);
}