import { Request, Response, NextFunction } from 'express';
import { TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

// Define the validation schema interface
interface ValidationSchema {
  params?: TSchema;
  body?: TSchema;
  query?: TSchema;
}

// Main validation middleware function
export function validateRequest(schema: ValidationSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: any[] = [];

    // Validate params
    if (schema.params) {
      if (!Value.Check(schema.params, req.params)) {
        const paramErrors = [...Value.Errors(schema.params, req.params)];
        errors.push({
          location: 'params',
          errors: paramErrors.map((err) => ({
            path: err.path,
            message: err.message,
            value: err.value,
          })),
        });
      } else {
        req.params = Value.Decode(schema.params, req.params);
      }
    }

    // Validate body
    if (schema.body) {
      if (!Value.Check(schema.body, req.body)) {
        const bodyErrors = [...Value.Errors(schema.body, req.body)];
        errors.push({
          location: 'body',
          errors: bodyErrors.map((err) => ({
            path: err.path,
            message: err.message,
            value: err.value,
          })),
        });
      } else {
        req.body = Value.Decode(schema.body, req.body);
      }
    }

    // Validate query
    if (schema.query) {
      if (!Value.Check(schema.query, req.query)) {
        const queryErrors = [...Value.Errors(schema.query, req.query)];
        errors.push({
          location: 'query',
          errors: queryErrors.map((err) => ({
            path: err.path,
            message: err.message,
            value: err.value,
          })),
        });
      } else {
        req.query = Value.Decode(schema.query, req.query);
      }
    }

    // If there are validation errors, return 422 immediately
    console.log('errors', errors);
    if (errors.length > 0) {
      res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors,
      });
      return;
    }

    // If all validations pass, continue to next middleware
    next();
  };
}
