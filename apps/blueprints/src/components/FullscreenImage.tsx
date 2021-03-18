import React, { useState } from "react";
import { css } from "@emotion/react";
import { MapInteractionCSS } from "react-map-interaction";
import { Image } from "@chakra-ui/image";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

const StyledImage = styled(Box)`
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 500px;
    object-fit: contain;
  }

  img:hover {
    cursor: pointer;
  }
`;

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
  z-index: 1;

  & > div > div {
    display: flex;
    justify-content: center;
  }
`;

interface FullscreenImageProps {
  alt: string;
  src: string;
  close?: () => void;
}

export const FullscreenImage: React.FC<FullscreenImageProps> = ({ alt, src }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    scale: 0.9,
    translation: { x: window.innerWidth * 0.05, y: 30 },
  });

  return (
    <>
      <StyledImage>
        <Image
          src={src}
          alt={alt}
          maxWidth="100%"
          maxHeight="500px"
          objectFit="contain"
          onClick={() => setOpen(true)}
        />
      </StyledImage>
      {open && (
        <div
          css={elementStyle}
          onClick={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((e as any).target.nodeName.toUpperCase() !== "IMG") {
              setOpen(false);
            }
          }}
          onTouchEnd={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((e as any).target.nodeName.toUpperCase() !== "IMG") {
              setOpen(false);
            }
          }}
        >
          <MapInteractionCSS value={state} onChange={setState}>
            <img alt={alt} src={src} />
          </MapInteractionCSS>
        </div>
      )}
    </>
  );
};
