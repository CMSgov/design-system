import {useState} from 'react';

export function useArgs() {
  return useState(globalThis.__MOCK_STORYBOOK__args || {});
}