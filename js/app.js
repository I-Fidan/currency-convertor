let btnsLeft = document.querySelectorAll('.currency_elements_left');
let btnsRight = document.querySelectorAll('.currency_elements_right');
let inpLeft = document.querySelector('.inpLeft');
let inpRight = document.querySelector('.inpRight');
let baseCurrency = 'RUB', targetCurrency = 'USD';
let amount = 1;
let main = document.querySelector('main')
let money_target = document.querySelector('.money');
let money_txt = document.querySelectorAll('.money-txt');
let menu = document.querySelector(".header-phone  .menu");
let menubar = document.querySelector(".header-phone .menu_bar");
menu.addEventListener("click", () => {
    menu.classList.toggle("activeted")
    menubar.classList.toggle("activeted")
    if(main.style.display == '' || main.style.display == 'flex'){
    console.log(main.style.display)
    main.style.display = 'none';}
        else  {
    console.log('else')
    main.style.display = 'flex';
        }
})

// inpLeft.addEventListener('input', ()=>{
//     if(inpLeft.value[0]=="," || inpLeft.value[0]=="."){
//         inpLeft.value=" "
//     }
// })

inpRight.addEventListener('input', (e) => {

    if (e.target.value == "") {
        inpRight.value = '';
        inpLeft.value = '';
    }
     else if(e.target.value[0] == "0" &&e.target.value[1]!='.'&&e.target.value[1]!=','&& e.target.value.length == 2) {
        inpRight.value = e.target.value[1];
        getValue(baseCurrency, targetCurrency, e.target);

    }
    else if(e.target.value=="," || e.target.value=="."){
        inpLeft.value=""
    }
    else {
        getValue(baseCurrency, targetCurrency, e.target);

    }

});


inpLeft.addEventListener('input', (e) => {

    if (e.target.value == "") {
        inpRight.value = '';
        inpLeft.value = '';
    } else if(e.target.value[0] == "0"&& e.target.value[1]!='.'&& e.target.value[1]!=','&& e.target.value.length == 2) {
        inpLeft.value = e.target.value[1];
        getValue(baseCurrency, targetCurrency, e.target);

    } 
    else if(e.target.value=="," || e.target.value=="."){
        inpRight.value=""
    }
     else {
          getValue(baseCurrency, targetCurrency, e.target);

    }

});


btnsLeft.forEach(button => {
    button.addEventListener('click', function () {
        baseCurrency = button.innerText;
        btnsLeft.forEach(oldButton => {
            oldButton.classList.remove('active');
        });

        this.classList.add('active');


        getValue(baseCurrency, targetCurrency, inpRight);
    });
});

btnsRight.forEach(button => {
    button.addEventListener('click', function () {
        targetCurrency = button.innerText;
        btnsRight.forEach(oldButton => {
            oldButton.classList.remove('active');
        });

        this.classList.add('active');

        getValue(baseCurrency, targetCurrency, inpLeft);
    });
});


function getValue(baseCurrency, targetCurrency, amount) {


    let requestURL = `https://api.exchangerate.host/convert?from=${[baseCurrency]}&to=${[targetCurrency]} `;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL); 
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let response = request.response;

        money_txt[0].innerText = `1 ${baseCurrency} = ${response.result} ${targetCurrency}`
        money_txt[1].innerText = `1 ${targetCurrency} = ${(1 / response.result).toFixed(6)} ${baseCurrency}`

        if (amount == "") {
            inpRight.value = '';
            inpLeft.value = '';
        }
        else if(amount.classList[1] == "inpLeft"){
            inpRight.value = +(amount.value.replace(/,/g,'.') * response.result).toFixed(4);
            inpRight.value = commify(inpRight.value);
        }
        else {
                inpLeft.value = +(amount.value.replaceAll(" ","") / response.result).toFixed(4);
                inpLeft.value = commify(inpLeft.value);

            }
        }
    }

    function commify(n) {
        var parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return (
            numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "")
        );
    }


var numberMask = IMask(inpRight, {
    mask: Number, // enable number mask

    // other options are optional with defaults below
    scale: 4, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ' ', // any single char
    padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
    normalizeZeros: true, // appends or removes zeros at ends
    radix: '.', // fractional delimiter


    mapToRadix: [','], // symbols to process as radix
});


var numberMask = IMask(inpLeft, {
    mask: Number, // enable number mask

    // other options are optional with defaults below
    scale: 4, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ' ', // any single char
    padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
    normalizeZeros: true, // appends or removes zeros at ends
    radix: '.', // fractional delimiter
    mapToRadix: [','], // symbols to process as radix

});