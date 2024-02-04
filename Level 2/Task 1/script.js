
let btns = document.querySelectorAll('.btn');
let screen = document.querySelector('#screen');

let expression = "";

btns.forEach((next) => {
    next.addEventListener('click', (e) => {
        let temp = next.innerText;
        if(temp == 'ENTER'){
            let abc = eval(expression);
            expression = abc;
            temp = "";
        }else if(temp == 'clear'){
            expression = expression.slice(0, expression.length-1);
            temp = "";
        }else if(temp == "del"){
            expression = "";
            temp = "0";
        }else if(temp == 'ans'){
            expression = "no operation assigned";
        }
        expression+= temp;
        screen.innerText = expression;
    });
});
