'use client';

import { useState, useEffect, useRef } from 'react';
import { IDEA_SUGGESTIONS } from '../data/ideaSuggestions';
import { IDEA_SUGGESTION_LOCALES } from '../data/ideaSuggestionLocales';
import { clsUserBusiness } from '../lib/bll/userBLL';
import { clsPromptBusiness } from '../lib/bll/promptBLL';
import { clsSettings } from '../lib/supabase';

const LANGUAGES = [
  { id: 'en', label: 'EN' },
  { id: 'tr', label: 'TR' },
  { id: 'ar', label: 'AR' },
];

const TEXT = {
  en: {
    poweredBy: 'Powered by Claude',
    title: 'Enhance Your Prompts',
    subtitle: 'Turn rough ideas into precise, effective prompts with AI.',
    placeholder: 'Paste your rough idea or prompt here...',
    chars: 'chars',
    shortcut: 'Ctrl+Enter',
    enhance: 'Enhance',
    enhancing: 'Enhancing...',
    warning: 'Warning',
    enhancedPrompt: 'Enhanced Prompt',
    copied: 'Copied!',
    copy: 'Copy',
    recent: 'Recent (click to reload)',
    modes: {
      general: 'General',
      coding: 'Coding',
      writing: 'Writing',
      marketing: 'Marketing',
    },
  },
  tr: {
    poweredBy: 'Claude ile desteklenir',
    title: 'Promptlarını Geliştir',
    subtitle: 'Ham fikirleri yapay zeka ile net ve etkili promptlara dönüştür.',
    placeholder: 'Ham fikrini veya promptunu buraya yapıştır...',
    chars: 'karakter',
    shortcut: 'Ctrl+Enter',
    enhance: 'Geliştir',
    enhancing: 'Geliştiriliyor...',
    warning: 'Uyarı',
    enhancedPrompt: 'Geliştirilmiş Prompt',
    copied: 'Kopyalandı!',
    copy: 'Kopyala',
    recent: 'Son kullanılanlar (yeniden yüklemek için tıkla)',
    modes: {
      general: 'Genel',
      coding: 'Kodlama',
      writing: 'Yazı',
      marketing: 'Pazarlama',
    },
  },
  ar: {
    poweredBy: 'مدعوم من Claude',
    title: 'حسّن مطالباتك',
    subtitle: 'حوّل الأفكار الأولية إلى مطالبات دقيقة وفعالة باستخدام الذكاء الاصطناعي.',
    placeholder: 'الصق فكرتك أو المطالبة الأولية هنا...',
    chars: 'حرف',
    shortcut: 'Ctrl+Enter',
    enhance: 'تحسين',
    enhancing: 'جار التحسين...',
    warning: 'تنبيه',
    enhancedPrompt: 'المطالبة المحسّنة',
    copied: 'تم النسخ!',
    copy: 'نسخ',
    recent: 'الأحدث (انقر لإعادة التحميل)',
    modes: {
      general: 'عام',
      coding: 'برمجة',
      writing: 'كتابة',
      marketing: 'تسويق',
    },
  },
};

const MODES = [
  { id: 'general',   icon: '\u2726' },
  { id: 'coding',    icon: '< />' },
  { id: 'writing',   icon: '\u270D' },
  { id: 'marketing', icon: '\u25C8' },
];

const SAVED_SUGGESTIONS_KEY = 'pm-saved-suggestions';
const LOGO_SRC = '/prompt-master-icon.png';

function BrandLogo({ className = '' }) {
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={LOGO_SRC}
      alt="Prompt Master"
    />
  );
}

function PasswordEyeIcon({ visible }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {visible ? (
        <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      ) : (
        <>
          <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M4 4l16 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function InstagramLink() {
  return (
    <a
      className="instagram-link"
      href="https://www.instagram.com/m.a5iz/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Instagram account @m.a5iz"
    >
      <InstagramIcon />
    </a>
  );
}

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const isCreateMode = mode === 'create';

  const switchMode = (selectedMode) => {
    setMode(selectedMode);
    setError('');
    setMessage('');
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      await clsUserBusiness.RegisterUser({ user_name: username, email, password });
      // Supabase signs the new user in automatically; sign back out so they
      // land on the login screen and confirm their credentials manually.
      try { await clsUserBusiness.LogoutUser(); } catch (_) {}
      setUsername('');
      setEmail('');
      setPassword('');
      switchMode('login');
      setMessage('Account created! Please log in.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      await clsUserBusiness.LoginUser({ email: identifier, password: loginPassword });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="auth-page">
      <InstagramLink />
      <section className="auth-window">
        <h1>{isCreateMode ? 'Create Account' : 'Login'}</h1>
        <p>{isCreateMode ? 'Create a local account to enter Prompt Master.' : 'Sign in to continue to Prompt Master.'}</p>

        <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            aria-selected={!isCreateMode}
            onClick={() => switchMode('login')}
            className={!isCreateMode ? 'auth-tab-active' : ''}
          >
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isCreateMode}
            onClick={() => switchMode('create')}
            className={isCreateMode ? 'auth-tab-active' : ''}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={isCreateMode ? handleCreateAccount : handleLogin} className="auth-form">
          {isCreateMode ? (
            <>
              <label>
                Username
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Password
                <span className="password-field">
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowRegisterPassword((current) => !current)}
                    aria-label={showRegisterPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showRegisterPassword}
                  >
                    <PasswordEyeIcon visible={showRegisterPassword} />
                  </button>
                </span>
              </label>
            </>
          ) : (
            <>
              <label>
                Email or username
                <input
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  autoComplete="username"
                  required
                />
              </label>

              <label>
                Password
                <span className="password-field">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowLoginPassword((current) => !current)}
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showLoginPassword}
                  >
                    <PasswordEyeIcon visible={showLoginPassword} />
                  </button>
                </span>
              </label>
            </>
          )}

          {error && <div className="auth-alert auth-alert-error">{error}</div>}
          {message && <div className="auth-alert auth-alert-success">{message}</div>}

          <button type="submit">
            {isCreateMode ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="auth-switch">
          <span>{isCreateMode ? 'Already have an account?' : "Don't have an account yet?"}</span>
          <button
            type="button"
            onClick={() => switchMode(isCreateMode ? 'login' : 'create')}
          >
            {isCreateMode ? 'Back to Login' : 'Create a New Account'}
          </button>
        </div>

        <p className="auth-note">Your account is securely stored in Supabase.</p>
      </section>
    </main>
  );
}

const TEMPORARY_TEXT = {
  en: {
    button: 'Temporary Chat',
    active: 'Temporary chat is on. This prompt will not be saved.',
  },
  tr: {
    button: 'Ge\u00e7ici Sohbet',
    active: 'Ge\u00e7ici sohbet a\u00e7\u0131k. Bu prompt kaydedilmeyecek.',
  },
  ar: {
    button: '\u0645\u062d\u0627\u062f\u062b\u0629 \u0645\u0624\u0642\u062a\u0629',
    active: '\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629 \u0627\u0644\u0645\u0624\u0642\u062a\u0629 \u0645\u0641\u0639\u0644\u0629. \u0644\u0646 \u064a\u062a\u0645 \u062d\u0641\u0638 \u0647\u0630\u0627 \u0627\u0644\u0645\u0637\u0644\u0628.',
  },
};

