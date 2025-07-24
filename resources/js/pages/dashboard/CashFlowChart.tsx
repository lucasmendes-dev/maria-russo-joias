"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
} from "recharts";
import { ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { GraphData } from "@/types";

export function CashFlowChart({graphData}: {graphData: GraphData[]}) { console.log(graphData)
    const chartConfig = {
        revenueValue: {
            label: "Receita (R$)",
            color: "#05df72",
        },
        costsValue: {
            label: "Custos (R$)",
            color: "#ff6467",
        },
        monthProfit: {
            label: "Resultado (R$)",
            color: "#51a2ff",
        },
        totalProductsSold: {
            label: "Joias Vendidas",
            color: "#c27aff",
        },
    } satisfies ChartConfig;

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart accessibilityLayer data={graphData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="revenueValue" fill="var(--color-revenueValue)" radius={4} />
                <Bar dataKey="costsValue" fill="var(--color-costsValue)" radius={4} />
                <Bar dataKey="monthProfit" fill="var(--color-monthProfit)" radius={4} />
                <Bar dataKey="totalProductsSold" fill="var(--color-totalProductsSold)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
