import { IconButton, SvgIcon } from '@/components/icon';
import { Empty, GlobalToken, Input, InputRef, Modal } from 'antd';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import ProTag from '@/theme/antd/components/tag.tsx';
import { useFlattenedRoutes, useRouter } from '@/router/hooks';
import Scrollbar from '@/components/scrollbar';
import styled from 'styled-components';
import { useThemeToken } from '@/theme/hooks/use-theme-token.ts';
import { useTranslation } from 'react-i18next';
import Color from 'color';
import { useEvent, useKeyPressEvent } from 'react-use';

const SearchBar = () => {
    const { replace } = useRouter();
    const { t } = useTranslation();
    const themeToken = useThemeToken();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const flattenedRoutes = useFlattenedRoutes();
    const [searchResult, setSearchResult] = useState(flattenedRoutes);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        setSearchQuery('');
        setSelectedItemIndex(0);
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleHover = (index: number) => {
        setSelectedItemIndex(index);
    };
    const activeStyle: CSSProperties = {
        border: `1px dashed ${themeToken.colorPrimary}`,
        backgroundColor: `${Color(themeToken.colorPrimary).alpha(0.2).toString()}`
    };
    useEffect(() => {
        const result = flattenedRoutes.filter(item => {
            return t(item.label).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 || item.key.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
        });
        setSearchResult(result);
    }, [searchQuery, t, flattenedRoutes]);
    const inputRef = useRef<InputRef>(null);
    const handleAfterOpenChange = (open: boolean) => {
        if (open) {
            // auto focus
            inputRef.current?.focus();
        }
    };
    useKeyPressEvent('ArrowUp', (event) => {
        if (!isModalOpen) return;
        event.preventDefault();
        let nextIndex = selectedItemIndex - 1;
        if (nextIndex < 0) {
            nextIndex = searchResult.length - 1;
        }
        setSelectedItemIndex(nextIndex);
        scrollSelectedItemIntoView(nextIndex);
    });
    useKeyPressEvent('ArrowDown', (event) => {
        if (!isModalOpen) return;
        event.preventDefault();
        let nextIndex = selectedItemIndex + 1;
        if (nextIndex > searchResult.length - 1) {
            nextIndex = 0;
        }
        setSelectedItemIndex(nextIndex);
        scrollSelectedItemIntoView(nextIndex);
    });
    const scrollSelectedItemIntoView = (index: number) => {
        if (listRef.current) {
            const selectedItem = listRef.current.children[index];
            selectedItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };
    const handleSelect = (key: string) => {
        replace(key);
        handleCancel();
    };
    useKeyPressEvent('Enter', (event) => {
        if (!isModalOpen || searchResult.length === 0) return;
        event.preventDefault();
        const selectItem = searchResult[selectedItemIndex].key;
        if (selectItem) {
            handleSelect(selectItem);
            setIsModalOpen(false);
        }
    });
    const handleMetaK = (event: KeyboardEvent) => {
        // event.metaKey &&
        if (event.key === 'k') {
            handleOpen();
        }
    };
    useEvent('keydown', handleMetaK);
    return (
        <>
            <div className="flex items-center justify-center">
                <IconButton className="h-8 py-2 text-xs font-bold rounded-xl bg-hover" onClick={handleOpen}>
                    <div className="flex items-center justify-center gap-2">
                        <SvgIcon icon="ic-search" size="20" />
                        <div className="flex items-center justify-center h-6 px-1.5 ml-1 bg-white rounded-md text-gray-800">
                            ⌘K
                        </div>
                    </div>
                </IconButton>
            </div>
            <Modal open={isModalOpen} onCancel={handleCancel}
                   centered closeIcon={false}
                   styles={{ body: { height: '50vh' } }}
                   afterOpenChange={handleAfterOpenChange}
                   title={
                       <Input placeholder="Search..."
                              ref={inputRef}
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              bordered={false}
                              autoFocus
                              prefix={<SvgIcon icon="ic-search" size="20" />}
                              suffix={<IconButton className="h-6 rounded-md bg-hover text-xs" onClick={handleCancel}>
                                  Esc
                              </IconButton>} />
                   }
                   footer={
                       <div className="flex flex-wrap">
                           <div className="flex">
                               <ProTag color="cyan">↑</ProTag>
                               <ProTag color="cyan">↓</ProTag>
                               <span>to navigate</span>
                           </div>
                           <div className="flex">
                               <ProTag color="cyan">↵</ProTag>
                               <span>to select</span>
                           </div>
                           <div className="flex">
                               <ProTag color="cyan">ESC</ProTag>
                               <span>to close</span>Scrollbar
                           </div>
                       </div>
                   }>
                {
                    searchResult.length === 0 ? <Empty /> : (
                        <Scrollbar>
                            <div ref={listRef} className="py-2">
                                {
                                    searchResult.map(({ label, key }, index) => {
                                        return (
                                            <StyledListItemButton $themetoken={themeToken}
                                                                  onMouseMove={() => handleHover(index)}
                                                                  style={index === selectedItemIndex ? activeStyle : {}}
                                                                  key={key}
                                                                  onClick={() => handleSelect(key)}
                                            >
                                                <div className="font-medium" style={{
                                                    color: themeToken.colorText
                                                }}>
                                                    {t(label)}
                                                </div>
                                                <div style={{
                                                    color: themeToken.colorTextDescription
                                                }}>{t(key)}</div>
                                            </StyledListItemButton>
                                        );
                                    })
                                }
                            </div>
                        </Scrollbar>
                    )
                }
            </Modal>
        </>
    );
};

export default SearchBar;
const StyledListItemButton = styled.div<{ $themetoken: GlobalToken }>`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    border-bottom: ${(props) => `1px dashed ${props.$themetoken.colorBorder}`};
    color: ${(props) => `${props.$themetoken.colorTextSecondary}`};
`;