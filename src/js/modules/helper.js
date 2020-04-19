const getElement = selector => {
  return document.querySelector(selector);
};

const showElement = selector => {
  let ele = getElement(selector);
  ele.classList.remove("hide");
  ele.className += " show";
};

const hideElement = selector => {
  let ele = getElement(selector);
  ele.classList.remove("show");
  ele.className += " hide";
};

const createCardComposerEle = () => {
  let cardComposer = createNewElement({
    tagName: "div",
    classList: ["card-composer"]
  });
  let btnRow = createNewElement({
    tagName: "div",
    classList: ["btn-row"]
  });
  let inputEle = createNewElement({
    tagName: "textarea",
    attrList: [
      { name: "autofocus", val: true },
      { name: "placeholder", val: "Add card title here" }
    ]
  });
  let saveBtn = createNewElement({
    tagName: "button",
    classList: ["save-btn"],
    html: "Save card"
  });
  let cancelBtn = createNewElement({
    tagName: "button",
    classList: ["cancel-btn", "fa", "fa-times"]
  });
  btnRow.appendChild(saveBtn);
  btnRow.appendChild(cancelBtn);
  cardComposer.appendChild(inputEle);
  cardComposer.appendChild(btnRow);
  return cardComposer;
};

const createNewElement = ({ tagName, classList, attrList, html }) => {
  let ele = document.createElement(tagName);
  if (classList && classList.length > 0) {
    classList.forEach(className => {
      ele.className += " " + className;
    });
  }
  if (attrList && attrList.length > 0) {
    attrList.forEach(attr => {
      ele.setAttribute(attr.name, attr.val);
    });
  }
  if (html) ele.innerHTML = html;
  return ele;
};

const removeElement = (parent, selector) => {
  let cardComposer = getElement(selector);
  parent.removeChild(cardComposer);
};

const createListItemComponent = (label, id) => {
  let listItem = createNewElement({
    tagName: "li",
    classList: ["list-item"],
    attrList: [
      { name: "draggable", val: true },
      { name: "id", val: `item${id}` }
    ],
    html: label
  });
  let btn = createNewElement({
    tagName: "a",
    classList: ["fa", "fa-minus", "delete-btn"],
    attrList: [{ name: "id", val: id }]
  });
  listItem.appendChild(btn);
  addEventsDragAndDrop(listItem);
  return listItem;
};

var dragSrcEl;
//Drag and drop methods
function dragStart(e) {
  this.style.opacity = "0.4";
  let label = this.innerHTML;
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", label);
}

function dragEnter(e) {
  this.classList.add("over");
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function dragDrop(e) {
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

function dragEnd(e) {
  var listItems = document.querySelectorAll(".list-item");
  listItems.forEach(item => {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
}

const addEventsDragAndDrop = el => {
  el.addEventListener("dragstart", dragStart, false);
  el.addEventListener("dragenter", dragEnter, false);
  el.addEventListener("dragover", dragOver, false);
  el.addEventListener("dragleave", dragLeave, false);
  el.addEventListener("drop", dragDrop, false);
  el.addEventListener("dragend", dragEnd, false);
};

export {
  getElement,
  showElement,
  hideElement,
  createCardComposerEle,
  addEventsDragAndDrop,
  createNewElement,
  removeElement,
  createListItemComponent
};
