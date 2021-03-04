import { parseBlueprintStringClient } from "@factorio-sites/web-utils";
import { useEffect, useRef, useState } from "react";

type FBE = typeof import("@fbe/editor");
type Editor = InstanceType<FBE["Editor"]>;

export const ImageEditor: React.FC<{ string: string }> = ({ string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [image, setImage] = useState<string | undefined>();
  const FbeRef = useRef<FBE>();
  const editorRef = useRef<Editor>();
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Load editor async, it does not work server side
  useEffect(() => {
    (async () => {
      const FBE = await import("@fbe/editor");
      const editor = new FBE.Editor();
      const canvas = canvasRef.current;
      if (!canvas) return;
      await editor.init(canvas);
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      editor.setRendererSize(canvas.offsetWidth, canvas.offsetHeight);
      FbeRef.current = FBE;
      editorRef.current = editor;
      setEditorLoaded(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!parseBlueprintStringClient(string)) {
        return;
      }

      const FBE = FbeRef.current;
      const editor = editorRef.current;
      if (!editorLoaded || !FBE || !editor) return;

      const bpOrBook = await FBE.getBlueprintOrBookFromSource(string);
      const blueprint = bpOrBook instanceof FBE.Book ? bpOrBook.selectBlueprint(0) : bpOrBook;

      console.log({ blueprint });

      await editor.loadBlueprint(blueprint);
      // await FBE.default.waitForLoader();

      // Wait a little extra, sometimes even after textures are loaded it neeeds a moment to render
      // await new Promise((resolve) => setTimeout(resolve, 10));

      // const picture = await editor.getPicture();
      // setImage(URL.createObjectURL(picture));
    })();
  }, [string, editorLoaded]);

  window.addEventListener(
    "resize",
    () => {
      if (!canvasRef.current || !editorRef.current) return;
      canvasRef.current.style.width = "100%";
      canvasRef.current.style.height = "auto";
      editorRef.current.setRendererSize(
        canvasRef.current.offsetWidth,
        canvasRef.current.offsetHeight
      );
    },
    false
  );

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
      {/* <img src={image} alt="blueprint" style={{ width: "500px" }}></img> */}
    </div>
  );
};
