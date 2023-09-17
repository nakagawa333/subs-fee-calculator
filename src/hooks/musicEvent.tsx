import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

type MusicEvent = {
  calPrice: (price: number) => number;
  handleChange: (event: any, index: number) => void;
  handleSumChange: (event: any, index: number) => void;
  addCircleIconClick: () => void;
  highlightOffIconClick: (index: number) => void;
  sucessDeleteSnackbarClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

export const UseMusicEvent = (

): [Content[],number[], number,any,any,boolean,MusicEvent] => {
  const [contents, setContents] = useState<Content[]>([{"appName":"","planId":""}]);
  //料金一覧
  const [sums, setSums] = useState<number[]>([0]);
  //スクロールイベント
  const [addEvent, setAddEvent] = useState<boolean>(true);

  //全体の合計値
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const addCircleIconRef = useRef<any>(null);

  const [datas, setDatas] = useState<any>([]);

  const [sucessDeleteOpen,setSucessDeleteOpen] = useState<boolean>(false);

  //スクロール処理
  useEffect(() => {
    addCircleIconRef?.current?.scrollIntoView();
  }, [addEvent])

  useEffect(() => {
    calTotalPrice();
  }, [sums]);

    useEffect(() => {

      const getData = async () => {
          //リクエストURL
          let reqUrl: string = "https://subs-fee-calculator-backend.naka33321.workers.dev";
          //リクエストBody
          let reqBody = {
              genreId:1
          };

          try {
              let post = await axios.post(reqUrl, reqBody);
              setDatas(post.data);
          } catch (error: any) {
              console.error("アプリ名、プラン名の取得に失敗しました");
              console.error({
                  message: error.message,
                  errorName:error.name,
                  content:error
              })
          }
      }
      getData();
  }, [])

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
  const handleChange = (event: { target: { value: string } }, index: number):void => {
    let thisContents:Content[] = JSON.parse(JSON.stringify(contents));
    thisContents[index].appName = event.target.value;
    setContents(thisContents);

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
  const handleSumChange = (event: { target: { value: string } }, index: number):void => {
    let thisSetSums = [...sums]
    //アプリ名
    let appName:string = contents[index].appName;

    thisSetSums[index] = Number(datas[appName]["plan"][event.target.value]);

    let thisContents = JSON.parse(JSON.stringify(contents));
    thisContents[index].planId = event.target.value;
    setContents(thisContents);
    setSums(thisSetSums);
  }

  /**
   * 追加クリック時
   *
   */
  const addCircleIconClick = ():void => {
    let thisSetSums:number[] = [...sums];
    let thisContents:Content[] = JSON.parse(JSON.stringify(contents));

    let content: Content = { "appName": "", "planId": "" };
    thisContents.push(content);
    setContents(thisContents);

    thisSetSums.push(0);

    setSums(thisSetSums);

    let totalPrice:number = thisSetSums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setTotalPrice(totalPrice);
    setAddEvent(!addEvent);
  }

  /**
   * 削除アイコンクリック時
   * @param index
   */
  const highlightOffIconClick = (index: number): void => {
    if (contents.length <= 1) {
      let firstContent: Content = contents[0];
      if (firstContent.appName !== "" || firstContent.planId !== "") {
        setSums([0]);
        let content: Content = { "appName": "", "planId": "" }
        setContents([content]);
        //削除用スナックバー
        setSucessDeleteOpen(true);
      }
    } else {
      let thisSums: number[] = [...sums];
      thisSums.splice(index, 1);

      let thisContents: Content[] = [...contents];
      thisContents.splice(index, 1);
      setContents(thisContents);

      setSums(thisSums);

      //削除用スナックバー
      setSucessDeleteOpen(true);
    }
  }

  /**
   * 削除成功スナックバークローズ処理
   */
  const sucessDeleteSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    //他の要素クリック時はスナックバーを閉じない
    if (reason === "clickaway") {
      return;
    }
    //スナックバーを閉じる
    setSucessDeleteOpen(false);
  }

  /**
   * 全体の合計値を取得する
   */
  const calTotalPrice = ():void => {
    let thisTotalPrice: number = sums.reduce((acc, curr) => acc + curr, 0);
    setTotalPrice(thisTotalPrice);
  }

  return [contents,sums, totalPrice, addCircleIconRef, datas,sucessDeleteOpen,{ calPrice, handleChange, handleSumChange, addCircleIconClick, highlightOffIconClick,sucessDeleteSnackbarClose }]
}
