import * as echarts from 'echarts';

import { useEffect, useRef } from 'react';

const Chart = (props: any) => {
    const chartRef = useRef(null);
    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);
        chartInstance.setOption(props.options);
        window.addEventListener('resize', function() {
            chartInstance.resize();
        });
        // 在组件卸载时销毁实例
        return () => {
            chartInstance.dispose();
        };
    }, [props]);

    return <div ref={chartRef}
                style={{ height: props.height || 'auto', width: props.width || 'auto', ...props.style }}
                className={`${props.className}`}></div>;
};

export default Chart;
