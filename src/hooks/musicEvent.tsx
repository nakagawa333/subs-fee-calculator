import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

type MusicEvent = {
  calPrice: (price: number) => number;
  handleChange: (event: any, index: number) => void;
  handleSumChange: (event: any, index: number) => void;
  addCircleIconClick: () => void;
  highlightOffIconClick: (index: number) => void;
}

export const UseMusicEvent = (
  datas: any

): [string[], number[], number, any, MusicEvent] => {
  //アプリ名一覧
  const [appNames, setAppNames] = useState<string[]>([""]);
  //料金一覧
  const [sums, setSums] = useState<number[]>([0]);
  //スクロールイベント
  const [addEvent, setAddEvent] = useState<boolean>(true);

  //全体の合計値
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const addCircleIconRef = useRef<any>(null);

  //スクロール処理
  useEffect(() => {
    addCircleIconRef?.current?.scrollIntoView();
  }, [addEvent])

  useEffect(() => {
    calTotalPrice();
  }, [sums]);

  /**
   * 料金を計算する
   * @param price 料金
   * @returns 計算結果
   */
  const calPrice = (price: number):number => {
    return price + price;
  }

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

    let totalPrice = thisSetSums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setTotalPrice(totalPrice);
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

  /**
   * 全体の合計値を取得する
   */
  const calTotalPrice = () => {
    let thisTotalPrice: number = sums.reduce((acc, curr) => acc + curr, 0);
    setTotalPrice(thisTotalPrice);
  }

  return [appNames, sums, totalPrice, addCircleIconRef, { calPrice, handleChange, handleSumChange, addCircleIconClick, highlightOffIconClick }]
}
