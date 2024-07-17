import { IconButton, SvgIcon } from '@/components/icon';

const SearchBar = () => {
    return (
        <>
            <div className="flex items-center justify-center">
                <IconButton className='h-8 py-2 text-xs font-bold rounded-xl bg-hover'>
                    <div className='flex items-center justify-center gap-2'>
                        <SvgIcon icon='ic-search' size='20' />
                        <div className='flex items-center justify-center h-6 px-1.5 ml-1 bg-white rounded-md text-gray-800'>
                            ⌘K
                        </div>
                    </div>
                </IconButton>
            </div>
        </>
    );
};

export default SearchBar;
