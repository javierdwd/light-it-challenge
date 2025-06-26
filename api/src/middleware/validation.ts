import { type AnySchema } from 'ajv';
import { Request, Response, NextFunction } from 'express';

import ajv from '@/libs/ajv';

// Validation middleware factory
export const validateRequest = (schema: unknown) => {
  const validate = ajv.compile(schema as AnySchema);

  return (req: Request, res: Response, next: NextFunction): void => {
    const isValid = validate(req.body);

    if (!isValid) {
      const errors =
        validate.errors?.map((error) => ({
          field: error.instancePath || 'body',
          message: error.message,
          value: error.data,
        })) || [];

      res.status(422).json({
        error: 'Validation failed',
        details: errors,
      });
      return;
    }

    next();
  };
};
