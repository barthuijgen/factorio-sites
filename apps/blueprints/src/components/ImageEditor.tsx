import { css } from "@emotion/react";
import { parseBlueprintStringClient } from "@factorio-sites/web-utils";
import { useEffect, useRef, useState } from "react";
import { PUBLIC_URL } from "../utils/env";
import { Box } from "@chakra-ui/react";

type FBE = typeof import("@fbe/editor");
type Editor = InstanceType<FBE["Editor"]>;

const editorCss = css`
  position: relative;
  .error {
    position: absolute;
    top: 10%;
    left: 10%;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 40px;
    width: 450px;
    text-align: center;

    h3 {
      font-size: 30px;
    }
  }
`;

interface ImageEditorProps {
  string: string;
  onError?: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ string, onError }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [image, setImage] = useState<string | undefined>();
  const FbeRef = useRef<FBE>();
  const editorRef = useRef<Editor>();
  const [renderError, setRenderError] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Load editor async, it does not work server side
  useEffect(() => {
    (async () => {
      const FBE = await import("@fbe/editor");
      const editor = new FBE.Editor();
      const canvas = canvasRef.current;
      if (!canvas) return;
      await editor.init(canvas, PUBLIC_URL);
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      editor.setRendererSize(canvas.offsetWidth, canvas.offsetHeight);
      FbeRef.current = FBE;
      editorRef.current = editor;
      setEditorLoaded(true);
    })();

    const resizeFn = () => {
      if (!canvasRef.current || !editorRef.current) return;
      canvasRef.current.style.width = "100%";
      canvasRef.current.style.height = "auto";
      editorRef.current.setRendererSize(
        canvasRef.current.offsetWidth,
        canvasRef.current.offsetHeight
      );
    };
    window.addEventListener("resize", resizeFn, false);
    return () => window.removeEventListener("resize", resizeFn);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setRenderError(false);

        if (!parseBlueprintStringClient(string)) {
          return;
        }

        const FBE = FbeRef.current;
        const editor = editorRef.current;
        if (!editorLoaded || !FBE || !editor) return;

        const bp = await FBE.decodeToBlueprint(string);

        await editor.loadBlueprint(bp);
        // await FBE.default.waitForLoader();

        // Wait a little extra, sometimes even after textures are loaded it neeeds a moment to render
        // await new Promise((resolve) => setTimeout(resolve, 10));

        // const picture = await editor.getPicture();
        // setImage(URL.createObjectURL(picture));
      } catch (reason: any) {
        setRenderError(true);
        if (onError) onError();
        if (Array.isArray(reason.errors)) {
          return console.error("Blueprint string not supported by FBE", reason.errors);
        }
        console.error("Failed to render blueprint", reason);
      }
    })();
  }, [string, editorLoaded, onError]);

  return (
    <Box css={editorCss}>
      {renderError && (
        <div className="error">
          <h3>Failed to render blueprint</h3>
          <p>
            This happens when there are modded entities or in some cases blueprint properties that
            FBE does not yet support
          </p>
        </div>
      )}
      <canvas id="pbe" ref={canvasRef} style={{ width: "100%", height: "auto" }} />
      {/* <img src={image} alt="blueprint" style={{ width: "500px" }}></img> */}
    </Box>
  );
};
