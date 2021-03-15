import { Button } from "../Button";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BlueprintStringData } from "@factorio-sites/types";

interface BlueprintDataProps {
  string: string;
  data: BlueprintStringData | null;
  onRequestData?: () => void;
}

export const BlueprintData: React.FC<BlueprintDataProps> = ({ string, data, onRequestData }) => {
  const [showDetails, setShowDetails] = useState<"string" | "json" | "none">("none");

  useEffect(() => {
    setShowDetails("none");
  }, [string, data]);

  return (
    <Box>
      <Box>
        <Button
          onClick={() => {
            setShowDetails(showDetails === "string" ? "none" : "string");
          }}
        >
          {showDetails === "string" ? "Hide" : "Show"} string
        </Button>
        <Button
          css={{ marginLeft: "1rem" }}
          onClick={() => {
            setShowDetails(showDetails === "json" ? "none" : "json");
            if (!data && onRequestData) {
              onRequestData();
            }
          }}
        >
          {showDetails === "json" ? "Hide" : "Show"} json
        </Button>
      </Box>
      <Box css={{ marginTop: "1rem" }}>
        {showDetails === "string" && (
          <textarea
            value={string || "Loading..."}
            readOnly
            css={{
              width: "100%",
              height: "100px",
              resize: "none",
              color: "#fff",
              backgroundColor: "#414040",
            }}
          />
        )}
        {showDetails === "json" && (
          <pre css={{ maxHeight: "500px", overflowY: "scroll" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </Box>
    </Box>
  );
};
