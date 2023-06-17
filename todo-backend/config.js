const YAML = require('yaml');
const {readFileSync} = require('fs');
let config;

const YAML_CONFIG_FILE_PATH = '../../config/config.yml';

try {
    const yamlFile = readFileSync(YAML_CONFIG_FILE_PATH, 'utf8');
    config = YAML.parse(yamlFile).config;
} catch (e) {
    console.error('[CONFIG] unable to read config file', e);
    process.exit(1);
}

if (!config) {
    console.error('[CONFIG] configuration file is required');
    process.exit(1);
}

module.exports = config;

