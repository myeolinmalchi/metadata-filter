const json = require('./package.json');

json.scripts['run:init-traits'] = 'node-ts init-traits.ts';
require('fs').writeFileSync(
    process.cwd() + '/package.json',
    JSON.stringify(json, null, 2),
);
