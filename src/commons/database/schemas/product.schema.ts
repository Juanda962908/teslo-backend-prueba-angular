import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true }) // timestamps true automatiza la creación de los campos createAt y updateAt
export class Product {
  @Prop({ required: true, type: String })
  description: string;

  @Prop([String])
  images: string[];

  @Prop({ type: Number, required: true, default: 0 })
  inStock: number;

  @Prop({ type: Number, required: true, default: 0 })
  price: number;

  @Prop([{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }])
  sizes: string[];

  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, enum: ['shirts', 'pants', 'hoodies', 'hats'] })
  type: string;

  @Prop({ type: String, enum: ['men', 'women', 'kid', 'unisex'] })
  gender: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
