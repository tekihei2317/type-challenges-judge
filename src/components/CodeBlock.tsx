import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula as syntaxStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  CodeComponent,
  CodeProps,
  ReactMarkdownNames,
} from 'react-markdown/lib/ast-to-react'

const CodeComponent: CodeComponent | ReactMarkdownNames = ({
  inline,
  className,
  children,
  ...props
}: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '')

  if (inline || !match)
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )

  return (
    <SyntaxHighlighter style={syntaxStyle} language={match[1]} PreTag="div">
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

type CodeBlockProps = {
  code: string | undefined
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
  return code === undefined ? (
    <></>
  ) : (
    <ReactMarkdown components={{ code: CodeComponent }}>{code}</ReactMarkdown>
  )
}
