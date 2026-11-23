import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AUTOSAVE_DELAY_MS, useNoteAutosave } from './useNoteAutosave';

const updateNote = vi.fn();

vi.mock('~modules/notes/data/remote', () => ({
  useUpdateNoteMutation: () => [updateNote],
}));

beforeEach(() => {
  vi.useFakeTimers();
  updateNote.mockReset();
  updateNote.mockResolvedValue({});
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useNoteAutosave', () => {
  it('merges changes and saves once after the user stops typing', async () => {
    const { result } = renderHook(() => useNoteAutosave('a'));

    act(() => {
      result.current.scheduleSave({ title: 'T' });
      result.current.scheduleSave({ text: 'h' });
      result.current.scheduleSave({ text: 'hi' });
    });
    await act(() => vi.advanceTimersByTimeAsync(AUTOSAVE_DELAY_MS - 1));
    expect(updateNote).not.toHaveBeenCalled();

    await act(() => vi.advanceTimersByTimeAsync(1));
    expect(updateNote).toHaveBeenCalledTimes(1);
    expect(updateNote).toHaveBeenCalledWith({
      payload: { title: 'T', text: 'hi' },
      extraParams: { noteId: 'a' },
    });
  });

  it('flushes pending changes on unmount', async () => {
    const { result, unmount } = renderHook(() => useNoteAutosave('a'));

    act(() => result.current.scheduleSave({ text: 'last keystroke' }));
    unmount();
    await act(() => vi.advanceTimersByTimeAsync(0));

    expect(updateNote).toHaveBeenCalledWith({
      payload: { text: 'last keystroke' },
      extraParams: { noteId: 'a' },
    });
  });

  it('flush() saves now and resolves after the save', async () => {
    const { result } = renderHook(() => useNoteAutosave('a'));
    let resolveSave!: () => void;
    updateNote.mockReturnValueOnce(
      new Promise<void>(resolve => (resolveSave = resolve))
    );

    act(() => result.current.scheduleSave({ text: 'x' }));
    const flushed = vi.fn();
    act(() => void result.current.flush().then(flushed));
    await act(() => vi.advanceTimersByTimeAsync(0));

    expect(updateNote).toHaveBeenCalledTimes(1);
    expect(flushed).not.toHaveBeenCalled();
    resolveSave();
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(flushed).toHaveBeenCalled();

    // Nothing pending: the timer no longer fires a save.
    await act(() => vi.advanceTimersByTimeAsync(AUTOSAVE_DELAY_MS));
    expect(updateNote).toHaveBeenCalledTimes(1);
  });

  it('runs saves one after another', async () => {
    const { result } = renderHook(() => useNoteAutosave('a'));
    let resolveFirst!: () => void;
    updateNote.mockReturnValueOnce(
      new Promise<void>(resolve => (resolveFirst = resolve))
    );

    act(() => result.current.scheduleSave({ text: 'first' }));
    act(() => void result.current.flush());
    act(() => result.current.scheduleSave({ text: 'second' }));
    act(() => void result.current.flush());
    await act(() => vi.advanceTimersByTimeAsync(0));

    expect(updateNote).toHaveBeenCalledTimes(1);
    resolveFirst();
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(updateNote).toHaveBeenCalledTimes(2);
    expect(updateNote).toHaveBeenLastCalledWith({
      payload: { text: 'second' },
      extraParams: { noteId: 'a' },
    });
  });
});
