import { FunctionComponent } from 'react';
import BreadCrumb from '@/layouts/_common/bread-crumb.tsx';
import SearchBar from '@/layouts/_common/search-bar.tsx';
import NoticeButton from '@/layouts/_common/notice.tsx';
import SettingButton from '@/layouts/_common/setting-button.tsx';


const header: FunctionComponent = () => {

    return (
        <div style={{ height: '80px', width: 'calc(100vw - 260px)' }}
             className="flex flex-row items-center justify-between flex-grow px-4 xl:px-6 2xl:px-10 text-[gray]">
            <div className="flex items-baseline">
                <div className="hidden ml-4 md:block"><BreadCrumb></BreadCrumb></div>
            </div>
            <div className="flex">
                <SearchBar />
                <NoticeButton />
                <SettingButton />
            </div>
        </div>
    );
};

export default header;
