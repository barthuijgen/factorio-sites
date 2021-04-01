import { css } from "@emotion/react";
import ReactMarkdown from "react-markdown";

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
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
);
