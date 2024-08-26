import useChart from '@/components/chart/useChart.ts';
import Chart from '@/components/chart/chart.tsx';
import { SvgIcon } from '@/components/icon';
import Card from '@/components/card';
import { useThemeToken } from '@/theme/hooks/use-theme-token.ts';

type Props = {
    title: string;
    increase: boolean;
    percent: string;
    count: string;
    chartData: number[];
};
const TotalCard = ({ title, increase, count, percent, chartData }: Props) => {
    return (
        <Card className="flex-grow">
            <div className="flex justify-between items-center flex-grow">
                <div>
                    <h6 className="text-sm font-medium">{title}</h6>
                    <div className="mb-2 mt-4 flex flex-row">
                        {increase ? (
                            <SvgIcon icon="ic_rise" size={24} color="rgb(34, 197, 94)" />
                        ) : (
                            <SvgIcon icon="ic_decline" size={24} color="rgb(255, 86, 48)" />
                        )}
                        <div className="ml-2">
                            <span>{increase ? '+' : '-'}</span>
                            <span>{percent}</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold">{count}</h3>
                </div>
                <ChartLine data={chartData} />

            </div>
        </Card>
    );
};

function ChartLine({ data }: { data: number[] }) {
    const themeToken = useThemeToken();
    const chartOptions = useChart({
        tooltip: {
            borderWidth: 0,
            show: true,
            trigger: 'axis',
            formatter: '{c0}',
            axisPointer: {
                type: 'none'
            }
        },
        xAxis: {
            type: 'category',
            show: false
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [
            {
                lineStyle: {
                    normal: {
                        width: 3,
                        color: themeToken.colorPrimaryText
                    }
                },
                showSymbol: false,
                type: 'line',
                smooth: true,
                data
            }
        ]
    });
    return <Chart options={chartOptions} height={90} width={120} />;
}

export default TotalCard;
