import { clsSettings } from '../supabase';

export class clsUserData {
  static get db() {
    return clsSettings.clsConnectionString;
  }

  static async AddNewUser({ user_name, email, password }) {
    const { data, error } = await clsUserData.db.auth.signUp({
      email,
      password,
      options: { data: { user_name } },
    });
    if (error) throw error;
    return data;
  }

  static async Login({ email, password }) {
    const { data, error } = await clsUserData.db.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  static async FindByEmail(email) {
    const { data, error } = await clsUserData.db
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error) throw error;
    return data;
  }

  static async FindByUsername(username) {
    // Calls a SECURITY DEFINER function instead of querying `users` directly —
    // RLS blocks anonymous reads of other people's rows (correctly), but this
    // lookup has to run before the user is authenticated. The function only
    // ever returns the email for the given username, nothing else.
    const { data, error } = await clsUserData.db.rpc('get_email_by_username', {
      p_username: username,
    });
    if (error) throw error;
    if (!data) throw new Error('No account found with this username');
    return { email: data };
  }

  static async UpdateUser(userId, updates) {
    const { data, error } = await clsUserData.db
      .from('users')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async DeleteUser(userId) {
    const { error } = await clsUserData.db
      .from('users')
      .delete()
      .eq('user_id', userId);
    if (error) throw error;
  }
}
