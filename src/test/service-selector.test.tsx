import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ServiceSelector } from '@/components/service-selector';

function Harness() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  return <><label id="quote-service-label">Serviço</label><ServiceSelector value={value} onChange={setValue} open={open} onOpenChange={setOpen} invalid={false}/><input aria-label="Outside"/><div data-testid="background"/></>;
}
const start = () => { render(<Harness/>); const trigger = screen.getByRole('button', { name: /Serviço/ }); fireEvent.click(trigger); return trigger; };
afterEach(cleanup);

describe('Expandable service selection', () => {
  it('closes on outside pointerdown, including when another handler stops propagation', () => {
    const trigger = start();
    const outside = screen.getByTestId('background');
    outside.addEventListener('pointerdown', event => event.stopPropagation());
    fireEvent.pointerDown(outside);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
  it('keeps selected services in selection order when closed', () => {
    const trigger = start();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Espelhos' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Box de banheiro' }));
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.pointerDown(screen.getByTestId('background'));
    expect(trigger.textContent).toBe('Espelhos, Box de banheiro');
  });
  it('stays open during scrolling and inside pointer interactions', () => {
    const trigger = start();
    fireEvent.pointerDown(screen.getByRole('checkbox', { name: 'Espelhos' }));
    fireEvent.scroll(document);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
  it('closes on Escape and returns focus to the field', () => {
    const trigger = start();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });
  it('closes when focus moves outside', () => {
    const trigger = start();
    fireEvent.blur(trigger, { relatedTarget: screen.getByRole('textbox', { name: 'Outside' }) });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
  it('closes on Concluir without clearing selections', () => {
    const trigger = start();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Espelhos' }));
    fireEvent.click(screen.getByRole('button', { name: 'Concluir' }));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger.textContent).toBe('Espelhos');
  });
  it('removes the document pointer listener after closing', () => {
    const remove = vi.spyOn(document, 'removeEventListener');
    const trigger = start();
    fireEvent.click(trigger);
    expect(remove).toHaveBeenCalledWith('pointerdown', expect.any(Function), true);
    remove.mockRestore();
  });
});