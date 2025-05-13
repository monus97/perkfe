// PurchasesChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  defs,
  linearGradient,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { time: "12 AM", value: 20 },
  { time: "1 AM", value: 35 },
  { time: "3 AM", value: 22 },
  { time: "5 AM", value: 37 },
  { time: "6 AM", value: 42 },
  { time: "8 AM", value: 53 },
  { time: "9 AM", value: 47 },
  { time: "11 AM", value: 48 },
  { time: "12 PM", value: 41 },
  { time: "2 PM", value: 50 },
  { time: "4 PM", value: 60 },
  { time: "6 PM", value: 62 },
  { time: "8 PM", value: 73 },
  { time: "9 PM", value: 65 },
];

const PurchasesChart = () => {
  return (
    <Card
    elevation={0}
    
      sx={{
        borderRadius: 3,
        boxShadow: "none",
        backgroundColor: "#fff",
        mt:2
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" fontWeight={500} mb={2}>
          Purchases
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6A0DAD" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6A0DAD" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6A0DAD"
              fillOpacity={1}
              fill="url(#colorUv)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PurchasesChart;
