const getProductsBtn = document.getElementById("getBtn");
let productsDiv = document.getElementById("product");
const inputText = document.getElementById("Barcode");
const getByid = document.getElementById("getByIdBtn");
const addProductBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const editBtn = document.getElementById("editBtn");
let currnetIdToEdit = null;

function createNewDiv(){
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", "product");
  productsDiv.remove();
  productsDiv = newDiv;
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(productsDiv);
}

async function getProducts(){
    createNewDiv()
    try{
      const { data } = await axios.get(`http://localhost:3001/products`);
      document.getElementById("Barcode").value ="";
      createDivs(data);
    } catch(error) {
      document.getElementById("Barcode").value = "";
      productsDiv.innerHTML="Product list not found";
      return;
    }
};

async function getProduct(){
  createNewDiv();
  let value = `/${document.getElementById("Barcode").value}`;
  if (value === "/"){
    return;
  }
  const { data } = await axios.get(`http://localhost:3001/products${value}`);
  document.getElementById("Barcode").value ="";
  makeProductDiv(data, productsDiv);
};

async function addProduct(data){
  createNewDiv();
  await axios.post(`http://localhost:3001/products`, data);
};

async function editProduct(data){
  createNewDiv();
  try{
    await axios.put(`http://localhost:3001/products/${currnetIdToEdit}`, data);
  } catch(e){
    productsDiv.innerHTML="not existing product";
    document.getElementById("Barcode").value = "";
    }
};

function createDivs(products){
let lst = document.createElement("ol");
productsDiv.appendChild(lst);
for (let product of products){
    let item = document.createElement("li");
    lst.appendChild(item);
    makeProductDiv(product, item);
    }
}

function makeProductDiv (product, item){
const htmlText = `
    <div>Barcode: ${product.barcode}</div>
    <div>Name: ${product.name}</div>
    <div>Price: ${product.price}</div>
    <div>Amount: ${product.amount}</div>
    <div>Company: ${product.company}</div><br>`;
item.innerHTML = htmlText;
}

function openTextArea(){
  createNewDiv()
  let div = document.createElement("div");
  div.innerHTML = `
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
    <button id="add">add</button>`;
  productsDiv.appendChild(div);
  document.getElementById("add").addEventListener("click", add);
}

function add(){
  let product;
  if (document.getElementById("bar").value !== "" && document.getElementById("name").value !== "" 
    && document.getElementById("price").value !== "" && document.getElementById("amount").value !== "" 
    && document.getElementById("company").value !== ""){
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

async function deleteProduct(){
  createNewDiv();
  if (inputText.value === ""){
    return;
  }
  await axios.delete(`http://localhost:3001/products/${inputText.value}`);
  document.getElementById("Barcode").value = "";
}

function editTextArea(){
  if (inputText.value === ""){
    return;
  }
  currnetIdToEdit = inputText.value;
  createNewDiv()
  let div = document.createElement("div");
  div.innerHTML = `
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
    <button id="edit">add</button>`;
  productsDiv.appendChild(div);
  document.getElementById("edit").addEventListener("click", edit);
}

function edit(){
  let product;
    product = {
      "barcode": inputText.value,
      "name": document.getElementById("name").value,
      "price": document.getElementById("price").value,
      "amount": document.getElementById("amount").value,
      "company": document.getElementById("company").value
    };
    editProduct(product);
  }

getProductsBtn.addEventListener("click", getProducts);
getByid.addEventListener("click", getProduct);
addProductBtn.addEventListener("click", openTextArea);
deleteBtn.addEventListener("click", deleteProduct);
editBtn.addEventListener("click", editTextArea);