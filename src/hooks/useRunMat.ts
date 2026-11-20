import { useEffect, useRef, useState } from 'react';
import { initRunMat, type RunMatInitOptions, type RunMatSessionHandle } from 'runmat';


interface useRunMatProps {
  options?: RunMatInitOptions;
}

const useRunMat = ({ options }: useRunMatProps) => {
  const sessionRef = useRef<RunMatSessionHandle | null>(null);
  const optionsRef = useRef(options);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);


  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const session = await initRunMat({
          language: { compat: "matlab" },
          applicationSettings: "isolatedMemory",
          enableGpu: true,
          enableJit: true,
          ...optionsRef.current
        });

        if (!cancelled) {
          sessionRef.current = session;
          return setIsRunning(true);
        }

        return session.dispose();
      } catch (error) {
        console.error("Error initializing RunMat:", error);
      } finally {
        setIsLoading(false);
      }
    }

    init();

    return () => {
      cancelled = true;
      sessionRef.current?.dispose();
      sessionRef.current = null;
    };
  }, []);


  return { sessionRef, isRunning, isLoading };
}

export default useRunMat;
