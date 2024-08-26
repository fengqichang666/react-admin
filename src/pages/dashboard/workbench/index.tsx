import useChart from '@/components/chart/useChart.ts';
import Chart from '@/components/chart/chart.tsx';
import { Col, Row, Space } from 'antd';
import BannerCard from '@/pages/dashboard/workbench/banner-card.tsx';
import { Applications, Conversion } from '@/pages/dashboard/workbench/Conversion.tsx';
import TotalCard from '@/pages/dashboard/workbench/total-card.tsx';

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
            <Row>
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
            <ChartDount />
        </div>
    );
}
const series = [{ value: 44, name: 'Mac' },
    { value: 55, name: 'Window' },
    { value: 13, name: 'IOS' },
    { value: 43, name: 'Android' }];

function ChartDount() {
    const chartOptions = useChart({}, series);

    return <Chart options={chartOptions} height={300} />;
}