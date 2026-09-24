# Flaq Video Skill

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português do Brasil](README.pt-BR.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [Bahasa Indonesia](README.id.md) · [Italiano](README.it.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md)

AI 에이전트로 [Flaq AI](https://flaq.ai/)에서 동영상을 생성하고 편집하며 해상도를 높일 수 있습니다. 이 스킬은 모델 탐색, 최신 API 문서 확인, 인증된 요청, 작업 상태 폴링, 동영상 전달까지 에이전트를 안내합니다.

에이전트는 [모델 마켓](https://flaq.ai/model-market/), 모델 상세 페이지, [공식 문서](https://flaq.ai/docs/)에서 모델 기능과 가격을 읽습니다. 모델 버전과 매개변수 제한은 스킬에 고정되어 있지 않습니다. 포함된 Python 보조 스크립트가 페이지 추출, 로컬 자격 증명, 요청, 다운로드를 처리합니다. Flaq CLI나 로컬 서버는 필요하지 않습니다.

## X 커뮤니티 동영상

[Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5)에 수집된 12개 예시를 살펴보세요. 사례를 열어 설명을 읽고, X 원본 게시물에서 제작자의 프롬프트를 확인하거나 MP4로 시청할 수 있습니다. 모델 표기는 원본 게시물을 따릅니다. 이 자료는 커뮤니티 참고 사례이며 이 스킬로 생성한 동영상이 아닙니다.

 예시 | 활용 사례 | 원본 게시물 및 프롬프트 | 동영상 |
| --- | --- | --- | --- |
| [X01 · 음식 코미디](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy)  애니메이션 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [MP4 보기](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · 패션 스타일링](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion)  패션 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [MP4 보기](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · 아기 고양이 셀카](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [MP4 보기](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · 거리 애니메이션](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [MP4 보기](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · MiniDV 일상의 순간](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday)  라이프스타일 | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [MP4 보기](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · 두 사람의 브이로그](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog)  대화 | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [MP4 보기](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · 무대 위 반전](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal)  공연 | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [MP4 보기](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · 꽃 ASMR](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial)  튜토리얼 | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [MP4 보기](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · 액션 VFX](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography)  액션 | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [MP4 보기](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · 여행 일기](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc)  여행 | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [MP4 보기](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · 따뜻한 이야기](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover)  스토리텔링 | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [MP4 보기](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · 열대의 소리 풍경](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound)  사운드 | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [MP4 보기](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[출처 설명 및 응용 프롬프트 보기](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). 생성할 때는 스킬의 모델 우선순위를 따르고 최신 Flaq 문서를 확인하세요.

## 무한한 동영상 영감

[시나리오 라이브러리](scenarios/index.md)에서 입력 자료, 워크플로 안내, 원본 프롬프트, 동영상 예시를 확인하세요. 표지 이미지를 클릭하면 원본 동영상을 볼 수 있습니다.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="일상 코디 소개" height="240"></a><br>
      <strong>일상 코디 소개</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">동영상 보기</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">프롬프트 및 워크플로</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="패션 코디 공개" height="240"></a><br>
      <strong>패션 코디 공개</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">동영상 보기</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">프롬프트 및 워크플로</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="코디 소개" height="240"></a><br>
      <strong>코디 소개</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">동영상 보기</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">프롬프트 및 워크플로</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="립스틱 소개" height="240"></a><br>
      <strong>립스틱 소개</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">동영상 보기</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">프롬프트 및 워크플로</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="여름 여행 브이로그" height="240"></a><br>
      <strong>여름 여행 브이로그</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">동영상 보기</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">프롬프트 및 워크플로</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="아침 일상 브이로그" height="240"></a><br>
      <strong>아침 일상 브이로그</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">동영상 보기</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">프롬프트 및 워크플로</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="스킨케어 크리에이터 광고" height="240"></a><br>
      <strong>스킨케어 크리에이터 광고</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">동영상 보기</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">프롬프트 및 워크플로</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="병 제품 시연" height="240"></a><br>
      <strong>병 제품 시연</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">동영상 보기</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">프롬프트 및 워크플로</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="스트리트웨어 제품 광고" height="240"></a><br>
      <strong>스트리트웨어 제품 광고</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">동영상 보기</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">프롬프트 및 워크플로</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="영화 같은 구조 장면" height="240"></a><br>
      <strong>영화 같은 구조 장면</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">동영상 보기</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">프롬프트 및 워크플로</a>
    </td>
  </tr>
</table>

이 자료는 AITryOn, UGCMaker, Heydream의 기존 예시이며 이 스킬로 새로 생성한 결과가 아닙니다. 표지는 미리보기용이며 실제 원본 입력 자료인지 확인되지 않았습니다. 각 가이드에는 출처 링크와 펼쳐 볼 수 있는 원본 프롬프트가 포함되어 있으며, 응용한 프롬프트는 별도로 표시됩니다. [예시 출처 및 레이아웃 참고 자료](scenarios/index.md#about-the-examples)를 확인하세요.

## 모델 선택

사용자가 명시적으로 선택한 모델이 최우선입니다. 별도 지정이 없으면 에이전트는 Seedance, 그다음 Wan을 우선하며 입력 자료, 기능, 예산 요건을 충족하는 최신 버전을 선택합니다. 두 계열 모두 적합하지 않으면 다른 사용 가능한 모델을 비교합니다. 실패 후 자동으로 모델을 바꿔 다른 유료 작업을 제출하지 않습니다.

## 요구 사항

- `SKILL.md` 스킬을 지원하며 웹페이지 읽기, Python 실행, 로컬 파일 접근이 가능한 에이전트. 동적 페이지나 로그인이 필요한 페이지에는 브라우저 도구가 도움이 됩니다.
- Python 3.10 이상 및 [requirements.txt](requirements.txt)에 명시된 패키지.
- Flaq 웹사이트와 API, 반환된 동영상 URL에 접근할 수 있는 네트워크 환경.
- 선택한 모델에 필요한 권한과 사용 가능한 잔액을 갖춘 Flaq 계정 및 Client Key.
- 자격 증명 저장 시: macOS 키체인, Windows 자격 증명 관리자 또는 실행 중이며 잠금 해제된 Linux Secret Service.

## 스킬 설치

`flaq-video-skill` 디렉터리 전체를 에이전트가 지원하는 스킬 디렉터리에 복사하세요. 에이전트 문서에 안내된 프로젝트 수준 또는 사용자 수준 스킬 경로를 사용하세요. 경로는 호스트에 따라 다릅니다. `scripts`, `references`, `scenarios`, `templates`, `requirements.txt`를 포함한 디렉터리 이름과 내부 구조를 유지하세요. `SKILL.md`만 복사해서는 충분하지 않습니다.

에이전트의 요구에 따라 스킬을 새로 고치거나 다시 로드하세요. `flaq-video-skill`을 찾고 [SKILL.md](SKILL.md)에서 참조하는 상대 경로의 파일을 확인할 수 있는지 점검하세요.

설치된 `flaq-video-skill` 디렉터리에서 터미널을 열고 선택한 Python 환경에 의존성을 설치하세요.

```sh
python3 -m pip install -r requirements.txt
```

Windows에서는 `python3` 대신 `py -3`를 사용하세요. 가상 환경을 사용하는 경우 에이전트가 같은 인터프리터로 스크립트를 실행하도록 하세요. 스킬과 스크립트는 의존성을 자동으로 설치하지 않습니다.

## Key 최초 설정

Flaq API 관리 페이지에서 Client Key를 생성하거나 복사한 뒤, 본인의 터미널에서 다음 명령을 실행하세요.

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

입력 내용이 표시되지 않는 프롬프트에 Key를 붙여 넣으세요. 채팅 메시지, 명령 인수, 요청 JSON 파일에는 넣지 마세요.

Key는 현재 기기와 OS 계정의 시스템 자격 증명 저장소에 저장됩니다. 터미널을 닫거나 기기를 다시 시작해도 이후 요청에서 자동으로 읽습니다. 운영체제에서 접근 허용이나 자격 증명 저장소의 잠금 해제를 요청할 수 있습니다. 다른 기기에서는 Key를 다시 설정해야 합니다.

저장된 Key를 교체하려면 `set`을 다시 실행하세요. 삭제하려면 다음을 실행하세요.

```sh
python3 scripts/credentials.py clear
```

기존 자동화 환경에서는 `FLAQ_CLIENT_KEY`가 저장된 자격 증명보다 우선합니다. 스크립트는 `.env` 파일을 자동으로 불러오지 않으며, `clear`는 환경 변수를 삭제하지 않습니다. `status`는 로컬 설정만 확인하고 Key의 원격 유효성이나 잔액을 확인하지 않습니다.

저장 방식과 플랫폼 요구 사항은 [스크립트 사용법](references/scripts.md#environment-and-first-time-setup)을 확인하세요.

## 에이전트와 함께 사용하기

에이전트에게 Flaq Video Skill을 사용하도록 요청하고 원하는 결과를 설명하세요. 예시:

> Flaq Video Skill로 일출 무렵의 고요한 항구를 담은 8초 가로형 동영상에 적합한 모델을 추천해 주세요. 생성 전에 적합한 옵션을 비교하고 비용을 추산해 주세요.

> Flaq Video Skill과 사용 가능한 최신 Seedance 모델로 첨부한 이미지를 움직이게 해 주세요. 카메라가 부드럽게 다가오고, 세로 구도이며, 소리가 없으면 좋겠습니다. 지원 옵션과 가격부터 확인해 주세요.

> Flaq Video Skill로 기존 작업 ID를 확인하고 동영상이 준비되었으면 다운로드해 주세요. 새 작업은 만들지 마세요.

### 코디 소개

> Flaq Video Skill로 완성된 가상 착용 이미지를 코디 소개 동영상으로 만들어 주세요. 인물과 의상을 일관되게 유지하고 가볍게 몸을 돌린 뒤 앞으로 한 걸음 작게 내딛게 해 주세요. 생성 전에 길이와 비용을 확인해 주세요.

[코디 가이드](scenarios/virtual-try-on.md)를 읽어 보세요. 이 과정은 인물이 이미 해당 의상을 입은 이미지에서 시작합니다.

### UGC 광고

> Flaq Video Skill로 제품 이미지를 세로형 UGC 광고로 만들어 주세요. 제품 디테일로 시작하고 사용 장면을 보여 준 뒤 선명한 제품 샷으로 마무리해 주세요. 제가 제공한 판매 포인트를 활용하고 오디오 지원 여부와 비용부터 확인해 주세요.

[UGC 광고 가이드](scenarios/ugc-ads.md)에서 스트리트웨어 및 코디 공개 예시와 원본 프롬프트를 확인하세요.

### 제품 시연

> Flaq Video Skill로 병을 들고 있는 인물 사진을 움직이게 해 주세요. 한 모금 마신 뒤 카메라에 병을 보여 주도록 하고, 병의 형태와 라벨을 유지해 주세요. 지원 옵션과 비용부터 확인해 주세요.

[제품 가이드](scenarios/product-showcase.md)에서 병과 립스틱 예시를 확인하세요. 일반적인 장면에 움직임을 넣으려면 [이미지 동영상 변환 가이드](scenarios/image-to-video.md)를 사용하세요.

모델을 지정하거나 Flaq 상세 페이지 링크를 제공하거나 에이전트가 기본 우선순위를 따르게 할 수 있습니다. 에이전트는 요청을 준비하기 전에 선택한 모델의 상세 문서를 읽습니다. 필요한 옵션과 비용 범위가 정해지고 사용자가 생성을 승인하면 작업을 제출하고 이후 확인을 위해 작업 ID를 기록합니다.

## Key 없이 웹사이트 접근 확인

스킬 디렉터리에서 실행하세요.

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

이 명령은 자격 증명이나 유료 API 호출 없이 공개 페이지를 읽습니다. 스크립트는 모델 링크, 문서 링크, 페이지 텍스트, 코드 예시, 공개 모델 사양이 있는 경우 해당 사양을 추출합니다. 에이전트는 URL을 추측하지 않고 실제 상세 페이지와 문서 링크를 따라갑니다.

## 파일 및 추가 자료

 파일 또는 디렉터리 | 용도 |
| --- | --- |
| [SKILL.md](SKILL.md) | 에이전트 지침, 모델 우선순위, 전체 워크플로 |
| [references/scripts.md](references/scripts.md) | 설정, 요청, 폴링, 업로드, 다운로드의 정확한 명령 |
| [references/model-discovery.md](references/model-discovery.md) | 사양을 읽고 상세 문서와 대조하는 방법 |
| [scenarios/index.md](scenarios/index.md) | 시나리오 선택, 입력 요건, 워크플로, 프롬프트, 원본 동영상 갤러리 |
| `scripts/credentials.py` | 로컬 자격 증명 설정, 확인, 삭제 |
| `scripts/read_page.py` | Flaq 공개 페이지에서 정보 추출 |
| `scripts/video_request.py` | 동영상 작업 제출, 조회, 대기, 다운로드 |
| `templates/` | 최신 문서를 바탕으로 작성하는 범용 요청 및 로컬 파일 템플릿 |
| `tests/` | 격리된 테스트 입력을 사용하는 오프라인 동작 검증 |

요청 템플릿은 시작용 구조이며 바로 제출할 수 있는 예시가 아닙니다. 템플릿은 수정하지 않고 각 요청을 작업 디렉터리에서 준비하세요. 지원 필드와 업로드 형식은 선택한 모델의 최신 문서에 따라 달라집니다.

## 문제 해결

 문제 | 확인 사항 |
| --- | --- |
| 에이전트가 스킬을 찾지 못함 | 호스트의 스킬 경로를 확인하고 전체 폴더를 복사한 뒤 스킬 탐색을 새로 고치세요. |
| 의존성 누락 | 에이전트가 사용하는 것과 같은 Python 인터프리터로 `requirements.txt`를 설치하세요. |
| 자격 증명 저장소를 사용할 수 없음 | 시스템 접근 권한을 확인하고 잠금을 해제하세요. Linux에서는 현재 사용자 세션에서 Secret Service가 실행 중인지 확인하세요. 스크립트는 평문 저장으로 전환하지 않습니다. |
| `status`는 성공하지만 생성은 실패함 | 로컬 설정이 원격 접근을 보장하지는 않습니다. Key 권한, 잔액, 모델 가용성, 요청 매개변수를 확인하세요. |
| 저장된 Key를 삭제했는데도 요청이 인증됨 | 에이전트 환경에 `FLAQ_CLIENT_KEY`가 여전히 설정되어 있는지 확인하세요. |
| 모델 상세 정보 또는 문서가 불완전함 | 실제 문서 링크를 따라가고, 텍스트가 잘렸다면 한도를 늘리거나 동적 콘텐츠에 에이전트의 브라우저를 사용하세요. 누락된 매개변수를 추측하지 마세요. |
| 대기 시간 초과 | 작업 ID를 보관하고 다시 조회하세요. 로컬 대기 시간 초과가 원격 생성 실패나 취소를 의미하지는 않습니다. |
| 제출 중 네트워크 오류 발생 | 중복 과금을 피하려면 다시 제출하기 전에 Flaq에서 작업이 생성되었는지 확인하세요. |
| 다운로드 실패 | 결과 URL을 보관하고 출력 디렉터리와 파일 이름, 보고된 오류를 확인하세요. 기존 파일은 덮어쓰지 않습니다. |

## 개발 검증

스킬 디렉터리에서 실행하세요.

```sh
python3 -m unittest discover -s tests -v
```

이 테스트는 실제 시스템 자격 증명을 사용하거나 유료 작업을 제출하지 않습니다. 페이지 추출, 자격 증명 접근 동작, 요청 처리, 파일 보호를 검증합니다. 각 운영체제의 실제 자격 증명 저장소 점검이나 승인된 전체 생성 과정 테스트를 대체하지는 않습니다.
