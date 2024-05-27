const allInput = document.querySelectorAll("input")
const resultat = document.querySelector('.result')

let tabNbr= [] ;
let tabOperation = [];
let stock = ""

resultat.innerHTML = "-21"
resultat.innerHTML *= "-1"
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
        resultat.innerHTML = "erreur"
    } else  if ( nbrOperation == 0){
        resultat.innerHTML = tabNbr[0];
    }else if (nbrNombre - 1 == nbrOperation ){
        resultat.innerHTML = tabNbr[0];
        for (let i = 0; i < nbrOperation; i++) {
            
            switch (tabOperation[i]) {
                case "-":
                    resultat.innerHTML -= tabNbr[i+1];
                    
                    break;
                case "*":
                    resultat.innerHTML *= tabNbr[i+1];
                    
                    break;
                case "/":
                    resultat.innerHTML /= tabNbr[i+1];
                    break;

                default:
                    break;
            }   
        }
    }
        
}
   



allInput.forEach((input) => {
    input.addEventListener("click" , ()=>{
        switch (input.className) {
            case "c":
                resultat.innerHTML = ""
                raz();
                break;

            case "ac":
                resultat.innerHTML = resultat.innerHTML.slice(0,-1);
                stock = stock.slice(0,-1);
                break;

            case "+": 
                addOperationIntoArray("+")
                break;
            case "-" :
                addOperationIntoArray("-")
                break;
            case "*":
                addOperationIntoArray("*")
                break;
            case "÷":
                addOperationIntoArray("/")
                break;
            case "%":
                special(stock/100)
                break;

            case "=":
                tabNbr.push(stock)
                calculerResultat()
                raz();
                break;

            case "negpos":
                special(-(stock))
                break;

            default:
                
                resultat.innerHTML += input.value
                stock +=input.value;
               
                console.log(stock)
                console.log(tabNbr)
                console.log(tabOperation)
                break;
        }
        })
    })