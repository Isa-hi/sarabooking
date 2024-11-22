"use client"

import { Appointment } from "@prisma/client";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type Props = {
  appointments: Appointment[];
  serviceNames: Record<string, string>;
};

// Function to generate a pastel color
function generatePastelColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
}

export default function ReportsCard({ appointments, serviceNames }: Props) {
  const chartData = useMemo(() => {
    const serviceCounts = appointments.reduce((acc, appointment) => {
      acc[appointment.serviceId] = (acc[appointment.serviceId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(serviceCounts).map(([serviceId, count]) => ({
      serviceType: serviceNames[serviceId] || serviceId,
      count,
      fill: generatePastelColor(serviceId)
    }));
  }, [appointments, serviceNames]);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Reporte de servicios</CardTitle>
        <CardDescription>Gráfica de servicios más populares</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Count",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="serviceType"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={{ fontSize: 12, textAnchor: 'end' }}
                height={70}
              />
              <YAxis />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <ChartTooltipContent>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">{data.serviceType}</span>
                          <span>{data.count} appointments</span>
                        </div>
                      </ChartTooltipContent>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

