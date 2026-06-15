import { clsUserData } from '../dal/userDAL';
import { clsSettings } from '../supabase';

export class clsUserBusiness {
  static async RegisterUser({ user_name, email, password }) {
    if (!user_name?.trim()) throw new Error('Username is required');
    if (!email?.trim() || !email.includes('@')) throw new Error('Valid email is required');
    if (!password || password.length < 6) throw new Error('Password must be at least 6 characters');
    return clsUserData.AddNewUser({
      user_name: user_name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
  }

  static async LoginUser({ email, password }) {
    if (!email?.trim()) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    return clsUserData.Login({ email: email.trim().toLowerCase(), password });
  }

  static async FindUserByEmail(email) {
    if (!email?.trim() || !email.includes('@')) throw new Error('Valid email is required');
    return clsUserData.FindByEmail(email.trim().toLowerCase());
  }

  static async FindUserById() {
    const { data: { user }, error } = await clsSettings.clsConnectionString.auth.getUser();
    if (error) throw error;
    return user;
  }

  static async UpdateUser(userId, updates) {
    if (!userId) throw new Error('User ID is required');
    if (!updates || Object.keys(updates).length === 0) throw new Error('No updates provided');
    return clsUserData.UpdateUser(userId, updates);
  }

  static async DeleteUser(userId) {
    if (!userId) throw new Error('User ID is required');
    return clsUserData.DeleteUser(userId);
  }

  static async LogoutUser() {
    const { error } = await clsSettings.clsConnectionString.auth.signOut();
    if (error) throw error;
  }
}
