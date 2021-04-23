import { useEffect, useState, RefObject } from "react";
import { PUBLIC_URL } from "../utils/env";
import { createState, useState as useGlobalState } from "@hookstate/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FbeDataState = createState<FactorioData | null>(null);

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
        await _editor.init(canvas, PUBLIC_URL);
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

interface FactorioData {
  entities: Record<
    string,
    {
      name: string;
    }
  >;
  fluids: Record<
    string,
    {
      name: string;
    }
  >;
  items: Record<
    string,
    {
      name: string;
    }
  >;
  recipes: Record<
    string,
    {
      name: string;
    }
  >;
}

export const useFbeData = (): FactorioData | null => {
  const fbeDataState = useGlobalState(FbeDataState);

  useEffect(() => {
    (async () => {
      if (!fbeDataState.value) {
        const result = await fetch("/api/fbe-proxy/data.json")
          .then((res) => res.json())
          .catch(() => {
            console.error("Failed to fetch data.json");
          });
        if (result) fbeDataState.set(result);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fbeDataState.value;
};
