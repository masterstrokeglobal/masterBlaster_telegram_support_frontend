"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useGetBarChartData } from "./api/merchant-query"

export function TransactionChart() {
  const { data, isLoading } = useGetBarChartData({});
  
  if (isLoading) return <div>Loading...</div>
  
  // Transform the data to match the expected format for the chart
  const chartData = data?.data?.map((item: { month: any; totalPayIn: any; totalWithdraw: any; totalPayOut: any; }) => ({
    name: item.month,  // "name" for X-axis
    totalUserSupport: item.totalPayIn,
    userSupportSolved: item.totalWithdraw,
    userSupportPending: item.totalPayOut
  })) || [];
  
  if (chartData.length === 0) return <div>No data</div>
  
  return (
    <div className="w-full h-72" >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="userSupportSolved" 
            stackId="1" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.6} 
          />
          <Area 
            type="monotone" 
            dataKey="userSupportPending" 
            stackId="1" 
            stroke="#ef4444" 
            fill="#ef4444" 
            fillOpacity={0.6} 
          />
          <Area 
            type="monotone" 
            dataKey="totalUserSupport" 
            stackId="1" 
            stroke="#f59e0b" 
            fill="#f59e0b" 
            fillOpacity={0.6} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}