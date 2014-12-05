Package.describe({
  name: 'rcy:importsheet',
  summary: ' /* Fill me in! */ ',
  version: '0.0.4',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['templating', 'harrison:papa-parse@1.0.0']);
  api.addFiles(['importsheet-common.js']);
  api.addFiles(['importsheet.html', 'importsheet-client.js'], 'client');
  api.addFiles(['importsheet-server.js'], 'server');
  api.export('importSheet');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('rcy:importsheet');
  api.addFiles('importsheet-tests.js');
});
