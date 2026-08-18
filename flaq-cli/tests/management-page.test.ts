import assert from 'node:assert/strict';
import test from 'node:test';

import { renderManagementPage } from '../src/ui/management-page.ts';

test('renders the Chinese management interface without embedding a Client Key', () => {
  const html = renderManagementPage();
  assert.match(html, /Flaq CLI 服务/);
  assert.match(html, /保存或替换 Key/);
  assert.match(html, /本地绝对路径/);
  assert.match(html, /生成 API/);
  assert.match(html, /status\.credentialOrigin/);
  assert.doesNotMatch(html, /Access Token|access-token/);
  assert.match(html, /重新加载模型配置/);
  assert.match(html, /已加载模型/);
  assert.match(html, /调用日志/);
  assert.match(html, /复制当天日志/);
  assert.match(html, /复制本条/);
  assert.match(html, /日志默认保留 30 天/);
  assert.match(html, /清除当天日志/);
  assert.match(html, /清除全部日志/);
  assert.match(html, /\/api\/logs\/all/);
  assert.match(html, /\/api\/logs\/dates/);
  assert.match(html, /\/api\/logs\?date=/);
  assert.match(html, /renderModelList\(catalog\.models\)/);
  assert.match(html, /status\.configured \? 'success' : ''/);
  assert.doesNotMatch(html, /YOUR_API_KEY|secret-key|test-access-token/);
  assert.match(html, /autocomplete="off"/);
});
