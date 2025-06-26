import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({
    allErrors: true,
    coerceTypes: true,
    useDefaults: true,
  });

// Add format support (email, uri, etc.)
addFormats(ajv);

export default ajv;