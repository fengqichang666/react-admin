import { useTranslation } from 'react-i18next';
import { useMultiTabsContext, type KeepAliveTab } from './multi-tabs-provider';
import { useCallback, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useThemeToken } from '@/theme/hooks/use-theme-token';
import { Dropdown, Tabs, type MenuProps, type TabsProps } from 'antd';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder, DroppableProvided } from 'react-beautiful-dnd';
import { Iconify } from '@/components/icon';
import { useRouter } from '@/router/hooks';
import { replaceDynamicParams } from '@/router/hooks/use-current-route-meta';
import { MultiTabOperation } from '#/enum';

const MultiTabs = () => {
    const [hoveringTabKey, setHoveringTabKey] = useState('');
    const { push } = useRouter()

    const { t } = useTranslation();
    const {
        tabs,
        activeTabRoutePath,
        setTabs,
        closeTab,
        refreshTab,
        closeOthersTab,
        closeAll,
        closeLeft,
        closeRight,
    } = useMultiTabsContext();
    const themeToken = useThemeToken();
    console.log(tabs)
    /**
     * tab样式
     */
    const calcTabStyle: (tab: KeepAliveTab) => CSSProperties = useCallback(
        (tab) => {
            const isActive = tab.key === activeTabRoutePath || tab.key === hoveringTabKey;
            const result: CSSProperties = {
                borderRadius: '8px 8px 0 0',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: themeToken.colorBorderSecondary,
                backgroundColor: themeToken.colorBgLayout,
                transition:
                    'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            };

            if (isActive) {
                result.backgroundColor = themeToken.colorBgContainer;
                result.color = themeToken.colorPrimaryText;
            }
            return result;
        },
        [activeTabRoutePath, hoveringTabKey, themeToken],
    );

    const multiTabsStyle: CSSProperties = {
        position: 'fixed',
        top: 80,
        left: 'auto',
        height: 32,
        // backgroundColor: Color(colorBgElevated).alpha(1).toString(),
        // borderBottom: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
        transition: 'top 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        width: 'calc(100% - 260px)'
    };
    const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
        // 拖拽到非法非 droppable区域
        if (!destination) {
            return;
        }
        // 原地放下
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const newTabs = Array.from(tabs);
        const [movedTab] = newTabs.splice(source.index, 1);
        newTabs.splice(destination.index, 0, movedTab);
        setTabs(newTabs);

    }
    const handleTabClick = ({ key, params = {} }: KeepAliveTab) => {
        const tabKey = replaceDynamicParams(key, params);
        push(tabKey);
    }
    const [openDropdownTabKey, setOpenDropdownTabKey] = useState('')
    /**
      * tab dropdown下拉选
      */
    const menuItems = useMemo<MenuProps['items']>(
        () => [
            // {
            //     label: t(`sys.tab.${MultiTabOperation.FULLSCREEN}`),
            //     key: MultiTabOperation.FULLSCREEN,
            //     icon: <Iconify icon="material-symbols:fullscreen" size={18} />,
            // },
            {
                label: t(`sys.tab.${MultiTabOperation.REFRESH}`),
                key: MultiTabOperation.REFRESH,
                icon: <Iconify icon="mdi:reload" size={18} />,
            },
            {
                label: t(`sys.tab.${MultiTabOperation.CLOSE}`),
                key: MultiTabOperation.CLOSE,
                icon: <Iconify icon="material-symbols:close" size={18} />,
                disabled: tabs.length === 1,
            },
            {
                type: 'divider',
            },
            {
                label: t(`sys.tab.${MultiTabOperation.CLOSELEFT}`),
                key: MultiTabOperation.CLOSELEFT,
                icon: (
                    <Iconify
                        icon="material-symbols:tab-close-right-outline"
                        size={18}
                        className="rotate-180"
                    />
                ),
                disabled: tabs.findIndex((tab) => tab.key === openDropdownTabKey) === 0,
            },
            {
                label: t(`sys.tab.${MultiTabOperation.CLOSERIGHT}`),
                key: MultiTabOperation.CLOSERIGHT,
                icon: <Iconify icon="material-symbols:tab-close-right-outline" size={18} />,
                disabled: tabs.findIndex((tab) => tab.key === openDropdownTabKey) === tabs.length - 1,
            },
            {
                type: 'divider',
            },
            {
                label: t(`sys.tab.${MultiTabOperation.CLOSEOTHERS}`),
                key: MultiTabOperation.CLOSEOTHERS,
                icon: <Iconify icon="material-symbols:tab-close-outline" size={18} />,
                disabled: tabs.length === 1,
            },
            {
                label: t(`sys.tab.${MultiTabOperation.CLOSEALL}`),
                key: MultiTabOperation.CLOSEALL,
                icon: <Iconify icon="mdi:collapse-all-outline" size={18} />,
            },
        ],
        [openDropdownTabKey, t, tabs],
    );
    /**
 * tab dropdown click
 */
    const menuClick = useCallback(
        (menuInfo: any, tab: KeepAliveTab) => {
            const { key, domEvent } = menuInfo;
            domEvent.stopPropagation();
            switch (key) {
                case MultiTabOperation.REFRESH:
                    refreshTab(tab.key);
                    break;
                case MultiTabOperation.CLOSE:
                    closeTab(tab.key);
                    break;
                case MultiTabOperation.CLOSEOTHERS:
                    closeOthersTab(tab.key);
                    break;
                case MultiTabOperation.CLOSELEFT:
                    closeLeft(tab.key);
                    break;
                case MultiTabOperation.CLOSERIGHT:
                    closeRight(tab.key);
                    break;
                case MultiTabOperation.CLOSEALL:
                    closeAll();
                    break;
                case MultiTabOperation.FULLSCREEN:
                    //   toggleFullScreen();
                    break;
                default:
                    break;
            }
        },
        [refreshTab, closeTab, closeOthersTab, closeLeft, closeRight, closeAll],
    );
    /**
   * 当前显示dorpdown的tab
   */
    const onOpenChange = (open: boolean, tab: KeepAliveTab) => {
        if (open) {
            setOpenDropdownTabKey(tab.key);
        } else {
            setOpenDropdownTabKey('');
        }
    };
    const renderTabLabel = useCallback((tab: KeepAliveTab) => {
        if (tab.hideTab) return null;
        return (
            <Dropdown trigger={['contextMenu']}
                onOpenChange={(open) => onOpenChange(open, tab)}
                menu={
                    { items: menuItems, onClick: (menuInfo) => menuClick(menuInfo, tab) }
                }
                >
                <div
                    className="relative flex items-center px-4 py-1 mx-px select-none"
                    style={calcTabStyle(tab)}
                    onMouseEnter={() => {
                        if (tab.key === activeTabRoutePath) return;
                        setHoveringTabKey(tab.key);
                    }}
                    onMouseLeave={() => setHoveringTabKey('')}
                >
                    <div>
                        {t(tab.label)}
                    </div>
                    <Iconify icon="ion:close-outline" size={18}
                        className="opacity-50 cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); closeTab(tab.key) }}
                        style={{
                            visibility: (tab.key !== activeTabRoutePath && tab.key !== hoveringTabKey) ||
                                tabs.length === 1
                                ? 'hidden'
                                : 'visible',
                        }}
                    ></Iconify>
                </div>
            </Dropdown>
        )
    }, [activeTabRoutePath, hoveringTabKey, closeTab, tabs.length,
        t,

    ])
    const scrollContainer = useRef<HTMLDivElement>(null);
    const renderTabBar: TabsProps['renderTabBar'] = () => {
        return (
            <div style={multiTabsStyle} className="z-20 w-full">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tabsDroppable" direction="horizontal">
                        {
                            (provided: DroppableProvided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full">
                                    <div ref={scrollContainer} className="flex w-full px-2 hide-scrollbar">
                                        {
                                            tabs.map((tab, index) => (
                                                <div id={`tab-${index}`} className="flex-shrink-0" key={tab.key}
                                                    onClick={() => handleTabClick(tab)}
                                                >
                                                    <Draggable key={tab.key} draggableId={tab.key} index={index}>
                                                        {
                                                            (provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="w-auto">
                                                                    {renderTabLabel(tab)}
                                                                </div>
                                                            )
                                                        }
                                                    </Draggable>

                                                </div>
                                            ))
                                        }
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
    /**
 * 所有tab
 */
    const tabContentRef = useRef(null);

    const tabItems = useMemo(() => {
        return tabs?.map((tab) => ({
            label: renderTabLabel(tab),
            key: tab.key,
            closable: tabs.length > 1, // 保留一个
            children: (
                <div ref={tabContentRef} key={tab.timeStamp}>
                    {tab.children}
                </div>
            ),
        }));
    }, [tabs, renderTabLabel]);

    return (
        <>
            <Tabs
                tabBarGutter={4}
                renderTabBar={renderTabBar} items={tabItems} activeKey={activeTabRoutePath} />
        </>
    )
}
export default MultiTabs;