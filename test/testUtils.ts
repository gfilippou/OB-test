import {screen} from '@testing-library/dom';

export function createTestEventMessage(data: Object) {
  return new MessageEvent("testMessage", {data: JSON.stringify(data)})
}

export async function getTestIdValue(id: string): Promise<string | null> {
  return (await screen.getByTestId(id).textContent);
}

export function patchWindowWithMatchMedia() {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };
}
