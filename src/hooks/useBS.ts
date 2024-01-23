import { useCallback, useRef } from "react";
export default function useCustomBottomSheet() {
  let ref = useRef<any>();
  let show = useCallback(() => {
    if (ref.current) ref.current.expand();
  }, []);
  let hide = useCallback(() => {
    if (ref.current) ref.current.close();
  }, []);
  return {
    ref,
    show,
    hide,
  };
}
