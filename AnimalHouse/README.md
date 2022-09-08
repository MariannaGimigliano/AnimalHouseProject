# AnimalHouse - Progetto Tecnologie Web
Componenti gruppo: 
Marianna Gimigliano 0000915343 - Martina Daghia 0000915665 - Martina Zauli 0000915901

# CREDENZIALI ACCOUNT
UTENTI
martina@ciao.it - pssw: marti
marianna@ciao.it - pssw: mari

ADMIN
admin@admin - pssw: admin

# Istruzioni di avvio
Per visualizzare il sito Animal House è necessario aver installato sul proprio computer Node ed Express. Per avviare il sito bisogna digitare da terminale "npm start" e, una volta avviato il server, aprire il browser e digitare l'indirizzo "http://localhost:3000/".

# DATABASE
Abbiamo scelto di immagazzinare i dati in un database fornitoci dal servio online di MongoDB per una più semplice gestione.

# Game
E' formato da cinque attività principali:
    1. Immagini buffe e divertenti
       All'interno della pagina è possibile visualizzare immagini divertenti sui cani, sui gatti e sulle volpi. 
    2. Curiosità sugli animali
       In questa sezione è possibile osservare randomicamente delle caratteristiche di un animale come ad esempio il nome, il nome in latino, il peso, la durata di vita, l'habitat, eccetera
    3. Memory (descritte in seguito)
    4. Quiz (descritte in seguito)
    5. Immagini sul segugio
       Sarà possibile visualizzare le diverse razze di segugio e vedere alcune immagini di essi.

# API utilizzate
Per lo sviluppo del Game ci siamo avvalse dell'utilizzo di alcune API. Per fare un esempio, nella sezione immagini buffe abbiamo utilizzato 3 API che, ogni volta che viene cliccato il pulsante, mi vengono ritornate delle immagini/gif randomiche su cani, gatti e volpi. Inoltre abbiamo utilizzato un'altra API per farmi ritornare alcune razze con le relative immagini dei segugi.
Inoltre per le curiosità degli animali e il quiz abbiamo utilizzato un'altra API che generava informazioni su animali di vario tipo.
Per la gestione del memory abbiamo usato la API dei cani (utilizzata anche per le immagini buffe).

# Quiz
Per l'implementazione del quiz ci siamo servite dell'api utilizzata anche per le curiosità sugli animali. Più precisamente abbiamo estrapolato l'immagine dell'animale e il suo nome. 
All'apertura della pagina relativa al Quiz appariranno la domanda, l'immagine dell'animale da indovinare e tre radio button con le tre opzioni di risposta. Una volta che l'utente avrà selezionato la risposta che ritiene corretta, dovrà cliccare sul bottone "Controlla" per verificare che la risposta data sia quella giusta.
Se l'utente indovina, verrà mostrata la risposta che ha selezionato insieme quella corretta e, di conseguenza, verrà anche incrementato il punteggio.
Se, invece, l'utente ha selezionato la risposta errata o non ha selezionato nulla verrà sempre mostrata la risposta data oppure non data e la risposta corretta, ma in questo caso il punteggio non verrà incrementato.
Per continuare il gioco e visualizzare la prossima domanda bisognerà cliccare il bottone "Prossima domanda".

Nel quiz compaiono due bottoni differenti per due casistiche differenti, ovvero la situazione in cui l'utente effettua il login e quando, invece, non lo effettua.
Quando l'utente non effettua il login, sarà possibile iniziare il gioco affrontando le domande e verrà visualizzato un pulsante per terminare il quiz che permette all'utente di interrompere il quiz e poter visualizzare il punteggio finale della sessione di gioco.
Altrimenti, se un utente è loggato, apparirà un pulsante per poter salvare il punteggio e terminare così il quiz. Il punteggio dell'utente registrato apparirà nella leaderboard insieme a quelli degli altri utenti.
In entrambi i casi, il quiz continuerà fino a che l'utente non cliccherà il bottone per terminare il quiz, in quanto non è previsto un numero massimo di domande, ma l'utente potrà andare avanti con la prossima domanda cliccando il bottone di riferimento.

# Memory
Il memory è composto da 16 carte e all'apertura della pagina sono tutte coperte. 
Ad ogni interazione, l'utente dovrà cercare di trovare due immagini con lo stessa figura rappresentata. Ogni volta che l'utente selezionerà una carta cliccandoci sopra, questa verrà resa visibile mostrando la figura della carta posizionata in quel punto. Se l'utente ha selezionato due immagini con la stessa figura, queste si bloccheranno e rimmarranno scoperte, invece se le carte che ha selezionato l'utente saranno diverse queste verranno nuovamente coperte nascondendone la figura.
Una volta che l'utente sarà riuscito a scoprire tutte le 16 carte sul tavolo, apparirà un messaggio di vincita e il memory terminerà. 
Il punto verrà assegnato ogni volta che l'utente riuscirà a scoprire tutte le carte che sono presenti sul campo da gioco.
Nel caso in cui l'utente si fosse loggato prima di iniziare il gioco, il messaggio indicherà che il giocatore ha guadagnato un punto e il suo punteggio verrà aggiornato immediatamente nella leaderboard. Nel caso in cui l'utente non si fosse loggato verrà visualizzato solo il messaggio di vincita.

