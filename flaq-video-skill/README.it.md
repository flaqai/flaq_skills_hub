# Flaq Video Skill

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português do Brasil](README.pt-BR.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [Bahasa Indonesia](README.id.md) · [Italiano](README.it.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md)

Genera, modifica e aumenta la risoluzione dei video tramite [Flaq AI](https://flaq.ai/) con un agente IA. La skill guida l’agente nella ricerca dei modelli, nella consultazione della documentazione API aggiornata, nelle richieste autenticate, nel controllo periodico delle attività e nella consegna dei video.

L’agente legge le funzionalità e i prezzi dei modelli dal [catalogo dei modelli](https://flaq.ai/model-market/), dalle pagine di dettaglio e dalla [documentazione ufficiale](https://flaq.ai/docs/). Le versioni dei modelli e i limiti dei parametri non sono fissati nel codice della skill. Gli strumenti Python inclusi gestiscono l’estrazione delle pagine, le credenziali locali, le richieste e i download. Non sono necessari Flaq CLI né un server locale.

## Video della community da X

Esplora dodici esempi raccolti in [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). Apri un caso per leggerne le note, il post originale su X per vedere il prompt dell’autore oppure il file MP4 per guardarlo. L’attribuzione dei modelli segue i post di origine; si tratta di riferimenti della community, non di video generati con questa skill.

| Esempio | Caso d’uso | Post originale e prompt | Video |
| --- | --- | --- | --- |
| [X01 · Commedia culinaria](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | Animazione | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [Guarda MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · Styling di moda](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | Moda | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [Guarda MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · Selfie di un gattino](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [Guarda MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · Animazione di strada](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [Guarda MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · Momenti MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | Vita quotidiana | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [Guarda MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · Vlog a due](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | Dialogo | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [Guarda MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · Sorpresa sul palco](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | Esibizione | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [Guarda MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · ASMR floreale](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | Tutorial | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [Guarda MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · Effetti visivi d’azione](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | Azione | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [Guarda MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · Diario di viaggio](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | Viaggi | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [Guarda MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · Storia di gentilezza](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | Narrazione | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [Guarda MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · Paesaggio sonoro tropicale](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | Suono | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [Guarda MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[Consulta le note sulle fonti e gli adattamenti dei prompt](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). Per generare video, segui la priorità dei modelli della skill e verifica la documentazione Flaq aggiornata.

## Ispirazione video senza limiti

Consulta la [raccolta degli scenari](scenarios/index.md) per conoscere gli input, le procedure, i prompt originali e i video di esempio. Fai clic su una copertina per guardare il video originale.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="Presentazione di un outfit quotidiano" height="240"></a><br>
      <strong>Presentazione di un outfit quotidiano</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">Guarda il video</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">Prompt e procedura</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="Presentazione di un look di moda" height="240"></a><br>
      <strong>Presentazione di un look di moda</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">Guarda il video</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">Prompt e procedura</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="Presentazione dell’outfit" height="240"></a><br>
      <strong>Presentazione dell’outfit</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">Guarda il video</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">Prompt e procedura</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="Presentazione di un rossetto" height="240"></a><br>
      <strong>Presentazione di un rossetto</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">Guarda il video</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">Prompt e procedura</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="Vlog di viaggio estivo" height="240"></a><br>
      <strong>Vlog di viaggio estivo</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">Guarda il video</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">Prompt e procedura</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="Vlog della routine mattutina" height="240"></a><br>
      <strong>Vlog della routine mattutina</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">Guarda il video</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">Prompt e procedura</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="Annuncio di prodotti per la pelle con una creator" height="240"></a><br>
      <strong>Annuncio di prodotti per la pelle con una creator</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">Guarda il video</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">Prompt e procedura</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="Dimostrazione con bottiglia" height="240"></a><br>
      <strong>Dimostrazione con bottiglia</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">Guarda il video</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">Prompt e procedura</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="Annuncio di abbigliamento streetwear" height="240"></a><br>
      <strong>Annuncio di abbigliamento streetwear</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">Guarda il video</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">Prompt e procedura</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="Sequenza cinematografica di salvataggio" height="240"></a><br>
      <strong>Sequenza cinematografica di salvataggio</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">Guarda il video</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">Prompt e procedura</a>
    </td>
  </tr>
</table>

Questi sono esempi già esistenti di AITryOn, UGCMaker e Heydream, non nuove generazioni realizzate con questa skill. Le copertine sono anteprime, non input originali verificati. Ogni guida include i collegamenti alle fonti e i prompt originali in sezioni espandibili; i prompt adattati sono indicati separatamente. Vedi la [provenienza degli esempi e i riferimenti per l’impaginazione](scenarios/index.md#about-the-examples).

## Scelta del modello

Il modello che scegli esplicitamente ha la priorità. Altrimenti, l’agente preferisce Seedance, poi Wan, scegliendo la versione più recente disponibile che soddisfa i requisiti di input, funzionalità e budget. Confronta gli altri modelli disponibili se nessuna delle due famiglie è adatta. Dopo un errore, non cambia automaticamente modello e non invia un’altra attività a pagamento.

## Requisiti

- Un agente che supporti le skill `SKILL.md` e possa leggere pagine web, eseguire Python e accedere ai file locali. Uno strumento browser è utile per le pagine dinamiche o che richiedono l’accesso.
- Python 3.10 o successivo, con i pacchetti di [requirements.txt](requirements.txt).
- Accesso di rete al sito web e all’API di Flaq, oltre che agli URL dei video restituiti.
- Un account Flaq e una Client Key con le autorizzazioni e il saldo disponibile necessari per il modello scelto.
- Per salvare le credenziali: Portachiavi macOS, Gestione credenziali Windows o un servizio Secret Service Linux in esecuzione e sbloccato.

## Installare la skill

Copia l’intera directory `flaq-video-skill` nella directory delle skill supportata dal tuo agente. Usa il percorso a livello di progetto o di utente indicato nella documentazione dell’agente; la posizione dipende dall’host. Mantieni invariati il nome della directory e la struttura interna, inclusi `scripts`, `references`, `scenarios`, `templates` e `requirements.txt`. Copiare soltanto `SKILL.md` non basta.

Aggiorna o ricarica le skill come richiesto dal tuo agente. Verifica che riesca a trovare `flaq-video-skill` e ad accedere ai file indicati con percorsi relativi in [SKILL.md](SKILL.md).

Apri un terminale nella directory `flaq-video-skill` installata. Installa le dipendenze nell’ambiente Python che hai scelto:

```sh
python3 -m pip install -r requirements.txt
```

Su Windows, usa `py -3` al posto di `python3`. Se usi un ambiente virtuale, assicurati che l’agente esegua gli script con lo stesso interprete. Né la skill né i suoi script installano automaticamente le dipendenze.

## Configurare la chiave una sola volta

Crea o copia una Client Key dalla pagina di gestione API di Flaq, quindi esegui questi comandi nel tuo terminale:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Incolla la chiave quando viene richiesta con input nascosto. Non inserirla in un messaggio di chat, in un argomento di comando o in un file JSON di richiesta.

La chiave viene salvata nell’archivio delle credenziali di sistema per il dispositivo e l’account del sistema operativo attuali. Le richieste successive la leggono automaticamente, anche dopo aver chiuso il terminale o riavviato il dispositivo. Il sistema operativo potrebbe chiederti di autorizzare l’accesso o sbloccare l’archivio delle credenziali. Configura nuovamente la chiave su un altro dispositivo.

Esegui di nuovo `set` per sostituire la chiave salvata. Per rimuoverla:

```sh
python3 scripts/credentials.py clear
```

Negli ambienti di automazione esistenti, `FLAQ_CLIENT_KEY` ha la precedenza sulla credenziale salvata. Gli script non caricano automaticamente i file `.env`, e `clear` non rimuove le variabili d’ambiente. `status` controlla la configurazione locale; non convalida la chiave da remoto né verifica il saldo.

Consulta [Uso degli script](references/scripts.md#environment-and-first-time-setup) per i dettagli sull’archiviazione e i requisiti delle piattaforme.

## Usare con il tuo agente

Chiedi all’agente di usare Flaq Video Skill e descrivi il risultato desiderato. Per esempio:

> Usa Flaq Video Skill per consigliare un modello per un video orizzontale di 8 secondi di un porto tranquillo all’alba. Confronta le opzioni adatte e stima il costo prima di generare.

> Usa Flaq Video Skill con il modello Seedance più recente disponibile per animare l’immagine allegata. Voglio un leggero avvicinamento della camera, un’inquadratura verticale e nessun suono. Controlla prima le opzioni supportate e il prezzo.

> Usa Flaq Video Skill per controllare l’ID della mia attività esistente e scaricare il video se è pronto. Non creare un’altra attività.

### Presentazione dell’outfit

> Usa Flaq Video Skill per trasformare la mia immagine di prova abiti già completata in una presentazione dell’outfit. Mantieni coerenti la persona e l’abbigliamento, con una leggera rotazione e un piccolo passo in avanti. Controlla durata e costo prima di generare.

Leggi la [guida agli outfit](scenarios/virtual-try-on.md). Si parte da una persona che indossa già l’outfit.

### Annuncio UGC

> Usa Flaq Video Skill per creare un annuncio UGC verticale dall’immagine del mio prodotto. Inizia con un dettaglio del prodotto, mostralo durante l’uso e termina con un’inquadratura chiara del prodotto. Usa gli argomenti di vendita che ho fornito e controlla prima il supporto audio e il costo.

Leggi la [guida agli annunci UGC](scenarios/ugc-ads.md) per gli esempi di streetwear e presentazione di outfit con i prompt originali.

### Dimostrazione del prodotto

> Usa Flaq Video Skill per animare questa foto di una persona che tiene una bottiglia. Falle bere un sorso e presentare la bottiglia alla camera. Mantieni la forma e l’etichetta. Controlla prima le opzioni supportate e il costo.

Leggi la [guida ai prodotti](scenarios/product-showcase.md) per gli esempi con bottiglie e rossetti. Per animare scene generiche, usa la [guida da immagine a video](scenarios/image-to-video.md).

Puoi specificare un modello, indicare il collegamento alla sua pagina di dettaglio Flaq oppure lasciare che l’agente segua la priorità predefinita. L’agente legge la documentazione dettagliata del modello scelto prima di preparare la richiesta. Dopo che hai autorizzato la generazione, con le opzioni necessarie e i limiti di costo definiti, invia l’attività e ne registra l’ID per i controlli successivi.

## Verificare l’accesso al sito senza chiave

Dalla directory della skill:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

Questo comando legge una pagina pubblica senza credenziali né chiamate API a pagamento. Lo script estrae i collegamenti ai modelli e alla documentazione, il testo della pagina, gli esempi di codice e le specifiche pubbliche dei modelli, quando presenti. L’agente segue i collegamenti effettivi alle pagine di dettaglio e alla documentazione, anziché indovinare gli URL.

## File e approfondimenti

| File o directory | Scopo |
| --- | --- |
| [SKILL.md](SKILL.md) | Istruzioni per l’agente, priorità dei modelli e procedura completa |
| [references/scripts.md](references/scripts.md) | Comandi esatti per configurazione, richieste, controlli periodici, caricamento e download |
| [references/model-discovery.md](references/model-discovery.md) | Lettura delle specifiche e confronto con la documentazione dettagliata |
| [scenarios/index.md](scenarios/index.md) | Scelta degli scenari, requisiti di input, procedure, prompt e gallerie dei video originali |
| `scripts/credentials.py` | Configurare, verificare e cancellare le credenziali locali |
| `scripts/read_page.py` | Estrarre informazioni dalle pagine pubbliche di Flaq |
| `scripts/video_request.py` | Inviare e consultare le attività video, attenderne il completamento e scaricare i risultati |
| `templates/` | Modelli generici per richieste e file locali da compilare in base alla documentazione aggiornata |
| `tests/` | Controlli del comportamento offline con input di test isolati |

I modelli di richiesta sono strutture di partenza, non esempi pronti da inviare. Lasciali invariati e prepara ogni richiesta nella tua directory di lavoro. I campi e i formati di caricamento supportati dipendono dalla documentazione aggiornata del modello scelto.

## Risoluzione dei problemi

| Problema | Cosa controllare |
| --- | --- |
| L’agente non trova la skill | Verifica il percorso delle skill dell’host, copia l’intera cartella e aggiorna il rilevamento delle skill. |
| Manca una dipendenza | Installa `requirements.txt` con lo stesso interprete Python usato dall’agente. |
| L’archivio delle credenziali non è disponibile | Controlla l’accesso al sistema e sblocca l’archivio. Su Linux, assicurati che Secret Service sia in esecuzione nella sessione utente corrente. Gli script non ripiegano sul salvataggio in testo semplice. |
| `status` riesce, ma la generazione fallisce | La configurazione locale non dimostra l’accesso remoto. Controlla le autorizzazioni della chiave, il saldo, la disponibilità del modello e i parametri della richiesta. |
| La chiave salvata è stata cancellata, ma le richieste continuano ad autenticarsi | Controlla se `FLAQ_CLIENT_KEY` è ancora impostata nell’ambiente dell’agente. |
| I dettagli del modello o la documentazione sono incompleti | Segui il collegamento effettivo alla documentazione, aumenta il limite di testo se il contenuto è troncato oppure usa il browser dell’agente per i contenuti dinamici. Non indovinare i parametri mancanti. |
| Il tempo di attesa scade | Conserva l’ID dell’attività e consultala di nuovo. La scadenza del tempo di attesa locale non significa che la generazione remota sia fallita o sia stata annullata. |
| L’invio termina con un errore di rete | Prima di inviare di nuovo, controlla se Flaq ha creato un’attività per evitare addebiti duplicati. |
| Un download fallisce | Conserva l’URL del risultato, controlla la directory di destinazione e il nome del file e verifica l’errore segnalato. I file esistenti non vengono mai sovrascritti. |

## Controlli di sviluppo

Esegui dalla directory della skill:

```sh
python3 -m unittest discover -s tests -v
```

Questi test non usano credenziali di sistema reali né inviano attività a pagamento. Coprono l’estrazione delle pagine, il comportamento di accesso alle credenziali, la gestione delle richieste e la protezione dei file. Non sostituiscono i controlli effettivi dell’archivio delle credenziali su ciascun sistema operativo né un test autorizzato di generazione dall’inizio alla fine.
