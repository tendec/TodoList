let add = document.getElementById("addTodo");
add.onclick = function () {
    let inputElement = document.getElementById("thingstodo");
    createTodoItem(inputElement.value);
    inputElement.value = "";
};

let sub = document.getElementById("thingstodo");
sub.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        add.click();
    }
});

function onCheckboxClick(element) {
    element.parentNode.classList.add("deleteLi");
    setTimeout(function () {
        deleteElement(element.parentNode);
    }, 1500)
}

function deleteElement(element) {
    container = document.querySelector("#listtodo");
    container.removeChild(element);
}

function createTodoItem(content) {
    document.getElementById("listtodo").innerHTML +=
        "<li><i class='fas fa-check' onclick='onCheckboxClick(this)'></i>" + "<input type='checkbox'/>" + content + "</li>";
}