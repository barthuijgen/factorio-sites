import { css } from "@emotion/react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const markdownStyle = css`
  overflow: auto;
  img {
    max-width: 100%;
  }
  ul,
  ol {
    margin-block-start: 0.7em;
    margin-block-end: 0.7em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 25px;
  }
`;

export const Markdown: React.FC<{ children: string }> = ({ children, ...props }) => (
  <div css={markdownStyle} {...props}>
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{children}</ReactMarkdown>
  </div>
);
