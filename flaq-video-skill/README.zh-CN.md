# Flaq Video Skill

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português do Brasil](README.pt-BR.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [Bahasa Indonesia](README.id.md) · [Italiano](README.it.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md)

通过 AI 智能体使用 [Flaq AI](https://flaq.ai/) 生成、编辑视频和提升视频分辨率。本技能引导智能体发现模型、阅读最新 API 文档、发送带身份验证的请求、轮询任务并交付视频。

智能体从[模型广场](https://flaq.ai/model-market/)、模型详情页和[官方文档](https://flaq.ai/docs/)读取模型能力及价格。技能不固定模型版本或参数限制。附带的 Python 辅助脚本负责页面提取、本地凭据管理、请求和下载，无需 Flaq CLI 或本地服务器。

## X 社区视频示例

浏览 [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5) 收录的十二个案例。打开案例可查看说明，打开 X 原帖可阅读创作者的提示词，点击 MP4 可观看视频。模型归属依据原帖声明；这些是社区参考案例，并非本技能生成的视频。

| 案例 | 适用场景 | 原帖与提示词 | 视频 |
| --- | --- | --- | --- |
| [X01 · 美食喜剧](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | 动画 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [观看 MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · 时尚穿搭](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | 时尚 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [观看 MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · 萌猫自拍](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [观看 MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · 街头动画](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [观看 MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · MiniDV 日常片段](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | 生活方式 | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [观看 MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · 双人 Vlog](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | 对话 | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [观看 MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · 舞台惊喜](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | 表演 | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [观看 MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · 花艺 ASMR](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | 教程 | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [观看 MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · 动作特效](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | 动作 | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [观看 MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · 旅行日记](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | 旅行 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [观看 MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · 善意故事](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | 叙事 | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [观看 MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · 热带声景](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | 声音 | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [观看 MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[查看来源说明与改编提示词](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix)。生成时请遵循技能的模型优先级，并核对最新 Flaq 文档。

## 无限视频创作灵感

浏览[场景库](scenarios/index.md)，了解输入要求、操作流程、原始提示词和视频示例。点击封面即可观看来源视频。

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="日常穿搭展示" height="240"></a><br>
      <strong>日常穿搭展示</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">观看视频</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">提示词与操作流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="时尚穿搭亮相" height="240"></a><br>
      <strong>时尚穿搭亮相</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">观看视频</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">提示词与操作流程</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="穿搭展示" height="240"></a><br>
      <strong>穿搭展示</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">观看视频</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">提示词与操作流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="口红展示" height="240"></a><br>
      <strong>口红展示</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">观看视频</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">提示词与操作流程</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="夏日旅行 Vlog" height="240"></a><br>
      <strong>夏日旅行 Vlog</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">观看视频</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">提示词与操作流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="晨间生活 Vlog" height="240"></a><br>
      <strong>晨间生活 Vlog</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">观看视频</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">提示词与操作流程</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="护肤品创作者广告" height="240"></a><br>
      <strong>护肤品创作者广告</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">观看视频</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">提示词与操作流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="瓶装产品演示" height="240"></a><br>
      <strong>瓶装产品演示</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">观看视频</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">提示词与操作流程</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="街头服饰广告" height="240"></a><br>
      <strong>街头服饰广告</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">观看视频</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">提示词与操作流程</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="电影感救援片段" height="240"></a><br>
      <strong>电影感救援片段</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">观看视频</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">提示词与操作流程</a>
    </td>
  </tr>
</table>

这些是 AITryOn、UGCMaker 和 Heydream 已有的示例，并非本技能新生成的内容。封面是预览图，不是经过核实的原始输入。各指南提供来源链接及可展开的原始提示词；改编提示词会单独标注。详见[示例来源与布局参考](scenarios/index.md#about-the-examples)。

## 模型选择

优先使用你明确指定的模型。未指定时，智能体优先选择 Seedance，其次 Wan，并使用符合输入、能力和预算要求的最新可用版本。两者均不适合时，再比较其他可用模型。任务失败后不会自动更换模型并再次提交付费任务。

## 使用要求

- 支持 `SKILL.md` 技能，且能读取网页、运行 Python 和访问本地文件的智能体。浏览器工具有助于访问动态页面或需要登录的页面。
- Python 3.10 或更高版本，以及 [requirements.txt](requirements.txt) 中的依赖包。
- 能访问 Flaq 网站、API 及返回的视频链接的网络环境。
- Flaq 账号和 Client Key，具备所选模型所需的权限及可用余额。
- 保存凭据需要 macOS 钥匙串、Windows 凭据管理器，或正在运行且已解锁的 Linux Secret Service。

## 安装技能

将整个 `flaq-video-skill` 目录复制到智能体支持的技能目录。请使用智能体文档规定的项目级或用户级技能位置，具体路径取决于宿主。保留目录名和内部结构，包括 `scripts`、`references`、`scenarios`、`templates` 和 `requirements.txt`。只复制 `SKILL.md` 不足以使用本技能。

按智能体要求刷新或重新加载技能。确认它能找到 `flaq-video-skill`，并解析 [SKILL.md](SKILL.md) 引用的相对路径文件。

在已安装的 `flaq-video-skill` 目录打开终端，在你选择的 Python 环境中安装依赖：

```sh
python3 -m pip install -r requirements.txt
```

Windows 用户请将 `python3` 替换为 `py -3`。如果使用虚拟环境，请确保智能体运行脚本时使用同一个解释器。技能及其脚本均不会自动安装依赖。

## 一次配置 Key，后续自动读取

在 Flaq 的 API 管理页面创建或复制 Client Key，然后在自己的终端运行：

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

在隐藏输入提示处粘贴 Key。不要将其放入聊天消息、命令参数或请求 JSON 文件。

Key 会保存到当前设备、当前操作系统账号的系统凭据库中。后续请求会自动读取，关闭终端或重启设备后仍可使用。操作系统可能要求授权访问或解锁凭据库。更换设备后需要重新配置 Key。

再次运行 `set` 可替换已保存的 Key。删除时运行：

```sh
python3 scripts/credentials.py clear
```

对于现有自动化环境，`FLAQ_CLIENT_KEY` 的优先级高于已保存的凭据。脚本不会自动加载 `.env` 文件，`clear` 也不会删除环境变量。`status` 仅检查本地配置，不会远程验证 Key 或检查余额。

存储详情和平台要求见[脚本用法](references/scripts.md#environment-and-first-time-setup)。

## 与智能体配合使用

让智能体使用 Flaq Video Skill，并描述你想要的结果。例如：

> 使用 Flaq Video Skill，为一段 8 秒横屏视频推荐模型，内容是日出时安静的港口。生成前先比较合适的选项并估算费用。

> 使用 Flaq Video Skill 和最新可用的 Seedance 模型，让我附上的图片动起来。我希望镜头缓慢推进，采用竖屏构图，不要声音。请先检查支持的选项和价格。

> 使用 Flaq Video Skill 查询我已有的任务 ID，视频就绪后下载。不要创建新任务。

### 穿搭展示

> 使用 Flaq Video Skill，将我已完成的试衣图片制作成穿搭展示视频。保持人物和服装一致，让人物轻轻转身并向前迈一小步。生成前先检查时长和费用。

阅读[穿搭指南](scenarios/virtual-try-on.md)。此流程从人物已穿好目标服装的图片开始。

### UGC 广告

> 使用 Flaq Video Skill，根据我的产品图片制作竖屏 UGC 广告。开头展示产品细节，随后演示产品使用，结尾给出清晰的产品镜头。采用我提供的卖点，先检查音频支持情况和费用。

阅读 [UGC 广告指南](scenarios/ugc-ads.md)，查看街头服饰与穿搭亮相示例及其原始提示词。

### 产品演示

> 使用 Flaq Video Skill，让这张人物手持瓶子的照片动起来。让人物喝一口，再把瓶子展示给镜头。保留瓶子的形状和标签。先检查支持的选项及费用。

阅读[产品指南](scenarios/product-showcase.md)，查看瓶装产品和口红示例。普通场景动画请参考[图生视频指南](scenarios/image-to-video.md)。

你可以指定模型、提供其 Flaq 详情页链接，或让智能体遵循默认优先级。智能体会在准备请求前阅读所选模型的详细文档。确定必要选项及费用范围并获得生成授权后，它会提交请求并记录任务 ID，便于后续跟进。

## 无需 Key 即可检查网站访问

在技能目录运行：

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

此命令读取公开页面，不需要凭据，也不会发起付费 API 调用。脚本会提取模型链接、文档链接、页面文字、代码示例，以及页面中存在的公开模型规格。智能体沿实际详情页和文档链接访问，不会猜测 URL。

## 文件与延伸阅读

| 文件或目录 | 用途 |
| --- | --- |
| [SKILL.md](SKILL.md) | 智能体指引、模型优先级及完整流程 |
| [references/scripts.md](references/scripts.md) | 配置、请求、轮询、上传和下载的具体命令 |
| [references/model-discovery.md](references/model-discovery.md) | 读取规格并与详细文档核对 |
| [scenarios/index.md](scenarios/index.md) | 场景选择、输入要求、操作流程、提示词及来源视频展示 |
| `scripts/credentials.py` | 配置、检查和清除本地凭据 |
| `scripts/read_page.py` | 提取 Flaq 公开页面信息 |
| `scripts/video_request.py` | 提交、查询、等待视频任务及下载结果 |
| `templates/` | 根据最新文档填写的通用请求及本地文件模板 |
| `tests/` | 使用隔离测试输入进行离线行为检查 |

请求模板是起始结构，并非可直接提交的示例。请保留模板原样，在自己的工作目录准备每次请求。支持的字段和上传格式取决于所选模型的当前文档。

## 常见问题

| 问题 | 检查方法 |
| --- | --- |
| 智能体找不到技能 | 核实宿主的技能位置，复制完整文件夹并刷新技能发现。 |
| 缺少依赖 | 使用智能体运行脚本的同一个 Python 解释器安装 `requirements.txt` 中的依赖。 |
| 系统凭据库不可用 | 检查访问权限并解锁。Linux 上需确保 Secret Service 在当前用户会话中运行。脚本不会改用明文存储。 |
| `status` 成功但生成失败 | 本地配置不代表远程访问有效。请检查 Key 权限、余额、模型可用性和请求参数。 |
| 已清除保存的 Key，但请求仍通过身份验证 | 检查智能体环境中是否仍设置了 `FLAQ_CLIENT_KEY`。 |
| 模型详情或文档不完整 | 沿实际文档链接查看，内容被截断时提高文本长度限制，或使用智能体浏览器访问动态内容。不要猜测缺失参数。 |
| 等待超时 | 保留任务 ID 并再次查询。本地等待超时不代表远程生成失败或已取消。 |
| 提交时发生网络错误 | 再次提交前先确认 Flaq 是否已创建任务，以免重复扣费。 |
| 下载失败 | 保留结果 URL，检查输出目录和文件名，并查看返回的错误。已有文件不会被覆盖。 |

## 开发检查

在技能目录运行：

```sh
python3 -m unittest discover -s tests -v
```

这些测试不会使用真实系统凭据或提交付费任务。测试覆盖页面提取、凭据访问行为、请求处理和文件保护，不能代替各操作系统上的实际凭据库检查或已获授权的完整生成测试。
