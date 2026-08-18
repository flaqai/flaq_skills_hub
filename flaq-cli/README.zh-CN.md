# Flaq CLI

[English](README.md) | 简体中文

Flaq CLI 是一个面向 AI 素材生成工作流的本地桥接工具。它负责管理 Client Key、加载可热更新的模型配置、把 URL 或本地素材提交给生成接口、校验和恢复生成任务，并把结果下载到指定目录。

它由两部分组成：

- 命令行：适合 AI Agent、脚本和开发维护。
- 本地管理界面：用于配置授权、查看服务状态、查看模型、重载模型配置和复制调用日志。

服务只监听本机回环地址，Client Key 保存到 macOS 钥匙串，不写入浏览器存储、项目文件或 Skill 工作区。远程 API 默认且正式使用 HTTPS；本机回环开发地址是唯一允许使用 HTTP 的例外。

## 开源发行安全边界

CLI 源码和可执行文件中不保存 Flaq Client Key 或第三方模型平台密钥。公开源码不会公开用户运行时保存到 macOS 钥匙串中的凭证。

- Client Key 按远程 API Origin 隔离保存。为 `https://api.flaq.ai` 保存的 Key 不会自动发送给其他自定义 API 地址。
- 自定义远程 API 必须使用 HTTPS，不能在 URL 中包含用户名、密码、查询参数或 fragment。
- 携带 Client Key 的请求禁止跟随 HTTP 跳转，避免凭证被转发到其他地址。
- 本地文件与生成参数在同一个任务请求中提交，不使用网站 Access Token、预签名 URL 或独立上传接口。
- 任务结果下载 URL 必须使用 HTTPS，并禁止自动跟随跳转。
- 本地管理 API、健康状态和日志读取都需要当前服务的随机会话令牌；浏览器请求还会校验本地 Origin。
- 上游错误只输出受控错误码、HTTP 状态、业务码、重试状态和安全文案，不转发原始响应体或第三方错误消息；只有本地模型目录和输入校验等受控错误码可以附带结构化诊断。
- 日志会按字段名、Bearer 文本和 URL 敏感查询参数脱敏；管理界面读取旧日志时也会再次脱敏。

## 环境要求

| 使用方式 | 需要的环境 |
| --- | --- |
| 开发和测试 | macOS、支持 `--experimental-strip-types` 的 Node.js、pnpm |
| 构建独立可执行文件 | 上述环境以及 Bun |
| 使用已打包版本 | macOS；不需要安装 Node.js、pnpm 或 Bun |

macOS 是当前正式平台，因为授权信息使用 macOS 钥匙串，双击入口使用 `.command` 文件。

## 项目结构

```text
flaq-cli/
├── src/
│   ├── api/
│   │   ├── client.ts              # Flaq API 请求和协议处理
│   │   ├── task-request.ts        # JSON 或 multipart 任务请求组装
│   │   └── task-runner.ts         # 轮询、恢复和结果下载流程
│   ├── auth/
│   │   ├── credential-store.ts    # macOS 钥匙串读写
│   │   └── read-secret.ts         # 终端安全输入
│   ├── catalog/
│   │   ├── catalog.ts             # 递归扫描、加载和重载模型目录
│   │   ├── types.ts               # 模型配置类型
│   │   └── validator.ts           # Schema 和任务输入校验
│   ├── runtime/
│   │   ├── logger.ts              # 按天写入、读取和脱敏调用日志
│   │   ├── paths.ts               # 运行目录、模型目录定位
│   │   └── session.ts             # 本地服务会话令牌
│   ├── server/server.ts           # 本地 HTTP 服务
│   ├── ui/management-page.ts      # 中文管理界面
│   ├── cli.ts                     # CLI 命令入口
│   ├── download.ts                # 结果下载和失败清理
│   └── errors.ts                  # 机器可读错误
├── model-catalog/
│   ├── openai/
│   │   └── gpt-image-2.json
│   └── bytedance/
│       ├── seedance-2-0.json
│       └── seedance-2-5.json
├── schemas/
│   └── model-catalog-v1.schema.json
├── tests/
├── start.command                 # 打包后双击启动入口
├── package.json
├── README.md
└── README.zh-CN.md
```

## 运行方式

### 开发环境首次准备

在仓库根目录安装依赖：

```bash
pnpm install
```

依赖只需要安装一次。日常启动界面不需要重新安装。

### 启动本地服务和管理界面

开发环境使用：

```bash
pnpm start serve --open
```

服务默认地址：

```text
http://127.0.0.1:43127
```

启动后可以在界面中：

1. 保存、替换或清除 Client Key。
2. 查看 Client Key 和生成 API Origin。
3. 查看服务、版本、模型数量及当前模型 operation。
4. 重载 `model-catalog/` 中的模型 JSON。
5. 按日期查看自动刷新的调用日志，复制单条或当天全部日志。

保持启动终端运行。关闭该终端后，本地服务随之停止。

### 打包后双击启动

最终交付目录中，双击 `start.command`。它会定位同目录下的 `flaq` 可执行文件，执行：

```bash
./flaq serve --open
```

