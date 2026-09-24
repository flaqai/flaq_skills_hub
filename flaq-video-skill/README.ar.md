# Flaq Video Skill

أنشئ مقاطع الفيديو وعدّلها وارفع دقتها باستخدام وكيل ذكاء اصطناعي عبر [Flaq AI](https://flaq.ai/). ترشد هذه المهارة وكيلك خلال اكتشاف النماذج، وقراءة وثائق API الحالية، وإرسال الطلبات المصادق عليها، والاستعلام الدوري عن المهام، وتسليم الفيديو.

يقرأ الوكيل قدرات النماذج وأسعارها من [سوق النماذج](https://flaq.ai/model-market/)، وصفحات تفاصيل النماذج، و[الوثائق الرسمية](https://flaq.ai/docs/). لا تُثبَّت إصدارات النماذج وحدود المعلمات داخل المهارة. تتولى أدوات Python المساعدة المرفقة استخراج محتوى الصفحات، وبيانات الاعتماد المحلية، والطلبات، والتنزيلات. لا حاجة إلى Flaq CLI أو خادم محلي.

## مقاطع فيديو المجتمع من X

استكشف اثني عشر مثالًا جُمعت في [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). افتح المثال للاطلاع على ملاحظاته، أو المنشور الأصلي على X لقراءة الموجّه الذي كتبه المنشئ، أو ملف MP4 للمشاهدة. تُنسَب النماذج بحسب المنشورات الأصلية؛ هذه أمثلة مرجعية من المجتمع وليست مقاطع أنشأتها هذه المهارة.

| المثال | الاستخدام | المنشور الأصلي والموجّه | الفيديو |
| --- | --- | --- | --- |
| [X01 · كوميديا الطعام](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | رسوم متحركة | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · تنسيق الأزياء](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | أزياء | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · سيلفي لقطة صغيرة](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · رسوم متحركة في الشارع](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · لحظات MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | نمط الحياة | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · مدونة فيديو لشخصين](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | حوار | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · مفاجأة على المسرح](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | أداء | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · ASMR مع الزهور](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | شرح تعليمي | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · مؤثرات بصرية لمشاهد الحركة](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | حركة | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · يوميات سفر](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | سفر | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · قصة عن اللطف](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | سرد قصصي | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · مشهد صوتي استوائي](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | صوت | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [مشاهدة MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[تصفّح ملاحظات المصادر والموجّهات المعدّلة](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). عند إنشاء الفيديو، اتبع ترتيب أولوية النماذج في المهارة وتحقق من وثائق Flaq الحالية.

## إلهام بلا حدود للفيديو

تصفّح [مكتبة السيناريوهات](scenarios/index.md) للاطلاع على المدخلات، وإرشادات سير العمل، والموجّهات الأصلية، وأمثلة الفيديو. انقر على صورة الغلاف لمشاهدة الفيديو الأصلي.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="عرض إطلالة يومية" height="240"></a><br>
      <strong>عرض إطلالة يومية</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">مشاهدة الفيديو</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">الموجّه وسير العمل</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="الكشف عن إطلالة عصرية" height="240"></a><br>
      <strong>الكشف عن إطلالة عصرية</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">مشاهدة الفيديو</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">الموجّه وسير العمل</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="عرض إطلالة" height="240"></a><br>
      <strong>عرض إطلالة</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">مشاهدة الفيديو</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">الموجّه وسير العمل</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="عرض أحمر الشفاه" height="240"></a><br>
      <strong>عرض أحمر الشفاه</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">مشاهدة الفيديو</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">الموجّه وسير العمل</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="مدونة فيديو لرحلة صيفية" height="240"></a><br>
      <strong>مدونة فيديو لرحلة صيفية</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">مشاهدة الفيديو</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">الموجّه وسير العمل</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="مدونة فيديو للروتين الصباحي" height="240"></a><br>
      <strong>مدونة فيديو للروتين الصباحي</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">مشاهدة الفيديو</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">الموجّه وسير العمل</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="إعلان عناية بالبشرة من صانعة محتوى" height="240"></a><br>
      <strong>إعلان عناية بالبشرة من صانعة محتوى</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">مشاهدة الفيديو</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">الموجّه وسير العمل</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="عرض توضيحي لزجاجة" height="240"></a><br>
      <strong>عرض توضيحي لزجاجة</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">مشاهدة الفيديو</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">الموجّه وسير العمل</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="إعلان لمنتج من أزياء الشارع" height="240"></a><br>
      <strong>إعلان لمنتج من أزياء الشارع</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">مشاهدة الفيديو</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">الموجّه وسير العمل</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="مشهد إنقاذ سينمائي" height="240"></a><br>
      <strong>مشهد إنقاذ سينمائي</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">مشاهدة الفيديو</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">الموجّه وسير العمل</a>
    </td>
  </tr>
</table>

هذه أمثلة موجودة مسبقًا من AITryOn وUGCMaker وHeydream، وليست مقاطع جديدة أُنشئت باستخدام هذه المهارة. صور الأغلفة معاينات وليست مدخلات أصلية جرى التحقق منها. يتضمن كل دليل روابط المصادر وموجّهات أصلية قابلة للتوسيع؛ وتُميَّز الموجّهات المعدّلة بصورة منفصلة. انظر [مصادر الأمثلة ومراجع التنسيق](scenarios/index.md#about-the-examples).

## اختيار النموذج

تكون الأولوية للنموذج الذي تحدده صراحةً. بخلاف ذلك، يفضّل الوكيل Seedance ثم Wan، ويختار أحدث إصدار متاح يلبي متطلباتك من المدخلات والقدرات والميزانية. ويقارن النماذج الأخرى المتاحة عندما لا تناسبك أي من العائلتين. ولا يبدّل النماذج تلقائيًا أو يرسل مهمة مدفوعة أخرى بعد حدوث فشل.

## المتطلبات

- وكيل يدعم مهارات `SKILL.md` ويمكنه قراءة صفحات الويب، وتشغيل Python، والوصول إلى الملفات المحلية. تساعد أداة المتصفح في التعامل مع الصفحات الديناميكية أو التي تتطلب تسجيل الدخول.
- Python 3.10 أو أحدث، مع الحزم الموجودة في [requirements.txt](requirements.txt).
- اتصال بالشبكة للوصول إلى موقع Flaq وواجهة API، وإلى روابط الفيديو التي تعيدها الخدمة.
- حساب Flaq ومفتاح Client Key بالصلاحيات والرصيد المتاح اللازمين للنموذج الذي تختاره.
- لحفظ بيانات الاعتماد: سلسلة مفاتيح macOS، أو مدير بيانات الاعتماد في Windows، أو خدمة Linux Secret Service تعمل ومفتوحة القفل.

## تثبيت المهارة

انسخ مجلد `flaq-video-skill` بأكمله إلى مجلد المهارات الذي يدعمه وكيلك. استخدم موقع المهارات على مستوى المشروع أو المستخدم وفقًا لوثائق وكيلك؛ إذ يختلف الموقع بحسب التطبيق المضيف. احتفظ باسم المجلد وبنيته الداخلية كما هما، بما في ذلك `scripts` و`references` و`scenarios` و`templates` و`requirements.txt`. لا يكفي نسخ `SKILL.md` وحده.

حدّث المهارات أو أعد تحميلها وفقًا لمتطلبات وكيلك. تأكد من أنه يستطيع العثور على `flaq-video-skill` والوصول إلى الملفات ذات المسارات النسبية المشار إليها في [SKILL.md](SKILL.md).

افتح الطرفية داخل مجلد `flaq-video-skill` المثبّت. ثبّت الاعتماديات في بيئة Python التي تختارها:

```sh
python3 -m pip install -r requirements.txt
```

في Windows، استخدم `py -3` بدلًا من `python3`. إذا كنت تستخدم بيئة افتراضية، فتأكد من أن وكيلك يشغّل السكربتات باستخدام المفسّر نفسه. لا تثبّت المهارة ولا سكربتاتها الاعتماديات تلقائيًا.

## إعداد المفتاح مرة واحدة

أنشئ مفتاح Client Key أو انسخه من صفحة إدارة API في Flaq، ثم شغّل هذه الأوامر في الطرفية لديك:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

الصق المفتاح في مطالبة الإدخال المخفي. لا تضعه في رسالة محادثة، أو وسيطة أمر، أو ملف JSON للطلب.

يُحفَظ المفتاح في مخزن بيانات اعتماد النظام للجهاز الحالي وحساب نظام التشغيل الحالي. تقرؤه الطلبات اللاحقة تلقائيًا، حتى بعد إغلاق الطرفية أو إعادة تشغيل الجهاز. قد يطلب منك نظام التشغيل السماح بالوصول أو فتح قفل مخزن بيانات الاعتماد. أعد إعداد المفتاح عند الانتقال إلى جهاز آخر.

شغّل `set` مرة أخرى لاستبدال المفتاح المحفوظ. لإزالته:

```sh
python3 scripts/credentials.py clear
```

في بيئات الأتمتة الموجودة، تكون الأولوية لـ `FLAQ_CLIENT_KEY` على بيانات الاعتماد المحفوظة. لا تحمّل السكربتات ملفات `.env` تلقائيًا، ولا يزيل `clear` متغيرات البيئة. يفحص `status` الإعداد المحلي؛ ولا يتحقق من صلاحية المفتاح عن بُعد أو يفحص رصيدك.

راجع [استخدام السكربتات](references/scripts.md#environment-and-first-time-setup) لتفاصيل التخزين ومتطلبات المنصات.

## الاستخدام مع وكيلك

اطلب من الوكيل استخدام Flaq Video Skill وصف النتيجة التي تريدها. على سبيل المثال:

> استخدم Flaq Video Skill لاقتراح نموذج لفيديو أفقي مدته 8 ثوانٍ لميناء هادئ عند شروق الشمس. قارن الخيارات المناسبة وقدّر التكلفة قبل الإنشاء.

> استخدم Flaq Video Skill مع أحدث نموذج Seedance متاح لتحريك صورتي المرفقة. أريد اقترابًا خفيفًا للكاميرا، وإطارًا رأسيًا، ومن دون صوت. تحقق أولًا من الخيارات المدعومة والسعر.

> استخدم Flaq Video Skill للاستعلام عن معرّف مهمتي الحالية وتنزيل الفيديو إذا كان جاهزًا. لا تنشئ مهمة أخرى.

### عرض إطلالة

> استخدم Flaq Video Skill لتحويل صورة تجربة الملابس المكتملة لدي إلى عرض للإطلالة. حافظ على اتساق الشخص والملابس، مع التفاف خفيف وخطوة صغيرة إلى الأمام. تحقق من المدة والتكلفة قبل الإنشاء.

اقرأ [دليل الإطلالات](scenarios/virtual-try-on.md). تبدأ هذه العملية بصورة شخص يرتدي الإطلالة بالفعل.

### إعلان UGC

> استخدم Flaq Video Skill لإنشاء إعلان UGC رأسي انطلاقًا من صورة منتجي. ابدأ بتفصيل من المنتج، ثم اعرضه أثناء الاستخدام، واختتم بلقطة واضحة له. استخدم نقاط البيع التي قدمتها، وتحقق أولًا من دعم الصوت والتكلفة.

اقرأ [دليل إعلانات UGC](scenarios/ugc-ads.md) للاطلاع على أمثلة لأزياء الشارع والكشف عن الإطلالات، مع الموجّهات الأصلية.

### عرض توضيحي لمنتج

> استخدم Flaq Video Skill لتحريك هذه الصورة لشخص يحمل زجاجة. اجعله يشرب رشفة ثم يعرض الزجاجة أمام الكاميرا. حافظ على شكلها وملصقها. تحقق أولًا من الخيارات المدعومة والتكلفة.

اقرأ [دليل المنتجات](scenarios/product-showcase.md) للاطلاع على أمثلة الزجاجات وأحمر الشفاه. لتحريك المشاهد عمومًا، استخدم [دليل تحويل الصورة إلى فيديو](scenarios/image-to-video.md).

يمكنك تحديد نموذج، أو إرفاق رابط صفحة تفاصيله على Flaq، أو ترك الوكيل يتبع ترتيب الأولوية الافتراضي. يقرأ الوكيل الوثائق التفصيلية للنموذج المحدد قبل إعداد الطلب. بعد أن تأذن بالإنشاء مع تحديد الخيارات اللازمة ونطاق التكلفة، يرسل المهمة ويسجل معرّفها للمتابعة.

## التحقق من الوصول إلى الموقع دون مفتاح

من مجلد المهارة:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

يقرأ هذا الأمر صفحة عامة دون بيانات اعتماد أو استدعاء مدفوع لواجهة API. يستخرج السكربت روابط النماذج، وروابط الوثائق، ونص الصفحة، وأمثلة الشيفرة، والمواصفات العامة للنماذج عند وجودها. يتبع الوكيل الروابط الفعلية لصفحات التفاصيل والوثائق بدلًا من تخمين عناوين URL.

## الملفات وقراءات إضافية

| الملف أو المجلد | الغرض |
| --- | --- |
| [SKILL.md](SKILL.md) | تعليمات الوكيل، وأولوية النماذج، وسير العمل من البداية إلى النهاية |
| [references/scripts.md](references/scripts.md) | الأوامر الدقيقة للإعداد والطلبات والاستعلام الدوري والرفع والتنزيل |
| [references/model-discovery.md](references/model-discovery.md) | قراءة المواصفات ومطابقتها مع الوثائق التفصيلية |
| [scenarios/index.md](scenarios/index.md) | اختيار السيناريو، ومتطلبات المدخلات، وسير العمل، والموجّهات، ومعارض الفيديو الأصلية |
| `scripts/credentials.py` | إعداد بيانات الاعتماد المحلية وفحصها وإزالتها |
| `scripts/read_page.py` | استخراج المعلومات من صفحات Flaq العامة |
| `scripts/video_request.py` | إرسال مهام الفيديو والاستعلام عنها وانتظارها وتنزيل نتائجها |
| `templates/` | قوالب عامة للطلبات والملفات المحلية تُملأ بالاستناد إلى الوثائق الحالية |
| `tests/` | فحوص السلوك دون اتصال باستخدام مدخلات اختبار معزولة |

قوالب الطلبات بُنى أولية وليست أمثلة جاهزة للإرسال. اترك القوالب دون تغيير وأعدّ كل طلب في مجلد عملك. تعتمد الحقول وتنسيقات الرفع المدعومة على الوثائق الحالية للنموذج المحدد.

## استكشاف الأخطاء وإصلاحها

| المشكلة | ما يجب التحقق منه |
| --- | --- |
| لا يستطيع الوكيل العثور على المهارة | تحقق من موقع المهارات في التطبيق المضيف، وانسخ المجلد كاملًا، وحدّث اكتشاف المهارات. |
| إحدى الاعتماديات مفقودة | ثبّت `requirements.txt` باستخدام مفسّر Python نفسه الذي يستخدمه الوكيل. |
| مخزن بيانات الاعتماد غير متاح | تحقق من الوصول إلى النظام وافتح قفل المخزن. في Linux، تأكد من تشغيل Secret Service في جلسة المستخدم الحالية. لا تلجأ السكربتات إلى التخزين بنص صريح. |
| ينجح `status` لكن إنشاء الفيديو يفشل | لا يثبت الإعداد المحلي إمكانية الوصول عن بُعد. تحقق من صلاحيات المفتاح والرصيد وتوفر النموذج ومعلمات الطلب. |
| حُذف مفتاح محفوظ لكن الطلبات ما زالت تُصادَق | تحقق مما إذا كان `FLAQ_CLIENT_KEY` لا يزال مضبوطًا في بيئة الوكيل. |
| تفاصيل النموذج أو الوثائق غير مكتملة | اتبع رابط الوثائق الفعلي، أو زِد حد النص إذا كان المحتوى مبتورًا، أو استخدم متصفح الوكيل للمحتوى الديناميكي. لا تخمّن المعلمات المفقودة. |
| انتهت مهلة الانتظار | احتفظ بمعرّف المهمة واستعلم عنها مجددًا. انتهاء مهلة الانتظار محليًا لا يعني أن الإنشاء عن بُعد فشل أو أُلغي. |
| ينتهي الإرسال بخطأ في الشبكة | تحقق مما إذا كانت Flaq قد أنشأت مهمة قبل إعادة الإرسال لتجنب الرسوم المكررة. |
| يفشل التنزيل | احتفظ برابط النتيجة، وتحقق من مجلد الإخراج واسم الملف، وافحص الخطأ المُبلَّغ عنه. لا تُستبدل الملفات الموجودة مطلقًا. |

## فحوص التطوير

شغّل من مجلد المهارة:

```sh
python3 -m unittest discover -s tests -v
```

لا تستخدم هذه الاختبارات بيانات اعتماد حقيقية للنظام ولا ترسل مهام مدفوعة. وهي تغطي استخراج محتوى الصفحات، وسلوك الوصول إلى بيانات الاعتماد، ومعالجة الطلبات، وحماية الملفات. ولا تحل محل الفحص الفعلي لمخزن بيانات الاعتماد على كل نظام تشغيل أو اختبار إنشاء كامل مصرّح به من البداية إلى النهاية.
