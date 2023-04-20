import { UserInfo } from "./UserInfo"


class Section {
    constructor(items, renderer, containerSelector, userData) {
        this.items = items // массив данных, которые нужно добавить на страницу при инициализации класса
        this.renderer = renderer // функция, которая отвечает за создание и отрисовку данных на странице.
        this.containerSelector = containerSelector // селектор контейнера, в который нужно добавлять созданные элементы.
        this.userData = userData
    }

    renderItems() {
        // отвечает за отрисовку всех элементов
        console.log(this.userData._id)
        this.items.forEach(item => {
          this.addItem(this.renderer(item, this.userData._id))
        })
    }

    addItem(item) {
         // принимает DOM-элемент и добавляет его в контейнер.
        this.containerSelector.append(item)
    }
}

export { Section }



// cardElements.forEach(cardElement => {
//   elementsList.appendChild(cardElement);
//   const cardObject = JSON.parse(cardElement.dataset.cardObject);
//   const likeButton = cardElement.querySelector('.element__button');
//   if (cardObject.likes.map((item) => item._id).includes(myId)) {
//     likeButton.classList.add('element__button_active');
//   } else {
//     likeButton.classList.remove('element__button_active');
//   };
// });