const SEARCH_TEXT = {
  en: {
    label: 'Search saved prompts',
    placeholder: 'Search previous prompts...',
    empty: 'No saved prompts found',
  },
  tr: {
    label: 'Kay\u0131tl\u0131 promptlarda ara',
    placeholder: '\u00d6nceki promptlarda ara...',
    empty: 'Kay\u0131tl\u0131 prompt bulunamad\u0131',
  },
  ar: {
    label: '\u0627\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629',
    placeholder: '\u0627\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062a \u0627\u0644\u0633\u0627\u0628\u0642\u0629...',
    empty: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0637\u0627\u0644\u0628\u0627\u062a \u0645\u062d\u0641\u0648\u0638\u0629',
  },
};

const SUGGESTION_TEXT = {
  en: {
    label: 'Idea Suggestions Library',
    title: 'Idea Suggestions Library',
    subtitle: 'Pick a category, choose a suggestion type, and copy a ready-to-use prompt.',
    searchPlaceholder: 'Search the library...',
    categories: 'Categories',
    suggestionTypes: 'Suggestion types',
    selectedPrompt: 'Specific request',
    allResults: 'Search results',
    back: 'Back',
    close: 'Close',
    copy: 'Copy Text',
    copied: 'Text copied successfully.',
    empty: 'No suggestions found.',
    trending: 'Trending',
    useCase: 'Best for',
    platform: 'Platform',
    tags: 'Tags',
    saved: 'Saved',
  },
  tr: {
    label: 'Fikir \u00d6nerileri K\u00fct\u00fcphanesi',
    title: 'Fikir \u00d6nerileri K\u00fct\u00fcphanesi',
    subtitle: 'Bir kategori se\u00e7, \u00f6neri tipini belirle ve haz\u0131r promptu kopyala.',
    searchPlaceholder: 'K\u00fct\u00fcphanede ara...',
    categories: 'Kategoriler',
    suggestionTypes: '\u00d6neri tipleri',
    selectedPrompt: '\u00d6zel istek',
    allResults: 'Arama sonu\u00e7lar\u0131',
    back: 'Geri',
    close: 'Kapat',
    copy: 'Metni Kopyala',
    copied: 'Metin ba\u015far\u0131yla kopyaland\u0131.',
    empty: '\u00d6neri bulunamad\u0131.',
    trending: 'Trend',
    useCase: 'En iyi kullan\u0131m',
    platform: 'Platform',
    tags: 'Etiketler',
    saved: 'Kaydedilenler',
  },
  ar: {
    label: '\u0645\u0643\u062a\u0628\u0629 \u0627\u0642\u062a\u0631\u0627\u062d\u0627\u062a \u0627\u0644\u0623\u0641\u0643\u0627\u0631',
    title: '\u0645\u0643\u062a\u0628\u0629 \u0627\u0642\u062a\u0631\u0627\u062d\u0627\u062a \u0627\u0644\u0623\u0641\u0643\u0627\u0631',
    subtitle: '\u0627\u062e\u062a\u0631 \u0641\u0626\u0629\u060c \u062b\u0645 \u0646\u0648\u0639 \u0627\u0644\u0627\u0642\u062a\u0631\u0627\u062d\u060c \u0648\u0627\u0646\u0633\u062e \u0645\u0637\u0627\u0644\u0628\u0629 \u062c\u0627\u0647\u0632\u0629.',
    searchPlaceholder: '\u0627\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0645\u0643\u062a\u0628\u0629...',
    categories: '\u0627\u0644\u0641\u0626\u0627\u062a',
    suggestionTypes: '\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0627\u0642\u062a\u0631\u0627\u062d\u0627\u062a',
    selectedPrompt: '\u0637\u0644\u0628 \u0645\u062d\u062f\u062f',
    allResults: '\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0628\u062d\u062b',
    back: '\u0631\u062c\u0648\u0639',
    close: '\u0625\u063a\u0644\u0627\u0642',
    copy: '\u0646\u0633\u062e \u0627\u0644\u0646\u0635',
    copied: '\u062a\u0645 \u0646\u0633\u062e \u0627\u0644\u0646\u0635 \u0628\u0646\u062c\u0627\u062d.',
    empty: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0627\u0642\u062a\u0631\u0627\u062d\u0627\u062a.',
    trending: '\u0631\u0627\u0626\u062c',
    useCase: '\u0623\u0641\u0636\u0644 \u0627\u0633\u062a\u062e\u062f\u0627\u0645',
    platform: '\u0627\u0644\u0645\u0646\u0635\u0629',
    tags: '\u0627\u0644\u0648\u0633\u0648\u0645',
    saved: '\u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0627\u062a',
  },
};

const UPLOAD_TEXT = {
  en: {
    gallery: 'Gallery',
    files: 'Files',
    imageUploaded: 'Image uploaded successfully',
    fileUploaded: 'File uploaded successfully',
    attached: 'Item attached.',
    chooseMode: 'Choose a mode before enhancing the attached item.',
    previewTitle: 'Attached Item',
    close: 'Close',
  },
  tr: {
    gallery: 'Galeri',
    files: 'Dosyalar',
    attached: 'Öğe eklendi.',
    chooseMode: 'Eklenen öğeyi geliştirmeden önce bir mod seç.',
    previewTitle: 'Eklenen Öğe',
    close: 'Kapat',
  },
  ar: {
    gallery: 'المعرض',
    files: 'الملفات',
    attached: 'تم إرفاق عنصر.',
    chooseMode: 'اختر وضعًا قبل تحسين العنصر المرفق.',
    previewTitle: 'العنصر المرفق',
    close: 'إغلاق',
  },
};

const CATEGORY_ICONS = {
  Images: '\u25A7',
  Video: '\u25B6',
  'Social Media': '#',
  Music: '\u266B',
  Programming: '< />',
  Writing: '\u270D',
  Marketing: '\u25C8',
  Saved: '\u2605',
};

const UPLOAD_STATUS_TEXT = {
  en: {
    image: 'Image uploaded successfully',
    file: 'File uploaded successfully',
  },
  tr: {
    image: 'Görsel başarıyla yüklendi',
    file: 'Dosya başarıyla yüklendi',
  },
  ar: {
    image: 'تم تحميل الصورة بنجاح',
    file: 'تم تحميل الملف بنجاح',
  },
};

const TEXT_FILE_EXTENSIONS = new Set([
  'txt', 'md', 'markdown', 'csv', 'tsv', 'json', 'jsonl', 'xml', 'html', 'htm',
  'css', 'scss', 'js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs', 'py', 'java', 'c',
  'cpp', 'h', 'hpp', 'cs', 'go', 'rs', 'php', 'rb', 'swift', 'kt', 'sql',
  'yml', 'yaml', 'toml', 'ini', 'log', 'rtf',
]);

function fileExtension(name) {
  return String(name || '').split('.').pop()?.toLowerCase() || '';
}

