import { Progress } from 'antd';
import { useThemeToken } from '@/theme/hooks/use-theme-token.ts';
import { Iconify } from '@/components/icon';

export const Conversion = () => {
    const { colorPrimaryActive, colorPrimaryBorder } = useThemeToken();
    return (
        <Basic percent={48} title="38,566"
               subtitle="Conversion"
               iconify="tabler:user-filled"
               bg={colorPrimaryActive}
               strokeColor={colorPrimaryBorder} />
    );
};
export const Applications = () => {
    const { colorInfoActive, colorInfoBorder } = useThemeToken();
    return (
        <Basic percent={75} title="45,566"
               subtitle="Applications"
               iconify="ic:round-email"
               bg={colorInfoActive}
               strokeColor={colorInfoBorder} />
    );
};
type Props = {
    percent: number;
    title: string;
    subtitle: string;
    iconify: string;
    bg?: string;
    strokeColor?: string;
};
const Basic = ({ percent, title, subtitle, iconify, bg, strokeColor }: Props) => {
    const { colorBgBase } = useThemeToken();
    const format = (val?: number) => <span style={{ color: colorBgBase }}>{val}%</span>;
    return (
        <div className="relative rounded-2xl p-6 flex items-center"
             style={{ background: bg, color: colorBgBase }}>
            <Progress type="circle"
                      percent={percent}
                      size={70}
                      format={format}
                      strokeColor={strokeColor}
            />
            <div className="ml-2 flex flex-col">
                <span className="text-2xl font-bold">{title}</span>
                <span>{subtitle}</span>
            </div>
            <div className="absolute right-0">
                <Iconify icon={iconify} style={{ opacity: 0.08 }} size={100} />
            </div>
        </div>
    );
};

