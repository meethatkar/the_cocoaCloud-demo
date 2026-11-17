import { useEffect, useState } from "react";
import { preloadCakeModel, CAKE_MODEL_URL } from "@/services/gltfLoaderService";

/**
 * Hook to manage Draco decoder initialization and check for model availability
 */
export function useDracoLoader() {
  const [modelAvailable, setModelAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to preload with Draco decoder
    preloadCakeModel();

    // Check if external GLB file actually exists in /public/models/cake.glb
    fetch(CAKE_MODEL_URL, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setModelAvailable(true);
        } else {
          setModelAvailable(false);
        }
      })
      .catch(() => {
        setModelAvailable(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { modelAvailable, isLoading };
}

