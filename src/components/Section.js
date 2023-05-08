// Класс отрисовки блока

class Section {
  constructor({renderer, container}) {
    this._renderer = renderer // функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = container // селектор контейнера, в который нужно добавлять созданные элементы.
  }

  renderItems({items, userData}) {
    // отвечает за первичную отрисовку всех элементов
    items.forEach(item => {
      this._container.append(this._renderer(item, userData._id))
    })
  }

  prependItem(addedCard) {
    // добавляет новую карточку
    this._container.insertBefore(addedCard, this._container.firstChild)
  }
}

export default Section
