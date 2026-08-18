import { APP_NAME, APP_VERSION } from '../constants.ts';

export function renderManagementPage(): string {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${APP_NAME}</title>
  <style>
    :root {
      color-scheme: dark;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #090b10;
      color: #f4f6fb;
    }
    * { box-sizing: border-box; }
    *::-webkit-scrollbar { width: 10px; height: 10px; }
    *::-webkit-scrollbar-track { background: #0f1219; }
    *::-webkit-scrollbar-thumb { background: #343b4a; border: 2px solid #0f1219; border-radius: 999px; }
    body {
      min-height: 100vh;
      margin: 0;
      background:
        radial-gradient(circle at 12% 5%, rgba(103, 91, 255, 0.18), transparent 34rem),
        radial-gradient(circle at 88% 90%, rgba(30, 188, 150, 0.12), transparent 30rem),
        #090b10;
    }
    main { width: min(920px, calc(100% - 32px)); margin: 0 auto; padding: 64px 0; }
    header { margin-bottom: 28px; }
    .eyebrow { color: #969fb2; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; }
    h1 { margin: 10px 0 8px; font-size: clamp(32px, 6vw, 54px); letter-spacing: -0.04em; }
    .subtitle { margin: 0; color: #aeb5c4; line-height: 1.7; }
    .grid { display: grid; grid-template-columns: 1fr 1.35fr; gap: 18px; }
    .card {
      border: 1px solid #242a36;
      border-radius: 20px;
      background: rgba(18, 21, 29, 0.88);
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
      padding: 24px;
    }
    h2 { margin: 0 0 18px; font-size: 18px; }
    .status-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 13px 0; border-bottom: 1px solid #252b37; }
    .status-row:last-child { border-bottom: 0; }
    .status-label { color: #aeb5c4; }
    .status-value { display: inline-flex; align-items: center; gap: 8px; font-weight: 650; }
    .origin-value { max-width: 220px; overflow-wrap: anywhere; text-align: right; }
    .dot { width: 9px; height: 9px; border-radius: 50%; background: #697186; box-shadow: 0 0 0 4px rgba(105, 113, 134, 0.12); }
    .dot.good { background: #36d399; box-shadow: 0 0 0 4px rgba(54, 211, 153, 0.12); }
    .dot.warn { background: #f5b942; box-shadow: 0 0 0 4px rgba(245, 185, 66, 0.12); }
    label { display: block; margin-bottom: 10px; color: #cbd1dc; font-size: 14px; }
    input {
      width: 100%;
      border: 1px solid #303746;
      border-radius: 12px;
      background: #0d1016;
      color: #fff;
      font: inherit;
      outline: none;
      padding: 13px 14px;
    }
    input:focus { border-color: #756cff; box-shadow: 0 0 0 3px rgba(117, 108, 255, 0.16); }
    .hint { margin: 10px 0 0; color: #858ea1; font-size: 13px; line-height: 1.6; }
    .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
    button {
      appearance: none;
      border: 0;
      border-radius: 11px;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      padding: 12px 16px;
    }
    button:disabled { cursor: wait; opacity: 0.58; }
    .primary { background: #7267ff; color: #fff; }
    .secondary { background: #252b37; color: #e7eaf0; }
    .danger { background: rgba(244, 83, 101, 0.12); color: #ff8997; border: 1px solid rgba(244, 83, 101, 0.25); }
    .message { min-height: 24px; margin: 16px 0 0; color: #9ea7b9; font-size: 14px; }
    .message.error { color: #ff8997; }
    .message.success { color: #6ee7b7; }
    .catalog-card { margin-top: 18px; }
    .section-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
    .section-heading h2 { margin-bottom: 6px; }
    .section-heading .hint { margin: 0; overflow-wrap: anywhere; }
    .log-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 10px; }
    select {
      border: 1px solid #303746;
      border-radius: 11px;
      background: #0d1016;
      color: #e7eaf0;
      font: inherit;
      outline: none;
      padding: 11px 13px;
    }
    select:focus { border-color: #756cff; box-shadow: 0 0 0 3px rgba(117, 108, 255, 0.16); }
    .model-list { display: grid; gap: 12px; }
    .model-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
      border: 1px solid #292f3c;
      border-radius: 14px;
      background: #0d1016;
      padding: 16px;
    }
    .model-id { margin: 0 0 6px; color: #f4f6fb; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; }
    .model-meta { margin: 0; color: #858ea1; font-size: 13px; }
    .operation-list { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
    .operation-tag {
      border: 1px solid #343b4a;
      border-radius: 999px;
      background: #181d27;
      color: #bcc4d3;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      padding: 6px 9px;
    }
    .empty-state { margin: 0; color: #858ea1; font-size: 14px; }
    .logs-card { margin-top: 18px; }
    .log-list { display: grid; gap: 10px; max-height: 560px; overflow: auto; padding-right: 4px; }
    .log-item {
      border: 1px solid #292f3c;
      border-radius: 14px;
      background: #0d1016;
      padding: 14px;
    }
    .log-item.error { border-color: rgba(244, 83, 101, 0.38); }
    .log-item-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
    .log-operation { margin: 0; color: #f4f6fb; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; }
    .log-meta { margin: 5px 0 0; color: #858ea1; font-size: 12px; }
    .log-copy { flex: 0 0 auto; padding: 8px 11px; font-size: 12px; }
    .log-json {
      margin: 12px 0 0;
      border-top: 1px solid #252b37;
      color: #b9c1d0;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
      line-height: 1.6;
      overflow-wrap: anywhere;
      padding-top: 12px;
      white-space: pre-wrap;
    }
    .log-message { min-height: 20px; margin: 10px 0 0; color: #858ea1; font-size: 13px; }
    .log-message.error { color: #ff8997; }
    .log-message.success { color: #6ee7b7; }
    footer { margin-top: 22px; color: #737c90; font-size: 12px; text-align: center; }
    @media (max-width: 720px) {
      main { padding: 36px 0; }
      .grid { grid-template-columns: 1fr; }
      .section-heading { flex-direction: column; }
      .log-toolbar { justify-content: flex-start; }
      .model-item { flex-direction: column; gap: 12px; }
      .operation-list { justify-content: flex-start; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <div class="eyebrow">Local Bridge</div>
      <h1>Flaq CLI 服务</h1>
      <p class="subtitle">管理本机 Client Key，并保持 Flaq CLI 服务运行，以供 Codex 通过 URL 或本地文件调用 Flaq 生成接口。</p>
    </header>

    <div class="grid">
      <section class="card" aria-labelledby="status-title">
        <h2 id="status-title">服务状态</h2>
        <div class="status-row">
          <span class="status-label">CLI 服务</span>
          <span class="status-value"><span class="dot good"></span>运行中</span>
        </div>
        <div class="status-row">
          <span class="status-label">生成 API</span>
          <span id="api-origin-state" class="status-value origin-value">检查中</span>
        </div>
        <div class="status-row">
          <span class="status-label">Client Key</span>
          <span class="status-value"><span id="auth-dot" class="dot"></span><span id="auth-state">检查中</span></span>
        </div>
        <div class="status-row">
          <span class="status-label">版本</span>
          <span class="status-value">${APP_VERSION}</span>
        </div>
        <div class="status-row">
          <span class="status-label">模型配置</span>
          <span class="status-value"><span id="catalog-dot" class="dot"></span><span id="catalog-state">检查中</span></span>
        </div>
        <div class="actions">
          <button id="reload-catalog" class="secondary" type="button">重新加载模型配置</button>
        </div>
      </section>

      <section class="card" aria-labelledby="auth-title">
        <h2 id="auth-title">授权设置</h2>
        <form id="key-form" class="credential-block">
          <label for="client-key">Client Key</label>
          <input id="client-key" name="client-key" type="password" autocomplete="off" spellcheck="false" placeholder="输入在 Flaq 管理页面创建的专用 Key">
          <p id="client-key-hint" class="hint">Key 只会提交给当前本地服务，并按生成 API 地址隔离保存到 macOS 钥匙串。</p>
          <div class="actions">
            <button id="save-key" class="primary" type="submit">保存或替换 Key</button>
            <button id="clear-key" class="danger" type="button">清除 Key</button>
            <button id="refresh-status" class="secondary" type="button">刷新状态</button>
          </div>
        </form>
        <p class="hint">模型配置标记为媒体输入的字段，可直接填写 HTTP(S) URL 或本地绝对路径；本地文件会随生成请求直传，无需额外上传授权。</p>
        <p id="message" class="message" role="status" aria-live="polite"></p>
      </section>
    </div>

    <section class="card catalog-card" aria-labelledby="catalog-title">
      <h2 id="catalog-title">已加载模型</h2>
      <div id="model-list" class="model-list">
        <p class="empty-state">正在读取模型配置……</p>
      </div>
    </section>

    <section class="card logs-card" aria-labelledby="logs-title">
      <div class="section-heading">
        <div>
          <h2 id="logs-title">调用日志</h2>
          <p id="log-path" class="hint">正在读取日志目录……</p>
          <p class="hint">日志默认保留 30 天，可能包含提示词、素材 URL 和本地路径；对外发送前请先检查内容。</p>
        </div>
        <div class="log-toolbar">
          <label for="log-date" style="margin: 0;">日期</label>
          <select id="log-date" aria-label="日志日期"></select>
          <button id="refresh-logs" class="secondary" type="button">刷新日志</button>
          <button id="copy-all-logs" class="secondary" type="button">复制当天日志</button>
          <button id="clear-date-logs" class="danger" type="button">清除当天日志</button>
          <button id="clear-all-logs" class="danger" type="button">清除全部日志</button>
        </div>
      </div>
      <div id="log-list" class="log-list" aria-live="polite">
        <p class="empty-state">正在读取调用日志……</p>
      </div>
      <p id="log-message" class="log-message" role="status" aria-live="polite"></p>
    </section>

    <footer>关闭启动终端后，Flaq CLI 服务将停止运行。</footer>
  </main>
  <script>
    const authDot = document.querySelector('#auth-dot');
    const authState = document.querySelector('#auth-state');
    const apiOriginState = document.querySelector('#api-origin-state');
    const clientKeyHint = document.querySelector('#client-key-hint');
    const catalogDot = document.querySelector('#catalog-dot');
    const catalogState = document.querySelector('#catalog-state');
    const clearButton = document.querySelector('#clear-key');
    const form = document.querySelector('#key-form');
    const input = document.querySelector('#client-key');
    const message = document.querySelector('#message');
    const modelList = document.querySelector('#model-list');
    const refreshButton = document.querySelector('#refresh-status');
    const reloadCatalogButton = document.querySelector('#reload-catalog');
    const saveButton = document.querySelector('#save-key');
    const logDateSelect = document.querySelector('#log-date');
    const logList = document.querySelector('#log-list');
    const logPath = document.querySelector('#log-path');
    const logMessage = document.querySelector('#log-message');
    const refreshLogsButton = document.querySelector('#refresh-logs');
    const copyAllLogsButton = document.querySelector('#copy-all-logs');
    const clearDateLogsButton = document.querySelector('#clear-date-logs');
    const clearAllLogsButton = document.querySelector('#clear-all-logs');
    let authConfigured = false;
    let currentLogEntries = [];
    let currentLogRaw = '';

    function setBusy(value) {
      saveButton.disabled = value;
      clearButton.disabled = value || !authConfigured;
      refreshButton.disabled = value;
      reloadCatalogButton.disabled = value;
    }

    function showMessage(text, type = '') {
      message.textContent = text;
      message.className = 'message' + (type ? ' ' + type : '');
    }

    function renderModelList(models) {
      modelList.replaceChildren();
      if (!models.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = '当前没有已加载的模型。';
        modelList.append(emptyState);
        return;
      }

      for (const model of models) {
        const item = document.createElement('article');
        item.className = 'model-item';

        const identity = document.createElement('div');
        const modelId = document.createElement('p');
        modelId.className = 'model-id';
        modelId.textContent = model.id;
        const meta = document.createElement('p');
        meta.className = 'model-meta';
        meta.textContent = model.vendor + ' · ' + (model.mediaType === 'image' ? '图片' : '视频');
        identity.append(modelId, meta);

        const operations = document.createElement('div');
        operations.className = 'operation-list';
        for (const operation of model.operations) {
          const tag = document.createElement('span');
          tag.className = 'operation-tag';
          tag.textContent = operation.id;
          tag.title = operation.modelName;
          operations.append(tag);
        }

        item.append(identity, operations);
        modelList.append(item);
      }
    }

    function showLogMessage(text, type = '') {
      logMessage.textContent = text;
      logMessage.className = 'log-message' + (type ? ' ' + type : '');
    }

    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      const temporary = document.createElement('textarea');
      temporary.value = text;
      temporary.setAttribute('readonly', '');
      temporary.style.position = 'fixed';
      temporary.style.opacity = '0';
      document.body.append(temporary);
      temporary.select();
      const copied = document.execCommand('copy');
      temporary.remove();
      if (!copied) {
        throw new Error('浏览器未允许复制。');
      }
    }

    function renderLogs(entries) {
      currentLogEntries = entries;
      logList.replaceChildren();
      if (!entries.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = '当天还没有调用日志。';
        logList.append(emptyState);
        return;
      }

      entries
        .map((record, index) => ({ index, record }))
        .reverse()
        .forEach(({ index, record }) => {
          const item = document.createElement('article');
          item.className = 'log-item' + (record.level === 'error' ? ' error' : '');

          const header = document.createElement('div');
          header.className = 'log-item-header';
          const identity = document.createElement('div');
          const operation = document.createElement('p');
          operation.className = 'log-operation';
          operation.textContent = record.operation;
          const meta = document.createElement('p');
          meta.className = 'log-meta';
          const timestamp = record.timestamp ? new Date(record.timestamp).toLocaleString() : '时间未知';
          meta.textContent = timestamp + ' · ' + record.status + (record.durationMs === undefined ? '' : ' · ' + record.durationMs + 'ms');
          identity.append(operation, meta);

          const copyButton = document.createElement('button');
          copyButton.className = 'secondary log-copy';
          copyButton.type = 'button';
          copyButton.textContent = '复制本条';
          copyButton.addEventListener('click', async () => {
            try {
              await copyText(JSON.stringify(currentLogEntries[index], null, 2));
              showLogMessage('本条日志已复制。', 'success');
            } catch (error) {
              showLogMessage(error.message, 'error');
            }
          });
          header.append(identity, copyButton);

          const details = document.createElement('pre');
          details.className = 'log-json';
          details.textContent = JSON.stringify(record, null, 2);
          item.append(header, details);
          logList.append(item);
        });
    }

    async function refreshLogDates() {
      const previousDate = logDateSelect.value;
      const data = await request('/api/logs/dates');
      logPath.textContent = '目录：' + data.directory + ' · 保留 ' + data.retentionDays + ' 天';
      logDateSelect.replaceChildren();
      const dates = data.dates.length ? data.dates : [data.currentDate];
      dates.forEach((date) => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        logDateSelect.append(option);
      });
      logDateSelect.value = dates.includes(previousDate) ? previousDate : dates[0];
    }

    async function refreshLogs(refreshDates = false, silent = false) {
      try {
        if (refreshDates || !logDateSelect.value) {
          await refreshLogDates();
        }
        const data = await request('/api/logs?date=' + encodeURIComponent(logDateSelect.value));
        currentLogRaw = data.raw;
        renderLogs(data.entries);
        if (!silent) {
          showLogMessage('日志已刷新。', 'success');
        }
      } catch (error) {
        if (!silent) {
          showLogMessage(error.message, 'error');
        }
      }
    }

    async function request(path, options) {
      const response = await fetch(path, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...(options && options.headers) },
      });
      const body = await response.json();
      if (!response.ok || !body.ok) {
        throw new Error(body.error && body.error.message ? body.error.message : '本地服务请求失败。');
      }
      return body.data;
    }

    async function refreshStatus() {
      setBusy(true);
      try {
        const [status, catalog] = await Promise.all([
          request('/api/auth/status'),
          request('/api/models'),
        ]);
        authConfigured = status.configured;
        apiOriginState.textContent = status.apiBaseUrl;
        clientKeyHint.textContent = '此 Key 仅绑定 ' + status.credentialOrigin + '，不会自动复用到其他生成 API 地址，也不会写入浏览器存储、Skill 或项目目录。';
        authState.textContent = status.configured ? '已配置' : '未配置';
        authDot.className = status.configured ? 'dot good' : 'dot warn';
        catalogState.textContent = catalog.models.length + ' 个型号';
        catalogDot.className = 'dot good';
        renderModelList(catalog.models);
        showMessage(
          status.configured ? 'Client Key 已保存在本机。' : '请配置 Client Key。',
          status.configured ? 'success' : '',
        );
      } catch (error) {
        apiOriginState.textContent = '检查失败';
        authState.textContent = '检查失败';
        authDot.className = 'dot warn';
        catalogState.textContent = '检查失败';
        catalogDot.className = 'dot warn';
        renderModelList([]);
        showMessage(error.message, 'error');
      } finally {
        setBusy(false);
      }
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const clientKey = input.value.trim();
      if (!clientKey) {
        showMessage('请输入 Client Key。', 'error');
        return;
      }
      setBusy(true);
      showMessage('正在保存……');
      try {
        await request('/api/auth/key', {
          method: 'PUT',
          body: JSON.stringify({ clientKey }),
        });
        input.value = '';
        showMessage('Client Key 已保存。', 'success');
        await refreshStatus();
      } catch (error) {
        showMessage(error.message, 'error');
      } finally {
        setBusy(false);
      }
    });

    clearButton.addEventListener('click', async () => {
      if (!window.confirm('确定要从本机清除 Client Key 吗？')) {
        return;
      }
      setBusy(true);
      try {
        await request('/api/auth/key', { method: 'DELETE' });
        authConfigured = false;
        showMessage('Client Key 已清除。', 'success');
        await refreshStatus();
      } catch (error) {
        showMessage(error.message, 'error');
      } finally {
        setBusy(false);
      }
    });

    refreshButton.addEventListener('click', refreshStatus);
    reloadCatalogButton.addEventListener('click', async () => {
      setBusy(true);
      showMessage('正在重新加载模型配置……');
      try {
        const result = await request('/api/models/reload', { method: 'POST' });
        const catalog = await request('/api/models');
        catalogState.textContent = result.modelCount + ' 个型号';
        catalogDot.className = 'dot good';
        renderModelList(catalog.models);
        showMessage('模型配置已重新加载并即时生效。', 'success');
      } catch (error) {
        showMessage('重新加载失败，仍保留上一份有效配置：' + error.message, 'error');
      } finally {
        setBusy(false);
      }
    });
    logDateSelect.addEventListener('change', () => {
      void refreshLogs(false);
    });
    refreshLogsButton.addEventListener('click', () => {
      void refreshLogs(true);
    });
    copyAllLogsButton.addEventListener('click', async () => {
      if (!currentLogRaw) {
        showLogMessage('当天还没有可复制的日志。');
        return;
      }
      try {
        await copyText(currentLogRaw);
        showLogMessage('当天全部日志已复制。', 'success');
      } catch (error) {
        showLogMessage(error.message, 'error');
      }
    });
    clearDateLogsButton.addEventListener('click', async () => {
      const date = logDateSelect.value;
      if (!window.confirm('确定要永久删除 ' + date + ' 的日志吗？')) {
        return;
      }
      try {
        await request('/api/logs?date=' + encodeURIComponent(date), { method: 'DELETE' });
        await refreshLogs(true, true);
        showLogMessage(date + ' 的日志已清除。', 'success');
      } catch (error) {
        showLogMessage(error.message, 'error');
      }
    });
    clearAllLogsButton.addEventListener('click', async () => {
      if (!window.confirm('确定要永久删除全部调用日志吗？此操作无法撤销。')) {
        return;
      }
      try {
        await request('/api/logs/all', { method: 'DELETE' });
        await refreshLogs(true, true);
        showLogMessage('全部调用日志已清除。', 'success');
      } catch (error) {
        showLogMessage(error.message, 'error');
      }
    });
    refreshStatus();
    void refreshLogs(true);
    window.setInterval(() => {
      void refreshLogs(false, true);
    }, 3000);
  </script>
</body>
</html>`;
}
