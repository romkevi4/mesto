// =============================== Формирование класса для отрисовки элементов на странице ===============================
export default class Section {
    constructor({ items, renderer }, { elementsContainerSelector }) {
        this._initialArray = items;
        this._renderer = renderer;
        this._elementsContainer = document.querySelector(elementsContainerSelector);
    }

    // Визуализация карточки на странице
    addItem(item) {
        this._elementsContainer.prepend(item);
    }

    // Получение наименований мест и ссылок на картинки из исходного массива
    renderItems() {
        this._initialArray.reverse().forEach((item) => {
            this.addItem(this._renderer(item));
        });
    }
}