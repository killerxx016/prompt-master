import { createClient } from '@supabase/supabase-js';

export class clsSettings {
  static #client = null;

  static get clsConnectionString() {
    if (!clsSettings.#client) {
      clsSettings.#client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
    }
    return clsSettings.#client;
  }
}
