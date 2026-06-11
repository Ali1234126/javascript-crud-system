let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let all = document.getElementById("all");

let mod = "create";
let tmp;
// get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";

    total.style.backgroundColor = "rgb(177, 4, 4)";
  }
}

// create product

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else dataPro = [];

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (!validateData()) {
    return;
  }
  if (mod === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mod = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }
  // save localstorage
  localStorage.setItem("product", JSON.stringify(dataPro));

  clearData();
  showData();
};

// clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read

function showData() {
  getTotal();
  let table = "";
  let i;
  for (i = 0; i < dataPro.length; i++) {
    table += `
        
         <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData( ${i} ) " id="update">update</button></td>
                <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>
                 
        
        
        `;
  }

  document.getElementById("tbody").innerHTML = table;

  if (dataPro.length > 0) {
    all.innerHTML = `
     <button onclick="deleteAll()">Delete All ( ${dataPro.length}  )</button>
    `;
  } else {
    all.innerHTML = "";
  }
}

showData();

// delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  // localStorage.clear(); // remove all data in website
  localStorage.removeItem("product");
  dataPro = [];
  showData();
}

// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  count.style.display = "none";
  category.value = dataPro[i].category;
  getTotal();
  submit.innerHTML = "update";
  mod = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search

let searchMood = "title";
let search = document.getElementById("search");

function getSearchMood(id) {
  searchMood = id;
  search.placeholder = "Search By " + id;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (dataPro[i][searchMood].toLowerCase().includes(value.toLowerCase())) {
      table += `
         <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData( ${i} ) " id="update">update</button></td>
                <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>
        `;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean data

function validateData() {
  if (title.value.trim() === "") {
    alert("Title is required");
    title.focus();
    return false;
  }

  if (price.value.trim() === "") {
    alert("Price is required");
    price.focus();
    return false;
  }

  if (+price.value <= 0) {
    alert("Price must be greater than 0");
    price.focus();
    return false;
  }

  if (category.value.trim() === "") {
    alert("Category is required");
    category.focus();
    return false;
  }

  if (+count.value > 100) {
    alert("Maximum count is 100");
    count.focus();
    return false;
  }

  return true;
}

// function validateData() {

//     let valid = true;

//     [title, price, category].forEach(input => {
//         input.style.border = "";
//     });

//     if(title.value.trim() === ""){
//         title.style.border = "2px solid red";
//         valid = false;
//     }

//     if(price.value.trim() === "" || +price.value <= 0){
//         price.style.border = "2px solid red";
//         valid = false;
//     }

//     if(category.value.trim() === ""){
//         category.style.border = "2px solid red";
//         valid = false;
//     }

//     return valid;
// }
