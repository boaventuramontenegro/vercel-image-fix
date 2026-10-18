import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as Dialog from '@radix-ui/react-dialog';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GalleryLightbox } from '@/components/gallery-lightbox';

vi.mock('react-zoom-pan-pinch', () => ({
  TransformWrapper: ({ children }: { children: React.ReactNode }) => children,
  TransformComponent: ({ children }: { children: React.ReactNode }) => <div className="lightbox-zoom-content">{children}</div>,
}));

afterEach(cleanup);

function openGallery() {
  const onNavigate = vi.fn();
  const onClose = vi.fn();
  const onOpenChange = vi.fn();
  render(<Dialog.Root open onOpenChange={onOpenChange}>
    <GalleryLightbox work={{ src: '/photo.webp', legenda: 'Espelho', alt: 'Espelho', categoria: 'Espelhos' }} index={0} total={3} opener={createRef()} onNavigate={onNavigate} onClose={onClose} onImageError={vi.fn()}/>
  </Dialog.Root>);
  return { onNavigate, onClose, onOpenChange };
}

describe('Enlarged gallery controls', () => {
  it('navigates backward and forward using arrow keys', () => {
    const { onNavigate } = openGallery();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowLeft' });
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' });
    expect(onNavigate.mock.calls).toEqual([[-1], [1]]);
  });
  it('closes with X and Escape', () => {
    const { onOpenChange } = openGallery();
    fireEvent.click(screen.getByRole('button', { name: 'Fechar foto' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    onOpenChange.mockClear();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
  it('does not dismiss when gestures target the zoomed photo content', () => {
    const { onClose } = openGallery();
    const img = screen.getByRole('img');
    const target = img.parentElement;
    if (!target) throw new Error('Missing zoom content');
    fireEvent.pointerDown(target, { clientX: 50, clientY: 50 });
    fireEvent.pointerUp(target, { clientX: 50, clientY: 50 });
    expect(onClose).not.toHaveBeenCalled();
  });
  it('navigates to the next photo with a horizontal swipe without closing', () => {
    const { onNavigate, onClose } = openGallery();
    const picture = screen.getByRole('img').closest('.lightbox-picture');
    if (!picture) throw new Error('Missing picture area');
    fireEvent.touchStart(picture, { touches: [{ clientX: 280, clientY: 250 }], changedTouches: [{ clientX: 280, clientY: 250 }] });
    fireEvent.touchEnd(picture, { touches: [], changedTouches: [{ clientX: 90, clientY: 250 }] });
    expect(onNavigate.mock.calls).toEqual([[1]]);
    expect(onClose).not.toHaveBeenCalled();
  });
});