import { Dialog } from './Dialog';
import { useDialog } from './useDialog';
import { act, renderHook, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

enum ResolveValue {
  onExit,
  yesClick,
  noClick,
}

const defaultRenderFn = ({ resolveClose, isOpen }) => (
  <Dialog
    heading="Are we there yet?"
    onExit={() => resolveClose(ResolveValue.onExit)}
    actions={
      <>
        <button onClick={() => resolveClose(ResolveValue.yesClick)}>Yes</button>
        <button onClick={() => resolveClose(ResolveValue.noClick)}>No</button>
      </>
    }
    isOpen={isOpen}
  >
    I know I just asked five minutes ago, but I really need to know.
  </Dialog>
);

function openDialog(hookRenderResult) {
  let promise;
  act(() => {
    promise = hookRenderResult.result.current.openDialog();
  });
  hookRenderResult.rerender();
  return promise;
}

function expectClosed(hookRenderResult, dialogRenderResult) {
  hookRenderResult.rerender();
  dialogRenderResult.rerender(hookRenderResult.result.current.dialog);
  expect(dialogRenderResult.container.querySelector('dialog').open).toBe(false);
}

describe('useDialog', () => {
  it('should render an unopen dialog at first', () => {
    const hookRenderResult = renderHook(() => useDialog(defaultRenderFn));
    const { container } = render(hookRenderResult.result.current.dialog);
    expect(container.querySelector('dialog').open).toBe(false);
  });

  it('should open the dialog when `openDialog` is called', () => {
    const hookRenderResult = renderHook(() => useDialog(defaultRenderFn));
    openDialog(hookRenderResult);
    render(hookRenderResult.result.current.dialog);
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
  });

  it('should resolve promise and close dialog when ESC is pressed', async () => {
    const hookRenderResult = renderHook(() => useDialog(defaultRenderFn));
    const promise = openDialog(hookRenderResult);
    const dialogRenderResult = render(hookRenderResult.result.current.dialog);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.keyboard('{escape}');
    });
    const resolvedValue = await promise;
    expect(resolvedValue).toEqual(ResolveValue.onExit);
    expectClosed(hookRenderResult, dialogRenderResult);
  });

  it('should resolve promise and close dialog when dialog close button clicked', async () => {
    const hookRenderResult = renderHook(() => useDialog(defaultRenderFn));
    const promise = openDialog(hookRenderResult);
    const dialogRenderResult = render(hookRenderResult.result.current.dialog);
    const closeButton = screen.getByRole('button', { name: /Close/ });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(closeButton);
    });
    const resolvedValue = await promise;
    expect(resolvedValue).toEqual(ResolveValue.onExit);
    expectClosed(hookRenderResult, dialogRenderResult);
  });

  it('should resolve promise and close dialog when "Yes" button is clicked', async () => {
    const hookRenderResult = renderHook(() => useDialog(defaultRenderFn));
    const promise = openDialog(hookRenderResult);
    const dialogRenderResult = render(hookRenderResult.result.current.dialog);
    const closeButton = screen.getByRole('button', { name: /Yes/ });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(closeButton);
    });
    const resolvedValue = await promise;
    expect(resolvedValue).toEqual(ResolveValue.yesClick);
    expectClosed(hookRenderResult, dialogRenderResult);
  });

  it('should resolve promise and close dialog when "No" button is clicked', async () => {
    const hookRenderResult = renderHook(() => useDialog(defaultRenderFn));
    const promise = openDialog(hookRenderResult);
    const dialogRenderResult = render(hookRenderResult.result.current.dialog);
    const closeButton = screen.getByRole('button', { name: /No/ });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(closeButton);
    });
    const resolvedValue = await promise;
    expect(resolvedValue).toEqual(ResolveValue.noClick);
    expectClosed(hookRenderResult, dialogRenderResult);
  });
});
