import { useSyncExternalStore } from 'react';
import type { Language, TFunction } from '../i18n';
import { getLanguage, subscribeToLanguage, translate } from '../i18n';

/**
 * Reactive translation helper. Unlike the module-level `t`, the returned
 * function re-renders the calling component when `setLanguage` is called,
 * so translated output (e.g. Pagination's "Page X of Y") follows runtime
 * language switches.
 */
export function useTranslation(): { t: TFunction; language: Language } {
  const language = useSyncExternalStore(subscribeToLanguage, getLanguage, getLanguage);
  return {
    t: (key, data) => translate(language, key, data),
    language,
  };
}

export default useTranslation;