function isTextAttachment(file) {
  const type = file.type || '';
  return type.startsWith('text/')
    || type.includes('json')
    || type.includes('xml')
    || type.includes('javascript')
    || TEXT_FILE_EXTENSIONS.has(fileExtension(file.name));
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function cleanExtractedText(value) {
  return String(value || '')
    .replace(/\u0000/g, ' ')
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F]+/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

const SUGGESTION_CATEGORIES = [
  'Images',
  'Video',
  'Social Media',
  'Music',
  'Programming',
  'Writing',
  'Marketing',
];
const SAVED_CATEGORY = 'Saved';

const CATEGORY_TRANSLATIONS = {
  tr: {
    Images: 'G\u00f6rseller',
    Video: 'Video',
    'Social Media': 'Sosyal Medya',
    Music: 'M\u00fczik',
    Programming: 'Programlama',
    Writing: 'Yaz\u0131',
    Marketing: 'Pazarlama',
    Saved: 'Kaydedilenler',
  },
  ar: {
    Images: '\u0627\u0644\u0635\u0648\u0631',
    Video: '\u0627\u0644\u0641\u064a\u062f\u064a\u0648',
    'Social Media': '\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0648\u0627\u0635\u0644',
    Music: '\u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649',
    Programming: '\u0627\u0644\u0628\u0631\u0645\u062c\u0629',
    Writing: '\u0627\u0644\u0643\u062a\u0627\u0628\u0629',
    Marketing: '\u0627\u0644\u062a\u0633\u0648\u064a\u0642',
    Saved: '\u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0627\u062a',
  },
};

const TYPE_TRANSLATIONS = {
  tr: {
    'Image enhancement': 'G\u00f6rsel iyile\u015ftirme',
    'Image Improvement': 'G\u00f6rsel iyile\u015ftirme',
    'Anime world': 'Anime d\u00fcnyas\u0131',
    'Cartoon style': '\u00c7izgi film stili',
    'Better lighting': 'Daha iyi \u0131\u015f\u0131k',
    'Cinematic image': 'Sinematik g\u00f6rsel',
    'Professional personal photo': 'Profesyonel ki\u015fisel foto\u011fraf',
    'Product photo': '\u00dcr\u00fcn foto\u011fraf\u0131',
    'Background change': 'Arka plan de\u011fi\u015ftirme',
    'Character style': 'Karakter stili',
    'Modern photo edits': 'Modern foto\u011fraf d\u00fczenlemeleri',
    'Short video script': 'K\u0131sa video senaryosu',
    'YouTube outline': 'YouTube tasla\u011f\u0131',
    Storyboard: 'Storyboard',
    'Product ad': '\u00dcr\u00fcn reklam\u0131',
    Captions: 'Altyaz\u0131lar',
    'B-roll ideas': 'B-roll fikirleri',
    'Podcast clips': 'Podcast klipleri',
    'Instagram carousel': 'Instagram carousel',
    'LinkedIn post': 'LinkedIn g\u00f6nderisi',
    'TikTok hooks': 'TikTok a\u00e7\u0131l\u0131\u015flar\u0131',
    'Content calendar': '\u0130\u00e7erik takvimi',
    'Profile bio': 'Profil biyografisi',
    'Comment replies': 'Yorum yan\u0131tlar\u0131',
    Lyrics: '\u015eark\u0131 s\u00f6zleri',
    'Beat idea': 'Beat fikri',
    'AI song prompt': 'Yapay zeka \u015fark\u0131 promptu',
    Jingle: 'Jingle',
    Playlist: '\u00c7alma listesi',
    Debugging: 'Hata ay\u0131klama',
    'Feature plan': '\u00d6zellik plan\u0131',
    'Code review': 'Kod inceleme',
    Refactoring: 'Refactor',
    'API design': 'API tasar\u0131m\u0131',
    Testing: 'Test',
    'UI component': 'UI bile\u015feni',
    'Blog outline': 'Blog tasla\u011f\u0131',
    Email: 'E-posta',
    'Story scene': 'Hikaye sahnesi',
    Summary: '\u00d6zet',
    'Tone rewrite': 'Ton yeniden yaz\u0131m\u0131',
    Resume: '\u00d6zge\u00e7mi\u015f',
    Presentation: 'Sunum',
    'Customer persona': 'M\u00fc\u015fteri personas\u0131',
    'Landing page': 'Landing page',
    'Ad copy': 'Reklam metni',
    'Email sequence': 'E-posta serisi',
    'Brand voice': 'Marka sesi',
    'Competitor analysis': 'Rakip analizi',
    'Launch plan': 'Lansman plan\u0131',
    'Offer creation': 'Teklif olu\u015fturma',
  },
  ar: {
    'Image enhancement': '\u062a\u062d\u0633\u064a\u0646 \u0627\u0644\u0635\u0648\u0631\u0629',
    'Image Improvement': '\u062a\u062d\u0633\u064a\u0646 \u0627\u0644\u0635\u0648\u0631\u0629',
    'Anime world': '\u0639\u0627\u0644\u0645 \u0623\u0646\u0645\u064a',
    'Cartoon style': '\u0623\u0633\u0644\u0648\u0628 \u0643\u0631\u062a\u0648\u0646\u064a',
    'Better lighting': '\u0625\u0636\u0627\u0621\u0629 \u0623\u0641\u0636\u0644',
    'Cinematic image': '\u0635\u0648\u0631\u0629 \u0633\u064a\u0646\u0645\u0627\u0626\u064a\u0629',
    'Professional personal photo': '\u0635\u0648\u0631\u0629 \u0634\u062e\u0635\u064a\u0629 \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629',
    'Product photo': '\u0635\u0648\u0631\u0629 \u0645\u0646\u062a\u062c',
    'Background change': '\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u062e\u0644\u0641\u064a\u0629',
    'Character style': '\u0623\u0633\u0644\u0648\u0628 \u0634\u062e\u0635\u064a\u0629',
    'Modern photo edits': '\u062a\u0639\u062f\u064a\u0644\u0627\u062a \u0635\u0648\u0631 \u062d\u062f\u064a\u062b\u0629',
    'Short video script': '\u0633\u064a\u0646\u0627\u0631\u064a\u0648 \u0641\u064a\u062f\u064a\u0648 \u0642\u0635\u064a\u0631',
    'YouTube outline': '\u0645\u062e\u0637\u0637 \u064a\u0648\u062a\u064a\u0648\u0628',
    Storyboard: '\u0644\u0648\u062d\u0629 \u0645\u0634\u0627\u0647\u062f',
    'Product ad': '\u0625\u0639\u0644\u0627\u0646 \u0645\u0646\u062a\u062c',
    Captions: '\u062a\u0633\u0645\u064a\u0627\u062a \u0648\u0639\u0646\u0627\u0648\u064a\u0646',
    'B-roll ideas': '\u0623\u0641\u0643\u0627\u0631 B-roll',
    'Podcast clips': '\u0645\u0642\u0627\u0637\u0639 \u0628\u0648\u062f\u0643\u0627\u0633\u062a',
    'Instagram carousel': '\u0643\u0627\u0631\u0648\u0633\u064a\u0644 \u0625\u0646\u0633\u062a\u063a\u0631\u0627\u0645',
    'LinkedIn post': '\u0645\u0646\u0634\u0648\u0631 \u0644\u064a\u0646\u0643\u062f\u0625\u0646',
    'TikTok hooks': '\u0627\u0641\u062a\u062a\u0627\u062d\u064a\u0627\u062a \u062a\u064a\u0643 \u062a\u0648\u0643',
    'Content calendar': '\u062a\u0642\u0648\u064a\u0645 \u0645\u062d\u062a\u0648\u0649',
    'Profile bio': '\u0646\u0628\u0630\u0629 \u0627\u0644\u0645\u0644\u0641',
    'Comment replies': '\u0631\u062f\u0648\u062f \u0627\u0644\u062a\u0639\u0644\u064a\u0642\u0627\u062a',
    Lyrics: '\u0643\u0644\u0645\u0627\u062a \u0623\u063a\u0646\u064a\u0629',
    'Beat idea': '\u0641\u0643\u0631\u0629 \u0625\u064a\u0642\u0627\u0639',
    'AI song prompt': '\u0645\u0637\u0627\u0644\u0628\u0629 \u0623\u063a\u0646\u064a\u0629 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a',
    Jingle: '\u062c\u064a\u0646\u063a\u0644',
    Playlist: '\u0642\u0627\u0626\u0645\u0629 \u062a\u0634\u063a\u064a\u0644',
    Debugging: '\u062a\u0635\u062d\u064a\u062d \u0627\u0644\u0623\u062e\u0637\u0627\u0621',
    'Feature plan': '\u062e\u0637\u0629 \u0645\u064a\u0632\u0629',
    'Code review': '\u0645\u0631\u0627\u062c\u0639\u0629 \u0627\u0644\u0643\u0648\u062f',
    Refactoring: '\u0625\u0639\u0627\u062f\u0629 \u0647\u064a\u0643\u0644\u0629',
    'API design': '\u062a\u0635\u0645\u064a\u0645 API',
    Testing: '\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631',
    'UI component': '\u0645\u0643\u0648\u0646 \u0648\u0627\u062c\u0647\u0629',
    'Blog outline': '\u0645\u062e\u0637\u0637 \u0645\u0642\u0627\u0644',
    Email: '\u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
    'Story scene': '\u0645\u0634\u0647\u062f \u0642\u0635\u0629',
    Summary: '\u0645\u0644\u062e\u0635',
    'Tone rewrite': '\u0625\u0639\u0627\u062f\u0629 \u0635\u064a\u0627\u063a\u0629 \u0627\u0644\u0646\u0628\u0631\u0629',
    Resume: '\u0633\u064a\u0631\u0629 \u0630\u0627\u062a\u064a\u0629',
    Presentation: '\u0639\u0631\u0636 \u062a\u0642\u062f\u064a\u0645\u064a',
    'Customer persona': '\u0634\u062e\u0635\u064a\u0629 \u0627\u0644\u0639\u0645\u064a\u0644',
    'Landing page': '\u0635\u0641\u062d\u0629 \u0647\u0628\u0648\u0637',
    'Ad copy': '\u0646\u0635 \u0625\u0639\u0644\u0627\u0646\u064a',
    'Email sequence': '\u0633\u0644\u0633\u0644\u0629 \u0628\u0631\u064a\u062f\u064a\u0629',
    'Brand voice': '\u0635\u0648\u062a \u0627\u0644\u0639\u0644\u0627\u0645\u0629',
    'Competitor analysis': '\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0645\u0646\u0627\u0641\u0633\u064a\u0646',
    'Launch plan': '\u062e\u0637\u0629 \u0625\u0637\u0644\u0627\u0642',
    'Offer creation': '\u0625\u0646\u0634\u0627\u0621 \u0639\u0631\u0636',
  },
};

function translateCategory(category, language) {
  return CATEGORY_TRANSLATIONS[language]?.[category] || category;
}

function translateType(type, language) {
  return TYPE_TRANSLATIONS[language]?.[type] || type;
}

function usableText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function localizedSuggestion(item, language) {
  const localeEntry = IDEA_SUGGESTION_LOCALES[language]?.[item.id];
  const category = translateCategory(item.category, language);
  const type = localeEntry?.category || translateType(item.type, language);
  const title = usableText(localeEntry?.title) ? localeEntry.title : item.title;
  const useCase = usableText(localeEntry?.useCase) ? localeEntry.useCase : item.useCase;
  const promptText = usableText(localeEntry?.promptText) ? localeEntry.promptText : item.promptText;
  const tags = Array.isArray(localeEntry?.tags) && localeEntry.tags.length ? localeEntry.tags : item.tags;

  if (language === 'tr') {
    return {
      ...item,
      categoryLabel: category,
      typeLabel: type,
      titleLabel: title,
      platformLabel: item.platform,
      tagsLabel: tags,
      useCaseLabel: useCase,
      promptTextLabel: promptText,
    };
  }

  if (language === 'ar') {
    return {
      ...item,
      categoryLabel: category,
      typeLabel: type,
      titleLabel: title,
      platformLabel: item.platform,
      tagsLabel: tags,
      useCaseLabel: useCase,
      promptTextLabel: promptText,
    };
  }

  return {
    ...item,
    categoryLabel: item.category,
    typeLabel: item.type,
    titleLabel: item.title,
    platformLabel: item.platform,
    tagsLabel: item.tags,
    useCaseLabel: item.useCase,
    promptTextLabel: item.promptText,
  };
}

function suggestionMatches(item, query, language) {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return true;
  const localized = localizedSuggestion(item, language);
  return [
    item.title,
    item.category,
    item.type,
    item.platform,
    item.useCase,
    item.promptText,
    localized.titleLabel,
    localized.categoryLabel,
    localized.typeLabel,
    localized.useCaseLabel,
    localized.promptTextLabel,
    ...(item.tags || []),
    ...(localized.tagsLabel || []),
  ].some((value) => String(value).toLowerCase().includes(cleanQuery));
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [input, setInput]     = useState('');
  const [mode, setMode]       = useState('general');
  const [result, setResult]   = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError]     = useState('');
  const [language, setLanguage] = useState('en');
  const [temporaryChat, setTemporaryChat] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');
  const [selectedSuggestionCategory, setSelectedSuggestionCategory] = useState('');
  const [selectedSuggestionId, setSelectedSuggestionId] = useState('');
  const [suggestionCopiedId, setSuggestionCopiedId] = useState('');
  const [savedSuggestionIds, setSavedSuggestionIds] = useState([]);
  const [uploadMenuOpen, setUploadMenuOpen] = useState(false);
  const [attachedItem, setAttachedItem] = useState(null);
  const [attachmentNotice, setAttachmentNotice] = useState('');
  const [attachmentPreviewOpen, setAttachmentPreviewOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const galleryInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const t = TEXT[language];
  const tempT = TEMPORARY_TEXT[language] || TEMPORARY_TEXT.en;
  const searchT = SEARCH_TEXT[language] || SEARCH_TEXT.en;
  const suggestionT = SUGGESTION_TEXT[language] || SUGGESTION_TEXT.en;
  const uploadT = UPLOAD_TEXT[language] || UPLOAD_TEXT.en;
  const isRtl = language === 'ar';
  const filteredHistory = history.filter((entry) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      entry.input?.toLowerCase().includes(query)
      || entry.result?.toLowerCase().includes(query)
      || entry.mode?.toLowerCase().includes(query)
    );
  });
  const filteredSuggestions = IDEA_SUGGESTIONS.filter((item) => suggestionMatches(item, librarySearchQuery, language));
  const savedSuggestionSet = new Set(savedSuggestionIds);
  const filteredSavedSuggestions = filteredSuggestions.filter((item) => savedSuggestionSet.has(item.id));
  const visibleCategories = [
    ...SUGGESTION_CATEGORIES.map((category) => ({
    name: category,
    count: filteredSuggestions.filter((item) => item.category === category).length,
    })),
    { name: SAVED_CATEGORY, count: filteredSavedSuggestions.length },
  ].filter((category) => category.name === SAVED_CATEGORY || category.count > 0 || !librarySearchQuery.trim());
  const activeCategory = visibleCategories.some((category) => category.name === selectedSuggestionCategory)
    ? selectedSuggestionCategory
    : visibleCategories[0]?.name || SUGGESTION_CATEGORIES[0];
  const categorySuggestions = activeCategory === SAVED_CATEGORY
    ? filteredSavedSuggestions
    : filteredSuggestions.filter((item) => item.category === activeCategory);
  const selectedSuggestion = IDEA_SUGGESTIONS.find((item) => item.id === selectedSuggestionId) || null;
  const localizedSelectedSuggestion = selectedSuggestion ? localizedSuggestion(selectedSuggestion, language) : null;
  const hasAttachment = Boolean(attachedItem);
  const canEnhance = Boolean(input.trim() || hasAttachment);

  useEffect(() => {
    const supabase = clsSettings.clsConnectionString;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (s?.user) {
        setSession({
          id: s.user.id,
          username: s.user.user_metadata?.user_name || s.user.email.split('@')[0],
          email: s.user.email,
        });
      }
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (s?.user) {
        setSession({
          id: s.user.id,
          username: s.user.user_metadata?.user_name || s.user.email.split('@')[0],
          email: s.user.email,
        });
      } else {
        setSession(null);
      }
    });

    try {
      const savedLanguage = localStorage.getItem('pm-language');
      if (savedLanguage && TEXT[savedLanguage]) setLanguage(savedLanguage);
      const savedSuggestions = localStorage.getItem(SAVED_SUGGESTIONS_KEY);
      if (savedSuggestions) {
        const parsedSavedSuggestions = JSON.parse(savedSuggestions);
        if (Array.isArray(parsedSavedSuggestions)) setSavedSuggestionIds(parsedSavedSuggestions);
      }
    } catch (_) {}

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady) return;
    try {
      localStorage.setItem(SAVED_SUGGESTIONS_KEY, JSON.stringify(savedSuggestionIds));
    } catch (_) {}
  }, [authReady, savedSuggestionIds]);

  useEffect(() => {
    return () => {
      if (attachedItem?.url) URL.revokeObjectURL(attachedItem.url);
    };
  }, [attachedItem]);

  useEffect(() => {
    if (!searchOpen) return;

    const handleClickOutside = (event) => {
      if (!searchContainerRef.current?.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [searchOpen]);

  const changeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    try { localStorage.setItem('pm-language', selectedLanguage); } catch (_) {}
  };

  const openSearch = () => {
    setSearchOpen(true);
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  useEffect(() => {
    if (!session) return;
    clsPromptBusiness.FetchUserPrompts(session.id)
      .then((rows) => {
        setHistory(rows.map((r) => ({
          id: r.generated_id,
          input: r.original_prompt,
          result: r.improved_prompt,
          mode: r.mode || 'general',
          timestamp: new Date(r.created_at).toLocaleString(),
        })));
      })
      .catch(() => {});
  }, [session?.id]);

  const saveToHistory = async (inputText, resultText, selectedMode) => {
    if (session) {
      try {
        const saved = await clsPromptBusiness.CreateNewPrompt({
          user_id: session.id,
          original_prompt: inputText,
          improved_prompt: resultText,
          mode: selectedMode,
        });
        const normalized = {
          id: saved.generated_id,
          input: saved.original_prompt,
          result: saved.improved_prompt,
          mode: saved.mode || selectedMode,
          timestamp: new Date(saved.created_at).toLocaleString(),
        };
        setHistory((prev) => [normalized, ...prev].slice(0, 20));
      } catch (_) {}
    } else {
      const entry = {
        id: Date.now(),
        input: inputText,
        result: resultText,
        mode: selectedMode,
        timestamp: new Date().toLocaleString(),
      };
      const updated = [entry, ...history].slice(0, 5);
      setHistory(updated);
      try { localStorage.setItem('pm-history', JSON.stringify(updated)); } catch (_) {}
    }
  };

  const handleAttachmentChange = (event, source) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const kind = source === 'gallery' || file.type.startsWith('image/') ? 'image' : 'file';

    Promise.resolve()
      .then(async () => {
        const baseAttachment = {
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size,
          kind,
          url: URL.createObjectURL(file),
        };

        if (kind === 'image') {
          return {
            ...baseAttachment,
            dataUrl: await readAsDataUrl(file),
          };
        }

        const rawText = await readAsText(file).catch(() => '');
        const textContent = cleanExtractedText(rawText);

        return {
          ...baseAttachment,
          textContent,
          textExtracted: Boolean(textContent),
          textLikelyStructured: isTextAttachment(file),
          extension: fileExtension(file.name),
        };
      })
      .then((attachment) => {
        setAttachedItem(attachment);
        setAttachmentNotice(UPLOAD_STATUS_TEXT[language]?.[kind] || UPLOAD_STATUS_TEXT.en[kind]);
        setAttachmentPreviewOpen(false);
        setUploadMenuOpen(false);
        setMode('general');
        setResult('');
        setError('');
      })
      .catch(() => {
        setError(kind === 'image' ? 'Could not read the image content.' : 'Could not read the file content.');
      });
  };

  const handleEnhance = async () => {
    if (!canEnhance || loading) return;
    if (attachedItem && !mode) {
      setError(uploadT.chooseMode);
      return;
    }
    setLoading(true);
    setError('');
    setResult('');

    try {
      // Send the user's real (possibly empty) text — the backend decides whether
      // there's an actual instruction to follow or just an attachment to describe.
      const userText = input.trim();
      const res = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText, mode, language, attachment: attachedItem }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setResult(data.result);
      const historyLabel = userText || (attachedItem ? `Uploaded ${attachedItem.kind}` : '');
      if (!temporaryChat) await saveToHistory(historyLabel, data.result, mode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const removeAttachment = () => {
    setAttachedItem(null);
    setAttachmentNotice('');
    setAttachmentPreviewOpen(false);
    if (galleryInputRef.current) galleryInputRef.current.value = '';
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const loadFromHistory = (entry) => {
    setInput(entry.input);
    setResult(entry.result);
    setMode(entry.mode);
    setSearchOpen(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSuggestionLibrary = () => {
    setSuggestionOpen(true);
    setSuggestionCopiedId('');
  };

  const chooseSuggestionCategory = (category) => {
    setSelectedSuggestionCategory(category);
    setSelectedSuggestionId('');
    setSuggestionCopiedId('');
  };

  const copySuggestion = (item) => {
    if (!item?.promptText) return;
    const copyText = localizedSuggestion(item, language).promptTextLabel;
    navigator.clipboard.writeText(copyText).then(() => {
      setSuggestionCopiedId(item.id);
      setTimeout(() => setSuggestionCopiedId(''), 2200);
    });
  };

  const toggleSavedSuggestion = (itemId) => {
    setSavedSuggestionIds((currentIds) => (
      currentIds.includes(itemId)
        ? currentIds.filter((id) => id !== itemId)
        : [...currentIds, itemId]
    ));
  };

  const handleLogout = async () => {
    await clsUserBusiness.LogoutUser();
    setSession(null);
    setHistory([]);
    setInput('');
    setResult('');
    setError('');
    setSearchOpen(false);
    setSuggestionOpen(false);
    setUploadMenuOpen(false);
    setAttachedItem((current) => {
      if (current?.url) URL.revokeObjectURL(current.url);
      return null;
    });
    setAttachmentNotice('');
    setAttachmentPreviewOpen(false);
    setSelectedSuggestionId('');
    setSuggestionCopiedId('');
  };

  if (!authReady) {
    return <div style={{ minHeight: '100vh', background: '#09090b' }} />;
  }

  if (!session) {
    return <AuthScreen onAuthenticated={setSession} />;
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa' }}>
      <InstagramLink />

      {/* Header */}
      <header style={{
        borderBottom: '1px solid #27272a',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <BrandLogo className="header-logo" />
        <div style={{
          marginLeft: isRtl ? 0 : 'auto',
          marginRight: isRtl ? 'auto' : 0,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          <button
            onClick={handleLogout}
            style={{
              minHeight: 34,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 12px',
              borderRadius: 999,
              border: '1px solid rgba(167,139,250,0.65)',
              background: 'rgba(124,58,237,0.16)',
              color: '#c4b5fd',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isRtl ? 'flex-end' : 'flex-start', gap: 8 }}>
            <button
              onClick={() => {
                setTemporaryChat((current) => !current);
                setInput('');
                setResult('');
                setError('');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '7px 12px',
                borderRadius: 999,
                border: temporaryChat ? '1px solid rgba(167,139,250,0.65)' : '1px solid #3f3f46',
                background: temporaryChat ? 'rgba(124,58,237,0.16)' : '#18181b',
                color: temporaryChat ? '#c4b5fd' : '#a1a1aa',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                transition: 'all 0.15s',
              }}
            >
              <span aria-hidden="true">{temporaryChat ? '\u25CF' : '\u25CB'}</span>
              {tempT.button}
            </button>
            {temporaryChat && (
              <span style={{ color: '#a78bfa', fontSize: 11, maxWidth: 220, lineHeight: 1.4 }}>
                {tempT.active}
              </span>
            )}
          </div>
          <div ref={searchContainerRef} style={{ position: 'relative' }}>
            <button
              onClick={openSearch}
              aria-label={searchT.label}
              style={{
                width: 34,
                height: 34,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 999,
                border: '1px solid #27272a',
                background: searchOpen ? 'rgba(124,58,237,0.16)' : '#18181b',
                color: searchOpen ? '#c4b5fd' : '#a1a1aa',
                cursor: 'pointer',
              }}
            >
              <SearchIcon />
            </button>

            {searchOpen && (
              <div style={{
                position: 'absolute',
                top: 42,
                right: isRtl ? 'auto' : 0,
                left: isRtl ? 0 : 'auto',
                zIndex: 20,
                width: 320,
                maxWidth: 'calc(100vw - 32px)',
                border: '1px solid #27272a',
                borderRadius: 14,
                padding: 10,
                background: '#111114',
                boxShadow: '0 18px 50px rgba(0,0,0,0.4)',
              }}>
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={searchT.placeholder}
                  style={{
                    width: '100%',
                    border: '1px solid #3f3f46',
                    borderRadius: 10,
                    outline: 'none',
                    padding: '10px 12px',
                    color: '#fafafa',
                    background: '#09090b',
                    fontSize: 13,
                  }}
                />
                <div style={{ maxHeight: 240, overflowY: 'auto', marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {filteredHistory.length > 0 ? filteredHistory.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => loadFromHistory(entry)}
                      style={{
                        width: '100%',
                        border: '1px solid #27272a',
                        borderRadius: 10,
                        padding: '10px 12px',
                        background: '#18181b',
                        color: '#fafafa',
                        cursor: 'pointer',
                        textAlign: isRtl ? 'right' : 'left',
                      }}
                    >
                      <span style={{ display: 'block', color: '#a78bfa', fontSize: 11, marginBottom: 4 }}>
                        {t.modes[entry.mode] || entry.mode} - {entry.timestamp}
                      </span>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#d4d4d8', fontSize: 13 }}>
                        {entry.input}
                      </span>
                    </button>
                  )) : (
                    <p style={{ color: '#71717a', fontSize: 13, padding: '8px 2px' }}>
                      {searchT.empty}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 4, padding: 4, background: '#18181b', border: '1px solid #27272a', borderRadius: 999 }}>
            {LANGUAGES.map((item) => (
              <button
                key={item.id}
                onClick={() => changeLanguage(item.id)}
                style={{
                  minWidth: 34,
                  padding: '5px 9px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  background: language === item.id ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'transparent',
                  color: language === item.id ? '#fff' : '#a1a1aa',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg,#a78bfa,#818cf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 8,
          }}>
            {t.title}
          </h1>
          <p style={{ color: '#71717a', fontSize: 16 }}>
            {t.subtitle}
          </p>
        </div>

        {/* Mode chips */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.15s',
                  background: mode === m.id
                    ? 'linear-gradient(135deg,#7c3aed,#4f46e5)'
                    : '#18181b',
                  color: mode === m.id ? '#fff' : '#a1a1aa',
                  boxShadow: mode === m.id ? '0 4px 20px rgba(124,58,237,0.4)' : 'none',
                }}
              >
                {m.icon} {t.modes[m.id]}
              </button>
            ))}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', position: 'relative' }}>
            <button
              onClick={openSuggestionLibrary}
              aria-label={suggestionT.label}
              style={{
                height: 34,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
                padding: '0 12px',
                borderRadius: 999,
                border: '1px solid #27272a',
                background: '#18181b',
                color: '#a1a1aa',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <SparkIcon />
              {suggestionT.label}
            </button>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUploadMenuOpen((current) => !current)}
                aria-label="Upload"
                style={{
                  width: 34,
                  height: 34,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  border: '1px solid #27272a',
                  background: '#18181b',
                  color: '#a1a1aa',
                  cursor: 'pointer',
                }}
              >
                <PlusIcon />
              </button>
              {uploadMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: 42,
                  right: isRtl ? 'auto' : 0,
                  left: isRtl ? 0 : 'auto',
                  zIndex: 22,
                  minWidth: 132,
                  border: '1px solid #27272a',
                  borderRadius: 14,
                  padding: 6,
                  background: '#111114',
                  boxShadow: '0 18px 50px rgba(0,0,0,0.4)',
                }}>
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    style={{
                      width: '100%',
                      minHeight: 34,
                      border: 'none',
                      borderRadius: 10,
                      padding: '0 10px',
                      background: 'transparent',
                      color: '#d4d4d8',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 700,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    {uploadT.gallery}
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      width: '100%',
                      minHeight: 34,
                      border: 'none',
                      borderRadius: 10,
                      padding: '0 10px',
                      background: 'transparent',
                      color: '#d4d4d8',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 700,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    {uploadT.files}
                  </button>
                </div>
              )}
            </div>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={(event) => handleAttachmentChange(event, 'gallery')}
              style={{ display: 'none' }}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt,.rtf,.csv,.xls,.xlsx,.ppt,.pptx,application/pdf,text/plain,text/csv,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
              onChange={(event) => handleAttachmentChange(event, 'files')}
              style={{ display: 'none' }}
            />
          </div>
          {attachmentNotice && (
            <div style={{ display: 'grid', gap: 4, justifyItems: 'center', maxWidth: '100%' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                maxWidth: '100%',
              }}>
                <span style={{ color: '#a78bfa', fontSize: 11, lineHeight: 1.4, textAlign: 'center' }}>
                  {attachmentNotice}
                </span>
                <button
                  type="button"
                  onClick={removeAttachment}
                  aria-label="Remove uploaded item"
                  style={{
                    width: 18,
                    height: 18,
                    flex: '0 0 18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #27272a',
                    borderRadius: 999,
                    background: '#18181b',
                    color: '#a1a1aa',
                    cursor: 'pointer',
                    fontSize: 12,
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  x
                </button>
              </div>
              {attachedItem?.name && (
                <button
                  type="button"
                  onClick={() => setAttachmentPreviewOpen(true)}
                  style={{
                    maxWidth: '100%',
                    color: '#71717a',
                    fontSize: 11,
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {attachedItem.name}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Textarea + button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              rows={6}
              onKeyDown={(e) => { if (e.ctrlKey && e.key === 'Enter') handleEnhance(); }}
              style={{
                width: '100%',
                background: '#18181b',
                border: '1px solid #3f3f46',
                borderRadius: 12,
                padding: '14px 16px',
                color: '#fafafa',
                fontSize: 15,
                lineHeight: 1.6,
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#7c3aed')}
              onBlur={(e)  => (e.target.style.borderColor = '#3f3f46')}
            />
            <span style={{
              position: 'absolute', bottom: 10, right: isRtl ? 'auto' : 12, left: isRtl ? 12 : 'auto',
              fontSize: 11, color: '#52525b',
            }}>
              {input.length} {t.chars} - {t.shortcut}
            </span>
          </div>

          <button
            onClick={handleEnhance}
            disabled={loading || !canEnhance || (attachedItem && !mode)}
            style={{
              padding: '13px 0',
              borderRadius: 12,
              border: 'none',
              cursor: loading || !canEnhance || (attachedItem && !mode) ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              opacity: loading || !canEnhance || (attachedItem && !mode) ? 0.45 : 1,
              transition: 'opacity 0.15s, transform 0.1s',
              boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => { if (!loading && canEnhance && (!attachedItem || mode)) e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                {t.enhancing}
              </>
            ) : `${t.enhance} \u2726`}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 12,
            padding: '12px 16px',
            color: '#f87171',
            fontSize: 14,
          }}>
            {t.warning}: {error}
          </div>
        )}

        {/* Result card */}
        {result && (
          <div style={{
            background: '#18181b',
            border: '1px solid #3f3f46',
            borderRadius: 12,
            padding: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#a78bfa' }}>
                {'\u2726'} {t.enhancedPrompt}
              </span>
              <button
                onClick={handleCopy}
                style={{
                  padding: '5px 14px',
                  borderRadius: 999,
                  border: '1px solid #3f3f46',
                  background: copied ? '#16a34a22' : '#09090b',
                  color: copied ? '#4ade80' : '#a1a1aa',
                  fontSize: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <p style={{ color: '#e4e4e7', lineHeight: 1.7, fontSize: 14, whiteSpace: 'pre-wrap' }}>
              {result}
            </p>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              {t.recent}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {history.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => loadFromHistory(entry)}
                  style={{
                    textAlign: isRtl ? 'right' : 'left',
                    background: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: 10,
                    padding: '12px 16px',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                    color: 'inherit',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#52525b')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#27272a')}
                >
                  <div style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#a78bfa', textTransform: 'capitalize' }}>{t.modes[entry.mode] || entry.mode}</span>
                    <span style={{ fontSize: 11, color: '#3f3f46' }}>{entry.timestamp}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#71717a', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {entry.input}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {attachmentPreviewOpen && attachedItem && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAttachmentPreviewOpen(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
            background: 'rgba(0,0,0,0.68)',
          }}
        >
          <div style={{
            width: 'min(760px, 100%)',
            maxHeight: 'min(760px, calc(100vh - 36px))',
            overflowY: 'auto',
            border: '1px solid #3f3f46',
            borderRadius: 18,
            padding: 16,
            background: '#111114',
            boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div>
                <h2 style={{ color: '#fafafa', fontSize: 18, fontWeight: 800 }}>
                  {uploadT.previewTitle}
                </h2>
                <p style={{ color: '#a1a1aa', fontSize: 12, marginTop: 4 }}>
                  {attachedItem.name}
                </p>
              </div>
              <button
                onClick={() => setAttachmentPreviewOpen(false)}
                aria-label={uploadT.close}
                style={{
                  width: 34,
                  height: 34,
                  flex: '0 0 34px',
                  border: '1px solid #3f3f46',
                  borderRadius: 10,
                  background: '#18181b',
                  color: '#d4d4d8',
                  cursor: 'pointer',
                }}
              >
                x
              </button>
            </div>

            {attachedItem.kind === 'image' ? (
              <img
                src={attachedItem.url}
                alt={attachedItem.name}
                style={{
                  display: 'block',
                  width: '100%',
                  maxHeight: 'calc(100vh - 180px)',
                  objectFit: 'contain',
                  border: '1px solid #27272a',
                  borderRadius: 14,
                  background: '#09090b',
                }}
              />
            ) : (
              <iframe
                title={attachedItem.name}
                src={attachedItem.url}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'min(560px, calc(100vh - 180px))',
                  border: '1px solid #27272a',
                  borderRadius: 14,
                  background: '#09090b',
                }}
              />
            )}
          </div>
        </div>
      )}

      {suggestionOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSuggestionOpen(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
            background: 'rgba(0,0,0,0.68)',
          }}
        >
          <div style={{
            width: 'min(980px, 100%)',
            maxHeight: 'min(820px, calc(100vh - 36px))',
            overflowY: 'auto',
            border: '1px solid #3f3f46',
            borderRadius: 18,
            padding: 20,
            background: '#111114',
            boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
              <div>
                <h2 style={{ color: '#fafafa', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
                  {suggestionT.title}
                </h2>
                <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>
                  {suggestionT.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSuggestionOpen(false)}
                aria-label={suggestionT.close}
                style={{
                  width: 34,
                  height: 34,
                  flex: '0 0 34px',
                  border: '1px solid #3f3f46',
                  borderRadius: 10,
                  background: '#18181b',
                  color: '#d4d4d8',
                  cursor: 'pointer',
                }}
              >
                x
              </button>
            </div>

            <div style={{ position: 'relative', marginBottom: 18 }}>
              <span style={{
                position: 'absolute',
                top: 14,
                left: isRtl ? 'auto' : 15,
                right: isRtl ? 15 : 'auto',
                color: '#71717a',
                pointerEvents: 'none',
              }}>
                <SearchIcon />
              </span>
              <input
                value={librarySearchQuery}
                onChange={(event) => {
                  setLibrarySearchQuery(event.target.value);
                  setSelectedSuggestionId('');
                }}
                placeholder={suggestionT.searchPlaceholder}
                style={{
                  width: '100%',
                  border: '1px solid #3f3f46',
                  borderRadius: 14,
                  outline: 'none',
                  padding: isRtl ? '13px 44px 13px 14px' : '13px 14px 13px 44px',
                  color: '#fafafa',
                  background: '#09090b',
                  fontSize: 14,
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onFocus={(event) => {
                  event.target.style.borderColor = '#7c3aed';
                  event.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.16)';
                }}
                onBlur={(event) => {
                  event.target.style.borderColor = '#3f3f46';
                  event.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {selectedSuggestion && localizedSelectedSuggestion ? (
              <div style={{ display: 'grid', gap: 14 }}>
                <button
                  onClick={() => setSelectedSuggestionId('')}
                  style={{
                    justifySelf: isRtl ? 'end' : 'start',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    minHeight: 34,
                    padding: '0 12px',
                    border: '1px solid #27272a',
                    borderRadius: 999,
                    background: '#18181b',
                    color: '#a1a1aa',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {suggestionT.back}
                </button>

                <div style={{
                  border: '1px solid #3f3f46',
                  borderRadius: 16,
                  padding: 18,
                  background: '#18181b',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ color: '#a78bfa', fontSize: 12, fontWeight: 800 }}>
                        {CATEGORY_ICONS[selectedSuggestion.category] || '\u2726'} {localizedSelectedSuggestion.categoryLabel} / {localizedSelectedSuggestion.typeLabel}
                      </span>
                      <h3 style={{ color: '#fafafa', fontSize: 22, lineHeight: 1.25, marginTop: 7 }}>
                        {localizedSelectedSuggestion.titleLabel}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => toggleSavedSuggestion(selectedSuggestion.id)}
                      aria-label={savedSuggestionSet.has(selectedSuggestion.id) ? suggestionT.saved : suggestionT.saved}
                      aria-pressed={savedSuggestionSet.has(selectedSuggestion.id)}
                      style={{
                        width: 32,
                        height: 32,
                        border: '1px solid rgba(167,139,250,0.42)',
                        borderRadius: 999,
                        background: savedSuggestionSet.has(selectedSuggestion.id) ? 'rgba(124,58,237,0.22)' : '#09090b',
                        color: savedSuggestionSet.has(selectedSuggestion.id) ? '#facc15' : '#a1a1aa',
                        cursor: 'pointer',
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      {savedSuggestionSet.has(selectedSuggestion.id) ? '\u2605' : '\u2606'}
                    </button>
                    {selectedSuggestion.trending && (
                      <span style={{
                        border: '1px solid rgba(167,139,250,0.42)',
                        borderRadius: 999,
                        padding: '5px 10px',
                        color: '#c4b5fd',
                        background: 'rgba(124,58,237,0.12)',
                        fontSize: 11,
                        fontWeight: 900,
                      }}>
                        {suggestionT.trending}
                      </span>
                    )}
                    </div>
                  </div>

                  <p style={{ color: '#d4d4d8', fontSize: 14, lineHeight: 1.65, marginBottom: 14 }}>
                    <strong style={{ color: '#fafafa' }}>{suggestionT.useCase}:</strong> {localizedSelectedSuggestion.useCaseLabel}
                  </p>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    {localizedSelectedSuggestion.tagsLabel.slice(0, 4).map((tag) => (
                      <span key={tag} style={{ border: '1px solid #27272a', borderRadius: 999, padding: '6px 10px', color: '#a1a1aa', background: '#09090b', fontSize: 12 }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    border: '1px solid #27272a',
                    borderRadius: 14,
                    padding: 16,
                    background: '#09090b',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span style={{ color: '#a78bfa', fontSize: 13, fontWeight: 900 }}>
                        {'\u2726'} {suggestionT.selectedPrompt}
                      </span>
                      <button
                        onClick={() => copySuggestion(selectedSuggestion)}
                        style={{
                          minHeight: 32,
                          padding: '0 13px',
                          borderRadius: 999,
                          border: '1px solid #3f3f46',
                          background: suggestionCopiedId === selectedSuggestion.id ? '#16a34a22' : '#18181b',
                          color: suggestionCopiedId === selectedSuggestion.id ? '#4ade80' : '#a1a1aa',
                          cursor: 'pointer',
                          fontSize: 12,
                          fontWeight: 800,
                          transition: 'all 0.2s',
                        }}
                      >
                        {suggestionCopiedId === selectedSuggestion.id ? suggestionT.copied : suggestionT.copy}
                      </button>
                    </div>
                    <p style={{ color: '#e4e4e7', lineHeight: 1.75, fontSize: 14, whiteSpace: 'pre-wrap' }}>
                      {localizedSelectedSuggestion.promptTextLabel}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(210px, 0.85fr) minmax(0, 1.35fr)',
                gap: 16,
              }} className="idea-library-grid">
                <section>
                  <p style={{ color: '#71717a', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    {suggestionT.categories}
                  </p>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {visibleCategories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => chooseSuggestionCategory(category.name)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                          minHeight: 48,
                          border: activeCategory === category.name ? '1px solid rgba(167,139,250,0.72)' : '1px solid #27272a',
                          borderRadius: 14,
                          padding: '0 12px',
                          background: activeCategory === category.name ? 'rgba(124,58,237,0.16)' : '#18181b',
                          color: activeCategory === category.name ? '#ddd6fe' : '#d4d4d8',
                          cursor: 'pointer',
                          transition: 'border-color 0.15s, background 0.15s, transform 0.15s',
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 900 }}>
                          <span style={{ color: '#a78bfa' }}>{CATEGORY_ICONS[category.name] || '\u2726'}</span>
                          {translateCategory(category.name, language)}
                        </span>
                        <span style={{ color: '#71717a', fontSize: 12, fontWeight: 800 }}>{category.count}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <p style={{ color: '#71717a', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    {librarySearchQuery.trim() ? suggestionT.allResults : suggestionT.suggestionTypes}
                  </p>
                  {categorySuggestions.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 10 }}>
                      {categorySuggestions.map((item) => {
                        const localizedItem = localizedSuggestion(item, language);
                        return (
                        <div
                          key={item.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setSelectedSuggestionCategory(activeCategory === SAVED_CATEGORY ? SAVED_CATEGORY : item.category);
                            setSelectedSuggestionId(item.id);
                            setSuggestionCopiedId('');
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              setSelectedSuggestionCategory(activeCategory === SAVED_CATEGORY ? SAVED_CATEGORY : item.category);
                              setSelectedSuggestionId(item.id);
                              setSuggestionCopiedId('');
                            }
                          }}
                          style={{
                            position: 'relative',
                            minHeight: 142,
                            border: '1px solid #27272a',
                            borderRadius: 14,
                            padding: '14px 44px 14px 14px',
                            background: '#18181b',
                            color: '#fafafa',
                            textAlign: isRtl ? 'right' : 'left',
                            cursor: 'pointer',
                            transition: 'transform 0.15s, border-color 0.15s, background 0.15s',
                          }}
                          onMouseEnter={(event) => {
                            event.currentTarget.style.transform = 'translateY(-1px)';
                            event.currentTarget.style.borderColor = '#52525b';
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.transform = 'translateY(0)';
                            event.currentTarget.style.borderColor = '#27272a';
                          }}
                        >
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleSavedSuggestion(item.id);
                            }}
                            aria-label={suggestionT.saved}
                            aria-pressed={savedSuggestionSet.has(item.id)}
                            style={{
                              position: 'absolute',
                              top: 10,
                              right: isRtl ? 'auto' : 10,
                              left: isRtl ? 10 : 'auto',
                              width: 28,
                              height: 28,
                              border: '1px solid #3f3f46',
                              borderRadius: 999,
                              background: savedSuggestionSet.has(item.id) ? 'rgba(124,58,237,0.22)' : '#09090b',
                              color: savedSuggestionSet.has(item.id) ? '#facc15' : '#a1a1aa',
                              cursor: 'pointer',
                              fontSize: 14,
                              lineHeight: 1,
                            }}
                          >
                            {savedSuggestionSet.has(item.id) ? '\u2605' : '\u2606'}
                          </button>
                          <span style={{ display: 'block', color: '#a78bfa', fontSize: 12, fontWeight: 900, marginBottom: 8 }}>
                            {localizedItem.typeLabel}
                          </span>
                          <span style={{ display: 'block', color: '#fafafa', fontSize: 15, fontWeight: 900, marginBottom: 8, lineHeight: 1.35 }}>
                            {localizedItem.titleLabel}
                          </span>
                          <span style={{ display: 'block', color: '#a1a1aa', fontSize: 13, lineHeight: 1.5 }}>
                            {localizedItem.useCaseLabel}
                          </span>
                        </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: '#71717a', fontSize: 14, padding: '18px 2px' }}>
                      {suggestionT.empty}
                    </p>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea::placeholder { color: #52525b; }
        textarea { box-sizing: border-box; }
        .idea-library-grid { grid-template-columns: minmax(210px, 0.85fr) minmax(0, 1.35fr); }
        @media (max-width: 720px) {
          .idea-library-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
