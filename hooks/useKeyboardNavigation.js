import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export function useKeyboardNavigation() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const nextPage = () => setPage((value) => (value += 1));
  const previousPage = () => setPage((value) => Math.max((value -= 1), 0));

  const handleKeypress = (event) => {
    switch (event.code) {
      case "ArrowLeft":
        return previousPage();
      case "ArrowRight":
        return nextPage();
      default:
        return;
    }
  };

  useEffect(() => {
    router.push(`/${page}`);
  }, [page]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);
  }, []);
}
