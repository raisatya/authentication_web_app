import { Schema, model } from "mongoose";
import { Password } from "../services/Password";

//User Interface: It represents the raw object structure that User document looks like in mongodb.
interface UserInterface { 
    email: string;
    username: string;
    password: string;
    fullname: string;
}

const userSchema = new Schema<UserInterface>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = model<UserInterface>('User', userSchema);

export default User;