import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public name: string,
    public pin: string,
    private id?: ObjectId,
  ) {}
}