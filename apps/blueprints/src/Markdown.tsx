/** @jsx jsx */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { jsx, css } from "@emotion/core";
import ReactMarkdown from "react-markdown";

const markdownStyle = css`
  overflow: hidden;
  img {
    max-width: 100%;
  }
  ul,
  ol {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
`;

export const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <div css={markdownStyle}>
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
);
