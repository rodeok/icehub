import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRateLimit extends Document {
  key: string;       // Identifier: e.g., "rate_limit:subscribe:127.0.0.1"
  points: number;    // Current request count
  expireAt: Date;    // TTL for automatic reset
}

const RateLimitSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    points: { type: Number, required: true, default: 0 },
    expireAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Create a TTL index that automatically deletes documents at the expireAt time
RateLimitSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const RateLimit: Model<IRateLimit> = 
  mongoose.models.RateLimit || mongoose.model<IRateLimit>('RateLimit', RateLimitSchema);

export default RateLimit;
