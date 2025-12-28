import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormattedBotMessage from './FormattedBotMessage';

describe('FormattedBotMessage', () => {
  test('renders a single paragraph for a single line of text', () => {
    const text = 'Hello, this is a test.';
    render(<FormattedBotMessage content={text} />);
    const paragraph = screen.getByText(text);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });

  test('renders multiple paragraphs for text with newlines', () => {
    const text = 'First line.\nSecond line.';
    render(<FormattedBotMessage content={text} />);
    const firstParagraph = screen.getByText('First line.');
    const secondParagraph = screen.getByText('Second line.');
    expect(firstParagraph).toBeInTheDocument();
    expect(firstParagraph.tagName).toBe('P');
    expect(secondParagraph).toBeInTheDocument();
    expect(secondParagraph.tagName).toBe('P');
  });

  test('filters out empty lines', () => {
    const text = 'First line.\n\nThird line.';
    render(<FormattedBotMessage content={text} />);
    const firstParagraph = screen.getByText('First line.');
    const thirdParagraph = screen.getByText('Third line.');
    expect(firstParagraph).toBeInTheDocument();
    expect(thirdParagraph).toBeInTheDocument();
    const allParagraphs = screen.queryAllByRole('paragraph');
    expect(allParagraphs.length).toBe(2);
  });

  test('renders nothing for an empty string', () => {
    const text = '';
    const { container } = render(<FormattedBotMessage content={text} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test('renders nothing for a string with only whitespace and newlines', () => {
    const text = ' \n ';
    const { container } = render(<FormattedBotMessage content={text} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
