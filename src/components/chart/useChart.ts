import { mergeDeepRight } from 'ramda';
import { useAppSelector } from '@/store';

const userChart = (options: any, data: any = []) => {
    const theme = useAppSelector(state => state.settings.setting);
    console.log(theme);
    const baseOptions = {
        tooltip: {
            trigger: 'item'
        },
        grid: {
            top: 30,
            bottom: 30
        },
        legend: {
            bottom: '0%',
            left: 'center',
            icon: 'circle',
            itemStyle: {}
        },
        series: [
            {
                animation: false,
                type: 'pie',
                radius: ['70%', '75%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    scale: false,
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                        formatter: '{b} \n {d}'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    };
    return mergeDeepRight(baseOptions, options);
};

export default userChart;
