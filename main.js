const bill = document.getElementById('bill');
const custom = document.getElementById('custom');
const number = document.getElementById('number');
const btnReset = document.getElementById('reset');
const btnsTips = document.querySelectorAll('.btnTip');

btnsTips.forEach(btnTip => {
    btnTip.addEventListener('click', () => {
        tipsButtons(btnTip);
        if (bill.value != 0) {
            tip();
        }
    })
});

bill.addEventListener('keyup', () => {
    tip()
})

number.addEventListener('keyup', () => {
    tip()
    tipPerson();
})

custom.addEventListener('keyup', () => {
    tip()
    tipCustom();
    tipPerson();
})

function tip() {
    if (number.value != 0) {
        btnsTips.forEach(element => {
            if (element.classList.contains('active')) {
                let total = Number(bill.value * (element.innerHTML.slice(0,-1)/100));
                document.getElementById('total').innerHTML = `$${total.toFixed(2)}`;
                tipPerson();
            }
        })
    } else {
        number.parentElement.classList.add('required')
    }
}

function tipsButtons(button) {
    custom.value = '';
    if (custom.value == 0) {
        btnsTips.forEach(element => {
            if (!(element.classList.contains('active')) && element.innerHTML == '50%') {
                button.classList.add('active');
            } else {
                element.classList.remove('active');
            }        
        });
    } else {
        tipCustom()
    }
    
}

function tipPerson(){
    if (number.value != 0) {
        number.parentElement.classList.remove('required');
        let person = document.getElementById('total').innerHTML.slice(1) / number.value;
        document.getElementById('amount').innerHTML = `$${person.toFixed(2)}`;
        reset(person);
    } else {
        number.parentElement.classList.add('required')
        document.getElementById('amount').innerHTML = `$0.00`;
    }
}

function tipCustom() {
    btnsTips.forEach(element => {
        element.classList.remove('active');
    });
    if (custom.value != 0 ) {
        let customValue = bill.value * (custom.value / 100);
        document.getElementById('total').innerHTML = `$${customValue.toFixed(2)}`;
    } else {
        document.getElementById('total').innerHTML = `$0.00`;
    }
}

function reset(value) {
    if (value == 0) {
        btnReset.classList.remove('reset'); 
    } else {
        btnReset.classList.add('reset');
        btnReset.addEventListener('click', () => {
            btnsTips.forEach(element => {
                element.classList.remove('active');
            });
            number.value = '';
            custom.value = '';
            bill.value = '';
            document.getElementById('total').innerHTML = `$0.00`;
            document.getElementById('amount').innerHTML = `$0.00`;
            btnReset.classList.remove('reset') ;   
        }) 
    } 
}