# Flaq Video Skill

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português do Brasil](README.pt-BR.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [Bahasa Indonesia](README.id.md) · [Italiano](README.it.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md)

Tạo, chỉnh sửa và nâng độ phân giải video qua [Flaq AI](https://flaq.ai/) bằng tác nhân AI. Kỹ năng này hướng dẫn tác nhân tìm mô hình, đọc tài liệu API hiện hành, gửi yêu cầu có xác thực, thăm dò trạng thái tác vụ và lấy video.

Tác nhân đọc khả năng và giá của mô hình từ [Chợ mô hình](https://flaq.ai/model-market/), trang chi tiết mô hình và [tài liệu chính thức](https://flaq.ai/docs/). Phiên bản mô hình và giới hạn tham số không được cố định trong kỹ năng. Các tập lệnh Python đi kèm xử lý việc trích xuất trang, thông tin xác thực cục bộ, yêu cầu và tải xuống. Không cần Flaq CLI hay máy chủ cục bộ.

## Video cộng đồng từ X

Khám phá 12 ví dụ được tuyển chọn trong [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). Mở từng trường hợp để đọc ghi chú, xem bài đăng gốc trên X để lấy câu lệnh của tác giả hoặc mở MP4 để xem video. Tên mô hình được ghi theo bài đăng nguồn; đây là các ví dụ tham khảo từ cộng đồng, không phải video do kỹ năng này tạo ra.

 Ví dụ | Tình huống sử dụng | Bài đăng gốc và câu lệnh | Video |
| --- | --- | --- | --- |
| [X01 · Hài ẩm thực](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy)  Hoạt hình | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [Xem MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · Phối đồ thời trang](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion)  Thời trang | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [Xem MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · Mèo con tự chụp ảnh](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [Xem MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · Hoạt hình đường phố](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [Xem MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · Khoảnh khắc MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday)  Phong cách sống | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [Xem MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · Vlog hai người](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog)  Hội thoại | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [Xem MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · Bất ngờ trên sân khấu](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal)  Biểu diễn | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [Xem MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · ASMR hoa](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial)  Hướng dẫn | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [Xem MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · Kỹ xảo hành động](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography)  Hành động | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [Xem MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · Nhật ký du lịch](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc)  Du lịch | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [Xem MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · Câu chuyện lòng tốt](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover)  Kể chuyện | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [Xem MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · Không gian âm thanh nhiệt đới](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound)  Âm thanh | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [Xem MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[Xem ghi chú nguồn và các câu lệnh được điều chỉnh](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). Khi tạo video, hãy tuân theo thứ tự ưu tiên mô hình của kỹ năng và kiểm tra tài liệu Flaq hiện hành.

## Cảm hứng video không giới hạn

Xem [thư viện tình huống](scenarios/index.md) để biết đầu vào, hướng dẫn quy trình, câu lệnh gốc và video ví dụ. Nhấp vào ảnh bìa để xem video nguồn.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="Giới thiệu trang phục hằng ngày" height="240"></a><br>
      <strong>Giới thiệu trang phục hằng ngày</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">Xem video</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">Câu lệnh và quy trình</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="Ra mắt trang phục thời trang" height="240"></a><br>
      <strong>Ra mắt trang phục thời trang</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">Xem video</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">Câu lệnh và quy trình</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="Giới thiệu trang phục" height="240"></a><br>
      <strong>Giới thiệu trang phục</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">Xem video</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">Câu lệnh và quy trình</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="Giới thiệu son môi" height="240"></a><br>
      <strong>Giới thiệu son môi</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">Xem video</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">Câu lệnh và quy trình</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="Vlog du lịch mùa hè" height="240"></a><br>
      <strong>Vlog du lịch mùa hè</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">Xem video</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">Câu lệnh và quy trình</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="Vlog sinh hoạt buổi sáng" height="240"></a><br>
      <strong>Vlog sinh hoạt buổi sáng</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">Xem video</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">Câu lệnh và quy trình</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="Quảng cáo chăm sóc da của nhà sáng tạo" height="240"></a><br>
      <strong>Quảng cáo chăm sóc da của nhà sáng tạo</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">Xem video</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">Câu lệnh và quy trình</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="Minh họa sản phẩm dạng chai" height="240"></a><br>
      <strong>Minh họa sản phẩm dạng chai</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">Xem video</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">Câu lệnh và quy trình</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="Quảng cáo sản phẩm thời trang đường phố" height="240"></a><br>
      <strong>Quảng cáo sản phẩm thời trang đường phố</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">Xem video</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">Câu lệnh và quy trình</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="Phân cảnh giải cứu đậm chất điện ảnh" height="240"></a><br>
      <strong>Phân cảnh giải cứu đậm chất điện ảnh</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">Xem video</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">Câu lệnh và quy trình</a>
    </td>
  </tr>
</table>

Đây là các ví dụ có sẵn từ AITryOn, UGCMaker và Heydream, không phải kết quả mới tạo bằng kỹ năng này. Ảnh bìa dùng để xem trước và chưa được xác minh là đầu vào gốc. Mỗi hướng dẫn có liên kết nguồn và câu lệnh gốc có thể mở rộng; câu lệnh được điều chỉnh có nhãn riêng. Xem [nguồn gốc ví dụ và tài liệu tham khảo bố cục](scenarios/index.md#about-the-examples).

## Chọn mô hình

Mô hình bạn chỉ định rõ ràng được ưu tiên cao nhất. Nếu không chỉ định, tác nhân ưu tiên Seedance, sau đó đến Wan, chọn phiên bản mới nhất hiện có đáp ứng yêu cầu về đầu vào, tính năng và ngân sách. Nếu cả hai dòng đều không phù hợp, tác nhân sẽ so sánh các mô hình khả dụng khác. Khi thất bại, tác nhân không tự đổi mô hình rồi gửi thêm tác vụ có tính phí.

## Yêu cầu

- Tác nhân hỗ trợ kỹ năng `SKILL.md`, có thể đọc trang web, chạy Python và truy cập tệp cục bộ. Công cụ trình duyệt hữu ích với trang động hoặc trang yêu cầu đăng nhập.
- Python 3.10 trở lên cùng các gói trong [requirements.txt](requirements.txt).
- Kết nối mạng truy cập được trang web và API của Flaq cũng như các URL video được trả về.
- Tài khoản Flaq và Client Key có quyền truy cập cùng số dư khả dụng cần thiết cho mô hình đã chọn.
- Để lưu thông tin xác thực: macOS Keychain, Windows Credential Manager hoặc Linux Secret Service đang chạy và đã mở khóa.

## Cài đặt kỹ năng

Sao chép toàn bộ thư mục `flaq-video-skill` vào thư mục kỹ năng mà tác nhân hỗ trợ. Dùng vị trí kỹ năng cấp dự án hoặc cấp người dùng được nêu trong tài liệu của tác nhân; vị trí phụ thuộc vào ứng dụng chủ. Giữ nguyên tên thư mục và cấu trúc bên trong, gồm `scripts`, `references`, `scenarios`, `templates` và `requirements.txt`. Chỉ sao chép `SKILL.md` là chưa đủ.

Làm mới hoặc tải lại kỹ năng theo yêu cầu của tác nhân. Xác nhận tác nhân tìm thấy `flaq-video-skill` và truy cập được các tệp theo đường dẫn tương đối được tham chiếu trong [SKILL.md](SKILL.md).

Mở terminal trong thư mục `flaq-video-skill` đã cài đặt. Cài các gói phụ thuộc vào môi trường Python bạn chọn:

```sh
python3 -m pip install -r requirements.txt
```

Trên Windows, dùng `py -3` thay cho `python3`. Nếu dùng môi trường ảo, hãy bảo đảm tác nhân chạy các tập lệnh bằng cùng trình thông dịch đó. Kỹ năng và các tập lệnh không tự cài đặt gói phụ thuộc.

## Cấu hình Key một lần

Tạo hoặc sao chép Client Key từ trang quản lý API của Flaq, rồi chạy các lệnh sau trong terminal của chính bạn:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Dán Key tại lời nhắc nhập ẩn. Không đưa Key vào tin nhắn trò chuyện, đối số lệnh hay tệp JSON của yêu cầu.

Key được lưu trong kho thông tin xác thực hệ thống của thiết bị và tài khoản hệ điều hành hiện tại. Các yêu cầu sau sẽ tự đọc Key, kể cả sau khi đóng terminal hoặc khởi động lại thiết bị. Hệ điều hành có thể yêu cầu bạn cho phép truy cập hoặc mở khóa kho thông tin xác thực. Cần cấu hình lại Key trên thiết bị khác.

Chạy lại `set` để thay thế Key đã lưu. Để xóa Key:

```sh
python3 scripts/credentials.py clear
```

Trong môi trường tự động hóa có sẵn, `FLAQ_CLIENT_KEY` được ưu tiên hơn thông tin xác thực đã lưu. Các tập lệnh không tự tải tệp `.env`, và `clear` không xóa biến môi trường. `status` chỉ kiểm tra cấu hình cục bộ, không xác thực Key từ xa hay kiểm tra số dư.

Xem [Cách dùng tập lệnh](references/scripts.md#environment-and-first-time-setup) để biết chi tiết lưu trữ và yêu cầu nền tảng.

## Sử dụng với tác nhân

Yêu cầu tác nhân dùng Flaq Video Skill và mô tả kết quả bạn muốn. Ví dụ:

> Dùng Flaq Video Skill để đề xuất mô hình cho video ngang dài 8 giây về bến cảng yên tĩnh lúc bình minh. So sánh các lựa chọn phù hợp và ước tính chi phí trước khi tạo.

> Dùng Flaq Video Skill với mô hình Seedance mới nhất hiện có để tạo chuyển động cho ảnh đính kèm. Tôi muốn máy quay tiến nhẹ vào, khung hình dọc và không có âm thanh. Hãy kiểm tra các tùy chọn được hỗ trợ và giá trước.

> Dùng Flaq Video Skill để kiểm tra ID tác vụ hiện có của tôi và tải video xuống nếu đã sẵn sàng. Không tạo tác vụ khác.

### Giới thiệu trang phục

> Dùng Flaq Video Skill để biến ảnh thử đồ đã hoàn tất của tôi thành video giới thiệu trang phục. Giữ nguyên nhân vật và quần áo, cho nhân vật xoay nhẹ rồi bước một bước nhỏ về phía trước. Kiểm tra thời lượng và chi phí trước khi tạo.

Đọc [hướng dẫn trang phục](scenarios/virtual-try-on.md). Quy trình bắt đầu từ ảnh nhân vật đã mặc bộ trang phục.

### Quảng cáo UGC

> Dùng Flaq Video Skill để tạo quảng cáo UGC dọc từ ảnh sản phẩm của tôi. Mở đầu bằng chi tiết sản phẩm, thể hiện sản phẩm khi sử dụng và kết thúc bằng cảnh sản phẩm rõ nét. Dùng các điểm bán hàng tôi cung cấp, kiểm tra khả năng hỗ trợ âm thanh và chi phí trước.

Đọc [hướng dẫn quảng cáo UGC](scenarios/ugc-ads.md) để xem ví dụ thời trang đường phố và màn ra mắt trang phục kèm câu lệnh gốc.

### Minh họa sản phẩm

> Dùng Flaq Video Skill để tạo chuyển động cho ảnh người đang cầm chai này. Cho nhân vật nhấp một ngụm rồi đưa chai về phía máy quay. Giữ nguyên hình dáng và nhãn chai. Kiểm tra các tùy chọn được hỗ trợ và chi phí trước.

Đọc [hướng dẫn sản phẩm](scenarios/product-showcase.md) để xem ví dụ về chai và son môi. Với cảnh thông thường cần tạo chuyển động, dùng [hướng dẫn ảnh thành video](scenarios/image-to-video.md).

Bạn có thể chỉ định mô hình, gửi liên kết trang chi tiết trên Flaq hoặc để tác nhân theo thứ tự ưu tiên mặc định. Tác nhân đọc tài liệu chi tiết của mô hình đã chọn trước khi chuẩn bị yêu cầu. Khi đã xác định các tùy chọn cần thiết và phạm vi chi phí, đồng thời bạn cho phép tạo, tác nhân sẽ gửi tác vụ và ghi lại ID để theo dõi.

## Kiểm tra truy cập trang web không cần Key

Từ thư mục kỹ năng:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

Lệnh này đọc trang công khai mà không cần thông tin xác thực hay gọi API có tính phí. Tập lệnh trích xuất liên kết mô hình, liên kết tài liệu, văn bản trang, ví dụ mã và thông số mô hình công khai nếu có. Tác nhân theo các liên kết trang chi tiết và tài liệu thực tế thay vì đoán URL.

## Tệp và tài liệu đọc thêm

 Tệp hoặc thư mục | Mục đích |
| --- | --- |
| [SKILL.md](SKILL.md) | Chỉ dẫn cho tác nhân, thứ tự ưu tiên mô hình và quy trình từ đầu đến cuối |
| [references/scripts.md](references/scripts.md) | Các lệnh cụ thể để thiết lập, gửi yêu cầu, thăm dò, tải lên và tải xuống |
| [references/model-discovery.md](references/model-discovery.md) | Đọc thông số và đối chiếu với tài liệu chi tiết |
| [scenarios/index.md](scenarios/index.md) | Chọn tình huống, yêu cầu đầu vào, quy trình, câu lệnh và thư viện video nguồn |
| `scripts/credentials.py` | Cấu hình, kiểm tra và xóa thông tin xác thực cục bộ |
| `scripts/read_page.py` | Trích xuất thông tin từ trang công khai của Flaq |
| `scripts/video_request.py` | Gửi, truy vấn, chờ và tải kết quả tác vụ video |
| `templates/` | Mẫu yêu cầu và tệp cục bộ tổng quát để điền theo tài liệu hiện hành |
| `tests/` | Kiểm tra hành vi ngoại tuyến bằng đầu vào thử nghiệm được tách biệt |

Mẫu yêu cầu là cấu trúc khởi đầu, không phải ví dụ có thể gửi ngay. Giữ nguyên mẫu và chuẩn bị từng yêu cầu trong thư mục làm việc của bạn. Các trường và định dạng tải lên được hỗ trợ phụ thuộc vào tài liệu hiện hành của mô hình đã chọn.

## Khắc phục sự cố

 Vấn đề | Nội dung cần kiểm tra |
| --- | --- |
| Tác nhân không tìm thấy kỹ năng | Kiểm tra vị trí kỹ năng của ứng dụng chủ, sao chép toàn bộ thư mục rồi làm mới việc phát hiện kỹ năng. |
| Thiếu gói phụ thuộc | Cài các gói trong `requirements.txt` bằng cùng trình thông dịch Python mà tác nhân sử dụng. |
| Kho thông tin xác thực không khả dụng | Kiểm tra quyền truy cập hệ thống và mở khóa kho. Trên Linux, bảo đảm Secret Service đang chạy trong phiên người dùng hiện tại. Các tập lệnh không chuyển sang lưu dạng văn bản thuần. |
| `status` thành công nhưng tạo video thất bại | Cấu hình cục bộ không chứng minh được quyền truy cập từ xa. Kiểm tra quyền của Key, số dư, khả năng sử dụng mô hình và tham số yêu cầu. |
| Đã xóa Key lưu trữ nhưng yêu cầu vẫn xác thực được | Kiểm tra xem `FLAQ_CLIENT_KEY` còn được đặt trong môi trường của tác nhân hay không. |
| Chi tiết mô hình hoặc tài liệu chưa đầy đủ | Theo liên kết tài liệu thực tế, tăng giới hạn văn bản nếu bị cắt hoặc dùng trình duyệt của tác nhân cho nội dung động. Không đoán tham số còn thiếu. |
| Hết thời gian chờ | Giữ lại ID tác vụ và truy vấn lại. Hết thời gian chờ cục bộ không có nghĩa là việc tạo từ xa đã thất bại hoặc bị hủy. |
| Gửi tác vụ kết thúc với lỗi mạng | Kiểm tra xem Flaq đã tạo tác vụ hay chưa trước khi gửi lại để tránh bị tính phí trùng. |
| Tải xuống thất bại | Giữ lại URL kết quả, kiểm tra thư mục đầu ra, tên tệp và lỗi được báo. Tệp hiện có không bao giờ bị ghi đè. |

## Kiểm tra phát triển

Chạy từ thư mục kỹ năng:

```sh
python3 -m unittest discover -s tests -v
```

Các bài kiểm tra này không dùng thông tin xác thực hệ thống thực và không gửi tác vụ có tính phí. Chúng kiểm tra việc trích xuất trang, hành vi truy cập thông tin xác thực, xử lý yêu cầu và bảo vệ tệp. Chúng không thay thế việc kiểm tra kho thông tin xác thực thực tế trên từng hệ điều hành hay thử nghiệm tạo video từ đầu đến cuối đã được cho phép.
