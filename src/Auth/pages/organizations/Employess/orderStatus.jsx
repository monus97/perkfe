import {
  Paper,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export const OrderStatus = ({ data }) => {
  const datas = [
    {
      name: "Completed Orders",
      value: `${data?.orderCountData?.completedCount}`,
      color: "#0072F4",
    },
    {
      name: "Canceled Orders",
      value: `${data?.orderCountData?.cancelledCount}`,
      color: "#49AAEB",
    },
    {
      name: "Pending Orders",
      value: `${data?.orderCountData?.pendingCount}`,
      color: "#20D4C5",
    },
  ];

  return (
    <Paper elevation={0} sx={{ height: "100%", p: 3, borderRadius: 3 }}>
      <Typography fontSize={18} fontWeight={400} color="#444444" mb={2}>
        Order Status
      </Typography>
      <Box display="flex" alignItems="center">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={datas}
              dataKey="value"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
            >
              {datas.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <List>
          {datas.map((entry, index) => (
            <ListItem key={index} disableGutters>
              <Box
                sx={{
                  width: 20,
                  height: 12,
                  bgcolor: entry.color,
                  borderRadius: "20%",
                  mr: 1,
                }}
              />
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography
                      mr={3}
                      fontSize={12}
                      fontWeight={400}
                      color="#4F4D55"
                    >
                      {entry.name}
                    </Typography>
                    <Typography fontSize={12} fontWeight={400} color="#4F4D55">
                      {entry.value} %
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

// src/components/OrderTrends.js

const trendsData = [
  { month: "JAN", orders: 0 },
  { month: "FEB", orders: 1 },
  { month: "MAR", orders: 1 },
  { month: "APR", orders: 1 },
  { month: "MAY", orders: 5, label: "Joined" },
  { month: "JUN", orders: 10 },
  { month: "JUL", orders: 2 },
  { month: "AUG", orders: 10 },
  { month: "SEP", orders: 5 },
  { month: "OCT", orders: 3 },
  { month: "NOV", orders: 1 },
  { month: "DEC", orders: 5 },
];

// Custom tick for XAxis
const CustomTick = ({ x, y, payload }) => {
  const monthLabels = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const currentMonthIndex = new Date().getMonth(); // 0-11
  const tickIndex = monthLabels.indexOf(payload.value);
  const isCurrentOrFuture = tickIndex >= currentMonthIndex;

  return (
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      fill={isCurrentOrFuture ? "#838383" : "#E1E1E7"}
      fontSize={10}
      fontWeight={400}
    >
      {payload.value}
    </text>
  );
};

export const OrderTrends = ({ data }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
    <Box display="flex" justifyContent="space-between" mb={2}>
      <Typography fontSize={18} fontWeight={400} color="#444444">
        Order Trends
      </Typography>
      <FormControl
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#377dff",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7bb6f9",
            },
            "& .MuiSelect-select": {
              fontSize: "14px",
              color: "#333333",
            },
          },
        }}
      >
        <Select defaultValue="This Month">
          <MenuItem value="This Month">This Month</MenuItem>
          <MenuItem value="Last Month">Last Month</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={trendsData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={<CustomTick />} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="orders" fill="#8e44ad">
          <LabelList dataKey="label" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Paper>
);
