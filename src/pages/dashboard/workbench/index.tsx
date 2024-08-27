import useChart from '@/components/chart/useChart.ts';
import Chart from '@/components/chart/chart.tsx';
import { Col, Row, Select, Space, Typography } from 'antd';
import BannerCard from '@/pages/dashboard/workbench/banner-card.tsx';
import { Applications, Conversion } from '@/pages/dashboard/workbench/Conversion.tsx';
import TotalCard from '@/pages/dashboard/workbench/total-card.tsx';
import { useState } from 'react';
import Card from '@/components/card';

export default function Workbench() {
    return (
        <div className="p-2">
            <Row gutter={[16, 16]} justify="center">
                <Col span={24} lg={16}>
                    <BannerCard />
                </Col>
                <Col span={24} lg={8}>
                    <Space direction="vertical" className="w-full h-full justify-center">
                        <Conversion />
                        <Applications />
                    </Space>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-4">
                <Col span={8}>
                    <TotalCard
                        title="Total Active Users"
                        increase
                        count="18,765"
                        percent="2.6%"
                        chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]} />
                </Col>
                <Col span={8}>
                    <TotalCard
                        title="Total Installed"
                        increase
                        count="4,876"
                        percent="0.2%"
                        chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]} />
                </Col>
                <Col span={8}>
                    <TotalCard
                        title="Total Downloads"
                        increase={false}
                        count="678"
                        percent="0.1%"
                        chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-4">
                <Col span={8}>
                    <ChartDount />
                </Col>
                <Col span={16}>
                    <ChartLine />
                </Col>
            </Row>
        </div>
    );
}


function ChartDount() {
    const series = [{ value: 44, name: 'Mac' },
        { value: 55, name: 'Window' },
        { value: 13, name: 'IOS' },
        { value: 43, name: 'Android' }];
    const total = series.reduce((sum, item) => sum + item.value, 0);
    const chartOptions = useChart({
        title: {
            text: `Total\n ${total}`,
            left: 'center',
            top: 'center',
            textStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                align: 'center'
            }
        },
        grid: {
            top: 0, bottom: 20
        }
    }, series);

    return <Card className="h-full flex-col"><Typography.Title className="self-start" level={5}>Current Download
    </Typography.Title><Chart options={chartOptions} height={'100%'} width={'100%'} /></Card>;
}

function ChartLine() {
    const [year, setYear] = useState('2023');
    const series: any = {
        '2022': [
            { name: 'China', data: [10, 41, 35, 51, 49, 61, 69, 91, 148, 35, 51, 0] },
            { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 45, 13, 56, 77, 0] }
        ],

        '2023': [
            { name: 'China', data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 35, 51, 0] },
            { name: 'America', data: [56, 13, 34, 10, 77, 99, 88, 45, 13, 56, 77, 0] }
        ]
    };
    const chartOptions = useChart({
        legend: {
            top: 0,
            left: 'right',
            itemStyle: {}
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 50,
            bottom: 50,
            right: 20,
            left: 50
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jut',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec']
        },
        yAxis: {
            show: true,
            type: 'value'
        },
        series: series[year]?.map((item: any) => {
            return {
                name: item.name,
                type: 'line',
                data: item.data,
                smooth: true,
                connectNulls: false,
                areaStyle: {
                    opacity: 0.1
                }
            };
        })

    });

    return (
        <Card className="flex-col">
            <header className="flex justify-between w-full mb-2">
                <Typography.Title level={5}>Area Installed</Typography.Title>
                <div>
                    <Select
                        size="small"
                        onChange={(val) => {
                            setYear(val);
                        }}
                        defaultValue={'2023'}
                        options={[
                            {
                                value: '2022',
                                label: '2022'
                            }, {
                                value: '2023',
                                label: '2023'
                            }
                        ]}>
                    </Select>
                </div>
            </header>
            <Chart options={chartOptions} height={300} width={'100%'} />;
        </Card>
    )
        ;
}