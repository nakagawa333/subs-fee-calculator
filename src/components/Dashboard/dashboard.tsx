"use client";
import { LocalStorageKey } from '@/constant/localStorageKey';
import { Content } from '@/type/content';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  PieLabel,
  ResponsiveContainer
} from 'recharts';
export default function Dashboard() {
  const [pieData, setPieData] = useState<any[]>([]);

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

  useEffect(() => {
    let getLocalContents: string | null = localStorage.getItem(LocalStorageKey.GENREID.MUSIC);
    let localContents: Content[] = [{ appName: "", planId: "", price: 0 }];

    if (getLocalContents !== null) {
      localContents = JSON.parse(getLocalContents);
      const thisPieData: any[] = [];

      for (let localContent of localContents) {
        let obj = {
          name: localContent.appName,
          value: localContent.price
        }
        thisPieData.push(obj);
      }

      //大きい順に並べる
      let sortThisPieData = [...thisPieData].sort((a, b) => {
        return b.value - a.value;
      })

      setPieData(sortThisPieData);
    }
  }, []);

  return (
    <>
      <Stack spacing={3} style={{ width: '100%', height: '250px' }}>
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
          </PieChart>
          </ResponsiveContainer>
        </Stack>
    </>
  )
}
