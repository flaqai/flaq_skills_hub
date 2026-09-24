# Flaq Video Skill

透過 AI Agent 使用 [Flaq AI](https://flaq.ai/) 生成、編輯影片及提升影片解析度。本技能引導 Agent 探索模型、查閱最新 API 文件、發送經過驗證的請求、輪詢任務狀態，並取得影片。

Agent 會從[模型廣場](https://flaq.ai/model-market/)、模型詳細頁及[官方文件](https://flaq.ai/docs/)讀取模型能力與價格。技能不會寫死模型版本或參數限制。隨附的 Python 輔助程式負責頁面擷取、本機憑證、請求與下載，無須 Flaq CLI 或本機伺服器。

## 來自 X 社群的影片

探索 [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5) 收錄的十二個範例。開啟案例可查看說明，前往 X 原始貼文可查看創作者的提示詞，或開啟 MP4 觀看影片。模型標示依原始貼文為準；這些是社群參考案例，並非由本技能生成的影片。

 範例 | 使用情境 | 原始貼文與提示詞 | 影片 |
| --- | --- | --- | --- |
| [X01 · 美食喜劇](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy)  動畫 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [觀看 MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · 時尚穿搭](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion)  時尚 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [觀看 MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · 小貓自拍](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [觀看 MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · 街頭動畫](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [觀看 MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · MiniDV 日常片刻](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday)  日常生活 | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [觀看 MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · 雙人 Vlog](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog)  對話 | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [觀看 MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · 舞台驚喜揭曉](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal)  表演 | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [觀看 MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · 花卉 ASMR](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial)  教學 | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [觀看 MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · 動作特效](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography)  動作 | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [觀看 MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · 旅行日記](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc)  旅行 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [觀看 MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · 善意故事](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover)  敘事 | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [觀看 MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · 熱帶聲景](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound)  聲音 | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [觀看 MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[瀏覽來源說明與改寫提示詞](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix)。生成時請遵循技能的模型優先順序，並核對 Flaq 最新文件。

## 無限影片靈感

瀏覽[情境資料庫](scenarios/index.md)，取得輸入需求、流程指引、原始提示詞及影片範例。點擊封面即可觀看來源影片。

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="日常穿搭展示" height="240"></a><br>
      <strong>日常穿搭展示</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">觀看影片</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">提示詞與流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="時尚穿搭揭曉" height="240"></a><br>
      <strong>時尚穿搭揭曉</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">觀看影片</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">提示詞與流程</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="穿搭展示" height="240"></a><br>
      <strong>穿搭展示</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">觀看影片</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">提示詞與流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="口紅展示" height="240"></a><br>
      <strong>口紅展示</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">觀看影片</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">提示詞與流程</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="夏日旅行 Vlog" height="240"></a><br>
      <strong>夏日旅行 Vlog</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">觀看影片</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">提示詞與流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="晨間日常 Vlog" height="240"></a><br>
      <strong>晨間日常 Vlog</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">觀看影片</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">提示詞與流程</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="護膚創作者廣告" height="240"></a><br>
      <strong>護膚創作者廣告</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">觀看影片</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">提示詞與流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="瓶裝產品示範" height="240"></a><br>
      <strong>瓶裝產品示範</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">觀看影片</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">提示詞與流程</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="街頭服飾產品廣告" height="240"></a><br>
      <strong>街頭服飾產品廣告</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">觀看影片</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">提示詞與流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="電影感救援片段" height="240"></a><br>
      <strong>電影感救援片段</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">觀看影片</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">提示詞與流程</a>
    </td>
  </tr>
</table>

這些是 AITryOn、UGCMaker 和 Heydream 的既有範例，並非本技能新生成的內容。封面僅供預覽，尚未驗證是否為原始輸入。每份指南均附來源連結與可展開的原始提示詞；改寫提示詞會另行標示。請參閱[範例來源與版面參考](scenarios/index.md#about-the-examples)。

## 模型選擇

您明確指定的模型具有最高優先權。若未指定，Agent 會優先選擇 Seedance，其次為 Wan，並選用符合輸入、功能及預算需求的最新可用版本。若兩個系列皆不適合，才會比較其他可用模型。任務失敗後，不會自動切換模型並提交另一筆付費任務。

## 使用需求

- 支援 `SKILL.md` 技能，且能讀取網頁、執行 Python 及存取本機檔案的 Agent。瀏覽器工具有助於處理動態頁面或需要登入的頁面。
- Python 3.10 以上版本，並安裝 [requirements.txt](requirements.txt) 中的套件。
- 可連線至 Flaq 網站、API，以及回傳的影片網址。
- Flaq 帳號與 Client Key，並具備所選模型所需的權限及可用餘額。
- 儲存憑證需使用 macOS 鑰匙圈、Windows 認證管理員，或已啟動且解鎖的 Linux Secret Service。

## 安裝技能

將整個 `flaq-video-skill` 目錄複製到 Agent 支援的技能目錄。請依 Agent 文件使用專案層級或使用者層級的技能位置；實際位置取決於宿主。保留目錄名稱與內部結構，包括 `scripts`、`references`、`scenarios`、`templates` 及 `requirements.txt`。只複製 `SKILL.md` 並不足夠。

依 Agent 的要求重新整理或重新載入技能。確認 Agent 能找到 `flaq-video-skill`，並正確解析 [SKILL.md](SKILL.md) 參照的相對路徑檔案。

在已安裝的 `flaq-video-skill` 目錄中開啟終端機，並在選定的 Python 環境中安裝相依套件：

```sh
python3 -m pip install -r requirements.txt
```

在 Windows 上，請以 `py -3` 取代 `python3`。若使用虛擬環境，請確保 Agent 使用同一個直譯器執行指令碼。技能及其指令碼皆不會自動安裝相依套件。

## 一次設定 Key

在 Flaq 的 API 管理頁面建立或複製 Client Key，然後在您自己的終端機執行下列指令：

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

在隱藏輸入提示處貼上 Key。請勿將 Key 放入聊天訊息、指令引數或請求 JSON 檔案。

Key 會儲存在目前裝置及作業系統帳號的系統憑證庫中。後續請求會自動讀取，即使關閉終端機或重新啟動裝置亦然。作業系統可能要求您授權存取或解鎖憑證庫。換到其他裝置時，需重新設定 Key。

再次執行 `set` 可取代已儲存的 Key。若要移除：

```sh
python3 scripts/credentials.py clear
```

在既有的自動化環境中，`FLAQ_CLIENT_KEY` 的優先權高於已儲存的憑證。指令碼不會自動載入 `.env` 檔案，`clear` 也不會移除環境變數。`status` 僅檢查本機設定，不會遠端驗證 Key 或查詢餘額。

儲存方式與平台需求請參閱[指令碼用法](references/scripts.md#environment-and-first-time-setup)。

## 搭配 Agent 使用

請要求 Agent 使用 Flaq Video Skill，並描述您想要的結果。例如：

> 使用 Flaq Video Skill，為一支 8 秒的橫式影片推薦模型，內容為日出時寧靜的港口。生成前先比較適合的選項並估算費用。

> 使用 Flaq Video Skill 搭配最新可用的 Seedance 模型，讓我附上的圖片動起來。我想要鏡頭緩慢推進、直式構圖且無聲音。先檢查支援的選項與價格。

> 使用 Flaq Video Skill 檢查我既有的任務 ID，若影片已完成就下載。不要建立另一筆任務。

### 穿搭展示

> 使用 Flaq Video Skill，將我已完成的試穿圖片轉成穿搭展示影片。保持人物與服裝一致，讓人物輕輕轉身並向前邁出一小步。生成前先確認片長與費用。

請閱讀[穿搭指南](scenarios/virtual-try-on.md)。此流程以人物已穿好服裝的圖片為起點。

### UGC 廣告

> 使用 Flaq Video Skill，將我的產品圖片製作成直式 UGC 廣告。以產品細節開場，展示使用情境，最後以清晰的產品畫面收尾。採用我提供的賣點，並先確認音訊支援與費用。

請閱讀 [UGC 廣告指南](scenarios/ugc-ads.md)，查看街頭服飾及穿搭揭曉範例與原始提示詞。

### 產品示範

> 使用 Flaq Video Skill，讓這張人物手持瓶子的照片動起來。讓人物喝一口，再向鏡頭展示瓶子，保持瓶身形狀與標籤不變。先確認支援的選項與費用。

請閱讀[產品指南](scenarios/product-showcase.md)，查看瓶裝產品與口紅範例。一般場景動畫則請使用[圖片轉影片指南](scenarios/image-to-video.md)。

您可以指定模型、提供其 Flaq 詳細頁連結，或讓 Agent 依預設優先順序選擇。Agent 會先閱讀所選模型的詳細文件，再準備請求。必要選項與費用範圍確定，且您授權生成後，Agent 便會提交任務並記錄任務 ID，以便後續追蹤。

## 不使用 Key 檢查網站存取

在技能目錄中執行：

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

此指令會讀取公開頁面，無須憑證，也不會呼叫付費 API。指令碼會擷取模型連結、文件連結、頁面文字、程式碼範例，以及頁面提供的公開模型規格。Agent 會沿用實際的詳細頁與文件連結，不會猜測網址。

## 檔案與延伸閱讀

 檔案或目錄 | 用途 |
| --- | --- |
| [SKILL.md](SKILL.md) | Agent 指引、模型優先順序及端到端流程 |
| [references/scripts.md](references/scripts.md) | 完整的設定、請求、輪詢、上傳與下載指令 |
| [references/model-discovery.md](references/model-discovery.md) | 讀取規格並與詳細文件交叉核對 |
| [scenarios/index.md](scenarios/index.md) | 情境導引、輸入需求、流程、提示詞及來源影片圖庫 |
| `scripts/credentials.py` | 設定、檢查及清除本機憑證 |
| `scripts/read_page.py` | 從 Flaq 公開頁面擷取資訊 |
| `scripts/video_request.py` | 提交、查詢、等待影片任務並下載結果 |
| `templates/` | 依最新文件填寫的通用請求與本機檔案範本 |
| `tests/` | 使用隔離測試輸入進行離線行為檢查 |

請求範本是起始結構，並非可直接提交的範例。請保留範本原樣，並在您的工作目錄中準備每次請求。支援的欄位與上傳格式取決於所選模型的最新文件。

## 疑難排解

 問題 | 檢查項目 |
| --- | --- |
| Agent 找不到技能 | 確認宿主的技能位置，複製完整資料夾，並重新整理技能探索。 |
| 缺少相依套件 | 使用與 Agent 相同的 Python 直譯器，安裝 `requirements.txt` 中的套件。 |
| 憑證庫無法使用 | 檢查系統存取權限並解鎖憑證庫。在 Linux 上，確認 Secret Service 正在目前使用者的工作階段中執行。指令碼不會改用純文字儲存。 |
| `status` 成功但生成失敗 | 本機設定正常不代表遠端存取可用。請檢查 Key 權限、餘額、模型可用性及請求參數。 |
| 已清除儲存的 Key，但請求仍可通過驗證 | 檢查 Agent 的環境中是否仍設定了 `FLAQ_CLIENT_KEY`。 |
| 模型詳細資料或文件不完整 | 沿用實際文件連結；若文字遭截斷，請提高文字上限，或使用 Agent 的瀏覽器讀取動態內容。不要猜測缺少的參數。 |
| 等待逾時 | 保留任務 ID 並再次查詢。本機等待逾時不代表遠端生成已失敗或取消。 |
| 提交時發生網路錯誤 | 重新提交前，先確認 Flaq 是否已建立任務，以免重複計費。 |
| 下載失敗 | 保留結果網址，檢查輸出目錄與檔案名稱，並查看回報的錯誤。既有檔案絕不會被覆寫。 |

## 開發檢查

從技能目錄執行：

```sh
python3 -m unittest discover -s tests -v
```

這些測試不會使用真實的系統憑證，也不會提交付費任務。測試涵蓋頁面擷取、憑證存取行為、請求處理及檔案保護，但不能取代各作業系統上的實際憑證庫檢查，或經授權的端到端生成測試。
