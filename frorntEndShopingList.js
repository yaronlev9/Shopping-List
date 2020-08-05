const Products = document.getElementById("getPrdcs");
let divProducts = document.getElementById("products");
const getId = document.getElementById("search");
const getById = document.getElementById("getById");
const add = document.getElementById("addBtn");
const deleteProduct = document.getElementById("deleteBtn");
const ProductUpdate = document.getElementById("updateBtn");

function changeDiv(){
    let body = document.getElementsByTagName("body")[0];
    let newDiv =document.createElement('div');
    newDiv.setAttribute('id','products');
    divProducts.remove()
    divProducts=newDiv;
    body.appendChild(divProducts);

}

async function  getProduct(){
    if(getId.value===''){
        return;
    }
    try{
        changeDiv();
      const { data } = await axios.get(`http://localhost:3001/products/${getId.value}`);
      makeDiv(data,divProducts);
    } catch(error) {
        divProducts.innerHTML="not found";
      return;
    }
} 
async function  delProduct(){
    if(getId.value===''){
        return;
    }
    try{
        changeDiv();
      await axios.delete(`http://localhost:3001/products/${getId.value}`);
    } catch(error) {
        divProducts.innerHTML="not found";
      return;
    }
} 


async function  getProducts(){
    try{
        changeDiv()
      const { data } = await axios.get(`http://localhost:3001/products`);
      createDivs(data);
    } catch(error) {
        divProducts.innerHTML="not found";
      return;
    }
} 

async function addProduct(product){
    try{
        await axios.post(`http://localhost:3001/products`,product);
    } catch(error) {
        divProducts.innerHTML="not found";
      return;
    }
} 
async function updatePr(product){
    try{
        await axios.put(`http://localhost:3001/products/${getId.value}`,product);
    } catch(error) {
        divProducts.innerHTML="not found";
      return;
    }
} 

function openTextArea (){
    changeDiv()
  
  let newAddDiv = document.createElement('div');
  newAddDiv.innerHTML=`
  <div>
  <div>
      Enter Barcode:
      <input id="bar" type="text" placeholder="Enter Barcode"/>
  </div>
  <div>
      Enter name:
      <input id="name" type="text" placeholder="Enter Barcode"/>
  </div>
  <div>
      Enter price:
      <input id="price" type="text" placeholder="Enter Barcode"/>
  </div>
  <div>
      Enter amount:
      <input id="amount" type="text" placeholder="Enter Barcode"/>
  </div>
  <div>
      Enter company:
      <input id="company" type="text" placeholder="Enter Barcode"/>
  </div>
  <button id ="subBtn">submit</button>
</div>`  
divProducts.appendChild(newAddDiv);
const submitBtn=document.getElementById("subBtn");
submitBtn.addEventListener('click',readInputs);
}

function updateProduct(){
    if(getId.value===''){
        return;
    }
    changeDiv()
  
  let newAddDiv = document.createElement('div');
  newAddDiv.innerHTML=`
  <div>
  <div>
      Enter name:
      <input id="name" type="text" placeholder="Enter Barcode"/>
  </div>
  <div>
      Enter price:
      <input id="price" type="text" placeholder="Enter Barcode"/>
  </div>
  <div>
      Enter amount:
      <input id="amount" type="text" placeholder="Enter Barcode"/>
  </div>
  <div>
      Enter company:
      <input id="company" type="text" placeholder="Enter Barcode"/>
  </div>
  <button id ="subBtn">submit</button>
</div>`  
divProducts.appendChild(newAddDiv);
const submitBtn=document.getElementById("subBtn");
submitBtn.addEventListener('click',readInputs2);
}


function createDivs(products){
    const lst=document.createElement("ol");
    divProducts.appendChild(lst)
    for (let product of products){
        const item = document.createElement("li");
        makeDiv(product,item);
        lst.appendChild(item);
    }
}

function makeDiv (product,item){
    const htmlText = `
      <div id="${product.barcode}">
        <div >BARCODE: ${product.barcode}</div>
        <div>NAME: ${product.name}</div>
        <div>PRICE: ${product.price}</div>
        <div>AMOUNT: ${product.amount}</div>
        <div COMPANY${product.company}</div>
        </div>`;
    item.innerHTML = htmlText; 
  }
  
  function readInputs(){
    if(document.getElementById("bar").value==='' || document.getElementById("name").value==='' || document.getElementById("price").value===''|| document.getElementById("amount").value===''||document.getElementById("company").value===''){
        return;
    }else{
    product = {
        "barcode": document.getElementById("bar").value,
        "name": document.getElementById("name").value,
        "price": document.getElementById("price").value,
        "amount": document.getElementById("amount").value,
        "company": document.getElementById("company").value
        };
    addProduct(product);
    }
   }
  function readInputs2(){
    if( document.getElementById("name").value==='' || document.getElementById("price").value===''|| document.getElementById("amount").value===''||document.getElementById("company").value===''){
        return;
    }else{
    product = {
        "barcode": document.getElementById("search").value,
        "name": document.getElementById("name").value,
        "price": document.getElementById("price").value,
        "amount": document.getElementById("amount").value,
        "company": document.getElementById("company").value
      };
      updatePr(product);
    }
  }

Products.addEventListener("click",getProducts);  
getById.addEventListener("click",getProduct);
add.addEventListener("click",openTextArea);
deleteProduct.addEventListener("click",delProduct);
ProductUpdate.addEventListener("click",updateProduct);
