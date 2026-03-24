import { z } from 'zod';
import validator from 'validator';

/**
 * Utility for strict input validation and sanitization using Zod.
 */

// Strict sanitization helper
export const sanitizeString = (val: string) => {
  return validator.escape(validator.trim(val));
};

// Common base schemas
export const schemas = {
  email: z.string()
    .email({ message: 'Invalid email format' })
    .max(255)
    .transform(val => val.toLowerCase().trim()),
    
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name is too long' })
    .transform(val => sanitizeString(val)),
    
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100),
    
  objectId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ID format' }),
    
  date: z.string()
    .refine(val => !isNaN(Date.parse(val)), { message: 'Invalid date format' })
    .transform(val => new Date(val)),

  phone: z.string()
    .regex(/^\+?[0-9]\d{9,14}$/, { message: 'Invalid phone number' }),
};

export const registerSchema = z.object({
  fullName: schemas.name,
  email: schemas.email,
  password: schemas.password,
  phoneNumber: schemas.phone.optional(),
  address: z.string().max(500).transform(val => sanitizeString(val)).optional(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  programId: schemas.objectId.optional(),
}).strict();

export const bookingSchema = z.object({
  fullName: schemas.name,
  email: schemas.email,
  phone: schemas.phone,
  planTitle: z.string().min(1).max(200),
  selectedPrice: z.string().min(1).max(200),
  bookingType: z.enum(['daily', 'weekly', 'monthly']),
  startDate: schemas.date,
  endDate: schemas.date,
  timeSlot: z.string().max(100).optional(),
  paymentReference: z.string().min(1).max(200),
  amount: z.number().positive(),
}).strict();

export const paymentInitializeSchema = z.object({
  programId: schemas.objectId.optional(),
  customAmount: z.number().positive().optional(),
  paymentType: z.enum(['full', 'part']).optional(),
}).strict();

export const paymentVerifySchema = z.object({
  reference: z.string().min(1).max(255),
  programId: schemas.objectId.optional(),
  fullName: schemas.name.optional(),
  email: schemas.email.optional(),
  phone: schemas.phone.optional(),
  learningMode: z.string().max(100).optional(),
}).strict();

/**
 * Validates data against a Zod schema and strips unexpected fields.
 */
export async function validateRequest<T>(schema: z.ZodType<T>, data: any) {
  // .strict() forces a rejection of unexpected fields
  // However, Zod by default strips them if not using .strict()
  // We'll use .safeParse to handle errors gracefully
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const formattedErrors = result.error.issues.map((err: z.core.$ZodIssue) => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    return {
      success: false,
      errors: formattedErrors,
      errorResponse: {
        error: 'Validation Failed',
        details: formattedErrors
      }
    };
  }
  
  return {
    success: true,
    data: result.data
  };
}
