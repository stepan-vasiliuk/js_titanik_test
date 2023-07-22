import '../css/style.css'

// let main = new Main();
// main.render();

export default class Main {

    constructor() {

    }


    async render() {
        try {
            const response = await fetch('passengers.json');
            this.products = await response.json();
            console.log('success!', this.products.length);
        } catch (err) {
            console.log('Unable to get passangers list from json');
        }
    }

}
