import { useEffect, useState, RefObject } from "react";

export type FBE = typeof import("@fbe/editor");
export type Editor = InstanceType<FBE["Editor"]>;

export const useFBE = (canvasRef?: RefObject<HTMLCanvasElement>) => {
  const [FBE, setFBE] = useState<FBE | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    (async () => {
      const _FBE = await import("@fbe/editor");
      setFBE(_FBE);
      if (canvasRef) {
        const _editor = new _FBE.Editor();
        const canvas = canvasRef.current;
        if (!canvas) return;
        await _editor.init(canvas);
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        _editor.setRendererSize(canvas.offsetWidth, canvas.offsetHeight);
        setEditor(_editor);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { FBE, editor };
};

export const useFbeData = () => {
  const [FBE, setFBE] = useState<FBE | null>(null);

  useEffect(() => {
    (async () => {
      const _FBE = await import("@fbe/editor");
      if (!_FBE.FD.items) {
        await fetch("/api/fbe-proxy/data.json")
          .then((res) => res.text())
          .then((modules) => _FBE.FD.loadData(modules));
      }
      setFBE(_FBE);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data: FBE?.FD };
};
