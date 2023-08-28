import { Schema, model, Document } from 'mongoose';

interface IApartment extends Document {
  id: string;
  title?: string;
  price?: number;
  html?:string;
  sent?:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IPage extends Document {
    city?: string;
    page?: number;
}

interface IUser extends Document {
  chatId?: number;
  username?: string
}

const apartmentSchema = new Schema<IApartment>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  price: Number,
  html: String,
  sent: Boolean,
}, { timestamps: true });

const pageSchema = new Schema<IPage>({
    city: String,
    page: Number,
  }, { timestamps: true });

const userSchema = new Schema<IUser>({
  chatId: Number,
  username: String,
}, { timestamps: true });

const ApartmentModel = model<IApartment>('Apartment', apartmentSchema);
const PageModel = model<IPage>('Page', pageSchema);
const UserModel = model<IUser>('User', userSchema)

export { ApartmentModel, PageModel, UserModel };