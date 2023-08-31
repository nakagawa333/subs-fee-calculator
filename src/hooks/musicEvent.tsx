import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type MusicEvent = {
  handleChange: (event: any, index: number) => void;
  handleSumChange: (event: any, index: number) => void;
  addCircleIconClick: () => void;
  highlightOffIconClick: (index: number) => void;
}

export const UseMusicEvent = (
  appNames: string[],
  sums: number[],
  datas: any,
  addEvent: boolean,
  setAppNames: Dispatch<SetStateAction<string[]>>,
  setSums: Dispatch<SetStateAction<number[]>>,
  setAddEvent: Dispatch<SetStateAction<boolean>>
): [MusicEvent] => {

  /**
   * アプリ名変更時
   * @param event イベント
   * @param index インデックス
   */
  const handleChange = (event: { target: { value: string } }, index: number) => {
    let thisAppNames = [...appNames];
    thisAppNames[index] = event.target.value;
    setAppNames(thisAppNames);

    //料金 初期化
    let thisSetSums = [...sums];
    thisSetSums[index] = 0;
    setSums(thisSetSums);
  };

  /**
   * 料金変更
   * @param event イベント
   * @param index インデックス
   */
  const handleSumChange = (event: { target: { value: string } }, index: number) => {
    let thisSetSums = [...sums];
    thisSetSums[index] = Number(datas[appNames[index]]["plan"][event.target.value]);
    setSums(thisSetSums);
    //setSum(datas[appName]["plan"][event.target.value]);
  }

  /**
   * 追加クリック時
   *
   */
  const addCircleIconClick = () => {
    let thisAppNames = [...appNames];
    let thisSetSums = [...sums];

    thisAppNames.push("");
    thisSetSums.push(0);

    setAppNames(thisAppNames);
    setSums(thisSetSums);
    setAddEvent(!addEvent);
  }

  /**
   * 削除アイコンクリック時
   * @param index
   */
  const highlightOffIconClick = (index: number) => {
    if (appNames.length <= 1) {
      setSums([0]);
      setAppNames([""]);
    } else {
      let thisAppNames = [...appNames];
      //削除処理
      thisAppNames.splice(index, 1);

      let thisSums = [...sums];
      thisSums.splice(index, 1);

      setAppNames(thisAppNames);
      setSums(thisSums);
    }
  }

  return [{ handleChange, handleSumChange, addCircleIconClick, highlightOffIconClick }]
}
