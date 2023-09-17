import { LocalStorageKey } from '@/constant/localStorageKey';
import { Content } from '@/type/content';
import axios from 'axios';
import { useEffect,useRef, useState } from 'react';

type MusicEvent = {
  handleChange: (event: any, index: number) => void;
  handleSumChange: (event: any, index: number) => void;
  addCircleIconClick: () => void;
  highlightOffIconClick: (index: number) => void;
  sucessDeleteSnackbarClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

export const UseMusicEvent = (

): [Content[], number, any, any, boolean, MusicEvent] => {
  const genreId: number = 1;

  const [contents, setContents] = useState<Content[]>([{ appName: "", planId: "", price: 0 }]);
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

    const getData = async () => {
        //リクエストURL
        let reqUrl: string = "https://subs-fee-calculator-backend.naka33321.workers.dev";
        //リクエストBody
        let reqBody = {
            genreId:genreId
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

    let getLocalContents: string | null = localStorage.getItem(LocalStorageKey.GENREID.MUSIC);
    let localContents: Content[] = [{ appName: "", planId: "", price: 0 }];

    if (getLocalContents !== null) {
      localContents = JSON.parse(getLocalContents);    setContents(localContents);

    }

    const localTotalPrice: number = localStorage.getItem(LocalStorageKey.TOTALPRICE) !== null ? Number(localStorage.getItem(LocalStorageKey.TOTALPRICE)) : 0;
    setTotalPrice(localTotalPrice);

}, [])

  /**
   * アプリ名変更時
   * @param event イベント
   * @param index インデックス
   */
  const handleChange = (event: { target: { value: string } }, index: number):void => {
    let thisContents: Content[] = JSON.parse(JSON.stringify(contents));
    //アプリ名
    thisContents[index].appName = event.target.value;
    //料金
    thisContents[index].price = 0;
    updateContents(thisContents);
  };

  /**
   * 料金変更
   * @param event イベント
   * @param index インデックス
   */
  const handleSumChange = (event: { target: { value: string } }, index: number):void => {
    //アプリ名
    let appName: string = contents[index].appName;

    let thisContents = JSON.parse(JSON.stringify(contents));

    //料金変更
    thisContents[index].price = Number(datas[appName]["plan"][event.target.value]);
    //プランid変更
    thisContents[index].planId = event.target.value;

    //合計料金
    let sums: number[] = thisContents.map((content: Content) => content.price);

    calTotalPrice(sums);
    updateContents(thisContents);
  }

  /**
   * 追加クリック時
   *
   */
  const addCircleIconClick = ():void => {
    let thisContents:Content[] = JSON.parse(JSON.stringify(contents));

    let content: Content = {appName:"",planId:"",price:0};
    thisContents.push(content);
    setContents(thisContents);

    let totalPrice: number = thisContents.reduce((pre, curr) => pre + curr.price, 0);

    setTotalPrice(totalPrice);
    setAddEvent(!addEvent);

    updateContents(thisContents);
    //ローカルストレージ更新
    localStorage.setItem(String(genreId),JSON.stringify(thisContents));
  }

  /**
   * 削除アイコンクリック時
   * @param index
   */
  const highlightOffIconClick = (index: number): void => {
    if (contents.length <= 1) {
      let firstContent: Content = contents[0];
      if (firstContent.appName !== "" || firstContent.planId !== "") {
        let contents: Content[] = [{ appName: "", planId: "", price: 0 }]

        calTotalPrice([0]);

        updateContents(contents);
        //削除用スナックバー
        setSucessDeleteOpen(true);
      }
    } else {

      let thisContents: Content[] = [...contents];
      thisContents.splice(index, 1);
      updateContents(thisContents);
      //合計料金
      let sums: number[] = thisContents.map((content: Content) => content.price);

      calTotalPrice(sums);

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
   * コンテンツを更新する
   * @param content コンテンツ
   */
  const updateContents = (contents: Content[]) => {
    setContents(contents);
    localStorage.setItem(String(genreId),JSON.stringify(contents));
  }

  /**
   * 全体の合計値を計算する
   * @param sums 合計値
   */
  const calTotalPrice = (sums:number[]):void => {
    let thisTotalPrice: number = sums.reduce((acc, curr) => acc + curr, 0);
    setTotalPrice(thisTotalPrice);
    localStorage.setItem(LocalStorageKey.TOTALPRICE, String(thisTotalPrice))
  }

  return [contents,totalPrice, addCircleIconRef, datas,sucessDeleteOpen,{handleChange, handleSumChange, addCircleIconClick, highlightOffIconClick,sucessDeleteSnackbarClose }]
}
