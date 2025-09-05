// ==============================
// Array auto
// ==============================
const autoData = [
  {modello:"Fiat 500", anno:2020, prezzo:50, tipo:"utilitaria", accessori:["Climatizzatore","Bluetooth"], foto:"img/Fiat500.avif"},
  {modello:"BMW Serie 3", anno:2019, prezzo:90, tipo:"berlina", accessori:["Navigatore","Sedili Riscaldati"], foto:"img/BMW3Series.avif"},
  {modello:"Jeep Renegade", anno:2021, prezzo:70, tipo:"suv", accessori:["4x4","Tetto Apribile"], foto:"img/JeepRenegade.avif"},
  {modello:"Audi A4", anno:2020, prezzo:85, tipo:"berlina", accessori:["Cruise Control","Bluetooth"], foto:"img/AudiA4.jpeg"},
  {modello:"Mercedes GLA", anno:2021, prezzo:95, tipo:"suv", accessori:["Navigatore","Sensori Parcheggio"], foto:"img/MercedesGLA.avif"},
  {modello:"Porsche 911", anno:2018, prezzo:200, tipo:"sportiva", accessori:["Sedili Sportivi","Climatizzatore"], foto:"img/Porsche911.avif"},
  {modello:"Toyota Yaris", anno:2019, prezzo:45, tipo:"utilitaria", accessori:["Bluetooth","ABS"], foto:"img/ToyotaYaris.jpg"},
  {modello:"Honda Civic", anno:2020, prezzo:60, tipo:"berlina", accessori:["Climatizzatore","Bluetooth"], foto:""},
  {modello:"Volkswagen Golf", anno:2021, prezzo:65, tipo:"utilitaria", accessori:["Navigatore","Bluetooth"], foto:""},
  {modello:"Ford Mustang", anno:2020, prezzo:150, tipo:"sportiva", accessori:["Sedili Sportivi","Bluetooth"], foto:""}
];

// ==============================
// Genera card auto e select prenotazione
// ==============================
const autoContainer = document.getElementById("autoContainer");
const autoSelect = document.getElementById("autoSelect");

function loadCars() {
  autoData.forEach(auto => {
    const card = document.createElement("div");
    card.className = "auto-card";
    card.dataset.type = auto.tipo;
    card.innerHTML = `
      <img src="${auto.foto}" alt="${auto.modello}">
      <div class="card-info">
        <h3>${auto.modello}</h3>
        <p>Anno: ${auto.anno}</p>
        <p>Prezzo: €${auto.prezzo}/giorno</p>
        <p>Accessori: ${auto.accessori.join(", ")}</p>
      </div>`;
    autoContainer.appendChild(card);

    const option = document.createElement("option");
    option.value = auto.modello;
    option.dataset.prezzo = auto.prezzo;
    option.textContent = `${auto.modello} (€${auto.prezzo}/giorno)`;
    autoSelect.appendChild(option);
  });
}
loadCars();

function filterCars(tipo) {
  document.querySelectorAll(".auto-card").forEach(card => {
    card.style.display = tipo==="all" || card.dataset.type===tipo ? "block" : "none";
  });
}

// ==============================
// Prenotazione EmailJS
// ==============================
const form = document.getElementById("prenotaForm");
const giorniInput = document.getElementById("giorni");
const totaleSpan = document.getElementById("totale");
const prenotaMsg = document.getElementById("prenotaMsg");

function calcolaTotale(){
  const prezzo = parseFloat(autoSelect.selectedOptions[0].dataset.prezzo);
  const giorni = parseInt(giorniInput.value) || 0;
  totaleSpan.textContent = prezzo * giorni;
}
autoSelect.addEventListener("change", calcolaTotale);
giorniInput.addEventListener("input", calcolaTotale);

form.addEventListener("submit", function(e){
  e.preventDefault();
  const nome = form.nome.value;
  const email = form.email.value;
  const telefono = form.telefono.value;
  const auto = autoSelect.value;
  const giorni = giorniInput.value;
  const totale = totaleSpan.textContent;

  const templateParams = { nome, email, telefono, auto, giorni, totale };

  emailjs.send("service_4jd00qi","template_21j2n2i", templateParams)
    .then(() => {
      prenotaMsg.innerText = `Grazie ${nome}! La tua prenotazione è stata inviata con successo.`;
      form.reset();
      totaleSpan.textContent = "0";
    })
    .catch(() => prenotaMsg.innerText = "Errore nell'invio. Riprova più tardi.");
});

// ==============================
// CHATBOT
// ==============================
const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const chatContent = document.getElementById("chat-content");
const chatHeader = document.getElementById("chat-header");
const optionsContainer = document.getElementById("chat-options");

// Pulsanti X e -
const btnClose = document.getElementById("closeBtn");
const btnMinimize = document.getElementById("minimizeBtn");