# Gestione punteggi quiz e memory
Per salvare i punteggi dei relativi giochi, ci siamo appoggiate a due tabelle (points_quiz e points_memory) presenti nel nostro database. Per poter inserire i punti all'interno delle nostre tabelle, abbiamo usato la mail dell'utente e il punteggio di riferimento.

# Tipi di utenti e funzionalità: utenti non registrati, utenti registrati e admin
Utenti non registrati 
    - Visualizzare la sezione "Scopri chi siamo" della piattaforma Animal House
    - Accedere alla sezione game e partecipare ai giochi senza, però, acquisire un proprio punteggio ed entrare nella leaderboard
    - Effettuare il login
    - Effettuare una nuova registrazione

Utenti registrati 
A seguito del login si apre la pagina del FrontOffice che permette di accedere a 4 diverse sezioni:
    1. Sezione SERVIZI
        - Visualizzare i servizi che offre la piattaforma
        - Visualizzare le proprie prenotazioni
        - Prenotare uno dei servizi offerti scegliendo il servizio di gradimento e la data tramite i menu a tendina corrispondenti
    2. Sezione BACHECA
        - Visualizzare nella bacheca tutti i post pubblicati dagli utenti
        - Aggiungere un post inserendo una descrizione testuale e facendo l'upload di un'immagine
    3. Sezione LEADERBOARD
        - Visualizzare la leaderboard dei punteggi di tutti i giocatori distinguendo i risultati del quiz e del memory 
    4. Sezione ANIMALI PREFERITI
        - Visualizzare i propri animali preferiti
        - Aggiungere un nuovo animale preferito
Inoltre, nella nav bar è possibile accedere alla sezione giochi che presenta le stesse caratteristiche di quella degli utenti non registrati con la distinzione di poter acquisire un punteggio e partecipare alla classifica visualizzata nella leaderboard.

Admin
A seguito del login si apre la pagina del BackOffice che permette di accedere a 4 diverse sezioni:
    1. Sezione GESTIONE UTENTI
        - Visualizzare l'elenco degli utenti
        - Modificare la password di un utente
        - Cancellare un utente 
        - Rimuovere la lista degli animali dell'utente selezionato
    2. Sezione GESTIONE BACHECA
        - Visualizzare i post pubblicati dagli utenti
        - Eliminare i post pubblicati dagli utenti
    3. Sezione GESTIONE SERVIZI
        - Inserire un nuovo servizio indicandone il nome e la relativa descrizione
        - Visualizzare la lista dei servizi offerti ed eliminarne uno (L'eliminazione del servizio comporta automaticamente anche l'eliminazione delle prenotazioni degli utenti corrispondenti a quel servizio)
        - Visualizzare la lista delle prenotazioni degli utentI
        - Cambiare la data della prenotazione dell'utente di riferimento
        - EliminarE la prenotazione dell'utente di riferimento
    4. Sezione GESTIONE LEADERBOARD
        - Visualizzare la leaderboard dei punteggi di tutti i giocatori distinguendo i risultati del quiz e del memory 
        - Azzerare i punteggi dei giocatori

# Alcune scelte implementative
Per la maggior parte delle classi abbiamo creato una pagina statica html dove sono raffigurate le componenti base della pagina e una pagina javascript che gestisce le componenti dinamiche.
Per quanto riguarda le classi che utilizzano API, le richieste sono state effettuate tramite XMLHttpRequest, il quale invia una richiesta all'API per ottenere gli oggetti JSON di interesse.
Mentre per le classi FrontOffice e BackOffice che utilizzano il DataBase di MongoDB e il server Node, sono state effettuate delle richieste tramite Ajax. Queste richieste Ajax vengono gestite nel file index.js, dove sono implementati i metodi che si occupano delle operazioni con il DataBase. Inoltre, nella classe index.js, si trovano le funzioni di routing che permettono il reindirizzamento al metodo corretto sulla base dell'url inserito nella richiesta.
Nelle classi .js sono inoltre presenti i metodi per la creazione e modifica della grafica sulla base delle diverse necessità in maniera dinamica, ad esempio: il footer e la nav bar si modificano se l'utente è generico o loggato, i dati presi dalle richieste Ajax GET vengono "disegnati" dinamicamente sulla pagina html.