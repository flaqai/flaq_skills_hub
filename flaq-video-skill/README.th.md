# Flaq Video Skill

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português do Brasil](README.pt-BR.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [Bahasa Indonesia](README.id.md) · [Italiano](README.it.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md)

ใช้เอเจนต์ AI เพื่อสร้าง แก้ไข และเพิ่มความละเอียดวิดีโอผ่าน [Flaq AI](https://flaq.ai/) สกิลนี้จะแนะนำเอเจนต์ตั้งแต่การค้นหาโมเดล การอ่านเอกสาร API ล่าสุด การส่งคำขอพร้อมการยืนยันตัวตน การตรวจสอบสถานะงานเป็นระยะ ไปจนถึงการส่งมอบวิดีโอ

เอเจนต์อ่านความสามารถและราคาของโมเดลจาก[ตลาดโมเดล](https://flaq.ai/model-market/) หน้ารายละเอียดโมเดล และ[เอกสารทางการ](https://flaq.ai/docs/) โดยไม่ได้กำหนดเวอร์ชันโมเดลหรือข้อจำกัดพารามิเตอร์แบบตายตัวไว้ในสกิล สคริปต์ Python ที่ให้มาจัดการการดึงข้อมูลหน้าเว็บ ข้อมูลยืนยันตัวตนในเครื่อง คำขอ และการดาวน์โหลด ไม่จำเป็นต้องใช้ Flaq CLI หรือเซิร์ฟเวอร์ในเครื่อง

## วิดีโอจากชุมชน X

สำรวจตัวอย่าง 12 รายการที่รวบรวมไว้ใน [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5) เปิดกรณีตัวอย่างเพื่ออ่านคำอธิบาย เปิดโพสต์ต้นฉบับบน X เพื่อดูพรอมต์ของผู้สร้าง หรือเปิด MP4 เพื่อรับชม การระบุโมเดลยึดตามโพสต์ต้นฉบับ ตัวอย่างเหล่านี้เป็นข้อมูลอ้างอิงจากชุมชน ไม่ใช่วิดีโอที่สร้างด้วยสกิลนี้

 ตัวอย่าง | การใช้งาน | โพสต์ต้นฉบับและพรอมต์ | วิดีโอ |
| --- | --- | --- | --- |
| [X01 · คอเมดีอาหาร](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy)  แอนิเมชัน | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [ดู MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · แฟชั่นและการแต่งตัว](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion)  แฟชั่น | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [ดู MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · ลูกแมวเซลฟี](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [ดู MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · แอนิเมชันบนถนน](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [ดู MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · ช่วงเวลาแบบ MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday)  ไลฟ์สไตล์ | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [ดู MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · วล็อกสองคน](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog)  บทสนทนา | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [ดู MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · เซอร์ไพรส์บนเวที](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal)  การแสดง | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [ดู MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · ASMR ดอกไม้](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial)  บทสอน | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [ดู MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · วิชวลเอฟเฟกต์แอ็กชัน](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography)  แอ็กชัน | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [ดู MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · บันทึกการเดินทาง](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc)  การท่องเที่ยว | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [ดู MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · เรื่องราวแห่งน้ำใจ](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover)  การเล่าเรื่อง | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [ดู MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · บรรยากาศเสียงเขตร้อน](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound)  เสียง | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [ดู MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[ดูหมายเหตุแหล่งที่มาและพรอมต์ที่ปรับใช้](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix) เมื่อต้องการสร้างวิดีโอ ให้ทำตามลำดับความสำคัญของโมเดลในสกิลและตรวจสอบเอกสาร Flaq ล่าสุด

## แรงบันดาลใจวิดีโอไร้ขีดจำกัด

ดู[คลังสถานการณ์ใช้งาน](scenarios/index.md) เพื่อดูข้อมูลนำเข้า แนวทางการทำงาน พรอมต์ต้นฉบับ และตัวอย่างวิดีโอ คลิกภาพปกเพื่อรับชมวิดีโอต้นทาง

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="โชว์ชุดในชีวิตประจำวัน" height="240"></a><br>
      <strong>โชว์ชุดในชีวิตประจำวัน</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">ดูวิดีโอ</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="เผยลุคแฟชั่น" height="240"></a><br>
      <strong>เผยลุคแฟชั่น</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">ดูวิดีโอ</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="โชว์ชุด" height="240"></a><br>
      <strong>โชว์ชุด</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">ดูวิดีโอ</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="นำเสนอลิปสติก" height="240"></a><br>
      <strong>นำเสนอลิปสติก</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">ดูวิดีโอ</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="วล็อกท่องเที่ยวฤดูร้อน" height="240"></a><br>
      <strong>วล็อกท่องเที่ยวฤดูร้อน</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">ดูวิดีโอ</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="วล็อกกิจวัตรยามเช้า" height="240"></a><br>
      <strong>วล็อกกิจวัตรยามเช้า</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">ดูวิดีโอ</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="โฆษณาสกินแคร์สไตล์ครีเอเตอร์" height="240"></a><br>
      <strong>โฆษณาสกินแคร์สไตล์ครีเอเตอร์</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">ดูวิดีโอ</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="สาธิตสินค้าประเภทขวด" height="240"></a><br>
      <strong>สาธิตสินค้าประเภทขวด</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">ดูวิดีโอ</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="โฆษณาสินค้าสตรีตแฟชั่น" height="240"></a><br>
      <strong>โฆษณาสินค้าสตรีตแฟชั่น</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">ดูวิดีโอ</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="ฉากช่วยเหลือสไตล์ภาพยนตร์" height="240"></a><br>
      <strong>ฉากช่วยเหลือสไตล์ภาพยนตร์</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">ดูวิดีโอ</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">พรอมต์และขั้นตอนการทำงาน</a>
    </td>
  </tr>
</table>

ตัวอย่างเหล่านี้เป็นผลงานที่มีอยู่แล้วจาก AITryOn, UGCMaker และ Heydream ไม่ใช่ผลงานใหม่ที่สร้างด้วยสกิลนี้ ภาพปกใช้เพื่อแสดงตัวอย่างและยังไม่ได้ยืนยันว่าเป็นข้อมูลนำเข้าต้นฉบับ คู่มือแต่ละฉบับมีลิงก์แหล่งที่มาและพรอมต์ต้นฉบับที่กดขยายได้ ส่วนพรอมต์ที่ปรับใช้จะมีป้ายกำกับแยกไว้ ดู[ที่มาของตัวอย่างและแหล่งอ้างอิงรูปแบบการจัดวาง](scenarios/index.md#about-the-examples)

## การเลือกโมเดล

โมเดลที่คุณระบุอย่างชัดเจนมีความสำคัญสูงสุด หากไม่ได้ระบุ เอเจนต์จะเลือก Seedance ก่อน แล้วจึง Wan โดยใช้เวอร์ชันล่าสุดที่พร้อมใช้งานและตรงตามข้อกำหนดด้านข้อมูลนำเข้า ความสามารถ และงบประมาณ หากทั้งสองตระกูลไม่เหมาะสม จึงเปรียบเทียบโมเดลอื่นที่ใช้ได้ เมื่อเกิดความล้มเหลว เอเจนต์จะไม่เปลี่ยนโมเดลและส่งงานที่มีค่าใช้จ่ายใหม่โดยอัตโนมัติ

## ข้อกำหนด

- เอเจนต์ที่รองรับสกิล `SKILL.md` และสามารถอ่านหน้าเว็บ เรียกใช้ Python และเข้าถึงไฟล์ในเครื่องได้ เครื่องมือเบราว์เซอร์ช่วยจัดการหน้าที่มีเนื้อหาแบบไดนามิกหรือจำเป็นต้องเข้าสู่ระบบ
- Python 3.10 ขึ้นไป พร้อมแพ็กเกจใน [requirements.txt](requirements.txt)
- การเชื่อมต่อเครือข่ายที่เข้าถึงเว็บไซต์และ API ของ Flaq รวมถึง URL วิดีโอที่ส่งกลับมาได้
- บัญชี Flaq และ Client Key ที่มีสิทธิ์และยอดคงเหลือเพียงพอสำหรับโมเดลที่เลือก
- หากต้องการบันทึกข้อมูลยืนยันตัวตน: macOS Keychain, Windows Credential Manager หรือ Linux Secret Service ที่กำลังทำงานและปลดล็อกแล้ว

## ติดตั้งสกิล

คัดลอกไดเรกทอรี `flaq-video-skill` ทั้งหมดไปยังไดเรกทอรีสกิลที่เอเจนต์รองรับ ใช้ตำแหน่งสกิลระดับโปรเจกต์หรือระดับผู้ใช้ตามเอกสารของเอเจนต์ โดยตำแหน่งขึ้นอยู่กับระบบโฮสต์ คงชื่อไดเรกทอรีและโครงสร้างภายในไว้ทั้งหมด รวมถึง `scripts`, `references`, `scenarios`, `templates` และ `requirements.txt` การคัดลอกเฉพาะ `SKILL.md` ไม่เพียงพอ

รีเฟรชหรือโหลดสกิลใหม่ตามที่เอเจนต์กำหนด ตรวจสอบว่าเอเจนต์ค้นพบ `flaq-video-skill` และเข้าถึงไฟล์ที่ [SKILL.md](SKILL.md) อ้างอิงด้วยพาธสัมพัทธ์ได้

เปิดเทอร์มินัลในไดเรกทอรี `flaq-video-skill` ที่ติดตั้งไว้ แล้วติดตั้งแพ็กเกจที่จำเป็นในสภาพแวดล้อม Python ที่เลือก:

```sh
python3 -m pip install -r requirements.txt
```

บน Windows ให้ใช้ `py -3` แทน `python3` หากใช้สภาพแวดล้อมเสมือน ตรวจสอบว่าเอเจนต์เรียกใช้สคริปต์ด้วยตัวแปลภาษาเดียวกัน ทั้งสกิลและสคริปต์จะไม่ติดตั้งแพ็กเกจที่จำเป็นโดยอัตโนมัติ

## ตั้งค่า Key เพียงครั้งเดียว

สร้างหรือคัดลอก Client Key จากหน้าจัดการ API ของ Flaq แล้วเรียกใช้คำสั่งต่อไปนี้ในเทอร์มินัลของคุณเอง:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

วาง Key ในช่องรับค่าที่ซ่อนข้อความ ห้ามใส่ Key ในข้อความแชต อาร์กิวเมนต์คำสั่ง หรือไฟล์ JSON ของคำขอ

Key จะถูกบันทึกในที่เก็บข้อมูลยืนยันตัวตนของระบบสำหรับอุปกรณ์และบัญชี OS ปัจจุบัน คำขอครั้งต่อไปจะอ่าน Key โดยอัตโนมัติ แม้จะปิดเทอร์มินัลหรือรีสตาร์ตอุปกรณ์แล้วก็ตาม ระบบปฏิบัติการอาจขอให้คุณอนุญาตการเข้าถึงหรือปลดล็อกที่เก็บข้อมูลยืนยันตัวตน หากเปลี่ยนอุปกรณ์ต้องตั้งค่า Key ใหม่

เรียกใช้ `set` อีกครั้งเพื่อเปลี่ยน Key ที่บันทึกไว้ หากต้องการลบ:

```sh
python3 scripts/credentials.py clear
```

สำหรับสภาพแวดล้อมอัตโนมัติที่มีอยู่แล้ว `FLAQ_CLIENT_KEY` จะมีลำดับความสำคัญสูงกว่าข้อมูลยืนยันตัวตนที่บันทึกไว้ สคริปต์จะไม่โหลดไฟล์ `.env` โดยอัตโนมัติ และ `clear` จะไม่ลบตัวแปรสภาพแวดล้อม ส่วน `status` ตรวจสอบเฉพาะการตั้งค่าในเครื่อง ไม่ได้ตรวจสอบความถูกต้องของ Key ผ่านระบบระยะไกลหรือดูยอดคงเหลือ

ดูรายละเอียดการจัดเก็บและข้อกำหนดของแต่ละแพลตฟอร์มได้ที่[วิธีใช้สคริปต์](references/scripts.md#environment-and-first-time-setup)

## ใช้งานกับเอเจนต์

บอกให้เอเจนต์ใช้ Flaq Video Skill และอธิบายผลลัพธ์ที่ต้องการ ตัวอย่างเช่น:

> ใช้ Flaq Video Skill แนะนำโมเดลสำหรับวิดีโอแนวนอนความยาว 8 วินาทีของท่าเรืออันเงียบสงบยามพระอาทิตย์ขึ้น เปรียบเทียบตัวเลือกที่เหมาะสมและประเมินค่าใช้จ่ายก่อนสร้าง

> ใช้ Flaq Video Skill กับโมเดล Seedance เวอร์ชันล่าสุดที่พร้อมใช้งานเพื่อทำให้ภาพที่แนบมาเคลื่อนไหว ต้องการให้กล้องเคลื่อนเข้าอย่างนุ่มนวล เป็นแนวตั้ง และไม่มีเสียง ตรวจสอบตัวเลือกที่รองรับและราคาก่อน

> ใช้ Flaq Video Skill ตรวจสอบ ID งานที่มีอยู่ของฉัน และดาวน์โหลดวิดีโอหากพร้อมแล้ว อย่าสร้างงานใหม่

### โชว์ชุด

> ใช้ Flaq Video Skill เปลี่ยนภาพลองเสื้อผ้าที่เสร็จแล้วของฉันให้เป็นวิดีโอโชว์ชุด รักษาบุคคลและเสื้อผ้าให้เหมือนเดิม ให้หมุนตัวเบา ๆ และก้าวไปข้างหน้าเล็กน้อย ตรวจสอบระยะเวลาและค่าใช้จ่ายก่อนสร้าง

อ่าน[คู่มือโชว์ชุด](scenarios/virtual-try-on.md) โดยเริ่มจากภาพบุคคลที่สวมชุดนั้นอยู่แล้ว

### โฆษณา UGC

> ใช้ Flaq Video Skill สร้างโฆษณา UGC แนวตั้งจากภาพสินค้าของฉัน เริ่มด้วยรายละเอียดสินค้า แสดงการใช้งาน แล้วปิดท้ายด้วยภาพสินค้าที่ชัดเจน ใช้จุดขายที่ฉันให้มา และตรวจสอบการรองรับเสียงกับค่าใช้จ่ายก่อน

อ่าน[คู่มือโฆษณา UGC](scenarios/ugc-ads.md) เพื่อดูตัวอย่างสตรีตแฟชั่นและการเผยลุคเสื้อผ้าพร้อมพรอมต์ต้นฉบับ

### สาธิตสินค้า

> ใช้ Flaq Video Skill ทำให้ภาพคนถือขวดนี้เคลื่อนไหว ให้คนในภาพจิบเครื่องดื่มแล้วนำเสนอขวดต่อกล้อง รักษารูปทรงและฉลากของขวดไว้ ตรวจสอบตัวเลือกที่รองรับและค่าใช้จ่ายก่อน

อ่าน[คู่มือสินค้า](scenarios/product-showcase.md) เพื่อดูตัวอย่างขวดและลิปสติก หากต้องการทำให้ฉากทั่วไปเคลื่อนไหว ให้ใช้[คู่มือภาพเป็นวิดีโอ](scenarios/image-to-video.md)

คุณสามารถระบุโมเดล ส่งลิงก์หน้ารายละเอียดบน Flaq หรือให้เอเจนต์เลือกตามลำดับความสำคัญเริ่มต้นได้ เอเจนต์จะอ่านเอกสารโดยละเอียดของโมเดลที่เลือกก่อนเตรียมคำขอ เมื่อกำหนดตัวเลือกที่จำเป็นและขอบเขตค่าใช้จ่ายแล้ว และคุณอนุญาตให้สร้าง เอเจนต์จะส่งงานและบันทึก ID งานไว้เพื่อติดตามต่อ

## ตรวจสอบการเข้าถึงเว็บไซต์โดยไม่ใช้ Key

เรียกใช้จากไดเรกทอรีสกิล:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

คำสั่งนี้อ่านหน้าสาธารณะโดยไม่ใช้ข้อมูลยืนยันตัวตนหรือเรียก API ที่มีค่าใช้จ่าย สคริปต์จะดึงลิงก์โมเดล ลิงก์เอกสาร ข้อความบนหน้า ตัวอย่างโค้ด และข้อมูลจำเพาะโมเดลที่เปิดเผยต่อสาธารณะหากมี เอเจนต์จะใช้ลิงก์หน้ารายละเอียดและเอกสารจริงแทนการเดา URL

## ไฟล์และเอกสารเพิ่มเติม

 ไฟล์หรือไดเรกทอรี | วัตถุประสงค์ |
| --- | --- |
| [SKILL.md](SKILL.md) | คำแนะนำสำหรับเอเจนต์ ลำดับความสำคัญของโมเดล และขั้นตอนการทำงานตั้งแต่ต้นจนจบ |
| [references/scripts.md](references/scripts.md) | คำสั่งที่ชัดเจนสำหรับการตั้งค่า ส่งคำขอ ตรวจสอบสถานะ อัปโหลด และดาวน์โหลด |
| [references/model-discovery.md](references/model-discovery.md) | การอ่านข้อมูลจำเพาะและตรวจสอบเทียบกับเอกสารโดยละเอียด |
| [scenarios/index.md](scenarios/index.md) | การเลือกสถานการณ์ใช้งาน ข้อกำหนดข้อมูลนำเข้า ขั้นตอนการทำงาน พรอมต์ และแกลเลอรีวิดีโอต้นทาง |
| `scripts/credentials.py` | ตั้งค่า ตรวจสอบ และลบข้อมูลยืนยันตัวตนในเครื่อง |
| `scripts/read_page.py` | ดึงข้อมูลจากหน้าสาธารณะของ Flaq |
| `scripts/video_request.py` | ส่งงาน สอบถามสถานะ รอ และดาวน์โหลดงานวิดีโอ |
| `templates/` | เทมเพลตคำขอทั่วไปและไฟล์ในเครื่องสำหรับกรอกตามเอกสารปัจจุบัน |
| `tests/` | ตรวจสอบพฤติกรรมแบบออฟไลน์ด้วยข้อมูลทดสอบที่แยกไว้ |

เทมเพลตคำขอเป็นโครงสร้างตั้งต้น ไม่ใช่ตัวอย่างที่ส่งได้ทันที คงเทมเพลตเดิมไว้และเตรียมคำขอแต่ละครั้งในไดเรกทอรีทำงานของคุณ ฟิลด์และรูปแบบอัปโหลดที่รองรับขึ้นอยู่กับเอกสารปัจจุบันของโมเดลที่เลือก

## การแก้ไขปัญหา

 ปัญหา | สิ่งที่ควรตรวจสอบ |
| --- | --- |
| เอเจนต์ไม่พบสกิล | ตรวจสอบตำแหน่งสกิลของโฮสต์ คัดลอกทั้งโฟลเดอร์ แล้วรีเฟรชการค้นหาสกิล |
| ขาดแพ็กเกจที่จำเป็น | ติดตั้งแพ็กเกจจาก `requirements.txt` ด้วยตัวแปล Python เดียวกับที่เอเจนต์ใช้ |
| ที่เก็บข้อมูลยืนยันตัวตนใช้งานไม่ได้ | ตรวจสอบสิทธิ์การเข้าถึงระบบและปลดล็อกที่เก็บข้อมูล บน Linux ให้ตรวจสอบว่า Secret Service ทำงานอยู่ในเซสชันผู้ใช้ปัจจุบัน สคริปต์จะไม่เปลี่ยนไปเก็บข้อมูลเป็นข้อความธรรมดา |
| `status` สำเร็จแต่สร้างวิดีโอไม่สำเร็จ | การตั้งค่าในเครื่องไม่ได้ยืนยันว่าเข้าถึงระบบระยะไกลได้ ตรวจสอบสิทธิ์ของ Key ยอดคงเหลือ ความพร้อมใช้งานของโมเดล และพารามิเตอร์คำขอ |
| ลบ Key ที่บันทึกแล้วแต่คำขอยังยืนยันตัวตนได้ | ตรวจสอบว่ายังตั้งค่า `FLAQ_CLIENT_KEY` ในสภาพแวดล้อมของเอเจนต์อยู่หรือไม่ |
| รายละเอียดโมเดลหรือเอกสารไม่ครบถ้วน | ใช้ลิงก์เอกสารจริง เพิ่มขีดจำกัดข้อความหากถูกตัด หรือใช้เบราว์เซอร์ของเอเจนต์สำหรับเนื้อหาแบบไดนามิก อย่าเดาพารามิเตอร์ที่ขาดหายไป |
| การรอหมดเวลา | เก็บ ID งานไว้แล้วสอบถามอีกครั้ง การรอในเครื่องหมดเวลาไม่ได้หมายความว่าการสร้างบนระบบระยะไกลล้มเหลวหรือถูกยกเลิก |
| การส่งงานจบด้วยข้อผิดพลาดเครือข่าย | ตรวจสอบว่า Flaq สร้างงานแล้วหรือไม่ก่อนส่งอีกครั้ง เพื่อหลีกเลี่ยงการคิดค่าบริการซ้ำ |
| ดาวน์โหลดไม่สำเร็จ | เก็บ URL ผลลัพธ์ไว้ ตรวจสอบไดเรกทอรีปลายทางและชื่อไฟล์ รวมถึงข้อผิดพลาดที่รายงาน ไฟล์ที่มีอยู่จะไม่ถูกเขียนทับ |

## การตรวจสอบสำหรับการพัฒนา

เรียกใช้จากไดเรกทอรีสกิล:

```sh
python3 -m unittest discover -s tests -v
```

การทดสอบเหล่านี้ไม่ใช้ข้อมูลยืนยันตัวตนจริงของระบบหรือส่งงานที่มีค่าใช้จ่าย โดยครอบคลุมการดึงข้อมูลหน้าเว็บ พฤติกรรมการเข้าถึงข้อมูลยืนยันตัวตน การจัดการคำขอ และการปกป้องไฟล์ แต่ไม่สามารถทดแทนการตรวจสอบที่เก็บข้อมูลยืนยันตัวตนจริงบนแต่ละระบบปฏิบัติการ หรือการทดสอบสร้างวิดีโอตั้งแต่ต้นจนจบที่ได้รับอนุญาตแล้วได้
