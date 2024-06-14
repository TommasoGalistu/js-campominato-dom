let mainContainer = document.getElementById('mainContainer');
let formGioco = document.getElementById('formGioco');
let buttonFOrm = document.getElementById('buttonElement');
let contInput = document.querySelector('.contInput')
var tuttaLaRoot = document.documentElement;
let contRicaricaPage = document.querySelector('.contButtonRicarica');
let contTestoPunteggio = document.querySelector('.punteggio')

let numSquare;

// al click spariranno gli input e apparirà il gioco
buttonFOrm.addEventListener('click', () =>{
    // selezione default
    numSquare = formGioco.value !== 'select' ? formGioco.value : '100';
    // rendo invisibile il form e inizia il gioco
    contInput.classList.add('invisible')
    contTestoPunteggio.classList.remove('invisible')
    // imposto variabile per cambiare dimensioni al css
    let numRighe;
    switch (numSquare){
        case '100':
            numRighe = 10;
            break
        case '81':
            numRighe = 9;
            break
        case '49':
            numRighe = 7;
            break
    }
    
    // cambio le dimensioni css in base alla scelta del giocatore
    tuttaLaRoot.style.setProperty('--numeroSquare', numRighe)

    
    
    // creazione bombe
    let arrBombe = [];
    while (arrBombe.length <= 16) {
        let number = Math.floor(Math.random() * (numRighe * numRighe + 1));
        if(!(arrBombe.includes(number)) && number !== 0){
            arrBombe.push(number)
        }
    }  


    // creo la struttura a griglia del gioco
    // creo il contenitore
    let containerSquare = document.createElement('div');
    containerSquare.classList.add('container');

    // attraverso il ciclo gli appendo tutti gli square
    for (let i = 1; i <= numSquare; i++) {
        let numPosizione = arrBombe.indexOf(i)
        if(numPosizione > 0){
            containerSquare.innerHTML += `<div class="square">bomba</div>`;
        }else{
            containerSquare.innerHTML += `<div class="square">${i}</div>`;
        }
        
    }
    // quando il container è completo lo appendo al main
    mainContainer.append(containerSquare)
    

    contRicaricaPage.classList.remove('invisible')
});




// evento che colora gli square
mainContainer.addEventListener('click', (event) =>{
    // rintraccio l'elemento e lo manipolo
    let element = event.target
    console.log(element)
    if(element.classList.value === 'square'){

        element.classList.add('clicked');

    }
    // else if(element.attributes.attribute.value === 'bomba'){
    //     element.classList.add('bomba');
    // }
    else{
        element.classList.remove('clicked')
    }
    // stampo in console il numero che è stato cliccato
    // if(element.contains('square')){
    //     console.log(event.target.textContent)
    // }
    
    
});


// evento che ritorna alla situazione di partenza per rigiocare
contRicaricaPage.addEventListener('click', () =>{
    window.location.reload();
})

    