import { addEventsDragAndDrop } from "./dragNDrop";

const getElement = selector => {
  return document.querySelector(selector);
};

const toggleVisibility = selector => {
  let ele = getElement(selector);
  let classToRemove = ele.classList.contains("hide") ? "hide" : "show";
  let classToAdd = classToRemove === "hide" ? " show" : " hide";
  ele.classList.remove(classToRemove);
  ele.className += classToAdd;
};

const createCardComposerEle = () => {
  let cardComposer = createNewElement({
    tagName: "div",
    classList: ["card-composer"]
  });

  cardComposer.innerHTML = `
  <textarea placeholder='Add card title' autofocus></textarea>
    <div class='btn-row'>
    <button class='save-btn'>Save card</button>
    <button class='cancel-btn fa fa-times'></button>
  </div>
  `;
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
    ]
  });
  listItem.innerHTML = `<label>${label}</label><a class='fa fa-minus delete-btn' id=${id}> </a>`;
  addEventsDragAndDrop(listItem);
  return listItem;
};

export {
  getElement,
  toggleVisibility,
  createCardComposerEle,
  createNewElement,
  removeElement,
  createListItemComponent
};
