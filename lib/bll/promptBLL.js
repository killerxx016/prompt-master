import { clsPromptData } from '../dal/promptDAL';

export class clsPromptBusiness {
  static async CreateNewPrompt({ user_id, original_prompt, improved_prompt, mode }) {
    if (!user_id) throw new Error('User ID is required');
    if (!original_prompt?.trim() || original_prompt.trim().length < 3)
      throw new Error('Prompt is too short');
    if (!improved_prompt?.trim()) throw new Error('Improved prompt is required');
    return clsPromptData.AddNewPrompt({
      user_id,
      original_prompt: original_prompt.trim(),
      improved_prompt: improved_prompt.trim(),
      mode: mode || 'general',
    });
  }

  static async FetchUserPrompts(userId) {
    if (!userId) throw new Error('User ID is required');
    return clsPromptData.GetUserPrompts(userId);
  }

  static async RemovePrompt(generatedId) {
    if (!generatedId) throw new Error('Prompt ID is required');
    return clsPromptData.DeletePrompt(generatedId);
  }
}
