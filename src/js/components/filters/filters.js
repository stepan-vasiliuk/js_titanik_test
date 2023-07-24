export default class Filters {
    #html;
    #nameInputField;
    #ageInputField;
    #gender;
    #survived;

    #filters;

    #values = [];

    #callback;

    constructor(parent, values, callback) {
        this.#values = values;
        this.#callback = callback;
        this.#render(parent);

        this.#initElements();
        this.#initFilters();
        this.#addEventListeners();
    }

    #render(parent) {
        this.#html = document.createElement('div');
        this.#html.classList.add('control_panel');

        // Teмплейт фильтров
        this.#html.innerHTML = `
            <ul class="filters">
                <li class="filters__item">
                    <span class="filters__item_description">Name</span>
                    <input type="text" class="filters__item_input" id="name-input"></input>
                </li>
                <li class="filters__item">
                    <span class="filters__item_description">Age</span>
                    <input type="number" class="filters__item_input" id="age-input"></input>
                </li>
                <li class="filters__item">
                    <span class="filters__item_description">Gender</span>
                    <div class="filters_gender">
                        <input type="radio" class="filters__item_radio" value="male" id="male" name="gender">
                        <label for="male">Male</label><br>
                        <input type="radio" class="filters__item_radio" value="female" id="female"
                               name="gender">
                        <label for="female">Female</label><br>
                        <input type="radio" class="filters__item_radio" value="" id="not-selected"
                               name="gender" checked>
                        <label for="not-selected">Not selected</label>
                    </div>
                </li>
                <li class="filters__item">
                    <span class="filters__item_description">Survived</span>
                    <div class="filters_survived">
                        <input type="radio" class="filters__item_radio" value="survived" name="survived">
                        <label for="male">Survived</label><br>
                        <input type="radio" class="filters__item_radio" value="died" name="survived">
                        <label for="female">Died</label><br>
                        <input type="radio" class="filters__item_radio" value="" name="survived" checked>
                        <label for="not-selected">Not selected</label>
                    </div>
                </li>
            </ul>`;

        parent.append(this.#html);
    }

    updateFilters(filterName, filterValue) {
        this.#filters[filterName] = filterValue;

        let filteredValues = this.#values;


        for (const [key, value] of Object.entries(this.#filters)) {
            if (key === 'name' && value.length) {
                filteredValues = this.#filterByName(value, filteredValues);
            }
            if (key === 'age' && value.length) {
                filteredValues = this.#filterByAge(value, filteredValues);
            }
            if (key === 'gender' && value) {
                filteredValues = this.#filterByGender(value, filteredValues);
            }
            if (key === 'survived' && value) {
                filteredValues = this.#filterBySurvived(value, filteredValues);
            }
        }


        if (typeof this.#callback === 'function') {
            this.#callback(filteredValues);
        }
    }

    #filterByName(name, values)
    {
        return values.filter((item) => item.name.includes(name));
    }

    #filterByAge(age, values)
    {
        return values.filter((item) => Math.floor(item.age) === Number(age))
    }

    #filterByGender(gender, values)
    {
        return values.filter((item) => item.gender.includes(gender));
    }

    #filterBySurvived(rawState, values)
    {
        const state = rawState === 'survived';
        return values.filter((item) => state === item.survived);
    }


    #initFilters()
    {
        this.#filters = {
            name: '',
            age: '',
            gender: '',
            survived: undefined,
        }
    }

    #initElements() {
        this.#nameInputField = this.#html.querySelector('#name-input');
        this.#ageInputField = this.#html.querySelector('#age-input');
        this.#gender = this.#html.querySelector('.filters_gender');
        this.#survived = this.#html.querySelector('.filters_survived');
    }

    #addEventListeners() {
        this.#nameInputField.addEventListener('input', (event) => {
            this.updateFilters('name', event.target.value);
        });
        this.#ageInputField.addEventListener('input', (event) => {
            this.updateFilters('age', event.target.value);
        });

        this.#gender.addEventListener('change', (event) => {
            this.updateFilters('gender', event.target.value);
        });

        this.#survived.addEventListener('change', (event) => {
            this.updateFilters('survived', event.target.value);
        });
    }
}
