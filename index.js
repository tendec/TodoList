let add = document.getElementById("addTodo");
add.onclick = function () {
    let inputElement = document.getElementById("thingstodo");
    if (inputElement.value == "") {
        alert("Type a todo!");
    } else {
        createTodoItem(inputElement.value);
        todoStorageArr.push(inputElement.value);
        saveData();
        inputElement.value = "";
        setEventPriorityButtonClick();
    }
};

let todoStorageArr = [];
window.onload = function () {
    loadData();
    for (let i = 0; i < todoStorageArr.length; i++) {
        createTodoItem(todoStorageArr[i]);
    }
    setEventPriorityButtonClick();
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
        "<li><i class='fas fa-check' onclick='onCheckboxClick(this)'></i>" + "<span class='todosAdd'>" + content + "</span><button class='btnPriority highBtn'>High</button><button class='btnPriority mediumBtn'>Medium</button><button class='btnPriority lowBtn'>Low</button>" + "</li>";
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

function setEventPriorityButtonClick() {
    let red = document.getElementsByClassName("highBtn");
    for (let i = 0; i < red.length; i++) {
        red[i].onclick = function () {
            if (red[i].parentNode.children[1].classList.contains("yellowIsMedium") || red[i].parentNode.children[1].classList.contains("greenIsLow")) {
                red[i].parentNode.children[1].classList.remove("yellowIsMedium", "greenIsLow");
            };
            red[i].parentNode.children[1].classList.add("redIsHigh");
        }
    };
    let yellow = document.getElementsByClassName("mediumBtn");
    for (let j = 0; j < yellow.length; j++) {
        yellow[j].onclick = function () {
            if (yellow[j].parentNode.children[1].classList.contains("redIsHigh") || yellow[j].parentNode.children[1].classList.contains("greenIsLow")) {
                yellow[j].parentNode.children[1].classList.remove("redIsHigh", "greenIsLow");
            };
            yellow[j].parentNode.children[1].classList.add("yellowIsMedium");
        }
    }
    let green = document.getElementsByClassName("lowBtn");
    for (let o = 0; o < green.length; o++) {
        green[o].onclick = function () {
            if (green[o].parentNode.children[1].classList.contains("yellowIsMedium") || green[o].parentNode.children[1].classList.contains("redIsHigh")) {
                green[o].parentNode.children[1].classList.remove("yellowIsMedium", "redIsHigh");
            };
            green[o].parentNode.children[1].classList.add("greenIsLow");
        }
    }
}