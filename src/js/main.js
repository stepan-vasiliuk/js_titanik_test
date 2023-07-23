import '../css/style.css'
import Table from './components/table/table';

export default class Main {

    constructor() {

    }


    async render() {
        this.#initElements();
        this.passengers = null;
        try {
            const response = await fetch('src/js/passengers.json');
            this.passengers = await response.json();
            console.log('success!', this.passengers.length);
        } catch (err) {
            console.log('Unable to get passangers list from json');
        }
        this.#tableRender();
        this.#addEventListeners();
    }

    #tableRender() {
        this.table = new Table(this.passengers);
        this.tableElement.append(this.table.elem);
    }

    #initElements() {
        this.tableElement = document.querySelector('#table');
        this.nameInputField = document.querySelector('#name-input');
        this.ageInputField = document.querySelector('#age-input');
    }

    #addEventListeners() {
        this.nameInputField.addEventListener('input', (event) => {
            this.table.updateFilters('name', event.target.value);
        });
        this.ageInputField.addEventListener('input', (event) => {
            this.table.updateFilters('age', event.target.value);
        });
    }

}
