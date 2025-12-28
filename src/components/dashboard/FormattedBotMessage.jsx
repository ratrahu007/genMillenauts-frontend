// src/components/dashboard/FormattedBotMessage.jsx
import React from 'react';

const FormattedBotMessage = ({ content }) => {
  // Split the content by newline characters to create paragraphs.
  // We also filter out any empty strings that might result from multiple newlines.
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-2 last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default FormattedBotMessage;
