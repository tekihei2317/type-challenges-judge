import ReactMarkdown from 'react-markdown'
import { useOutletContext } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula as syntaxStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button, Wrap, Box, Link } from '@chakra-ui/react'
import { toGitHubUrl } from '../../../utils/type-challenges'

import {
  CodeComponent,
  CodeProps,
  ReactMarkdownNames,
} from 'react-markdown/lib/ast-to-react'
import { ProblemLayoutContext } from '../../../components/ProblemLayout'

const CodeBlock: CodeComponent | ReactMarkdownNames = ({
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

export const ProblemPage = () => {
  const { problem } = useOutletContext<ProblemLayoutContext>()

  return (
    <>
      {problem === undefined ? (
        <></>
      ) : (
        <Box>
          <Wrap p={1} pl={0.5} mb={6}>
            <Button colorScheme={'blue'}>挑戦する</Button>
            <Link
              href={toGitHubUrl(problem)}
              isExternal
              style={{ textDecoration: 'none' }}
            >
              <Button variant={'outline'}>GitHubで見る</Button>
            </Link>
          </Wrap>
          <ReactMarkdown components={{ code: CodeBlock }}>
            {problem.content}
          </ReactMarkdown>
        </Box>
      )}
    </>
  )
}
