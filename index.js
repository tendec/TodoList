let add = document.getElementById("addTodo");
add.onclick = function () {
    let inputElement = document.getElementById("thingstodo");
    if (inputElement.value == "") {
        alert("Type a todo!");
    } else {
        createTodoItem(inputElement.value);
        todoStorageArr.push(inputElement.value);
        colorStorageArr.push("black");
        saveData();
        inputElement.value = "";
        setEventPriorityButtonClick();
    }
};

let todoStorageArr = [];
let colorStorageArr = [];
window.onload = function () {
    loadData();
    for (let i = 0; i < todoStorageArr.length; i++) {
        createTodoItem(todoStorageArr[i]);
        if (colorStorageArr[i] == "red") {
            red[i].parentNode.children[1].classList.add("redIsHigh");
        } else if (colorStorageArr[i] == "yellow") {
            yellow[i].parentNode.children[1].classList.add("yellowIsMedium");
        } else if (colorStorageArr[i] == "green") {
            green[i].parentNode.children[1].classList.add("greenIsLow");
        }
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
            colorStorageArr.splice(i, 1);
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
        localStorage.removeItem("colorStorage");
    } else {
        localStorage.setItem("todoStorage", JSON.stringify(todoStorageArr));
        localStorage.setItem("colorStorage", JSON.stringify(colorStorageArr));
    }
}

function loadData() {
    const dataTodo = localStorage.getItem("todoStorage");
    const dataColor = localStorage.getItem("colorStorage");
    todoStorageArr = dataTodo == null ? [] : JSON.parse(dataTodo);
    colorStorageArr = dataColor == null ? [] : JSON.parse(dataColor);
}

let green = document.getElementsByClassName("lowBtn");
let yellow = document.getElementsByClassName("mediumBtn");
let red = document.getElementsByClassName("highBtn");
function setEventPriorityButtonClick() {
    for (let i = 0; i < red.length; i++) {
        red[i].onclick = function () {
            if (red[i].parentNode.children[1].classList.contains("yellowIsMedium") || red[i].parentNode.children[1].classList.contains("greenIsLow")) {
                red[i].parentNode.children[1].classList.remove("yellowIsMedium", "greenIsLow");
            };
            red[i].parentNode.children[1].classList.add("redIsHigh");
            colorStorageArr[i] = "red";
            saveData();
        }
    };
    for (let j = 0; j < yellow.length; j++) {
        yellow[j].onclick = function () {
            if (yellow[j].parentNode.children[1].classList.contains("redIsHigh") || yellow[j].parentNode.children[1].classList.contains("greenIsLow")) {
                yellow[j].parentNode.children[1].classList.remove("redIsHigh", "greenIsLow");
            };
            yellow[j].parentNode.children[1].classList.add("yellowIsMedium");
            colorStorageArr[j] = "yellow";
            saveData();
        }
    }
    for (let o = 0; o < green.length; o++) {
        green[o].onclick = function () {
            if (green[o].parentNode.children[1].classList.contains("yellowIsMedium") || green[o].parentNode.children[1].classList.contains("redIsHigh")) {
                green[o].parentNode.children[1].classList.remove("yellowIsMedium", "redIsHigh");
            };
            green[o].parentNode.children[1].classList.add("greenIsLow");
            colorStorageArr[o] = "green";
            saveData();
        }
    }
}