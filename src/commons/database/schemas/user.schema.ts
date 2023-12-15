import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, lowercase:true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: ['admin', 'member', 'client'], default: 'client', required: true })
    role: string;

    @Prop({default:true})
    isActive:boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
