import { mergeDeepRight } from 'ramda';
import { useAppSelector } from '@/store';
import { useThemeToken } from '@/theme/hooks/use-theme-token.ts';

const userChart = (options: any, data: any = []) => {
    const theme = useAppSelector(state => state.settings.setting);
    const themeToken = useThemeToken();
    console.log(theme);
    const baseOptions = {
        color: [
            themeToken.colorPrimary,
            themeToken.colorWarning,
            themeToken.colorInfo,
            themeToken.colorError,
            themeToken.colorSuccess,
            themeToken.colorWarningActive,
            themeToken.colorSuccessActive,
            themeToken.colorInfoActive,
            themeToken.colorInfoText
        ],
        tooltip: {
            trigger: 'item'
        },
        grid: {
            top: 30,
            bottom: 30
        },
        legend: {
            bottom: '0',
            left: 'center',
            icon: 'circle',
            textStyle: {
                color: themeToken.colorPrimary
            }
        },
        series: [
            {
                animation: false,
                type: 'pie',
                radius: ['70%', '78%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    scale: false,
                    label: {
                        show: false,
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
