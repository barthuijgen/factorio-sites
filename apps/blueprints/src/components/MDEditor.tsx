import React from "react";
import styled from "@emotion/styled";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const StyledSimpleMDE = styled(SimpleMDE)`
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
    <StyledSimpleMDE options={{ spellChecker: false, sideBySideFullscreen: false }} {...props} />
  );
};
