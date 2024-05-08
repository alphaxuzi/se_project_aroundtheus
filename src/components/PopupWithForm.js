import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector('.modal__form')
        this._handleFormSubmit = handleFormSubmit;
    }
    close(){
        this._popupForm.reset();
        super.close();
    }

    _getInputValues(){
        const inputValues = {};
        const inputList = Array.from(this._popupForm.querySelectorAll(".modal__input"));
        inputList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues  
    }

    setEventListeners(){
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }
}