如果可执行文件不存在或没有执行权限，启动脚本会明确报错，不会使用其他替代程序。

## 常用命令

开发环境把下面示例中的 `flaq` 替换为 `pnpm start`；打包环境直接使用 `./flaq`。

```bash
# 查看帮助
pnpm start

# 启动本地服务
pnpm start serve --open

# 查看服务状态
pnpm start status

# 为指定 HTTPS API 单独保存 Client Key
pnpm start auth set-key --api-base-url https://api.example.com

# 查看 Client Key 配置状态
pnpm start auth status

# 查看指定 HTTPS API 对应的独立 Client Key 状态
pnpm start auth status --api-base-url https://api.example.com

# 查看所有模型
pnpm start models list

# 查看指定模型及全部 operation
pnpm start models get --id gpt-image-2

# 重载模型配置
pnpm start models reload

# 离线校验完整模型目录
pnpm start models validate
```

任务命令：

```bash
# 付费提交：必须在用户明确批准后使用 --confirmed
pnpm start task submit --media image --input-file /absolute/path/request.json --confirmed

# 查询任务
pnpm start task get --media image --task-id TASK_ID

# 等待任务完成
pnpm start task wait --media image --task-id TASK_ID

# 下载一个已完成任务，不会创建新任务
pnpm start task download --media image --task-id TASK_ID --output-dir /absolute/path/output
```

视频任务把 `--media image` 改为 `--media video`。

CLI 仍提供 `task run` 作为一次性调用；自动化工作流建议使用可恢复流程：

```text
submit
→ 立即保存 task_id
→ wait
→ download
```

这样轮询或下载失败时可以继续原任务，不会因为 task ID 丢失而重复付费提交。

## 请求输入

`task submit` 和 `task run` 通过 `--input-file` 接收一个 JSON 对象。字段必须与当前模型 operation 完全一致。

图片请求示例：

```json
{
  "model_name": "gpt-image-2",
  "prompt": "A clean product photograph on a soft neutral background.",
  "width": 16,
  "height": 9,
  "resolution": "1k",
  "quality": "medium"
}
```

当前统一提示词限制：

| 媒体类型 | 最大长度 |
| --- | ---: |
| 图片 | 2000 UTF-16 单元 |
| 视频 | 5000 UTF-16 单元 |

模型配置还会校验必填字段、可选字段、禁止字段、枚举、范围、URL 和跨字段约束。校验失败时不会提交付费任务。

模型配置中 `format` 为 `media-input` 的字段同时支持 HTTP(S) URL 和本地绝对路径。示例：

```json
{
  "model_name": "gpt-image-2-edit",
  "prompt": "Keep the subject and replace the background with a clean studio setting.",
  "image_url_list": [
    "/absolute/path/to/reference.png",
    "https://cdn.example.com/second-reference.webp"
  ],
  "width": 16,
  "height": 9,
  "resolution": "1k",
  "quality": "medium"
}
```

只要请求中存在本地路径，CLI 就把整个任务组装为 `multipart/form-data`：普通字段按原字段名提交，数组媒体字段使用相同字段名重复追加，URL 保持字符串，本地路径转换为文件 part。当前支持 BMP、GIF、JPEG/JPG、PNG、TIFF、WebP、MOV、MP4、WebM、M4A、MP3、MPEG 和 WAV；`.mpeg` 会以 `.mp3` 文件名及 `audio/mpeg` MIME 提交，避免后端按 `.mpeg` URL 存储，M4A 保持 `.m4a` 和 `audio/mp4`。

GPT Image 2 的 `/api/v1/images/edits` multipart 图片直传已有接口文档依据；当前 CLI 仍统一走可恢复的 `/api/v1/image/task` 和 `/api/v1/video/task` 任务接口。视频、音频及通用异步任务的 multipart 行为作为通用兼容模式实现，正式使用前仍需通过端到端联调确认后端字段接收方式。测试只验证请求组装，不会真实上传或创建任务。

## 输出与运行数据

| 内容 | 位置或来源 |
| --- | --- |
| Client Key | macOS 钥匙串中的生成授权条目 |
| 本地会话文件 | `~/Library/Application Support/Flaq CLI/session.json` |
| 调用日志 | Asset Skill 打包环境为 `<skill-root>/workspace/_logs/YYYY-MM-DD.log` |
| 模型配置 | 开发环境 `model-catalog/`；打包环境为可执行文件同目录的 `model-catalog/` |
| CLI 成功结果 | 标准输出中的单行 JSON |
| CLI 错误 | 标准错误中的单行机器可读 JSON |
| 生成文件 | `--output-dir` 指定的绝对目录 |

下载过程中如果后续文件失败，CLI 会清理本次已经下载的文件，使同一个 task ID 可以安全重试。它不会覆盖已存在的同名文件。

## 调用日志

打包到 Asset Skill 后，CLI 与管理界面共享：

```text
asset-skill/workspace/_logs/
├── 2026-08-17.log
└── 2026-08-18.log
```

