import { IconButton, Iconify } from '@/components/icon';
import { Badge } from 'antd';

const Notice = () => {
    return (
        <div>
            <IconButton>
                <Badge count={0} showZero>
                    <Iconify icon="solar:bell-bing-bold-duotone" size="24" />
                </Badge>
            </IconButton>
        </div>
    );
};

export default Notice;
