import { FunctionComponent } from 'react';
import BreadCrumb from '@/layouts/_common/bread-crumb.tsx';
import SearchBar from '@/layouts/_common/search-bar.tsx';
import NoticeButton from '@/layouts/_common/notice.tsx';
import SettingButton from '@/layouts/_common/setting-button.tsx';
import { IconButton, Iconify } from '@/components/icon';
import AccountDropdown from '@/layouts/_common/account-dropdown.tsx';


const header: FunctionComponent = () => {

    return (
        <header className="w-full fixed right-0" style={{ width: 'calc(100% - 260px)' }}>
            <div style={{ height: '80px', width: 'calc(100vw - 260px)' }}
                 className="flex flex-row items-center justify-between flex-grow px-4 xl:px-6 2xl:px-10 text-[gray]">
                <div className="flex items-baseline">
                    <div className="hidden ml-4 md:block"><BreadCrumb></BreadCrumb></div>
                </div>
                <div className="flex">
                    <SearchBar />
                    <IconButton>
                        <Iconify icon="mdi:github" size="24" />
                    </IconButton>
                    <NoticeButton />
                    <SettingButton />
                    <AccountDropdown />
                </div>
            </div>
        </header>
    );
};

export default header;