日志采用一行一个 JSON 对象的格式，记录服务启停、授权状态变更、模型读取和重载，以及任务 submit、get、wait、download 和 run。每条记录包含时间、操作、状态、耗时及可用于排查的请求或结果摘要。日志默认保留 30 天，过期的按天日志文件会自动删除。

Client Key、API Key、Authorization、cookie、password、secret、本地 session、bootstrap token、refresh token 和 `signedUrl` 会被替换成 `[REDACTED]`。Bearer 文本以及 URL 中常见的 token、key、credential、signature 等敏感查询参数也会被脱敏。上游原始错误响应不会写入日志。提示词、素材 URL 和本地路径仍可能为了排查问题而保留，因此对外发送复制的日志前应先检查内容。管理界面可以按日期查看、自动刷新、复制单条或当天全部日志，并可在二次确认后永久清除某一天或全部日志。

开发环境没有位于 Asset Skill 包内时，日志默认写入 `~/Library/Application Support/Flaq CLI/logs/`；可以通过 `FLAQ_CLI_LOG_DIR` 指定验证目录。正式打包环境会根据 `asset-skill/tools/flaq-cli/flaq` 的位置自动写入 Skill 的 `workspace/_logs/`。

## 模型配置热更新

每个型号使用一份独立 JSON：

```text
model-catalog/<vendor>/<model-id>.json
```

新增或更新模型配置的流程：

```text
新增或替换 JSON
→ 执行 models validate
→ 在界面点击“重新加载模型配置”或执行 models reload
→ 新配置进入当前服务的模型列表
```

只修改模型 JSON 不需要重新编译可执行文件。修改 `src/` 中的 CLI 代码后必须重新构建。

模型配置必须满足：

- 文件名与 `id` 一致。
- 一级目录名与 `vendor` 一致。
- 每个后端 `modelName` 在全目录唯一。
- operation 明确 required、optional、prohibited 和 fields。
- 允许 URL 或本地文件的字段使用 `format: "media-input"`；仅允许 URL 的字段继续使用 `format: "http-url"`。
- 图片 prompt 的 `maxLength` 为 2000，视频为 5000。

## 构建与交付

构建独立 macOS 可执行文件：

```bash
pnpm build
```

构建输出：

```text
dist/flaq
```

公开分发时，应从可信构建环境生成可执行文件，并为正式 Release 提供代码签名、公证和独立校验值。仓库不包含签名证书或任何可复用的发行私钥；在尚未配置 Apple Developer 签名身份前，不能把未签名文件描述为已经验证的官方构建。

完整发行包或 Skill 集成不能只有一个可执行文件，应保持：

```text
flaq-cli/
├── flaq
├── start.command
├── model-catalog/
│   └── <vendor>/<model-id>.json
└── schemas/
    └── model-catalog-v1.schema.json
```

`flaq`、`start.command` 和 `model-catalog/` 必须位于同一层级。打包后更新模型 JSON 仍然不需要重新编译，只需要重载服务；修改 CLI 源码才需要重新构建并替换 `flaq`。

### 一键构建并迁移到 Asset Skill

默认目录关系为 `flaq-cli` 和 `agent-skills` 位于同一个父目录。执行：

```bash
pnpm package:skill
```

脚本会依次：

1. 检查本机构建环境中的 pnpm 和 Bun。
2. 执行 `pnpm build`。
3. 组装 `flaq`、`start.command`、`model-catalog/` 和 `schemas/`。
4. 在 Skill 的 `tools/` 内创建脚本专用 staging 并验证可执行文件和模型目录。
5. 复制到 `asset-skill/tools/flaq-cli/` 后再次验证。

如果 Asset Skill 不在默认同级位置，直接传入绝对目录：

```bash
zsh scripts/package-to-asset-skill.sh /absolute/path/to/asset-skill
```

脚本不会删除目标目录中的额外文件。发现旧包中存在新包没有的文件时会停止并列出文件，等待人工确认。

## 开发验证

以下命令都不会提交真实生成任务：

```bash
pnpm ts-check
pnpm test
pnpm start models validate
```

安全测试会使用虚构的 canary 凭证验证：不安全的远程 HTTP 在读取 Key 前被拒绝、不同 Origin 不共用 Client Key、授权请求禁止跳转、multipart 请求不手动覆盖 boundary、上游原始错误不会进入本地响应和日志。测试不会请求真实生成接口。

不要使用 `task submit` 或 `task run` 做普通验证，因为它们是付费任务入口。

## 常见问题

### 为什么 `pnpm start -- serve --open` 只显示帮助？

这里不需要额外的 `--`。正确命令是：

```bash
pnpm start serve --open
```

### Skill 提示 `LOCAL_SERVICE_NOT_RUNNING`

开发环境运行 `pnpm start serve --open`；打包环境双击 `start.command`。服务启动后重新执行 `flaq status`。

### 新模型 JSON 没有出现在列表里

先运行 `models validate`。校验通过后在管理界面点击“重新加载模型配置”，或者执行 `models reload`。

### 修改模型 JSON 后要不要重新构建？

不需要。模型 JSON 是运行时递归扫描的配置。只有修改 TypeScript 源码或构建方式时才需要重新构建。
