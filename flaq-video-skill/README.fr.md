# Flaq Video Skill

Générez, modifiez et augmentez la résolution de vidéos via [Flaq AI](https://flaq.ai/) avec un agent IA. La compétence accompagne votre agent dans la découverte des modèles, la consultation de la documentation API actuelle, les requêtes authentifiées, le suivi des tâches et la livraison des vidéos.

L’agent consulte les capacités et les tarifs des modèles sur le [catalogue de modèles](https://flaq.ai/model-market/), les pages détaillées et la [documentation officielle](https://flaq.ai/docs/). Les versions des modèles et les limites des paramètres ne sont pas inscrites en dur dans la compétence. Les utilitaires Python inclus gèrent l’extraction des pages, les identifiants locaux, les requêtes et les téléchargements. Flaq CLI et un serveur local ne sont pas nécessaires.

## Vidéos de la communauté sur X

Découvrez douze exemples réunis dans [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). Ouvrez un cas pour lire ses notes, la publication X originale pour consulter le prompt du créateur, ou le MP4 pour le visionner. L’attribution des modèles reprend celle des publications sources ; il s’agit de références de la communauté, et non de vidéos générées avec cette compétence.

| Exemple | Cas d’usage | Publication originale et prompt | Vidéo |
| --- | --- | --- | --- |
| [X01 · Comédie culinaire](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | Animation | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [Voir le MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · Stylisme de mode](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | Mode | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [Voir le MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · Selfie de chaton](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [Voir le MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · Animation de rue](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [Voir le MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · Instants MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | Vie quotidienne | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [Voir le MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · Vlog à deux](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | Dialogue | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [Voir le MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · Révélation sur scène](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | Spectacle | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [Voir le MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · ASMR floral](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | Tutoriel | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [Voir le MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · Effets visuels d’action](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | Action | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [Voir le MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · Carnet de voyage](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | Voyage | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [Voir le MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · Histoire de bienveillance](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | Narration | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [Voir le MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · Ambiance sonore tropicale](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | Son | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [Voir le MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[Consultez les notes des sources et les adaptations des prompts](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). Pour générer une vidéo, respectez la priorité des modèles de la compétence et vérifiez la documentation Flaq actuelle.

## Inspiration vidéo sans limites

Consultez la [bibliothèque de scénarios](scenarios/index.md) pour connaître les éléments d’entrée, les étapes de réalisation, les prompts originaux et les exemples vidéo. Cliquez sur une vignette pour regarder la vidéo source.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="Présentation d’une tenue du quotidien" height="240"></a><br>
      <strong>Présentation d’une tenue du quotidien</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">Voir la vidéo</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">Prompt et procédure</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="Révélation d’une tenue de mode" height="240"></a><br>
      <strong>Révélation d’une tenue de mode</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">Voir la vidéo</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">Prompt et procédure</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="Présentation de tenue" height="240"></a><br>
      <strong>Présentation de tenue</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">Voir la vidéo</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">Prompt et procédure</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="Présentation d’un rouge à lèvres" height="240"></a><br>
      <strong>Présentation d’un rouge à lèvres</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">Voir la vidéo</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">Prompt et procédure</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="Vlog de voyage estival" height="240"></a><br>
      <strong>Vlog de voyage estival</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">Voir la vidéo</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">Prompt et procédure</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="Vlog de routine matinale" height="240"></a><br>
      <strong>Vlog de routine matinale</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">Voir la vidéo</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">Prompt et procédure</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="Publicité de soins de la peau avec une créatrice" height="240"></a><br>
      <strong>Publicité de soins de la peau avec une créatrice</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">Voir la vidéo</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">Prompt et procédure</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="Démonstration avec une bouteille" height="240"></a><br>
      <strong>Démonstration avec une bouteille</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">Voir la vidéo</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">Prompt et procédure</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="Publicité de mode urbaine" height="240"></a><br>
      <strong>Publicité de mode urbaine</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">Voir la vidéo</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">Prompt et procédure</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="Séquence de sauvetage cinématographique" height="240"></a><br>
      <strong>Séquence de sauvetage cinématographique</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">Voir la vidéo</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">Prompt et procédure</a>
    </td>
  </tr>
</table>

Il s’agit d’exemples existants d’AITryOn, UGCMaker et Heydream, et non de nouvelles vidéos générées avec cette compétence. Les vignettes sont des aperçus, pas des entrées sources vérifiées. Chaque guide comprend des liens vers les sources et des prompts originaux dans des sections dépliables ; les prompts adaptés sont signalés séparément. Consultez la [provenance des exemples et les références de mise en page](scenarios/index.md#about-the-examples).

## Choix du modèle

Le modèle que vous choisissez explicitement est prioritaire. Sinon, l’agent privilégie Seedance, puis Wan, en sélectionnant la dernière version disponible répondant à vos exigences d’entrée, de capacités et de budget. Il compare les autres modèles disponibles lorsqu’aucune de ces familles ne convient. Après un échec, il ne change pas automatiquement de modèle pour soumettre une nouvelle tâche payante.

## Prérequis

- Un agent compatible avec les compétences `SKILL.md`, capable de lire des pages web, d’exécuter Python et d’accéder aux fichiers locaux. Un outil de navigation est utile pour les pages dynamiques ou nécessitant une connexion.
- Python 3.10 ou ultérieur, avec les paquets de [requirements.txt](requirements.txt).
- Un accès réseau au site et à l’API de Flaq, ainsi qu’aux URL des vidéos renvoyées.
- Un compte Flaq et une Client Key disposant des autorisations et du solde nécessaires au modèle choisi.
- Pour enregistrer les identifiants : le Trousseau macOS, le Gestionnaire d’identification Windows ou un service Secret Service Linux actif et déverrouillé.

## Installer la compétence

Copiez l’intégralité du répertoire `flaq-video-skill` dans le répertoire de compétences pris en charge par votre agent. Utilisez l’emplacement au niveau du projet ou de l’utilisateur indiqué dans sa documentation ; il dépend de l’hôte. Conservez le nom du répertoire et son organisation interne, y compris `scripts`, `references`, `scenarios`, `templates` et `requirements.txt`. Copier uniquement `SKILL.md` ne suffit pas.

Actualisez ou rechargez les compétences selon les besoins de votre agent. Vérifiez qu’il trouve `flaq-video-skill` et peut accéder aux fichiers désignés par les chemins relatifs dans [SKILL.md](SKILL.md).

Ouvrez un terminal dans le répertoire `flaq-video-skill` installé. Installez les dépendances dans l’environnement Python de votre choix :

```sh
python3 -m pip install -r requirements.txt
```

Sous Windows, utilisez `py -3` à la place de `python3`. Si vous utilisez un environnement virtuel, assurez-vous que votre agent exécute les scripts avec le même interpréteur. Ni la compétence ni ses scripts n’installent automatiquement les dépendances.

## Configurer votre clé une seule fois

Créez ou copiez une Client Key depuis la page de gestion de l’API Flaq, puis exécutez ces commandes dans votre propre terminal :

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Collez la clé à l’invite de saisie masquée. Ne l’insérez pas dans un message de conversation, un argument de commande ou un fichier JSON de requête.

La clé est enregistrée dans le gestionnaire d’identifiants du système pour l’appareil et le compte système actuels. Les requêtes suivantes la lisent automatiquement, même après la fermeture du terminal ou le redémarrage de l’appareil. Le système d’exploitation peut vous demander d’autoriser l’accès ou de déverrouiller son gestionnaire d’identifiants. Configurez à nouveau la clé sur tout autre appareil.

Exécutez à nouveau `set` pour remplacer la clé enregistrée. Pour la supprimer :

```sh
python3 scripts/credentials.py clear
```

Dans les environnements d’automatisation existants, `FLAQ_CLIENT_KEY` est prioritaire sur l’identifiant enregistré. Les scripts ne chargent pas automatiquement les fichiers `.env`, et `clear` ne supprime pas les variables d’environnement. `status` vérifie la configuration locale ; il ne valide pas la clé à distance et ne vérifie pas votre solde.

Consultez [Utilisation des scripts](references/scripts.md#environment-and-first-time-setup) pour connaître les détails de stockage et les prérequis de chaque plateforme.

## Utiliser avec votre agent

Demandez à l’agent d’utiliser Flaq Video Skill et décrivez le résultat souhaité. Par exemple :

> Utilise Flaq Video Skill pour recommander un modèle pour une vidéo horizontale de 8 secondes montrant un port calme au lever du soleil. Compare les options adaptées et estime le coût avant de lancer la génération.

> Utilise Flaq Video Skill avec le dernier modèle Seedance disponible pour animer mon image jointe. Je souhaite un léger travelling avant, un cadrage vertical et aucun son. Vérifie d’abord les options prises en charge et le prix.

> Utilise Flaq Video Skill pour consulter l’ID de ma tâche existante et télécharger la vidéo si elle est prête. Ne crée pas d’autre tâche.

### Présentation de tenue

> Utilise Flaq Video Skill pour transformer mon image d’essayage finalisée en présentation de tenue. Préserve l’apparence de la personne et des vêtements, avec un léger pivotement et un petit pas en avant. Vérifie la durée et le coût avant de lancer la génération.

Consultez le [guide de présentation de tenues](scenarios/virtual-try-on.md). Le point de départ est une personne portant déjà la tenue.

### Publicité UGC

> Utilise Flaq Video Skill pour créer une publicité UGC verticale à partir de l’image de mon produit. Commence par un détail du produit, montre-le en cours d’utilisation et termine par un plan clair du produit. Utilise les arguments de vente que j’ai fournis et vérifie d’abord la prise en charge de l’audio et le coût.

Consultez le [guide des publicités UGC](scenarios/ugc-ads.md) pour voir des exemples de mode urbaine et de présentation de tenues avec leurs prompts originaux.

### Démonstration de produit

> Utilise Flaq Video Skill pour animer cette photo d’une personne tenant une bouteille. Fais-lui boire une gorgée, puis présenter la bouteille à la caméra. Préserve sa forme et son étiquette. Vérifie d’abord les options prises en charge et le coût.

Consultez le [guide des produits](scenarios/product-showcase.md) pour voir des exemples de bouteilles et de rouges à lèvres. Pour l’animation de scènes en général, utilisez le [guide image vers vidéo](scenarios/image-to-video.md).

Vous pouvez préciser un modèle, fournir le lien de sa page détaillée Flaq ou laisser l’agent suivre la priorité par défaut. L’agent lit la documentation détaillée du modèle choisi avant de préparer la requête. Une fois la génération autorisée, les options nécessaires et le cadre des coûts établis, il soumet la tâche et enregistre son ID pour le suivi.

## Vérifier l’accès au site sans clé

Depuis le répertoire de la compétence :

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

Cette commande lit une page publique sans identifiants ni appel API payant. Le script extrait les liens des modèles et de la documentation, le texte de la page, les exemples de code et les spécifications publiques des modèles lorsqu’elles sont présentes. L’agent suit les liens réels vers les pages détaillées et la documentation au lieu de deviner les URL.

## Fichiers et lectures complémentaires

| Fichier ou répertoire | Rôle |
| --- | --- |
| [SKILL.md](SKILL.md) | Instructions pour l’agent, priorité des modèles et procédure de bout en bout |
| [references/scripts.md](references/scripts.md) | Commandes exactes de configuration, de requête, de suivi, d’envoi et de téléchargement |
| [references/model-discovery.md](references/model-discovery.md) | Lecture des spécifications et mise en cohérence avec la documentation détaillée |
| [scenarios/index.md](scenarios/index.md) | Orientation par scénario, entrées requises, procédures, prompts et galeries de vidéos sources |
| `scripts/credentials.py` | Configurer, consulter et supprimer les identifiants locaux |
| `scripts/read_page.py` | Extraire les informations des pages publiques de Flaq |
| `scripts/video_request.py` | Soumettre, consulter et attendre les tâches vidéo, puis télécharger les résultats |
| `templates/` | Modèles génériques de requêtes et de fichiers locaux à remplir à partir de la documentation actuelle |
| `tests/` | Tests de comportement hors ligne avec des entrées de test isolées |

Les modèles de requête sont des structures de départ, pas des exemples prêts à être soumis. Laissez-les inchangés et préparez chaque requête dans votre répertoire de travail. Les champs et formats d’envoi pris en charge dépendent de la documentation actuelle du modèle choisi.

## Dépannage

| Problème | Points à vérifier |
| --- | --- |
| L’agent ne trouve pas la compétence | Vérifiez l’emplacement des compétences de l’hôte, copiez le dossier complet et actualisez leur détection. |
| Une dépendance manque | Installez `requirements.txt` avec le même interpréteur Python que celui utilisé par l’agent. |
| Le gestionnaire d’identifiants est indisponible | Vérifiez l’accès au système et déverrouillez le gestionnaire. Sous Linux, assurez-vous que Secret Service fonctionne dans la session de l’utilisateur actuel. Les scripts n’utilisent pas le stockage en texte brut en solution de repli. |
| `status` réussit, mais la génération échoue | La configuration locale ne garantit pas l’accès distant. Vérifiez les autorisations de la clé, le solde, la disponibilité du modèle et les paramètres de la requête. |
| La clé enregistrée a été supprimée, mais les requêtes restent authentifiées | Vérifiez si `FLAQ_CLIENT_KEY` est toujours définie dans l’environnement de l’agent. |
| Les détails du modèle ou la documentation sont incomplets | Suivez le lien réel de la documentation, augmentez la limite de texte si le contenu est tronqué ou utilisez le navigateur de l’agent pour le contenu dynamique. Ne devinez pas les paramètres manquants. |
| Le délai d’attente est dépassé | Conservez l’ID de la tâche et consultez-la à nouveau. Un délai d’attente local dépassé ne signifie pas que la génération distante a échoué ou a été annulée. |
| L’envoi se termine par une erreur réseau | Avant de soumettre à nouveau la requête, vérifiez si Flaq a créé une tâche afin d’éviter une double facturation. |
| Un téléchargement échoue | Conservez l’URL du résultat, vérifiez le répertoire de sortie et le nom du fichier, puis examinez l’erreur signalée. Les fichiers existants ne sont jamais écrasés. |

## Vérifications de développement

À exécuter depuis le répertoire de la compétence :

```sh
python3 -m unittest discover -s tests -v
```

Ces tests n’utilisent pas de véritables identifiants système et ne soumettent pas de tâches payantes. Ils couvrent l’extraction des pages, le comportement d’accès aux identifiants, le traitement des requêtes et la protection des fichiers. Ils ne remplacent pas les vérifications réelles du gestionnaire d’identifiants sur chaque système d’exploitation, ni un test de génération de bout en bout autorisé.
