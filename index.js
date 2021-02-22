let todoStorageArr = [];
let add = document.getElementById("addTodo");
add.onclick = function () {
    let inputElement = document.getElementById("thingstodo");
    createTodoItem(inputElement.value);
    todoStorageArr.push(inputElement.value);
    saveData();
    inputElement.value = "";
};

window.onload = function () {
    loadData();
    
    for (let i = 0; i < todoStorageArr.length; i++) {
        createTodoItem(todoStorageArr[i]);
    }
}

let sub = document.getElementById("thingstodo");
sub.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        add.click();
    }
});

function onCheckboxClick(element) {

    const content = element.parentNode.querySelector(".todosAdd").innerText;
    for (let i = 0; i < todoStorageArr.length; i++) {
        if (todoStorageArr[i] == content) {
            todoStorageArr.splice(i, 1);
            saveData();
        }
    }
    element.parentNode.classList.add("deleteLi");
    setTimeout(function () {
        deleteElement(element.parentNode);
    }, 300)
}

function deleteElement(element) {
    container = document.querySelector("#listtodo");
    container.removeChild(element);
}

function createTodoItem(content) {
    document.getElementById("listtodo").innerHTML +=
        "<li class='setPriority'><i class='fas fa-check' onclick='onCheckboxClick(this)'></i>" + "<span class='todosAdd'>" + content + "</span>" + "</li>";
}

function saveData() {
    if (todoStorageArr.length == 0) {
        localStorage.removeItem("todoStorage");
    } else {
        localStorage.setItem("todoStorage", todoStorageArr.join());
    }
}

function loadData() {
    const data = localStorage.getItem("todoStorage");
    if (data == null) {
        todoStorageArr = [];
    } else {
        todoStorageArr = data.split(',');

    }
}