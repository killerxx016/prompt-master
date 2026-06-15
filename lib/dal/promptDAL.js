import { clsSettings } from '../supabase';

export class clsPromptData {
  static get db() {
    return clsSettings.clsConnectionString;
  }

  static async AddNewPrompt({ user_id, original_prompt, improved_prompt }) {
    const { data, error } = await clsPromptData.db
      .from('generated_prompts')
      .insert({ user_id, original_prompt, improved_prompt })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async GetUserPrompts(userId) {
    const { data, error } = await clsPromptData.db
      .from('generated_prompts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);
    if (error) throw error;
    return data;
  }

  static async DeletePrompt(generatedId) {
    const { error } = await clsPromptData.db
      .from('generated_prompts')
      .delete()
      .eq('generated_id', generatedId);
    if (error) throw error;
  }
}
