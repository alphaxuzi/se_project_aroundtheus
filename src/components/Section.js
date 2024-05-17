export default class Section {
    constructor({items, renderer}, classSelector){
        this._data = items;
        this._renderer = renderer;
        this._classSelector = classSelector;
        this._container = document.querySelector(classSelector);
        this.renderItems();
    }

    renderItems(){
        this._data.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
         this._container.prepend(element)
    }
}