/** @jsx jsx */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { jsx, css } from "@emotion/react";
import { MapInteractionCSS } from "react-map-interaction";

const elementStyle = css`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0px;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  & > div > div {
    display: flex;
    justify-content: center;
  }
`;

interface FullscreenImageProps {
  alt: string;
  src: string;
  close: () => void;
}

export const FullscreenImage: React.FC<FullscreenImageProps> = ({ alt, src, close }) => {
  const [state, setState] = useState({
    scale: 0.9,
    translation: { x: window.innerWidth * 0.05, y: 30 },
  });

  return (
    <div
      css={elementStyle}
      onClick={(e) => {
        if ((e as any).target.nodeName.toUpperCase() !== "IMG") {
          close();
        }
      }}
      onTouchEnd={(e) => {
        if ((e as any).target.nodeName.toUpperCase() !== "IMG") {
          close();
        }
      }}
    >
      <MapInteractionCSS value={state} onChange={setState}>
        <img alt={alt} src={src} />
      </MapInteractionCSS>
    </div>
  );
};
