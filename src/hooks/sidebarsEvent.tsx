import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type SidebarsEvent = {
  listItemClick: (text: string) => void;
}

export const UseSidebarsEvent = (
  setMobileOpen: Dispatch<SetStateAction<boolean>>,
  iconInfos: any
): [SidebarsEvent] => {
  const router = useRouter();
  /**
   * タグクリック時
   * @param text
  */
  const listItemClick = (text: string) => {
    setMobileOpen(false);
    router.push(iconInfos[text]["href"]);
  }

  return [{ listItemClick }]
}
