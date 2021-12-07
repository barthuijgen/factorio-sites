import React, { Suspense } from "react";
import { css } from "@emotion/react";
import { Box } from "@chakra-ui/react";
import type { SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const SimpleMDE = React.lazy(() => import("react-simplemde-editor"));

const styles = css`
  .editor-toolbar {
    button.active,
    button:hover {
      background: #5d5d5d;
    }

    &.fullscreen {
      background: #414040;
    }
  }

  .editor-preview {
    background: #414040;
  }

  .CodeMirror {
    background: #414040;
    color: white;
  }

  .CodeMirror-cursor {
    border-color: white;
  }

  .EasyMDEContainer .CodeMirror-fullscreen {
    border-left: none !important;
    border-bottom: none !important;
  }
`;

export const MDEditor: React.FC<SimpleMDEReactProps> = (props) => {
  return (
    <Suspense fallback={null}>
      <Box css={styles}>
        <SimpleMDE options={{ spellChecker: false, sideBySideFullscreen: false }} {...props} />
      </Box>
    </Suspense>
  );
};
