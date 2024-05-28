const allInput = document.querySelectorAll("input")
const resultat = document.querySelector('.result')


let tabNbr= [] ;
let tabOperation = [];
let stock = ""


function addOperationIntoArray (key){
    if (stock !=""){
        resultat.innerHTML += " " + key + " "
        tabNbr.push(stock);
        tabOperation.push(key)
        stock = ""
    }else{
        resultat.innerHTML += " " + key + " "
        tabOperation.push(key)
    }
}

function special(value){
    resultat.innerHTML = resultat.innerHTML.slice(0,-(stock.length)) + value
    stock = value
}

function raz(){
    tabNbr = []
    tabOperation = [];
    stock = "";
}

function calculerResultat(){

    let nbrNombre = tabNbr.length;
    let nbrOperation = tabOperation.length ;

    if (nbrNombre <= nbrOperation) {
        resultat.innerHTML = "<br> erreur syntaxe"

    } else  if ( nbrOperation == 0){
        resultat.innerHTML = "<br>" + tabNbr[0];

    }else if (nbrNombre - 1 == nbrOperation ){
        let calcule = tabNbr[0];
        let divZero = false; 

        for (let i = 0; i < nbrOperation; i++) {
            switch (tabOperation[i]) {
                case "-":
                 calcule -= tabNbr[i+1];
                    break;
                case "*":
                     calcule*= tabNbr[i+1];
                    break;
                case "/":
                    if(tabNbr[i+1] != "0"){
                     calcule/= tabNbr[i+1];
                    }else{
                     calcule = "<br>erreur multiplication par 0";
                     divZero = true;
                    }
                    break;
                case "+":
                    calcule = parseFloat(calcule) + parseFloat(tabNbr[i+1]);
                    break;
            }   
            if (divZero == true) {
                break;
            }
        }
        resultat.innerHTML += "<br>" +calcule;
    }
        
}


allInput.forEach((input) => {
    input.addEventListener("click" , ()=>{
        switch (input.className) {
            case "c":
                resultat.innerHTML = "";
                raz();
                break;
            case "ac":
                if (stock != "") {
                    resultat.innerHTML = resultat.innerHTML.slice(0,-1);
                    stock = stock.slice(0,-1);
                }
                break;
            case "+": 
                addOperationIntoArray("+");
                break;
            case "-" :
                addOperationIntoArray("-");
                break;
            case "*":
                addOperationIntoArray("*");
                break;
            case "÷":
                addOperationIntoArray("/");
                break;
            case "%":
                special(stock/100);
                break;

            case "=":
                tabNbr.push(stock);
                calculerResultat();
                raz();
                break;

            case "negpos":
                special(-(stock));
                break;

            default:    
                resultat.innerHTML += input.value;
                stock +=input.value;
                break;
        }
        })
    })