# AnimalHouse - Progetto Tecnologie Web
Componenti gruppo: Marianna Gimigliano 0000915343 - Martina Daghia 0000915665 - Martina Zauli 0000915901

# Utilizzo e gestione del DB

# Game
E' formato da cinque attività principali:
    1. Immagini buffe e divertenti
       All'interno della pagina è possibile visualizzare immagini divertenti sui cani, sui gatti e sulle volpi. 
    2. Curiosità sugli animali
       In questa sezione è possibile osservare randomicamente delle caratteristiche di un animale come ad esempio il nome, il nome in latino, il peso, la durata di vita, l'habitat eccetera
    3. Memory (descritte in seguito)
    4. Quiz (descritte in seguito)
    5. Immagini sul segugio
       Sarà possibile visualizzare le diverse razze di segugio e vedere alcune immagini di essi.

# Api utilizzate
Per lo sviluppo del Game ci siamo avvalse dell'utilizzo di alcune API. Per fare un esempio, nella sezione immagini buffe abbiamo utilizzato 3 API che, ogni volta che viene cliccato il pulsante, mi vengono ritornate delle immagini/gif randomiche su cani, gatti e volpi. 

# Quiz
All'apertura della pagina relativa al Quiz appariranno la domanda, l'immagine dell'animale da indovinare e tre radio button con le tre opzioni di risposta. Una volta che l'utente avrà selezionato la risposta che ritiene corretta, dovrà cliccare sul bottone "Controlla" per verificare che la risposta data sia quella giusta.
Se l'utente indovina, verrà mostrata la risposta che ha selezionato insieme quella corretta e, di conseguenza, verrà anche incrementato il punteggio.
Se, invece, l'utente ha selezionato la risposta errata o non seleziona nulla verrà sempre mostrata la risposta data oppure non data e la risposta corretta, ma in questo caso il punteggio non verrà incrementato.

Nel quiz compaiono due bottoni differenti per due casistiche differenti, ovvero la situazione in cui l'utente effettua il login e quando, invece, non lo effettua.
Quando l'utente non effettua il login, sarà possibile iniziare il gioco affrontando le domande e verrà visualizzato un pulsante per terminare il quiz che permette all'utente di interrompere il quiz e poter visualizzare il punteggio finale della sessione di gioco.
Altrimenti, se un utente è loggato, apparirà un pulsante per poter salvare il punteggio e terminare così il quiz. Il punteggio dell'utente registrato apparirà nella leaderboard insieme a quelli degli altri utenti.
In entrambi i casi, il quiz continuerà fino a che l'utente non cliccherà il bottone per terminare il quiz, in quanto non è previsto un numero massimo di domande, ma l'utente potrà andare avanti con la prossima domanda cliccando il bottone di riferimento.

# Memory
Il memory è composto da 16 carte, all'apertura della pagina queste carte sono tutte girate a faccia in giù. 
Ad ogni interazione l'utente dovrà cercare e selezionare due immagini con lo stessa figura rappresentata. Ogni volta che l'utente selezionerà una carta essa si girerà e mostrerà la figura sappresentata. Se l'utente ha selezionato due immagini con la stessa figura esse si bloccheranno e rimmarranno girate, se invece le carte che ha selezionato l'utente saranno diverse esse si torneranno a girare a faccia in giù.
Una volta che l'utente sarà riuscito a scoprire tutte le 16 carte sul tavolo apparirà un messaggio di vincita e il quiz terminerà. 
Verrà assegnato il punto ogni volta che l'utente riuscirà a scoprire tutte le carte che sono presenti sul campo da gioco.

# Gestione punteggi quiz e memory
Per salvare i punteggi dei relativi giochi ci siamo appoggiate a due tabelle (points_quiz e points_memory) del nostro database. Per inserire i punti all'interno delle nostre tabelle abbiamo usato la mail dell'utente e il punteggio.

# Gestione dei servizi, eccetera

# Cosa possono fare gli utenti registrati e quelli non
Utenti non registrati 
    - Visualizzare la sezione "Scopri chi siamo" della piattaforma Animal House
    - Accedere alla sezione game
    - Effettuare il login o effettuare una nuova registrazione

Utenti registrati 
    - Possono visualizzare i servizi che offre la piattaforma.
    - Possono prenotare uno dei servizi offerti con la data corrispondente.
    - Possono visualizzare la bacheca dei post con i post degli utenti
    - Possono aggiungere dei post aggiungendo una descrizione testuale e l'immagine
    - Possono visualizzare la leaderboard dei punteggi del quiz e del memory di tutti i giocatori
    - Aggiungere e visualizzare i propri animali preferiti.
    - Accedere alla sezione giochi che presenta le stesse caratteristiche di quella degli utenti non registrati

Admin
    - Può gestire gli utenti ovvero li può visualizzare, modificare la password, cancellare l'utente e rimuovere la lista degli animali dell'utente selezionato
    - Può gestire la bacheca ovvero può visualizzare i post degli utenti ed eliminarli
    - Può inserire un nuovo servizio con il nome del servizio e la sua relativa destrizione.
    Può visualizzare la lista dei servizi ed eliminare un servizio. Eliminando il servizio si elimineranno contemporaneamente le prenotazioni degli utenti di quel servizio.
    - Può visualizzare la lista delle prenotazioni degli utenti, cambiare la data della prenotazione dell'utente di riferimento o eliminare la prenotazione
    - Può visualizzare la leaderboard del quiz e del memory e azzerare i punteggi dei giocatori.
