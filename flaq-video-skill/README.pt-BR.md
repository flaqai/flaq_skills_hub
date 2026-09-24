# Flaq Video Skill

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português do Brasil](README.pt-BR.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [Bahasa Indonesia](README.id.md) · [Italiano](README.it.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md)

Gere, edite e aumente a resolução de vídeos com um agente de IA por meio da [Flaq AI](https://flaq.ai/). A skill orienta seu agente na descoberta de modelos, consulta à documentação atual da API, requisições autenticadas, consulta periódica de tarefas e entrega de vídeos.

O agente consulta os recursos e preços dos modelos no [Catálogo de modelos](https://flaq.ai/model-market/), nas páginas de detalhes dos modelos e na [documentação oficial](https://flaq.ai/docs/). As versões dos modelos e os limites de parâmetros não são fixados na skill. Os auxiliares Python incluídos cuidam da extração de páginas, credenciais locais, requisições e downloads. Não é necessário usar Flaq CLI nem um servidor local.

## Vídeos da comunidade no X

Explore doze exemplos reunidos em [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). Abra um caso para ler suas notas, a publicação original no X para ver o prompt do criador ou o MP4 para assistir. A identificação dos modelos segue as publicações de origem; estes são exemplos da comunidade, não vídeos gerados por esta skill.

| Exemplo | Aplicação | Publicação original e prompt | Vídeo |
| --- | --- | --- | --- |
| [X01 · Comédia gastronômica](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | Animação | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · Combinações de moda](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | Moda | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · Selfie de gatinho](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · Animação de rua](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · Momentos em MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | Estilo de vida | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · Vlog em dupla](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | Diálogo | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · Surpresa no palco](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | Apresentação | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · ASMR com flores](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | Tutorial | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · Efeitos visuais de ação](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | Ação | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · Diário de viagem](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | Viagem | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · História de gentileza](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | Narrativa | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · Paisagem sonora tropical](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | Som | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [Assistir ao MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[Veja as notas das fontes e as adaptações dos prompts](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). Para gerar vídeos, siga a prioridade de modelos da skill e consulte a documentação atual da Flaq.

## Inspiração sem limites para vídeos

Explore a [biblioteca de cenários](scenarios/index.md) para encontrar entradas necessárias, orientações de fluxo, prompts originais e exemplos de vídeos. Clique em uma capa para assistir ao vídeo de origem.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="Apresentação de look casual" height="240"></a><br>
      <strong>Apresentação de look casual</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">Assistir ao vídeo</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">Prompt e fluxo</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="Revelação de look" height="240"></a><br>
      <strong>Revelação de look</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">Assistir ao vídeo</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">Prompt e fluxo</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="Apresentação de look" height="240"></a><br>
      <strong>Apresentação de look</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">Assistir ao vídeo</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">Prompt e fluxo</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="Apresentação de batom" height="240"></a><br>
      <strong>Apresentação de batom</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">Assistir ao vídeo</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">Prompt e fluxo</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="Vlog de viagem de verão" height="240"></a><br>
      <strong>Vlog de viagem de verão</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">Assistir ao vídeo</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">Prompt e fluxo</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="Vlog de rotina matinal" height="240"></a><br>
      <strong>Vlog de rotina matinal</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">Assistir ao vídeo</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">Prompt e fluxo</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="Anúncio de cuidados com a pele por criador" height="240"></a><br>
      <strong>Anúncio de cuidados com a pele por criador</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">Assistir ao vídeo</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">Prompt e fluxo</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="Demonstração de garrafa" height="240"></a><br>
      <strong>Demonstração de garrafa</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">Assistir ao vídeo</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">Prompt e fluxo</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="Anúncio de moda urbana" height="240"></a><br>
      <strong>Anúncio de moda urbana</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">Assistir ao vídeo</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">Prompt e fluxo</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="Sequência cinematográfica de resgate" height="240"></a><br>
      <strong>Sequência cinematográfica de resgate</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">Assistir ao vídeo</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">Prompt e fluxo</a>
    </td>
  </tr>
</table>

Estes são exemplos existentes de AITryOn, UGCMaker e Heydream, não novas gerações feitas com esta skill. As capas são prévias, não entradas de origem verificadas. Cada guia inclui links das fontes e prompts originais expansíveis; os prompts adaptados são identificados separadamente. Consulte a [origem dos exemplos e as referências de layout](scenarios/index.md#about-the-examples).

## Seleção de modelos

Sua escolha explícita de modelo tem prioridade. Caso contrário, o agente prefere Seedance e, em seguida, Wan, escolhendo a versão mais recente disponível que atenda aos seus requisitos de entrada, recursos e orçamento. Ele compara outros modelos disponíveis quando nenhuma das duas famílias é adequada. Após uma falha, não troca automaticamente de modelo nem envia outra tarefa paga.

## Requisitos

- Um agente compatível com skills `SKILL.md` que consiga ler páginas da web, executar Python e acessar arquivos locais. Uma ferramenta de navegador ajuda com páginas dinâmicas ou que exigem login.
- Python 3.10 ou superior, com os pacotes de [requirements.txt](requirements.txt).
- Acesso de rede ao site e à API da Flaq, além das URLs de vídeo retornadas.
- Uma conta Flaq e uma Client Key com as permissões e o saldo disponível necessários para o modelo escolhido.
- Para salvar credenciais: Chaves do macOS, Gerenciador de Credenciais do Windows ou Linux Secret Service em execução e desbloqueado.

## Instalar a skill

Copie todo o diretório `flaq-video-skill` para o diretório de skills aceito pelo seu agente. Use o local de skills no nível de projeto ou usuário indicado na documentação do agente; o local depende do aplicativo hospedeiro. Mantenha o nome do diretório e sua estrutura interna, incluindo `scripts`, `references`, `scenarios`, `templates` e `requirements.txt`. Copiar apenas `SKILL.md` não é suficiente.

Atualize ou recarregue as skills conforme exigido pelo seu agente. Confirme que ele encontra `flaq-video-skill` e consegue acessar os arquivos relativos referenciados em [SKILL.md](SKILL.md).

Abra um terminal no diretório `flaq-video-skill` instalado. Instale as dependências no ambiente Python de sua escolha:

```sh
python3 -m pip install -r requirements.txt
```

No Windows, use `py -3` no lugar de `python3`. Se você usar um ambiente virtual, certifique-se de que o agente execute os scripts com o mesmo interpretador. Nem a skill nem seus scripts instalam dependências automaticamente.

## Configure sua Key uma única vez

Crie ou copie uma Client Key na página de gerenciamento de API da Flaq e execute estes comandos no seu próprio terminal:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Cole a Key no campo de entrada oculta. Não a coloque em mensagens de chat, argumentos de comandos nem arquivos JSON de requisição.

A Key é salva no armazenamento de credenciais do sistema para o dispositivo e a conta do sistema operacional atuais. As requisições seguintes a leem automaticamente, inclusive após fechar o terminal ou reiniciar o dispositivo. O sistema operacional pode solicitar autorização de acesso ou o desbloqueio do armazenamento de credenciais. Configure a Key novamente em outro dispositivo.

Execute `set` novamente para substituir a Key salva. Para removê-la:

```sh
python3 scripts/credentials.py clear
```

Em ambientes de automação existentes, `FLAQ_CLIENT_KEY` tem prioridade sobre a credencial salva. Os scripts não carregam arquivos `.env` automaticamente, e `clear` não remove variáveis de ambiente. `status` verifica a configuração local; não valida a Key remotamente nem verifica seu saldo.

Consulte [Uso dos scripts](references/scripts.md#environment-and-first-time-setup) para obter detalhes de armazenamento e requisitos de plataforma.

## Usar com seu agente

Peça ao agente para usar Flaq Video Skill e descreva o resultado desejado. Por exemplo:

> Use Flaq Video Skill para recomendar um modelo para um vídeo horizontal de 8 segundos de um porto tranquilo ao nascer do sol. Compare as opções adequadas e estime o custo antes de gerar.

> Use Flaq Video Skill com o modelo Seedance mais recente disponível para animar a imagem que anexei. Quero uma aproximação suave da câmera, enquadramento vertical e nenhum som. Confira primeiro as opções compatíveis e o preço.

> Use Flaq Video Skill para consultar o ID da minha tarefa existente e baixar o vídeo se estiver pronto. Não crie outra tarefa.

### Apresentação de looks

> Use Flaq Video Skill para transformar minha imagem de prova virtual já finalizada em uma apresentação do look. Mantenha a pessoa e as roupas consistentes, com um giro suave e um pequeno passo à frente. Confira a duração e o custo antes de gerar.

Leia o [guia de looks](scenarios/virtual-try-on.md). O ponto de partida é uma pessoa que já está vestindo o look.

### Anúncio UGC

> Use Flaq Video Skill para criar um anúncio UGC vertical a partir da imagem do meu produto. Comece com um detalhe do produto, mostre-o em uso e termine com uma imagem clara dele. Use os argumentos de venda que forneci e confira primeiro o suporte a áudio e o custo.

Leia o [guia de anúncios UGC](scenarios/ugc-ads.md) para ver exemplos de moda urbana e apresentação de looks com os prompts originais.

### Demonstração de produto

> Use Flaq Video Skill para animar esta foto de uma pessoa segurando uma garrafa. Faça com que ela tome um gole e apresente a garrafa à câmera. Preserve o formato e o rótulo da garrafa. Confira primeiro as opções compatíveis e o custo.

Leia o [guia de produtos](scenarios/product-showcase.md) para ver exemplos de garrafas e batons. Para animar cenas em geral, use o [guia de imagem para vídeo](scenarios/image-to-video.md).

Você pode especificar um modelo, fornecer o link da página de detalhes dele na Flaq ou deixar o agente seguir a prioridade padrão. O agente lê a documentação detalhada do modelo escolhido antes de preparar a requisição. Depois que você autoriza a geração com as opções necessárias e a faixa de custo definidas, ele envia a tarefa e registra seu ID para acompanhamento.

## Verificar o acesso ao site sem uma Key

No diretório da skill:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

Isso lê uma página pública sem credenciais nem chamada paga à API. O script extrai links de modelos, links da documentação, texto da página, exemplos de código e especificações públicas de modelos, quando presentes. O agente segue os links reais das páginas de detalhes e da documentação em vez de adivinhar URLs.

## Arquivos e leitura complementar

| Arquivo ou diretório | Finalidade |
| --- | --- |
| [SKILL.md](SKILL.md) | Instruções do agente, prioridade de modelos e fluxo completo |
| [references/scripts.md](references/scripts.md) | Comandos exatos de configuração, requisição, consulta periódica, envio e download |
| [references/model-discovery.md](references/model-discovery.md) | Leitura de especificações e conciliação com a documentação detalhada |
| [scenarios/index.md](scenarios/index.md) | Seleção de cenários, requisitos de entrada, fluxos, prompts e galerias de vídeos de origem |
| `scripts/credentials.py` | Configurar, consultar e remover credenciais locais |
| `scripts/read_page.py` | Extrair informações de páginas públicas da Flaq |
| `scripts/video_request.py` | Enviar, consultar e aguardar tarefas de vídeo, além de baixar os resultados |
| `templates/` | Modelos genéricos de requisição e de arquivos locais para preencher com base na documentação atual |
| `tests/` | Verificações de comportamento offline com entradas de teste isoladas |

Os modelos de requisição são estruturas iniciais, não exemplos prontos para envio. Mantenha os modelos inalterados e prepare cada requisição no seu diretório de trabalho. Os campos e formatos de envio aceitos dependem da documentação atual do modelo escolhido.

## Solução de problemas

| Problema | O que verificar |
| --- | --- |
| O agente não encontra a skill | Verifique o local de skills do aplicativo hospedeiro, copie a pasta completa e atualize a descoberta de skills. |
| Falta uma dependência | Instale `requirements.txt` com o mesmo interpretador Python usado pelo agente. |
| O armazenamento de credenciais está indisponível | Verifique o acesso ao sistema e desbloqueie-o. No Linux, certifique-se de que o Secret Service esteja em execução na sessão do usuário atual. Os scripts não recorrem ao armazenamento em texto simples. |
| `status` funciona, mas a geração falha | A configuração local não comprova o acesso remoto. Verifique as permissões da Key, o saldo, a disponibilidade do modelo e os parâmetros da requisição. |
| Uma Key salva foi removida, mas as requisições continuam autenticadas | Verifique se `FLAQ_CLIENT_KEY` ainda está definida no ambiente do agente. |
| Os detalhes do modelo ou a documentação estão incompletos | Siga o link real da documentação, aumente o limite de texto se houver truncamento ou use o navegador do agente para conteúdo dinâmico. Não adivinhe parâmetros ausentes. |
| O tempo de espera se esgota | Guarde o ID da tarefa e consulte-a novamente. Um tempo limite de espera local não significa que a geração remota falhou ou foi cancelada. |
| O envio termina com um erro de rede | Antes de enviar novamente, verifique se a Flaq criou uma tarefa para evitar cobranças duplicadas. |
| Um download falha | Guarde a URL do resultado, verifique o diretório de saída e o nome do arquivo e examine o erro informado. Arquivos existentes nunca são sobrescritos. |

## Verificações de desenvolvimento

Execute no diretório da skill:

```sh
python3 -m unittest discover -s tests -v
```

Estes testes não usam credenciais reais do sistema nem enviam tarefas pagas. Eles cobrem extração de páginas, comportamento de acesso às credenciais, tratamento de requisições e proteção de arquivos. Não substituem verificações reais do armazenamento de credenciais em cada sistema operacional nem um teste autorizado de geração de ponta a ponta.
