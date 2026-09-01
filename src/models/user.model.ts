import mongoose, { Schema, Document } from "mongoose";

export interface IPushSubscription {
    endpoint: string;
    expirationTime?: number | null;
    keys: {
        p256dh: string;
        auth: string;
    };
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpiresAt?: Date;
    pushSubscriptions: IPushSubscription[];
}

const PushSubscriptionSchema = new Schema<IPushSubscription>(
    {
        endpoint: { type: String, required: true },
        expirationTime: { type: Number, default: null },
        keys: {
            p256dh: { type: String, required: true },
            auth: { type: String, required: true },
        },
    },
    { _id: false },
);

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        passwordResetToken: { type: String, select: false },
        passwordResetExpiresAt: { type: Date, select: false },
        pushSubscriptions: { type: [PushSubscriptionSchema], default: [] },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
