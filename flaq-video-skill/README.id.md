# Flaq Video Skill

Buat, edit, dan tingkatkan resolusi video melalui [Flaq AI](https://flaq.ai/) bersama agen AI. Skill ini memandu agen Anda dalam menemukan model, membaca dokumentasi API terkini, mengirim permintaan terautentikasi, memeriksa status tugas secara berkala, dan menyerahkan video.

Agen membaca kemampuan dan harga model dari [Katalog Model](https://flaq.ai/model-market/), halaman detail model, serta [dokumentasi resmi](https://flaq.ai/docs/). Versi model dan batas parameter tidak ditetapkan secara permanen di dalam skill. Skrip bantuan Python yang disertakan menangani ekstraksi halaman, kredensial lokal, permintaan, dan unduhan. Flaq CLI maupun server lokal tidak diperlukan.

## Video komunitas dari X

Jelajahi dua belas contoh yang dikumpulkan dalam [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). Buka contoh untuk membaca catatannya, postingan asli di X untuk melihat prompt kreator, atau MP4 untuk menonton. Atribusi model mengikuti postingan sumber; ini adalah referensi komunitas, bukan video yang dibuat oleh skill ini.

| Contoh | Kegunaan | Postingan asli & prompt | Video |
| --- | --- | --- | --- |
| [X01 · Komedi makanan](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | Animasi | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [Tonton MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · Penataan busana](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | Busana | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [Tonton MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · Swafoto anak kucing](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [Tonton MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · Animasi jalanan](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [Tonton MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · Momen MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | Gaya hidup | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [Tonton MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · Vlog berdua](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | Dialog | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [Tonton MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · Kejutan panggung](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | Pertunjukan | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [Tonton MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · ASMR bunga](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | Tutorial | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [Tonton MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · Efek visual aksi](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | Aksi | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [Tonton MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · Catatan perjalanan](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | Perjalanan | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [Tonton MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · Kisah kebaikan](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | Penceritaan | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [Tonton MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · Lanskap suara tropis](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | Suara | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [Tonton MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[Lihat catatan sumber dan adaptasi prompt](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). Untuk pembuatan video, ikuti prioritas model skill dan periksa dokumentasi Flaq terkini.

## Inspirasi video tanpa batas

Jelajahi [pustaka skenario](scenarios/index.md) untuk mengetahui masukan, panduan alur kerja, prompt asli, dan contoh video. Klik gambar sampul untuk menonton video sumber.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="Peragaan busana sehari-hari" height="240"></a><br>
      <strong>Peragaan busana sehari-hari</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">Tonton video</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">Prompt &amp; alur kerja</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="Penampilan busana modis" height="240"></a><br>
      <strong>Penampilan busana modis</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">Tonton video</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">Prompt &amp; alur kerja</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="Peragaan busana" height="240"></a><br>
      <strong>Peragaan busana</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">Tonton video</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">Prompt &amp; alur kerja</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="Presentasi lipstik" height="240"></a><br>
      <strong>Presentasi lipstik</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">Tonton video</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">Prompt &amp; alur kerja</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="Vlog perjalanan musim panas" height="240"></a><br>
      <strong>Vlog perjalanan musim panas</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">Tonton video</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">Prompt &amp; alur kerja</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="Vlog rutinitas pagi" height="240"></a><br>
      <strong>Vlog rutinitas pagi</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">Tonton video</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">Prompt &amp; alur kerja</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="Iklan perawatan kulit oleh kreator" height="240"></a><br>
      <strong>Iklan perawatan kulit oleh kreator</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">Tonton video</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">Prompt &amp; alur kerja</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="Demonstrasi botol" height="240"></a><br>
      <strong>Demonstrasi botol</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">Tonton video</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">Prompt &amp; alur kerja</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="Iklan produk busana jalanan" height="240"></a><br>
      <strong>Iklan produk busana jalanan</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">Tonton video</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">Prompt &amp; alur kerja</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="Adegan penyelamatan sinematik" height="240"></a><br>
      <strong>Adegan penyelamatan sinematik</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">Tonton video</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">Prompt &amp; alur kerja</a>
    </td>
  </tr>
</table>

Ini adalah contoh yang sudah ada dari AITryOn, UGCMaker, dan Heydream, bukan hasil baru yang dibuat menggunakan skill ini. Gambar sampul merupakan pratinjau, bukan masukan sumber yang sudah diverifikasi. Setiap panduan menyertakan tautan sumber dan prompt asli yang dapat dibuka; prompt hasil adaptasi diberi label tersendiri. Lihat [asal contoh dan referensi tata letak](scenarios/index.md#about-the-examples).

## Pemilihan model

Model yang Anda tentukan secara eksplisit mendapat prioritas tertinggi. Jika tidak, agen mengutamakan Seedance, lalu Wan, dengan memilih versi terbaru yang tersedia dan memenuhi kebutuhan masukan, kemampuan, serta anggaran Anda. Agen membandingkan model lain yang tersedia jika kedua keluarga model tersebut tidak sesuai. Setelah terjadi kegagalan, agen tidak beralih model secara otomatis dan mengirim tugas berbayar lain.

## Persyaratan

- Agen yang mendukung skill `SKILL.md` dan dapat membaca halaman web, menjalankan Python, serta mengakses berkas lokal. Alat peramban membantu mengakses halaman dinamis atau halaman yang memerlukan login.
- Python 3.10 atau yang lebih baru, beserta paket dalam [requirements.txt](requirements.txt).
- Akses jaringan ke situs web dan API Flaq, serta ke URL video yang dikembalikan.
- Akun Flaq dan Client Key dengan izin serta saldo tersedia yang diperlukan untuk model pilihan Anda.
- Untuk menyimpan kredensial: macOS Keychain, Windows Credential Manager, atau Linux Secret Service yang berjalan dan tidak terkunci.

## Memasang skill

Salin seluruh direktori `flaq-video-skill` ke direktori skill yang didukung agen Anda. Gunakan lokasi skill tingkat proyek atau pengguna yang didokumentasikan oleh agen; lokasinya bergantung pada aplikasi host. Pertahankan nama direktori dan struktur internalnya, termasuk `scripts`, `references`, `scenarios`, `templates`, dan `requirements.txt`. Menyalin `SKILL.md` saja tidak cukup.

Segarkan atau muat ulang skill sesuai kebutuhan agen Anda. Pastikan agen dapat menemukan `flaq-video-skill` dan mengakses berkas dengan jalur relatif yang dirujuk oleh [SKILL.md](SKILL.md).

Buka terminal di direktori `flaq-video-skill` yang telah dipasang. Pasang dependensi di lingkungan Python pilihan Anda:

```sh
python3 -m pip install -r requirements.txt
```

Di Windows, gunakan `py -3` sebagai pengganti `python3`. Jika menggunakan lingkungan virtual, pastikan agen menjalankan skrip dengan interpreter yang sama. Skill maupun skripnya tidak memasang dependensi secara otomatis.

## Konfigurasikan Key sekali saja

Buat atau salin Client Key dari halaman pengelolaan API Flaq, lalu jalankan perintah berikut di terminal Anda sendiri:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Tempelkan Key pada kolom masukan tersembunyi. Jangan menaruhnya dalam pesan obrolan, argumen perintah, atau berkas JSON permintaan.

Key disimpan dalam penyimpanan kredensial sistem untuk perangkat dan akun sistem operasi saat ini. Permintaan berikutnya membacanya secara otomatis, termasuk setelah terminal ditutup atau perangkat dimulai ulang. Sistem operasi mungkin meminta Anda mengizinkan akses atau membuka kunci penyimpanan kredensial. Konfigurasikan Key kembali saat menggunakan perangkat lain.

Jalankan `set` lagi untuk mengganti Key yang tersimpan. Untuk menghapusnya:

```sh
python3 scripts/credentials.py clear
```

Pada lingkungan otomatisasi yang sudah ada, `FLAQ_CLIENT_KEY` diprioritaskan daripada kredensial tersimpan. Skrip tidak memuat berkas `.env` secara otomatis, dan `clear` tidak menghapus variabel lingkungan. `status` memeriksa konfigurasi lokal; perintah ini tidak memvalidasi Key di server atau memeriksa saldo Anda.

Lihat [Penggunaan skrip](references/scripts.md#environment-and-first-time-setup) untuk detail penyimpanan dan persyaratan platform.

## Menggunakan dengan agen Anda

Minta agen menggunakan Flaq Video Skill dan jelaskan hasil yang Anda inginkan. Contohnya:

> Gunakan Flaq Video Skill untuk merekomendasikan model bagi video horizontal berdurasi 8 detik tentang pelabuhan yang tenang saat matahari terbit. Bandingkan pilihan yang sesuai dan perkirakan biayanya sebelum membuat video.

> Gunakan Flaq Video Skill dengan model Seedance terbaru yang tersedia untuk menggerakkan gambar terlampir. Saya ingin kamera mendekat dengan lembut, bingkai vertikal, dan tanpa suara. Periksa pilihan yang didukung serta harganya terlebih dahulu.

> Gunakan Flaq Video Skill untuk memeriksa ID tugas saya yang sudah ada dan mengunduh videonya jika sudah siap. Jangan buat tugas lain.

### Peragaan busana

> Gunakan Flaq Video Skill untuk mengubah gambar hasil coba busana saya yang sudah selesai menjadi video peragaan busana. Pertahankan konsistensi orang dan pakaiannya, dengan putaran lembut serta satu langkah kecil ke depan. Periksa durasi dan biaya sebelum membuat video.

Baca [panduan busana](scenarios/virtual-try-on.md). Alur ini dimulai dari gambar seseorang yang sudah mengenakan busana tersebut.

### Iklan UGC

> Gunakan Flaq Video Skill untuk membuat iklan UGC vertikal dari gambar produk saya. Awali dengan detail produk, tampilkan produk saat digunakan, lalu akhiri dengan gambar produk yang jelas. Gunakan keunggulan produk yang saya berikan dan periksa dukungan audio serta biayanya terlebih dahulu.

Baca [panduan iklan UGC](scenarios/ugc-ads.md) untuk contoh busana jalanan dan penampilan busana beserta prompt aslinya.

### Demonstrasi produk

> Gunakan Flaq Video Skill untuk menggerakkan foto seseorang yang sedang memegang botol ini. Buat orang tersebut meneguk isinya lalu menunjukkan botol ke kamera. Pertahankan bentuk dan label botol. Periksa pilihan yang didukung serta biayanya terlebih dahulu.

Baca [panduan produk](scenarios/product-showcase.md) untuk contoh botol dan lipstik. Untuk animasi adegan secara umum, gunakan [panduan gambar ke video](scenarios/image-to-video.md).

Anda dapat menentukan model, memberikan tautan ke halaman detailnya di Flaq, atau membiarkan agen mengikuti prioritas bawaan. Agen membaca dokumentasi terperinci model yang dipilih sebelum menyiapkan permintaan. Setelah Anda mengizinkan pembuatan video dengan pilihan yang diperlukan dan cakupan biaya yang sudah ditetapkan, agen mengirim tugas dan mencatat ID tugas untuk tindak lanjut.

## Memeriksa akses situs web tanpa Key

Dari direktori skill:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

Perintah ini membaca halaman publik tanpa kredensial atau panggilan API berbayar. Skrip mengekstrak tautan model, tautan dokumentasi, teks halaman, contoh kode, dan spesifikasi publik model jika tersedia. Agen mengikuti tautan halaman detail dan dokumentasi yang sebenarnya, bukan menebak URL.

## Berkas dan bacaan lanjutan

| Berkas atau direktori | Kegunaan |
| --- | --- |
| [SKILL.md](SKILL.md) | Instruksi agen, prioritas model, dan alur kerja dari awal hingga akhir |
| [references/scripts.md](references/scripts.md) | Perintah lengkap untuk penyiapan, permintaan, pemeriksaan berkala, unggahan, dan unduhan |
| [references/model-discovery.md](references/model-discovery.md) | Membaca spesifikasi dan mencocokkannya dengan dokumentasi terperinci |
| [scenarios/index.md](scenarios/index.md) | Pemilihan skenario, persyaratan masukan, alur kerja, prompt, dan galeri video sumber |
| `scripts/credentials.py` | Mengonfigurasi, memeriksa, dan menghapus kredensial lokal |
| `scripts/read_page.py` | Mengekstrak informasi dari halaman publik Flaq |
| `scripts/video_request.py` | Mengirim, memeriksa, menunggu tugas video, dan mengunduh hasilnya |
| `templates/` | Templat permintaan dan berkas lokal umum untuk diisi berdasarkan dokumentasi terkini |
| `tests/` | Pemeriksaan perilaku secara luring menggunakan masukan pengujian terisolasi |

Templat permintaan adalah struktur awal, bukan contoh yang siap dikirim. Biarkan templat tetap utuh dan siapkan setiap permintaan dalam direktori kerja Anda. Kolom dan format unggahan yang didukung bergantung pada dokumentasi terkini model yang dipilih.

## Pemecahan masalah

| Masalah | Hal yang perlu diperiksa |
| --- | --- |
| Agen tidak dapat menemukan skill | Periksa lokasi skill pada aplikasi host, salin seluruh folder, dan segarkan penemuan skill. |
| Ada dependensi yang belum tersedia | Pasang `requirements.txt` menggunakan interpreter Python yang sama dengan agen. |
| Penyimpanan kredensial tidak tersedia | Periksa akses sistem dan buka kuncinya. Di Linux, pastikan Secret Service berjalan pada sesi pengguna saat ini. Skrip tidak beralih ke penyimpanan teks biasa. |
| `status` berhasil tetapi pembuatan video gagal | Konfigurasi lokal tidak membuktikan adanya akses ke server. Periksa izin Key, saldo, ketersediaan model, dan parameter permintaan. |
| Key tersimpan sudah dihapus tetapi permintaan masih terautentikasi | Periksa apakah `FLAQ_CLIENT_KEY` masih disetel di lingkungan agen. |
| Detail model atau dokumentasi tidak lengkap | Ikuti tautan dokumentasi yang sebenarnya, naikkan batas teks jika terpotong, atau gunakan peramban agen untuk konten dinamis. Jangan menebak parameter yang tidak tersedia. |
| Waktu tunggu habis | Simpan ID tugas dan periksa lagi. Batas waktu tunggu lokal yang habis tidak berarti pembuatan video di server gagal atau dibatalkan. |
| Pengiriman berakhir dengan kesalahan jaringan | Periksa apakah Flaq sudah membuat tugas sebelum mengirim ulang untuk menghindari tagihan ganda. |
| Unduhan gagal | Simpan URL hasil, periksa direktori keluaran dan nama berkas, lalu telaah kesalahan yang dilaporkan. Berkas yang sudah ada tidak pernah ditimpa. |

## Pemeriksaan pengembangan

Jalankan dari direktori skill:

```sh
python3 -m unittest discover -s tests -v
```

Pengujian ini tidak menggunakan kredensial sistem yang sebenarnya atau mengirim tugas berbayar. Cakupannya meliputi ekstraksi halaman, perilaku akses kredensial, penanganan permintaan, dan perlindungan berkas. Pengujian ini tidak menggantikan pemeriksaan langsung penyimpanan kredensial pada setiap sistem operasi atau pengujian pembuatan video menyeluruh yang telah diizinkan.
