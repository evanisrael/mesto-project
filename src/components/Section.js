


class Section {
    constructor({items, renderer}, containerSelector) {
        this.items = items // массив данных, которые нужно добавить на страницу при инициализации класса
        this.renderer = renderer // функция, которая отвечает за создание и отрисовку данных на странице.
        this.containerSelector = containerSelector // селектор контейнера, в который нужно добавлять созданные элементы.
    }

    renderItems() {
        // отвечает за отрисовку всех элементов
        this.items.forEach(item => {
            this.renderer(item)
        })
    }

    addItem(item) {
         // принимает DOM-элемент и добавляет его в контейнер.
        const container = document.querySelector(this.containerSelector)
        container.append(item)
    }
}

// test
