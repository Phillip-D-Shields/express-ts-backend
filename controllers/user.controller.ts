import User from "../models/user.model";
import { collections } from "../services/db.service";


export async function getAllUsers() {
  const users = await collections.users?.find({}).toArray();
  if (!users) return { success: false, message: 'no users found' };
  return { success: true, users: {users} };
}

export async function getOneUser(pin: string) {
  const user = await collections.users?.findOne({ pin: pin });
  if (!user) return { success: false, message: `no user found with pin ${pin}` };
  return { success: true, user: user };
}

export async function postOneUser(user: User) {
  const pinExists = await collections.users?.findOne({ pin: user.pin });
  if (pinExists) return { success: false, message: `user with pin ${user.pin} already exists` };
  const nameExists = await collections.users?.findOne({ name: user.name });
  if (nameExists) return { success: false, message: `user with name ${user.name} already exists` };

  try {
    const newUser = user as User;
    await collections.users?.insertOne(newUser);
    return { success: true, message: `user: ${user.name} has been created and assigned pin: ${user.pin}` };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function putOneUserByName(name: string, userData: User) {
  const user = await collections.users?.findOne({ name: name });
  if (!user) return { success: false, message: `no user found with name ${name}` };

  try {
    await collections.users?.updateOne({ name: name }, { $set: userData });
    return { success: true, message: `user with name ${name} has been updated` };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function deleteOneUserByPin(pin: string) {
  const user = await collections.users?.findOne({ pin: pin });
  if (!user) return { success: false, message: `no user found with pin ${pin}` };

  try {
    await collections.users?.deleteOne({ pin: pin });
    return { success: true, message: `user with pin ${pin} has been deleted` };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function deleteOneUserByName(name: string) {
  const user = await collections.users?.findOne({ name: name });
  if (!user) return { success: false, message: `no user found with name ${name}` };

  try {
    await collections.users?.deleteOne({ name: name });
    return { success: true, message: `user with name ${name} has been deleted` };
  } catch (error) {
    return { success: false, message: error };
  }
}