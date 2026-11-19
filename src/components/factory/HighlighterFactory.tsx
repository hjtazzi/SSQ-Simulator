import { } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { noctisObscuroTheme } from '../../utils';


interface HighlighterFactory {
  children: string;
  customStyle?: React.CSSProperties;
  showLineNumbers?: boolean;
  language?: string;
}

const HighlighterFactory = ({ children, customStyle, showLineNumbers, language = 'typescript' }: HighlighterFactory) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={noctisObscuroTheme}
      showLineNumbers={showLineNumbers}
      customStyle={customStyle}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export default HighlighterFactory;
