const days = document.querySelector("#days");
const list_form = document.querySelector("#list_form");
const list_form_input = document.querySelector("#list_form input");
const list_form_button = document.querySelector("#list_form button");
const list_ul = document.querySelector("#list_ul");

let arr = [];

function getDays() {
    const calender = new Date();
    const year = calender.getFullYear();
    const month = String(calender.getMonth()+1).padStart(2, "0");
    const date = String(calender.getDate()).padStart(2, "0");
    days.innerText = `${year}-${month}-${date}`;
}
getDays();

function saveList() {
    localStorage.setItem("LIST", JSON.stringify(arr));
}

function listPrint(newInputObj) {
    const li = document.createElement("li");
    li.id = newInputObj.id;
    const buttonCheck = document.createElement("button");
    buttonCheck.innerHTML = `<i class="fa-solid fa-check"></i>`;
    buttonCheck.addEventListener("click", btnCheck);
    const div = document.createElement("div");
    div.innerText = newInputObj.text;
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    buttonDelete.addEventListener("click", btnDelete)
    list_ul.appendChild(li);
    li.appendChild(buttonCheck);
    li.appendChild(div);
    li.appendChild(buttonDelete);
}

function btnCheck(event) {
    const buttonCheck = event.target;
    console.log(buttonCheck);
    const div = event.target.parentNode.nextElementSibling;
    console.log(event.target.parentNode);
    console.log(div);
    buttonCheck.classList.toggle("clicked_check");
    div.classList.toggle("clicked_check_line");
}

function btnDelete(event) {
    const li = event.target.parentNode.parentNode;
    console.log(li);
    li.remove();
    arr = arr.filter(x => x.id !== parseInt(li.id));
    saveList();
}

function submitEnter(event) {
    event.preventDefault();
    const newInput = list_form_input.value;
    list_form_input.value = "";
    const newInputObj = {
        text : newInput,
        id : Date.now(),
    }
    arr.push(newInputObj);
    listPrint(newInputObj);
    saveList();
}

list_form.addEventListener("submit", submitEnter);

let save = localStorage.getItem("LIST");
if(save) {
    const parseList = JSON.parse(save);
    save = parseList;
    parseList.forEach(listPrint);
}