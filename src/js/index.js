import "../css/styles.css";
import {
  getElement,
  showElement,
  hideElement,
  createCardComposerEle,
  createListItemComponent,
  removeElement
} from "./modules/helper";

const showCardComposer = () => {
  let parent = getElement("#list");
  hideElement("#add-btn");
  let cardComposer = createCardComposerEle();
  parent.appendChild(cardComposer);
};

const handleListActions = e => {
  var parent = getElement("#list");
  if (e.target && e.target.matches("button.save-btn")) {
    addListItem(e, parent);
  }
  if (e.target && e.target.matches("button.cancel-btn")) {
    removeElement(parent, ".card-composer");
    toggleAddCard();
  }
  if (e.target && e.target.matches("a.delete-btn")) {
    deleteListItem(e);
  }
  if (e.target && e.target.matches("a.clear-btn")) {
    let confirmation = confirm("Are you sure you want to clear the list");
    if (confirmation) {
      clearList();
    }
  }
};
const clearList = e => {
  var list = localStorage.getItem("toDoList");
  if (list) {
    list = JSON.parse(list);
    let parent = getElement("#list");
    list.forEach((item, i) => {
      let selector = `#item${i}`;
      removeElement(parent, selector);
    });
  }
  localStorage.setItem("toDoList", JSON.stringify([]));
};

const deleteListItem = e => {
  let index = parseInt(e.target.id, 10);
  let localStorageList = JSON.parse(localStorage.getItem("toDoList"));
  localStorageList.splice(index, 1);
  localStorage.setItem("toDoList", JSON.stringify(localStorageList));
  var parent = getElement("#list");
  let selector = `#item${index}`;
  removeElement(parent, selector);
};

const addListItem = e => {
  var parent = getElement("#list");
  let title = getElement("textarea").value;
  if (title) {
    removeElement(parent, ".card-composer");
    let ele = createListItem(title);
    parent.appendChild(ele);
    toggleAddCard();
  } else {
    alert("Card title cannot be empty");
  }
};

const toggleAddCard = () => {
  let sel = "#add-btn";
  let addBtn = getElement(sel);
  addBtn.className === "show" ? hideElement(sel) : showElement(sel);
};

const createListItem = html => {
  let list = localStorage.getItem("toDoList");
  if (!list) {
    list = [];
    localStorage.setItem("toDoList", JSON.stringify(list));
  } else {
    list = JSON.parse(list);
  }
  let listItem = createListItemComponent(html, list.length);
  list.push({ label: html, index: list.length - 1 });
  localStorage.setItem("toDoList", JSON.stringify(list));
  return listItem;
};

getElement("#app").innerHTML = `
<div id="mainBoard">
      <a class="btn clear-btn">clear</a>
      <ul id="list"></ul>
      <a id="add-btn" class="add-btn">
        <i class="fa fa-plus" aria-hidden="true"></i>
        Add new Card</a
      >
    </div>
`;
//attach handlers
getElement("#mainBoard").addEventListener("click", handleListActions);
getElement("#add-btn").addEventListener("click", showCardComposer);

//Retrieve list-items from local storage
var list = localStorage.getItem("toDoList");
if (list) {
  list = JSON.parse(list);
  let parent = getElement("#list");
  list.forEach((item, i) => {
    let listItem = createListItemComponent(item.label, i);
    parent.appendChild(listItem);
  });
}
