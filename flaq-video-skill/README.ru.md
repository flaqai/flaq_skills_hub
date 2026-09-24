# Flaq Video Skill

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português do Brasil](README.pt-BR.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [Bahasa Indonesia](README.id.md) · [Italiano](README.it.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md)

Создавайте, редактируйте и повышайте разрешение видео через [Flaq AI](https://flaq.ai/) с помощью ИИ-агента. Навык направляет агента при поиске моделей, чтении актуальной документации API, отправке аутентифицированных запросов, опросе статуса задач и получении видео.

Агент получает сведения о возможностях и стоимости моделей из [каталога моделей](https://flaq.ai/model-market/), страниц моделей и [официальной документации](https://flaq.ai/docs/). Версии моделей и ограничения параметров не зафиксированы в навыке. Вспомогательные скрипты Python извлекают данные страниц, работают с локальными учётными данными, отправляют запросы и скачивают файлы. Flaq CLI и локальный сервер не требуются.

## Видео сообщества из X

Посмотрите двенадцать примеров из [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). Откройте пример, чтобы прочитать примечания, исходную публикацию в X — чтобы увидеть промпт автора, или MP4 — чтобы посмотреть видео. Модели указаны согласно исходным публикациям; это примеры сообщества, а не видео, созданные этим навыком.

| Пример | Применение | Исходная публикация и промпт | Видео |
| --- | --- | --- | --- |
| [X01 · Комедия о еде](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | Анимация | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [Смотреть MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · Модные образы](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | Мода | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [Смотреть MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · Селфи котёнка](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [Смотреть MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · Уличная анимация](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [Смотреть MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · Моменты на MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | Образ жизни | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [Смотреть MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · Влог вдвоём](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | Диалог | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [Смотреть MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · Сюрприз на сцене](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | Выступление | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [Смотреть MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · Цветочный ASMR](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | Инструкция | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [Смотреть MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · Экшен с визуальными эффектами](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | Экшен | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [Смотреть MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · Дневник путешествия](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | Путешествия | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [Смотреть MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · История о доброте](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | Истории | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [Смотреть MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · Звуки тропиков](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | Звук | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [Смотреть MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[Примечания к источникам и адаптированные промпты](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). При генерации соблюдайте приоритет моделей, заданный навыком, и сверяйтесь с актуальной документацией Flaq.

## Безграничное вдохновение для видео

В [библиотеке сценариев](scenarios/index.md) описаны необходимые входные данные, порядок работы, исходные промпты и примеры видео. Нажмите на обложку, чтобы посмотреть исходное видео.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="Демонстрация повседневного образа" height="240"></a><br>
      <strong>Демонстрация повседневного образа</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">Смотреть видео</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">Промпт и порядок работы</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="Показ модного образа" height="240"></a><br>
      <strong>Показ модного образа</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">Смотреть видео</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">Промпт и порядок работы</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="Демонстрация образа" height="240"></a><br>
      <strong>Демонстрация образа</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">Смотреть видео</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">Промпт и порядок работы</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="Презентация губной помады" height="240"></a><br>
      <strong>Презентация губной помады</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">Смотреть видео</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">Промпт и порядок работы</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="Влог о летнем путешествии" height="240"></a><br>
      <strong>Влог о летнем путешествии</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">Смотреть видео</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">Промпт и порядок работы</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="Влог об утренних привычках" height="240"></a><br>
      <strong>Влог об утренних привычках</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">Смотреть видео</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">Промпт и порядок работы</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="Реклама ухода за кожей от автора контента" height="240"></a><br>
      <strong>Реклама ухода за кожей от автора контента</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">Смотреть видео</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">Промпт и порядок работы</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="Демонстрация бутылки" height="240"></a><br>
      <strong>Демонстрация бутылки</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">Смотреть видео</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">Промпт и порядок работы</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="Реклама уличной одежды" height="240"></a><br>
      <strong>Реклама уличной одежды</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">Смотреть видео</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">Промпт и порядок работы</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="Кинематографическая сцена спасения" height="240"></a><br>
      <strong>Кинематографическая сцена спасения</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">Смотреть видео</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">Промпт и порядок работы</a>
    </td>
  </tr>
</table>

Это существующие примеры из AITryOn, UGCMaker и Heydream, а не новые видео, созданные этим навыком. Обложки служат превью и не являются подтверждёнными исходными изображениями. Каждый материал содержит ссылки на источники и раскрывающиеся исходные промпты; адаптированные промпты отмечены отдельно. См. [происхождение примеров и образцы оформления](scenarios/index.md#about-the-examples).

## Выбор модели

Модель, которую вы указали явно, имеет наивысший приоритет. В остальных случаях агент предпочитает Seedance, затем Wan, выбирая последнюю доступную версию, которая соответствует вашим входным данным, требованиям к возможностям и бюджету. Если ни одно из этих семейств не подходит, агент сравнивает другие доступные модели. После ошибки он не переключает модель автоматически и не отправляет ещё одну платную задачу.

## Требования

- Агент с поддержкой навыков `SKILL.md`, способный читать веб-страницы, запускать Python и обращаться к локальным файлам. Инструмент браузера помогает работать с динамическими страницами и страницами, требующими входа.
- Python 3.10 или новее с пакетами из [requirements.txt](requirements.txt).
- Сетевой доступ к сайту и API Flaq, а также к возвращаемым URL видео.
- Учётная запись Flaq и Client Key с разрешениями и доступным балансом, необходимыми для выбранной модели.
- Для сохранения учётных данных: Связка ключей macOS, Диспетчер учётных данных Windows или запущенная и разблокированная служба Linux Secret Service.

## Установка навыка

Скопируйте весь каталог `flaq-video-skill` в каталог навыков, поддерживаемый вашим агентом. Используйте расположение навыков на уровне проекта или пользователя, указанное в документации агента; путь зависит от приложения. Сохраните имя каталога и его внутреннюю структуру, включая `scripts`, `references`, `scenarios`, `templates` и `requirements.txt`. Скопировать только `SKILL.md` недостаточно.

Обновите или перезагрузите навыки в соответствии с требованиями агента. Убедитесь, что он находит `flaq-video-skill` и может открыть файлы по относительным путям из [SKILL.md](SKILL.md).

Откройте терминал в установленном каталоге `flaq-video-skill`. Установите зависимости в выбранном окружении Python:

```sh
python3 -m pip install -r requirements.txt
```

В Windows используйте `py -3` вместо `python3`. Если вы используете виртуальное окружение, убедитесь, что агент запускает скрипты тем же интерпретатором. Ни навык, ни его скрипты не устанавливают зависимости автоматически.

## Однократная настройка ключа

Создайте или скопируйте Client Key на странице управления API в Flaq, затем выполните эти команды в своём терминале:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Вставьте ключ в поле скрытого ввода. Не указывайте его в сообщении чата, аргументе команды или JSON-файле запроса.

Ключ сохраняется в системном хранилище учётных данных для текущего устройства и учётной записи ОС. Последующие запросы считывают его автоматически, в том числе после закрытия терминала или перезапуска устройства. Операционная система может запросить разрешение на доступ или разблокировку хранилища учётных данных. На другом устройстве настройте ключ заново.

Повторно выполните `set`, чтобы заменить сохранённый ключ. Чтобы удалить его:

```sh
python3 scripts/credentials.py clear
```

В существующих средах автоматизации `FLAQ_CLIENT_KEY` имеет приоритет над сохранёнными учётными данными. Скрипты не загружают файлы `.env` автоматически, а `clear` не удаляет переменные окружения. `status` проверяет локальную конфигурацию; он не проверяет действительность ключа на сервере или ваш баланс.

Подробности о хранении и требованиях платформ приведены в разделе [Использование скриптов](references/scripts.md#environment-and-first-time-setup).

## Использование с агентом

Попросите агента использовать Flaq Video Skill и опишите желаемый результат. Например:

> Используй Flaq Video Skill, чтобы порекомендовать модель для горизонтального видео длительностью 8 секунд о тихой гавани на рассвете. Сравни подходящие варианты и оцени стоимость перед генерацией.

> Используй Flaq Video Skill с последней доступной моделью Seedance, чтобы оживить прикреплённое изображение. Нужны плавное приближение камеры, вертикальный кадр и отсутствие звука. Сначала проверь поддерживаемые параметры и цену.

> Используй Flaq Video Skill, чтобы проверить мою существующую задачу по ID и скачать видео, если оно готово. Не создавай новую задачу.

### Демонстрация образа

> Используй Flaq Video Skill, чтобы превратить моё готовое изображение с виртуальной примеркой в демонстрацию образа. Сохрани внешность человека и одежду, добавь плавный поворот и небольшой шаг вперёд. Проверь длительность и стоимость перед генерацией.

Прочитайте [руководство по демонстрации образов](scenarios/virtual-try-on.md). Исходное изображение должно показывать человека, уже одетого в нужный наряд.

### UGC-реклама

> Используй Flaq Video Skill, чтобы создать вертикальную UGC-рекламу из изображения моего продукта. Начни с детали продукта, покажи его в использовании и заверши чётким кадром продукта. Используй предоставленные мной преимущества и сначала проверь поддержку звука и стоимость.

В [руководстве по UGC-рекламе](scenarios/ugc-ads.md) приведены примеры уличной моды и показа образов с исходными промптами.

### Демонстрация продукта

> Используй Flaq Video Skill, чтобы оживить эту фотографию человека с бутылкой. Пусть он сделает глоток и покажет бутылку в камеру. Сохрани её форму и этикетку. Сначала проверь поддерживаемые параметры и стоимость.

В [руководстве по продуктам](scenarios/product-showcase.md) приведены примеры с бутылкой и губной помадой. Для оживления других сцен используйте [руководство по созданию видео из изображения](scenarios/image-to-video.md).

Вы можете указать модель, дать ссылку на её страницу в Flaq или позволить агенту следовать приоритету по умолчанию. Агент читает подробную документацию выбранной модели перед подготовкой запроса. После вашего разрешения на генерацию с согласованными параметрами и пределами стоимости он отправляет задачу и сохраняет её ID для отслеживания.

## Проверка доступа к сайту без ключа

В каталоге навыка:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

Команда читает публичную страницу без учётных данных и платного вызова API. Скрипт извлекает ссылки на модели и документацию, текст страницы, примеры кода и публичные спецификации моделей, если они есть. Агент следует реальным ссылкам на страницы моделей и документацию, а не угадывает URL.

## Файлы и дополнительные материалы

| Файл или каталог | Назначение |
| --- | --- |
| [SKILL.md](SKILL.md) | Инструкции для агента, приоритет моделей и полный порядок работы |
| [references/scripts.md](references/scripts.md) | Точные команды настройки, запросов, опроса статуса, загрузки и скачивания |
| [references/model-discovery.md](references/model-discovery.md) | Чтение спецификаций и сопоставление с подробной документацией |
| [scenarios/index.md](scenarios/index.md) | Выбор сценария, требования к входным данным, порядок работы, промпты и галереи исходных видео |
| `scripts/credentials.py` | Настройка, проверка и удаление локальных учётных данных |
| `scripts/read_page.py` | Извлечение информации из публичных страниц Flaq |
| `scripts/video_request.py` | Отправка, проверка и ожидание видеозадач, скачивание результатов |
| `templates/` | Универсальные шаблоны запросов и локальных файлов для заполнения по актуальной документации |
| `tests/` | Проверки поведения без сети с изолированными тестовыми входными данными |

Шаблоны запросов — это начальные структуры, а не готовые к отправке примеры. Не меняйте шаблоны; готовьте каждый запрос в своём рабочем каталоге. Поддерживаемые поля и форматы загрузки зависят от актуальной документации выбранной модели.

## Устранение неполадок

| Проблема | Что проверить |
| --- | --- |
| Агент не находит навык | Проверьте расположение навыков в приложении, скопируйте всю папку и обновите поиск навыков. |
| Отсутствует зависимость | Установите `requirements.txt` тем же интерпретатором Python, который использует агент. |
| Хранилище учётных данных недоступно | Проверьте системный доступ и разблокируйте хранилище. В Linux убедитесь, что Secret Service работает в текущем сеансе пользователя. Скрипты не переходят к хранению в открытом тексте. |
| `status` завершается успешно, но генерация не работает | Локальная конфигурация не подтверждает доступ к серверу. Проверьте разрешения ключа, баланс, доступность модели и параметры запроса. |
| Сохранённый ключ удалён, но запросы всё ещё проходят аутентификацию | Проверьте, не задана ли по-прежнему `FLAQ_CLIENT_KEY` в окружении агента. |
| Данные модели или документация неполные | Перейдите по реальной ссылке на документацию, увеличьте лимит текста, если он обрезан, или используйте браузер агента для динамического содержимого. Не угадывайте отсутствующие параметры. |
| Истекло время ожидания | Сохраните ID задачи и проверьте её снова. Локальный тайм-аут ожидания не означает, что генерация на сервере завершилась ошибкой или была отменена. |
| Отправка завершается сетевой ошибкой | Перед повторной отправкой проверьте, создала ли Flaq задачу, чтобы избежать повторного списания. |
| Скачивание не удалось | Сохраните URL результата, проверьте выходной каталог и имя файла, изучите сообщение об ошибке. Существующие файлы никогда не перезаписываются. |

## Проверки для разработки

Выполните в каталоге навыка:

```sh
python3 -m unittest discover -s tests -v
```

Эти тесты не используют реальные системные учётные данные и не отправляют платные задачи. Они проверяют извлечение данных страниц, доступ к учётным данным, обработку запросов и защиту файлов. Они не заменяют реальные проверки хранилища учётных данных в каждой ОС или разрешённый сквозной тест генерации.
