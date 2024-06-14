let mainContainer = document.getElementById('mainContainer');
let formGioco = document.getElementById('formGioco');
let buttonFOrm = document.getElementById('buttonElement');
let contInput = document.querySelector('.contInput')
var tuttaLaRoot = document.documentElement;
let contRicaricaPage = document.querySelector('.contButtonRicarica');
let contTestoPunteggio = document.querySelector('.punteggio')
let testoPunteggio = document.querySelector('.testoPunteggio')

let numSquare;
let modalita;
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
            modalita = 'facile';
            break
        case '81':
            numRighe = 9;
            modalita = 'media';
            break
        case '49':
            numRighe = 7;
            modalita = 'difficile';
            break
        
    }
    
    // cambio le dimensioni css in base alla scelta del giocatore
    tuttaLaRoot.style.setProperty('--numeroSquare', numRighe)

    
    
    // creazione bombe
    let arrBombe = [];
    while (arrBombe.length < 16) {
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

        if(arrBombe.includes(i)){
            containerSquare.innerHTML += `<div class="square boom">${i}</div>`;

        }else{
            containerSquare.innerHTML += `<div class="square">${i}</div>`;
        }
        
    }

    // suggerimento in console per i tutor
    let array = arrBombe;
    
    array.sort(function(a, b) {
    return a - b;
    });
    console.log(`Se vuoi vincere evita le bombe in questa posizione: ${array}`)
    // fine suggerimento per i tutor
    
    // quando il container è completo lo appendo al main
    mainContainer.append(containerSquare)
    

    contRicaricaPage.classList.remove('invisible')
});



let punteggio = 0;
let finePartita = false;
// evento che colora gli square
mainContainer.addEventListener('click', function gioca(event) {
    // rintraccio l'elemento e lo manipolo
    let element = event.target
    let listaBombe = document.querySelectorAll('.boom');
    
    if(element.classList.value === 'square' && finePartita === false){
        element.classList.add('clicked');
        punteggio++
        testoPunteggio.textContent = `Punteggio: ` + punteggio;
    }
    else if(element.classList.value === 'square boom' && finePartita === false){
        for (let i = 0; i < listaBombe.length; i++) {
            listaBombe[i].classList.add('bomba');
        }
        finePartita = true;
        testoPunteggio.textContent = `Purtroppo HAI PERSO la modalità ${modalita} con punteggio ${punteggio}..se non sai come vincere chiedi a Massimo`;
    }
    
    
    // stampo in console il numero che è stato cliccato
    // if(element.contains('square')){
    //     console.log(event.target.textContent)
    // }
    
    if(punteggio === (numSquare - 16)){
        testoPunteggio.textContent = `Sei fortissimo, hai vinto la modalità ${modalita}..bravo MASSIMO`;
        finePartita = true;
    }
    
});



// evento che ritorna alla situazione di partenza per rigiocare
contRicaricaPage.addEventListener('click', () =>{
    window.location.reload();
})

    