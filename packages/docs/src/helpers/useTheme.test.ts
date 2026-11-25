jest.mock('gatsby', () => ({ withPrefix: (path: string) => path }));
import { renderHook } from '@testing-library/react';
import useTheme from './useTheme';

const STORAGE_TOKEN_NAME = 'cmsds_theme';

// setupTests.js replaces localStorage with a stub that stores nothing, so back it with a real store.
let storage: Record<string, string> = {};

function setSearch(search: string) {
  window.history.replaceState({}, '', `/${search}`);
}

describe('useTheme', () => {
  beforeEach(() => {
    jest.mocked(localStorage.setItem).mockImplementation((key, value) => {
      storage[key] = String(value);
    });
    jest.mocked(localStorage.getItem).mockImplementation((key) => storage[key] ?? null);
  });

  afterEach(() => {
    storage = {};
    setSearch('');
  });

  it('falls back to core when the query param is not a theme', () => {
    setSearch("?theme=medicare'");
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual('core');
    expect(new URLSearchParams(window.location.search).get('theme')).toEqual('core');
    expect(localStorage.getItem(STORAGE_TOKEN_NAME)).not.toEqual("medicare'");
  });

  it('uses the query param when it is a theme', () => {
    setSearch('?theme=medicare');
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual('medicare');
    expect(localStorage.getItem(STORAGE_TOKEN_NAME)).toEqual('medicare');
  });

  it('prefers the query param over the stored theme when both are themes', () => {
    setSearch('?theme=medicare');
    localStorage.setItem(STORAGE_TOKEN_NAME, 'healthcare');
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual('medicare');
    expect(localStorage.getItem(STORAGE_TOKEN_NAME)).toEqual('medicare');
    expect(new URLSearchParams(window.location.search).get('theme')).toEqual('medicare');
  });

  it('falls back to core when the stored theme is not a theme', () => {
    localStorage.setItem(STORAGE_TOKEN_NAME, "medicare'");
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual('core');
    expect(new URLSearchParams(window.location.search).get('theme')).toEqual('core');
  });

  it('uses the stored theme when there is no query param', () => {
    localStorage.setItem(STORAGE_TOKEN_NAME, 'healthcare');
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual('healthcare');
    expect(new URLSearchParams(window.location.search).get('theme')).toEqual('healthcare');
  });
});
