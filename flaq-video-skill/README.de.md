# Flaq Video Skill

Erstelle, bearbeite und skaliere Videos mit einem KI-Agenten über [Flaq AI](https://flaq.ai/) hoch. Der Skill führt deinen Agenten durch die Modellsuche, die aktuelle API-Dokumentation, authentifizierte Anfragen, die regelmäßige Statusabfrage und die Bereitstellung der Videos.

Der Agent liest Modellfähigkeiten und Preise im [Modellkatalog](https://flaq.ai/model-market/), auf den Modelldetailseiten und in der [offiziellen Dokumentation](https://flaq.ai/docs/). Modellversionen und Parametergrenzen sind im Skill nicht fest einprogrammiert. Die enthaltenen Python-Hilfsskripte übernehmen die Seitenextraktion, lokale Zugangsdaten, Anfragen und Downloads. Flaq CLI und ein lokaler Server sind nicht erforderlich.

## Community-Videos von X

Entdecke zwölf Beispiele aus [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). Öffne einen Fall für die zugehörigen Hinweise, den ursprünglichen X-Beitrag für den Prompt des Erstellers oder die MP4-Datei zum Ansehen. Die Modellzuordnung entspricht den Quellbeiträgen; dies sind Community-Referenzen, keine mit diesem Skill generierten Videos.

| Beispiel | Anwendungsfall | Originalbeitrag und Prompt | Video |
| --- | --- | --- | --- |
| [X01 · Essenskomödie](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | Animation | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [MP4 ansehen](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · Modestyling](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | Mode | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [MP4 ansehen](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · Kätzchen-Selfie](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [MP4 ansehen](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · Straßenanimation](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [MP4 ansehen](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · MiniDV-Momente](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | Alltag | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [MP4 ansehen](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · Vlog zu zweit](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | Dialog | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [MP4 ansehen](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · Bühnenüberraschung](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | Auftritt | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [MP4 ansehen](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · Blumen-ASMR](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | Anleitung | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [MP4 ansehen](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · Action-Effekte](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | Action | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [MP4 ansehen](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · Reisetagebuch](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | Reise | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [MP4 ansehen](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · Geschichte der Hilfsbereitschaft](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | Geschichtenerzählen | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [MP4 ansehen](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · Tropische Klanglandschaft](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | Klang | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [MP4 ansehen](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[Quellhinweise und angepasste Prompts ansehen](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). Beachte zur Generierung die Modellpriorität des Skills und prüfe die aktuelle Flaq-Dokumentation.

## Grenzenlose Videoinspiration

In der [Szenariobibliothek](scenarios/index.md) findest du Eingaben, Ablaufanleitungen, Original-Prompts und Videobeispiele. Klicke auf ein Vorschaubild, um das Quellvideo anzusehen.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="Alltagsoutfit-Präsentation" height="240"></a><br>
      <strong>Alltagsoutfit-Präsentation</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">Video ansehen</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">Prompt und Ablauf</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="Enthüllung eines Modeoutfits" height="240"></a><br>
      <strong>Enthüllung eines Modeoutfits</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">Video ansehen</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">Prompt und Ablauf</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="Outfit-Präsentation" height="240"></a><br>
      <strong>Outfit-Präsentation</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">Video ansehen</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">Prompt und Ablauf</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="Lippenstift-Präsentation" height="240"></a><br>
      <strong>Lippenstift-Präsentation</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">Video ansehen</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">Prompt und Ablauf</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="Sommerreise-Vlog" height="240"></a><br>
      <strong>Sommerreise-Vlog</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">Video ansehen</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">Prompt und Ablauf</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="Morgenroutine-Vlog" height="240"></a><br>
      <strong>Morgenroutine-Vlog</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">Video ansehen</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">Prompt und Ablauf</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="Hautpflege-Werbung mit Creatorin" height="240"></a><br>
      <strong>Hautpflege-Werbung mit Creatorin</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">Video ansehen</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">Prompt und Ablauf</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="Flaschenvorführung" height="240"></a><br>
      <strong>Flaschenvorführung</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">Video ansehen</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">Prompt und Ablauf</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="Streetwear-Produktwerbung" height="240"></a><br>
      <strong>Streetwear-Produktwerbung</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">Video ansehen</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">Prompt und Ablauf</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="Filmische Rettungssequenz" height="240"></a><br>
      <strong>Filmische Rettungssequenz</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">Video ansehen</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">Prompt und Ablauf</a>
    </td>
  </tr>
</table>

Dies sind bestehende Beispiele von AITryOn, UGCMaker und Heydream, keine mit diesem Skill neu generierten Videos. Die Vorschaubilder sind Vorschauen und keine bestätigten Quelleingaben. Jede Anleitung enthält Quelllinks und ausklappbare Original-Prompts; angepasste Prompts sind gesondert gekennzeichnet. Siehe [Herkunft der Beispiele und Layoutreferenzen](scenarios/index.md#about-the-examples).

## Modellauswahl

Deine ausdrückliche Modellwahl hat Vorrang. Andernfalls bevorzugt der Agent Seedance, dann Wan, und wählt jeweils die neueste verfügbare Version, die zu deinen Eingaben, benötigten Fähigkeiten und deinem Budget passt. Wenn keine der beiden Modellfamilien geeignet ist, vergleicht er andere verfügbare Modelle. Nach einem Fehler wechselt er nicht automatisch das Modell und reicht keine weitere kostenpflichtige Aufgabe ein.

## Voraussetzungen

- Ein Agent, der `SKILL.md`-Skills unterstützt, Webseiten lesen, Python ausführen und auf lokale Dateien zugreifen kann. Ein Browserwerkzeug hilft bei dynamischen Seiten oder Seiten, die eine Anmeldung erfordern.
- Python 3.10 oder neuer mit den Paketen aus [requirements.txt](requirements.txt).
- Netzwerkzugriff auf die Flaq-Website und -API sowie die zurückgegebenen Video-URLs.
- Ein Flaq-Konto und ein Client Key mit den erforderlichen Berechtigungen und genügend Guthaben für das gewählte Modell.
- Für gespeicherte Zugangsdaten: der macOS-Schlüsselbund, die Windows-Anmeldeinformationsverwaltung oder ein laufender, entsperrter Linux Secret Service.

## Skill installieren

Kopiere das gesamte Verzeichnis `flaq-video-skill` in das von deinem Agenten unterstützte Skill-Verzeichnis. Verwende den in seiner Dokumentation angegebenen projekt- oder benutzerbezogenen Speicherort; dieser hängt vom Host ab. Behalte den Verzeichnisnamen und die interne Struktur einschließlich `scripts`, `references`, `scenarios`, `templates` und `requirements.txt` bei. Nur `SKILL.md` zu kopieren reicht nicht aus.

Aktualisiere oder lade die Skills so neu, wie es dein Agent erfordert. Prüfe, ob er `flaq-video-skill` findet und die in [SKILL.md](SKILL.md) relativ referenzierten Dateien auflösen kann.

Öffne ein Terminal im installierten Verzeichnis `flaq-video-skill`. Installiere die Abhängigkeiten in deiner gewählten Python-Umgebung:

```sh
python3 -m pip install -r requirements.txt
```

Verwende unter Windows `py -3` anstelle von `python3`. Falls du eine virtuelle Umgebung verwendest, stelle sicher, dass dein Agent die Skripte mit demselben Interpreter ausführt. Weder der Skill noch seine Skripte installieren Abhängigkeiten automatisch.

## Schlüssel einmalig einrichten

Erstelle oder kopiere einen Client Key auf der API-Verwaltungsseite von Flaq und führe anschließend diese Befehle in deinem eigenen Terminal aus:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Füge den Schlüssel bei der verdeckten Eingabeaufforderung ein. Schreibe ihn nicht in eine Chatnachricht, ein Befehlsargument oder eine JSON-Anfragedatei.

Der Schlüssel wird im Zugangsspeicher deines Systems für das aktuelle Gerät und Betriebssystemkonto gespeichert. Nachfolgende Anfragen lesen ihn automatisch, auch nach dem Schließen des Terminals oder einem Geräteneustart. Das Betriebssystem kann dich auffordern, den Zugriff zu erlauben oder den Zugangsspeicher zu entsperren. Auf einem anderen Gerät musst du den Schlüssel erneut einrichten.

Führe `set` erneut aus, um den gespeicherten Schlüssel zu ersetzen. Zum Entfernen:

```sh
python3 scripts/credentials.py clear
```

In bestehenden Automatisierungsumgebungen hat `FLAQ_CLIENT_KEY` Vorrang vor den gespeicherten Zugangsdaten. Die Skripte laden `.env`-Dateien nicht automatisch, und `clear` entfernt keine Umgebungsvariablen. `status` prüft die lokale Konfiguration; der Schlüssel wird nicht remote validiert und dein Guthaben wird nicht geprüft.

Unter [Skriptnutzung](references/scripts.md#environment-and-first-time-setup) findest du Details zur Speicherung und zu den Plattformanforderungen.

## Mit deinem Agenten verwenden

Bitte den Agenten, Flaq Video Skill zu verwenden, und beschreibe das gewünschte Ergebnis. Zum Beispiel:

> Verwende Flaq Video Skill, um ein Modell für ein 8 Sekunden langes Video im Querformat von einem ruhigen Hafen bei Sonnenaufgang zu empfehlen. Vergleiche geeignete Optionen und schätze vor der Generierung die Kosten.

> Verwende Flaq Video Skill mit dem neuesten verfügbaren Seedance-Modell, um mein angehängtes Bild zu animieren. Ich möchte eine sanfte Kamerafahrt nach vorne, Hochformat und keinen Ton. Prüfe zuerst die unterstützten Optionen und den Preis.

> Verwende Flaq Video Skill, um meine bestehende Aufgaben-ID abzufragen und das Video herunterzuladen, wenn es fertig ist. Erstelle keine weitere Aufgabe.

### Outfit-Präsentation

> Verwende Flaq Video Skill, um mein fertiges Anprobebild in eine Outfit-Präsentation zu verwandeln. Bewahre das Aussehen der Person und der Kleidung, mit einer sanften Drehung und einem kleinen Schritt nach vorne. Prüfe vor der Generierung Dauer und Kosten.

Lies die [Outfit-Anleitung](scenarios/virtual-try-on.md). Ausgangspunkt ist eine Person, die das Outfit bereits trägt.

### UGC-Werbung

> Verwende Flaq Video Skill, um aus meinem Produktbild eine UGC-Werbung im Hochformat zu erstellen. Beginne mit einem Produktdetail, zeige das Produkt im Einsatz und schließe mit einer klaren Produktaufnahme ab. Verwende meine angegebenen Verkaufsargumente und prüfe zuerst Audiounterstützung und Kosten.

Lies die [Anleitung für UGC-Werbung](scenarios/ugc-ads.md) für Streetwear- und Outfit-Präsentationsbeispiele mit Original-Prompts.

### Produktvorführung

> Verwende Flaq Video Skill, um dieses Foto einer Person mit einer Flasche in der Hand zu animieren. Lass sie einen Schluck trinken und die Flasche der Kamera präsentieren. Bewahre Form und Etikett der Flasche. Prüfe zuerst die unterstützten Optionen und die Kosten.

Lies die [Produktanleitung](scenarios/product-showcase.md) für Flaschen- und Lippenstiftbeispiele. Verwende für allgemeine Szenenanimationen die [Bild-zu-Video-Anleitung](scenarios/image-to-video.md).

Du kannst ein Modell angeben, seine Flaq-Detailseite verlinken oder den Agenten der Standardpriorität folgen lassen. Bevor er die Anfrage vorbereitet, liest der Agent die ausführliche Dokumentation des gewählten Modells. Sobald du die Generierung mit den erforderlichen Optionen und festgelegtem Kostenrahmen autorisiert hast, reicht er die Aufgabe ein und hält ihre ID für die weitere Abfrage fest.

## Websitezugriff ohne Schlüssel prüfen

Im Skill-Verzeichnis:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

Dieser Befehl liest eine öffentliche Seite ohne Zugangsdaten oder kostenpflichtigen API-Aufruf. Das Skript extrahiert Modell- und Dokumentationslinks, Seitentext, Codebeispiele sowie öffentliche Modellspezifikationen, sofern vorhanden. Der Agent folgt den tatsächlichen Links zu Detailseiten und Dokumentation, statt URLs zu erraten.

## Dateien und weiterführende Informationen

| Datei oder Verzeichnis | Zweck |
| --- | --- |
| [SKILL.md](SKILL.md) | Agentenanweisungen, Modellpriorität und vollständiger Ablauf |
| [references/scripts.md](references/scripts.md) | Genaue Befehle für Einrichtung, Anfragen, Statusabfragen, Upload und Download |
| [references/model-discovery.md](references/model-discovery.md) | Spezifikationen lesen und mit der ausführlichen Dokumentation abgleichen |
| [scenarios/index.md](scenarios/index.md) | Szenarioauswahl, Eingabeanforderungen, Abläufe, Prompts und Quellvideogalerien |
| `scripts/credentials.py` | Lokale Zugangsdaten einrichten, prüfen und löschen |
| `scripts/read_page.py` | Informationen aus öffentlichen Flaq-Seiten extrahieren |
| `scripts/video_request.py` | Videoaufgaben einreichen, abfragen, abwarten und Ergebnisse herunterladen |
| `templates/` | Allgemeine Vorlagen für Anfragen und lokale Dateien, anhand der aktuellen Dokumentation auszufüllen |
| `tests/` | Offline-Verhaltensprüfungen mit isolierten Testeingaben |

Anfragevorlagen sind Ausgangsstrukturen, keine direkt einreichbaren Beispiele. Lasse die Vorlagen unverändert und bereite jede Anfrage in deinem Arbeitsverzeichnis vor. Unterstützte Felder und Uploadformate hängen von der aktuellen Dokumentation des ausgewählten Modells ab.

## Fehlerbehebung

| Problem | Was du prüfen solltest |
| --- | --- |
| Der Agent findet den Skill nicht | Prüfe den Skill-Speicherort des Hosts, kopiere den vollständigen Ordner und aktualisiere die Skill-Erkennung. |
| Eine Abhängigkeit fehlt | Installiere `requirements.txt` mit demselben Python-Interpreter, den der Agent verwendet. |
| Der Zugangsspeicher ist nicht verfügbar | Prüfe den Systemzugriff und entsperre den Speicher. Stelle unter Linux sicher, dass Secret Service in der aktuellen Benutzersitzung läuft. Die Skripte weichen nicht auf Klartextspeicherung aus. |
| `status` ist erfolgreich, aber die Generierung schlägt fehl | Eine lokale Konfiguration belegt keinen Remotezugriff. Prüfe Schlüsselberechtigungen, Guthaben, Modellverfügbarkeit und Anfrageparameter. |
| Ein gespeicherter Schlüssel wurde gelöscht, aber Anfragen werden weiterhin authentifiziert | Prüfe, ob `FLAQ_CLIENT_KEY` in der Umgebung des Agenten noch gesetzt ist. |
| Modelldetails oder Dokumentation sind unvollständig | Folge dem tatsächlichen Dokumentationslink, erhöhe bei abgeschnittenem Text das Textlimit oder verwende für dynamische Inhalte den Browser des Agenten. Errate keine fehlenden Parameter. |
| Zeitüberschreitung beim Warten | Bewahre die Aufgaben-ID auf und frage die Aufgabe erneut ab. Eine lokale Zeitüberschreitung bedeutet nicht, dass die Generierung auf dem Server fehlgeschlagen ist oder abgebrochen wurde. |
| Die Einreichung endet mit einem Netzwerkfehler | Prüfe vor einer erneuten Einreichung, ob Flaq bereits eine Aufgabe erstellt hat, um doppelte Kosten zu vermeiden. |
| Ein Download schlägt fehl | Bewahre die Ergebnis-URL auf, prüfe das Ausgabeverzeichnis und den Dateinamen und sieh dir den gemeldeten Fehler an. Vorhandene Dateien werden niemals überschrieben. |

## Entwicklungsprüfungen

Im Skill-Verzeichnis ausführen:

```sh
python3 -m unittest discover -s tests -v
```

Diese Tests verwenden keine echten Systemzugangsdaten und reichen keine kostenpflichtigen Aufgaben ein. Sie prüfen Seitenextraktion, Zugriffsverhalten bei Zugangsdaten, Anfrageverarbeitung und Dateischutz. Sie ersetzen weder praktische Prüfungen des Zugangsspeichers auf jedem Betriebssystem noch einen autorisierten Generierungstest über den gesamten Ablauf.
