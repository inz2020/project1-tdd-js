const assert = require('assert');

const { Given, When, Then } = require('@cucumber/cucumber');

let _income;
let _parts;

class TaxesCalculator {
    //repesation des seuils
    constructor() {
        this.seuils = [
            { max: 10084, rate: 0 },
            { max: 25710, rate: 11 },
            { max: 73516, rate: 30 },
            { max: 158122, rate: 41 },
            { max: Infinity, rate: 45 }
        ]
    }
    calculate(income, parts) {

        let alreadyCounted = 0;
        let index = 0;
        let slices = []

        //Tant que on n'a pas compter tous ces sous, on va avancer vers la tranche d'apres
        while (alreadyCounted <= income) {
            let currentTaxe;
            // const slice = this.seuils[index]
            // const limit = slice.max;
            // const rate = slice.rate;
            const { max: limit, rate } = this.seuils[index]
            let isFirstSlice = index === 0;
            const incomePerPart = income / parts


            console.log()
            currentTaxe = isFirstSlice ? ((limit * rate) / 100) : (
                (incomePerPart <= limit) ?
                ((incomePerPart - this.seuils[index - 1].max) - 1) * (rate / 100) :
                ((limit - this.seuils[index - 1].max) - 1) * (rate / 100)
            )


            alreadyCounted = limit;
            slices.push(currentTaxe)
            index++;

        }
        console.log(slices)
        return Math.round(slices.reduce((acc, slice) => acc + slice, 0) * parts)
    }
}

Given('a family composed of {float} part(s) and has an income of {int}', function(income, parts) {
    console.log(income, parts);
    _income = income;
    _parts = parts;
    //return 'pending';
});

When('he uses the calculator', function() {
    //Imaginons un objet calculatr
    const calculator = new TaxesCalculator();
    this.result = calculator.calculate(_parts, _income);
    //return 'pending';
});



Then('taxes should be {int}', function(taxes) {
    //assert.equal(this.result, taxes);
});