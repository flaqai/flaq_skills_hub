# Flaq Video Skill

AI エージェントを使い、[Flaq AI](https://flaq.ai/) で動画を生成・編集・高解像度化できます。このスキルは、モデルの検索、最新の API ドキュメントの確認、認証付きリクエスト、タスクのポーリング、動画の取得まで、エージェントを案内します。

エージェントは[モデルマーケット](https://flaq.ai/model-market/)、モデル詳細ページ、[公式ドキュメント](https://flaq.ai/docs/)からモデルの機能と料金を読み取ります。モデルのバージョンやパラメーターの制限は、スキルに固定されていません。付属の Python ヘルパーがページの抽出、ローカル認証情報、リクエスト、ダウンロードを処理します。Flaq CLI やローカルサーバーは不要です。

## X コミュニティの動画

[Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5) に収録された 12 件の作例を紹介します。各事例では解説、X の元投稿では作者のプロンプトを確認でき、MP4 で動画を視聴できます。使用モデルの表記は元投稿に準拠しています。これらはコミュニティの参考作例であり、このスキルで生成した動画ではありません。

 作例 | 用途 | 元の投稿とプロンプト | 動画 |
| --- | --- | --- | --- |
| [X01 · フードコメディ](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy)  アニメーション | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [MP4 を視聴](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · ファッションコーデ](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion)  ファッション | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [MP4 を視聴](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · 子猫の自撮り](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [MP4 を視聴](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · 街中のアニメーション](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [MP4 を視聴](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · MiniDV の日常](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday)  ライフスタイル | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [MP4 を視聴](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · 二人の Vlog](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog)  会話 | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [MP4 を視聴](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · ステージのサプライズ](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal)  パフォーマンス | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [MP4 を視聴](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · 花の ASMR](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial)  チュートリアル | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [MP4 を視聴](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · アクション VFX](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography)  アクション | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [MP4 を視聴](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · 旅日記](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc)  旅行 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [MP4 を視聴](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · 思いやりの物語](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover)  ストーリー | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [MP4 を視聴](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · 南国のサウンドスケープ](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound)  サウンド | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [MP4 を視聴](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[出典の解説とアレンジしたプロンプトを見る](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix)。生成時はスキルのモデル優先順位に従い、最新の Flaq ドキュメントを確認してください。

## 無限に広がる動画のアイデア

[シナリオライブラリ](scenarios/index.md)で、必要な入力、ワークフローの手順、元のプロンプト、動画の作例を確認できます。カバー画像をクリックすると元の動画を視聴できます。

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="日常のコーディネート紹介" height="240"></a><br>
      <strong>日常のコーディネート紹介</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">動画を視聴</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">プロンプトとワークフロー</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="ファッションコーデの披露" height="240"></a><br>
      <strong>ファッションコーデの披露</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">動画を視聴</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">プロンプトとワークフロー</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="コーディネート紹介" height="240"></a><br>
      <strong>コーディネート紹介</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">動画を視聴</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">プロンプトとワークフロー</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="口紅の紹介" height="240"></a><br>
      <strong>口紅の紹介</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">動画を視聴</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">プロンプトとワークフロー</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="夏の旅行 Vlog" height="240"></a><br>
      <strong>夏の旅行 Vlog</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">動画を視聴</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">プロンプトとワークフロー</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="朝の日常 Vlog" height="240"></a><br>
      <strong>朝の日常 Vlog</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">動画を視聴</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">プロンプトとワークフロー</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="スキンケアのクリエイター広告" height="240"></a><br>
      <strong>スキンケアのクリエイター広告</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">動画を視聴</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">プロンプトとワークフロー</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="ボトル商品の実演" height="240"></a><br>
      <strong>ボトル商品の実演</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">動画を視聴</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">プロンプトとワークフロー</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="ストリートウェアの商品広告" height="240"></a><br>
      <strong>ストリートウェアの商品広告</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">動画を視聴</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">プロンプトとワークフロー</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="映画風の救出シーン" height="240"></a><br>
      <strong>映画風の救出シーン</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">動画を視聴</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">プロンプトとワークフロー</a>
    </td>
  </tr>
</table>

これらは AITryOn、UGCMaker、Heydream の既存の作例で、このスキルで新たに生成したものではありません。カバー画像はプレビュー用であり、実際の生成入力としては確認されていません。各ガイドには出典へのリンクと展開して読める元のプロンプトがあり、アレンジしたプロンプトは別途明記されています。[作例の出典とレイアウトの参考資料](scenarios/index.md#about-the-examples)をご覧ください。

## モデルの選択

明示的に指定したモデルが最優先されます。指定がない場合、エージェントは Seedance、次に Wan を優先し、入力・機能・予算の要件を満たす最新の利用可能なバージョンを選びます。どちらのシリーズも適さない場合は、ほかの利用可能なモデルを比較します。失敗後に自動でモデルを切り替え、新たな有料タスクを送信することはありません。

## 動作要件

- `SKILL.md` 形式のスキルに対応し、ウェブページの読み取り、Python の実行、ローカルファイルへのアクセスができるエージェント。動的なページやログインが必要なページにはブラウザーツールが役立ちます。
- Python 3.10 以降と、[requirements.txt](requirements.txt) に記載されたパッケージ。
- Flaq のウェブサイト、API、返された動画 URL にアクセスできるネットワーク環境。
- 選択したモデルに必要な権限と利用可能な残高を備えた Flaq アカウントと Client Key。
- 認証情報の保存には、macOS キーチェーン、Windows 資格情報マネージャー、または起動済みでロック解除された Linux Secret Service が必要です。

## スキルのインストール

`flaq-video-skill` ディレクトリ全体を、エージェントが対応するスキルディレクトリにコピーします。エージェントのドキュメントで指定されたプロジェクト単位またはユーザー単位の保存先を使用してください。場所はホストによって異なります。`scripts`、`references`、`scenarios`、`templates`、`requirements.txt` を含め、ディレクトリ名と内部構成をそのまま保ってください。`SKILL.md` だけをコピーしても動作しません。

エージェントの要件に従ってスキルを更新または再読み込みします。`flaq-video-skill` を検出でき、[SKILL.md](SKILL.md) が相対パスで参照するファイルにアクセスできることを確認してください。

インストールした `flaq-video-skill` ディレクトリでターミナルを開き、使用する Python 環境に依存パッケージをインストールします。

```sh
python3 -m pip install -r requirements.txt
```

Windows では `python3` の代わりに `py -3` を使用します。仮想環境を使う場合は、エージェントが同じインタープリターでスクリプトを実行するようにしてください。スキルもスクリプトも依存パッケージを自動ではインストールしません。

## Key の初回設定

Flaq の API 管理ページで Client Key を作成またはコピーし、ご自身のターミナルで次のコマンドを実行します。

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

入力が非表示になるプロンプトで Key を貼り付けます。チャットメッセージ、コマンドの引数、リクエストの JSON ファイルには記載しないでください。

Key は現在のデバイスと OS アカウントのシステム認証情報ストアに保存されます。その後のリクエストでは、ターミナルを閉じたりデバイスを再起動したりしても自動的に読み込まれます。OS からアクセス許可や認証情報ストアのロック解除を求められる場合があります。別のデバイスでは Key を再設定してください。

保存済みの Key を置き換えるには、もう一度 `set` を実行します。削除するには次を実行します。

```sh
python3 scripts/credentials.py clear
```

既存の自動化環境では、`FLAQ_CLIENT_KEY` が保存済みの認証情報より優先されます。スクリプトは `.env` ファイルを自動で読み込まず、`clear` は環境変数を削除しません。`status` はローカル設定を確認するだけで、Key のリモート検証や残高確認は行いません。

保存方式の詳細とプラットフォーム要件は、[スクリプトの使い方](references/scripts.md#environment-and-first-time-setup)をご覧ください。

## エージェントで使う

エージェントに Flaq Video Skill を使うよう依頼し、希望する結果を伝えます。例：

> Flaq Video Skill を使って、日の出の静かな港を描く 8 秒の横長動画に適したモデルを提案してください。生成前に適切な候補を比較し、費用を見積もってください。

> Flaq Video Skill と利用可能な最新の Seedance モデルを使って、添付画像を動画にしてください。ゆっくりとカメラが寄る動きで、縦長の構図、音声なしを希望します。まず対応オプションと料金を確認してください。

> Flaq Video Skill を使って既存のタスク ID を確認し、動画が完成していればダウンロードしてください。新しいタスクは作成しないでください。

### コーディネート紹介

> Flaq Video Skill を使って、完成済みの試着画像からコーディネート紹介動画を作ってください。人物と服装の一貫性を保ち、ゆっくり振り向いて一歩前に進む動きにしてください。生成前に長さと費用を確認してください。

[コーディネートのガイド](scenarios/virtual-try-on.md)をご覧ください。この手順は、人物がすでに服を着用している画像から始まります。

### UGC 広告

> Flaq Video Skill を使って、商品画像から縦型の UGC 広告を作ってください。商品のディテールから始め、使用シーンを見せ、最後は商品がはっきり見えるカットで締めてください。私が伝えた訴求点を使い、まず音声対応と費用を確認してください。

[UGC 広告ガイド](scenarios/ugc-ads.md)では、ストリートウェアやコーディネート披露の作例と元のプロンプトを確認できます。

### 商品の実演

> Flaq Video Skill を使って、ボトルを持つ人物の写真を動画にしてください。一口飲んでからカメラにボトルを見せる動きにし、ボトルの形とラベルを保ってください。まず対応オプションと費用を確認してください。

[商品ガイド](scenarios/product-showcase.md)でボトルと口紅の作例を確認できます。一般的なシーンに動きを付ける場合は、[画像から動画を作るガイド](scenarios/image-to-video.md)をご利用ください。

モデルを指定する、その Flaq 詳細ページへのリンクを渡す、または既定の優先順位に従って選択させることができます。エージェントはリクエストを準備する前に、選択したモデルの詳細ドキュメントを読みます。必要なオプションと費用の範囲が決まり、生成を許可すると、タスクを送信し、後で確認できるようタスク ID を記録します。

## Key を使わずにウェブサイトへのアクセスを確認

スキルのディレクトリから実行します。

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

認証情報や有料 API 呼び出しを使わずに公開ページを読み取ります。スクリプトは、モデルへのリンク、ドキュメントへのリンク、ページ本文、コード例、公開モデル仕様があればその内容を抽出します。エージェントは URL を推測せず、実際の詳細ページとドキュメントへのリンクをたどります。

## ファイルと関連資料

 ファイルまたはディレクトリ | 目的 |
| --- | --- |
| [SKILL.md](SKILL.md) | エージェントの指示、モデル優先順位、全体のワークフロー |
| [references/scripts.md](references/scripts.md) | 設定、リクエスト、ポーリング、アップロード、ダウンロードの具体的なコマンド |
| [references/model-discovery.md](references/model-discovery.md) | 仕様の読み取りと詳細ドキュメントとの照合 |
| [scenarios/index.md](scenarios/index.md) | シナリオの選択、入力要件、ワークフロー、プロンプト、元動画のギャラリー |
| `scripts/credentials.py` | ローカル認証情報の設定、確認、削除 |
| `scripts/read_page.py` | Flaq の公開ページから情報を抽出 |
| `scripts/video_request.py` | 動画タスクの送信、照会、待機、ダウンロード |
| `templates/` | 最新ドキュメントに基づいて記入する汎用リクエストとローカルファイルのテンプレート |
| `tests/` | 分離したテスト入力を使ったオフラインの動作確認 |

リクエストテンプレートは初期構造であり、そのまま送信できる例ではありません。テンプレートは変更せず、各リクエストを作業ディレクトリに用意してください。対応フィールドやアップロード形式は、選択したモデルの最新ドキュメントに従います。

## トラブルシューティング

 問題 | 確認すること |
| --- | --- |
| エージェントがスキルを見つけられない | ホストのスキル保存先を確認し、フォルダー全体をコピーしてからスキル検出を更新してください。 |
| 依存パッケージが不足している | エージェントと同じ Python インタープリターで `requirements.txt` のパッケージをインストールしてください。 |
| 認証情報ストアを利用できない | システムのアクセス権を確認し、ストアのロックを解除してください。Linux では、現在のユーザーセッションで Secret Service が動作していることを確認します。スクリプトが平文保存に切り替わることはありません。 |
| `status` は成功するが生成に失敗する | ローカル設定だけではリモートアクセスを確認できません。Key の権限、残高、モデルの利用可否、リクエストパラメーターを確認してください。 |
| 保存済みの Key を削除したのに認証できる | エージェントの環境に `FLAQ_CLIENT_KEY` がまだ設定されていないか確認してください。 |
| モデル詳細やドキュメントが不完全 | 実際のドキュメントリンクをたどり、本文が切れている場合は文字数上限を増やすか、動的コンテンツにはエージェントのブラウザーを使ってください。不明なパラメーターを推測しないでください。 |
| 待機がタイムアウトする | タスク ID を保持して再度照会してください。ローカルの待機タイムアウトは、リモートの生成失敗やキャンセルを意味しません。 |
| 送信がネットワークエラーで終了する | 重複課金を避けるため、再送信する前に Flaq でタスクが作成されているか確認してください。 |
| ダウンロードに失敗する | 結果の URL を保持し、出力ディレクトリとファイル名、報告されたエラーを確認してください。既存ファイルが上書きされることはありません。 |

## 開発用の確認

スキルのディレクトリから実行してください。

```sh
python3 -m unittest discover -s tests -v
```

これらのテストは実際のシステム認証情報を使わず、有料タスクも送信しません。ページ抽出、認証情報へのアクセス動作、リクエスト処理、ファイル保護を検証します。各 OS の認証情報ストアでの実動作確認や、許可を得たうえで行う生成のエンドツーエンドテストに代わるものではありません。