let chatOpen = false;

// ==============================
// Funzioni apertura/chiusura
// ==============================
function openChat() {
  chatContent.style.display = "flex";
  chatOpen = true;
}

function closeChat() {
  chatContent.style.display = "none";
  chatOpen = false;
}

function toggleChat() {
  if(chatOpen) closeChat();
  else openChat();
}

// Click sull’header per aprire/chiudere
chatHeader.querySelector("span").addEventListener("click", toggleChat);

// Pulsanti
btnClose.addEventListener("click", e => { 
  e.stopPropagation();
  closeChat();
});

btnMinimize.addEventListener("click", e => {
  e.stopPropagation();
  chatContent.style.display = "none";
  chatOpen = false;
});

// ==============================
// FAQ e opzioni
// ==============================
const FAQ = [
  {q:"Quali tipi di auto offrite?", a:"Offriamo utilitarie, berline, SUV e sportive."},
  {q:"Come prenotare un'auto?", a:"Puoi prenotare tramite il form nella sezione Prenotazioni."},
  {q:"Quali sono i prezzi?", a:"I prezzi variano da €40/giorno a €220/giorno a seconda dell'auto."},
  {q:"Come posso modificare una prenotazione?", a:"Contattaci via email o telefono per modificare la tua prenotazione."},
  {q:"C'è un limite di età per noleggiare?", a:"Bisogna avere almeno 18 anni e una patente valida."},
  {q:"Si può restituire l'auto in un'altra città?", a:"Sì, contattaci per organizzare la consegna in un'altra sede."},
  {q:"Come funziona l'assicurazione?", a:"Ogni auto include assicurazione base, puoi aggiungere coperture extra."},
  {q:"Posso aggiungere un conducente extra?", a:"Sì, durante la prenotazione puoi indicare eventuali conducenti extra."},
  {q:"Cosa succede in caso di incidente?", a:"In caso di incidente contatta subito il nostro servizio clienti."},
  {q:"Accettate carte di credito?", a:"Sì, tutte le principali carte di credito sono accettate."}
];

// Mostra le opzioni
function showOptions(){
  optionsContainer.innerHTML = ""; // pulisco prima
  const opts = ["Prenotazione","Veicoli","Prezzi","FAQ"];
  opts.forEach(opt=>{
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "chat-option";
    btn.onclick = () => handleOption(opt);
    optionsContainer.appendChild(btn);
  });
}

// Gestione opzioni
function handleOption(opt){
  if(opt==="Prenotazione") {
    sendBotMessage(`Se vuoi prenotare un'auto, clicca qui: <a href="#prenotaForm">Sezione Prenotazioni</a>`);
  }
  else if(opt==="Veicoli") {
    sendBotMessage(`Se vuoi vedere i veicoli disponibili, clicca qui: <a href="#autoPrenotazione">Sezione Veicoli</a>`);
  }
  else if(opt==="Prezzi") {
    sendBotMessage("I prezzi variano da €40/giorno a €220/giorno a seconda dell'auto.");
  }
  else if(opt==="FAQ") {
    FAQ.forEach(f => sendBotMessage(`❓ ${f.q}<br>💡 ${f.a}`));
  }
}

// Invio messaggi bot
function sendBotMessage(text){
  const p = document.createElement("p");
  p.innerHTML = `<strong>Chatbot:</strong> ${text}`;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

// Invio messaggi utente
function sendMessage(){
  const text = userInput.value.trim();
  if(!text) return;
  const p = document.createElement("p");
  p.innerHTML = `<strong>Tu:</strong> ${text}`;
  messages.appendChild(p);
  userInput.value = "";

  let response = "Non ho capito. Chiedimi info su auto, prezzi o prenotazioni.";
  if(/prezzo/i.test(text)) response = "I prezzi variano da €40/giorno a €220/giorno a seconda dell'auto.";
  else if(/auto/i.test(text)) response = `Se vuoi vedere i veicoli disponibili, clicca qui: <a href="#autoPrenotazione">Sezione Veicoli</a>`;
  else if(/prenotare|prenotazione/i.test(text)) response = `Se vuoi prenotare un'auto, clicca qui: <a href="#prenotaForm">Sezione Prenotazioni</a>`;
  else if(/faq/i.test(text)) {
    FAQ.forEach(f => sendBotMessage(`❓ ${f.q}<br>💡 ${f.a}`));
    return;
  }
  sendBotMessage(response);
}

// Enter per inviare messaggio
userInput.addEventListener("keydown", e => { if(e.key==="Enter") sendMessage(); });

// Avvio chat con saluto e opzioni
openChat();
sendBotMessage("Ciao! 👋 Benvenuto nel nostro servizio di noleggio auto.");
showOptions();
