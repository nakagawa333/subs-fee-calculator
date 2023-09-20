"use client";
import { LocalStorageKey } from '@/constant/localStorageKey';
import { Content } from '@/type/content';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { setPriority } from 'os';
import { useEffect, useState } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PieLabel,
  ResponsiveContainer
} from 'recharts';
export default function Dashboard() {
  const [pieData, setPieData] = useState<any[]>([]);

  //音楽
  const [localMusicContents, setLocalMusicContents] = useState<Content[]>([]);
  //動画
  const [localVideoContents, setLocalVideoContents] = useState<Content[]>([]);
  //電子書籍
  const [localEbookContents, setLocalEbookContents] = useState<Content[]>([]);

  const [select, setSelect] = useState<number>(0);

  const COLORS: string[] = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
  };

  const selectChange = (e: any) => {
    setSelect(e.target.value);
  }

  useEffect(() => {
    //音楽
    let getLocalContents: string | null = localStorage.getItem(LocalStorageKey.GENREID.MUSIC);
    //動画
    let getLocalVideoContents: string | null = localStorage.getItem(LocalStorageKey.GENREID.VIDEO);
    //電子書籍
    let getLocalEbookContents: string | null = localStorage.getItem(LocalStorageKey.GENREID.EBOOK);

    const thisPieData: any[] = [];
    //アプリ毎
    if (select === 0) {
      let localContents: Content[] = [{ appName: "", planId: "", price: 0 }];

      let appMap = new Map<string,number>();
      if (getLocalContents !== null) {
        localContents = JSON.parse(getLocalContents);

        for (let localContent of localContents) {
          let price: number | undefined = appMap.get(localContent.appName);
          if (price) {
            appMap.set(localContent.appName, price + localContent.price);
          } else {
            appMap.set(localContent.appName, localContent.price);
          }
        }

        appMap.forEach((value,key) => {
          let obj = {
            name: key,
            value: value
          }
          thisPieData.push(obj);
        })

        //大きい順に並べる
        let sortThisPieData = [...thisPieData].sort((a, b) => {
          return b.value - a.value;
        })

        setLocalMusicContents(localContents);

        setPieData(sortThisPieData);
      }

      if (getLocalVideoContents != null) {
        setLocalMusicContents(localContents);
      }

      if (getLocalEbookContents !== null) {
        //電子書籍
        setLocalEbookContents(localEbookContents);
      }

    } else if (select === 1) {
      //ジャンル毎
      if (getLocalContents) {
        let localContents: Content[] = JSON.parse(getLocalContents);

        let musicName: string = "音楽";
        let musicValue: number = localContents.reduce((pre, curr) => pre + curr.price, 0);

        thisPieData.push({
          name: musicName,
          value:musicValue
        })
      }

      if (getLocalVideoContents) {
        let localVideoContents: Content[] = JSON.parse(getLocalVideoContents);
        let videoName: string = "動画";
        let videoValue: number = localVideoContents.reduce((pre, curr) => pre + curr.price, 0);

        thisPieData.push({
          name: videoName,
          value:videoValue
        })
      }

      if (getLocalEbookContents) {
        let localEbookContents: Content[] = JSON.parse(getLocalEbookContents);
        let ebookName: string = "電子書籍";
        let ebookValue: number = localEbookContents.reduce((pre, curr) => pre + curr.price, 0);

        thisPieData.push({
          name: ebookName,
          value:ebookValue
        })
      };


      //グラフデータ更新
      setPieData(thisPieData);
    } else if (select === 2) {
      //プラン毎
      let localContents: Content[] = [{ appName: "", planId: "", price: 0 }];

      if (getLocalContents !== null) {
        localContents = JSON.parse(getLocalContents);

        let planMap = new Map<string,number>();
        for (let localContent of localContents) {
          let price: number | undefined = planMap.get(localContent.planId);
          if (price) {
            planMap.set(localContent.planId, price + localContent.price);
          } else {
            planMap.set(localContent.planId, localContent.price);
          }
        }

        planMap.forEach((value,key) => {
          let obj = {
            name: key,
            value: value
          }
          thisPieData.push(obj);
        })

        //大きい順に並べる
        let sortThisPieData = [...thisPieData].sort((a, b) => {
          return b.value - a.value;
        })

        setLocalMusicContents(localContents);

        setPieData(sortThisPieData);
      }

      if (getLocalVideoContents != null) {
        setLocalMusicContents(localContents);
      }

      if (getLocalEbookContents !== null) {
        //電子書籍
        setLocalEbookContents(localEbookContents);
      }
    }


  }, [select]);

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <FormControl
          style={{
            width: "40%",
            marginTop: 20,
            marginRight:10,
            display: "flex",
            justifyContent:"flex-end"
          }}
        >
          <InputLabel
            id="demo-simple-select-label"
          >
            </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            onChange={selectChange}
          >
            <MenuItem value={0}>アプリ毎</MenuItem>
            <MenuItem value={1}>ジャンル毎</MenuItem>
            <MenuItem value={2}>プラン毎</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Stack spacing={3} style={{ width: '100%',height:"400px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={true}
              label={renderCustomizedLabel}
              fill="#8884d8">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>

            <Legend />
          </PieChart>
          </ResponsiveContainer>
        </Stack>
    </>
  )
}
