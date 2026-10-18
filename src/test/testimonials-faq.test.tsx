import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';

afterEach(cleanup);
describe('Testimonial navigation bounds', () => {
  it('advances through four customers and stops at the last', () => {
    const { container } = render(<Testimonials/>);
    const next = screen.getByRole('button', { name: 'Próximo depoimento' });
    for (let i = 0; i < 3; i++) fireEvent.click(next);
    expect(next).toBeDisabled();
    expect(container.querySelectorAll('figure')).toHaveLength(1);
    expect(container.querySelector('figcaption')?.textContent).toBe('Denilson Vilasboa');
  });
  it('returns through the customers and stops at the first', () => {
    const { container } = render(<Testimonials/>);
    const next = screen.getByRole('button', { name: 'Próximo depoimento' });
    const previous = screen.getByRole('button', { name: 'Depoimento anterior' });
    expect(previous).toBeDisabled();
    for (let i = 0; i < 3; i++) fireEvent.click(next);
    for (let i = 0; i < 3; i++) fireEvent.click(previous);
    expect(previous).toBeDisabled();
    expect(container.querySelector('figcaption')?.textContent).toBe('Roseli Machi');
  });
});
describe('FAQ interaction', () => {
  it('allows only one answer open at a time and permits closing it', () => {
    render(<FAQ/>);
    const questions = screen.getAllByRole('button');
    questions.forEach(question => {
      expect(question).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(question);
      expect(question).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(question);
      expect(question).toHaveAttribute('aria-expanded', 'false');
    });
    const first = questions[0];
    const second = questions[1];
    if (!first || !second) throw new Error('Expected at least two FAQ questions');
    fireEvent.click(first);
    fireEvent.click(second);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });
});