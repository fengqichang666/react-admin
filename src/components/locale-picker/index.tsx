import { Dropdown, MenuProps } from 'antd';
import { IconButton, SvgIcon } from '@/components/icon';
import useLocale, { LANGUAGE_MAP } from '@/locales/useLocale.ts';
import { LocalEnum } from '#/enum.ts';

const LocalePicker = () => {
    const items: MenuProps['items'] = Object.values(LANGUAGE_MAP).map(item => {
        return {
            key: item.locale,
            label: item.label,
            icon: <SvgIcon icon={item.icon} size="20" className="rounded-md"></SvgIcon>
        };
    });
    const { locale, setLocale } = useLocale();
    return (
        <div>
            <Dropdown menu={{ items, onClick: (e) => setLocale(e.key as keyof typeof LocalEnum) }}
                      trigger={['click']}
                      key={locale}>
                <IconButton className="h-10 w-10 hover:scale-105">
                    <SvgIcon icon={`ic-locale_${locale}`} size="24" className="rounded-md" />
                </IconButton>
            </Dropdown>
        </div>
    );
};

export default LocalePicker;
