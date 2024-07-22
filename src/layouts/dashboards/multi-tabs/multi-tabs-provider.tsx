import type { RouteMeta } from '#/router';
import { useRouter } from '@/router/hooks';
import { replaceDynamicParams, useCurrentRouteMeta } from '@/router/hooks/use-current-route-meta';
import { isEmpty } from 'ramda';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
export type KeepAliveTab = RouteMeta & {
    children: any;
};
interface MultiTabsContextType {
    tabs: KeepAliveTab[];
    activeTabRoutePath?: string;
    setTabs: (tabs: KeepAliveTab[]) => void;
    closeTab: (path?: string) => void;
    closeAll: () => void;
    closeOthersTab: (path: string) => void;
    closeLeft: (path: string) => void;
    closeRight: (path: string) => void;
    refreshTab: (path: string) => void;
}
const MultiTabsContext = createContext<MultiTabsContextType>({
    tabs: [],
    activeTabRoutePath: '',
    setTabs: () => { },
    closeTab: () => { },
    closeAll: () => { },
    closeOthersTab: () => { },
    closeLeft: () => { },
    closeRight: () => { },
    refreshTab: () => { }
})
function getTimeStamp() {
    return new Date().getTime().toString();
}
export const useMultiTabsContext = () => {
    return useContext(MultiTabsContext);
}
const MultiTabsProvider = ({ children }: PropsWithChildren) => {
    const { push } = useRouter()
    const [tabs, setTabs] = useState<KeepAliveTab[]>([])
    const currentRouteMeta = useCurrentRouteMeta()
    const activeTabRoutePath = useMemo(() => {
        if (!currentRouteMeta) return '';
        const { key, params = {} } = currentRouteMeta;
        if (!isEmpty(params)) {
            return replaceDynamicParams(key, params);
        }
        return key;
    }, [currentRouteMeta]);
    const closeTab = useCallback((path = activeTabRoutePath) => {
        const tempTabs = [...tabs]
        if (tempTabs.length === 1) return;
        const deleteTabIndex = tempTabs.findIndex((item) => item.key === path);
        if (deleteTabIndex > 0) {
            push(tempTabs[deleteTabIndex - 1].key);
        } else {
            push(tempTabs[deleteTabIndex + 1].key);
        }
        tempTabs.splice(deleteTabIndex, 1);
        setTabs(tempTabs);
    }, [activeTabRoutePath, push, tabs])
    const closeOthersTab = useCallback(
        (path = activeTabRoutePath) => {
            setTabs((prev) => prev.filter((item) => item.key === path));
            if (path !== activeTabRoutePath) {
                push(path);
            }
        },
        [activeTabRoutePath, push],
    );
    const closeAll = useCallback(() => {
        setTabs([]);
        push(HOMEPAGE);
    }, [push]);
    const closeLeft = useCallback(
        (path: string) => {
            const currentTabIndex = tabs.findIndex((item) => item.key === path);
            const newTabs = tabs.slice(currentTabIndex);
            setTabs(newTabs);
            push(path);
        },
        [push, tabs],
    );
    const closeRight = useCallback(
        (path: string) => {
            const currentTabIndex = tabs.findIndex((item) => item.key === path);
            const newTabs = tabs.slice(0, currentTabIndex + 1);
            setTabs(newTabs);
            push(path);
        },
        [push, tabs],
    );
    const refreshTab = useCallback(
        (path = activeTabRoutePath) => {
            setTabs((prev) => {
                const index = prev.findIndex((item) => item.key === path);

                if (index >= 0) {
                    prev[index].timeStamp = getTimeStamp();
                }

                return [...prev];
            });
        },
        [activeTabRoutePath],
    );
    useEffect(() => {
        setTabs((prev) => prev.filter((item) => !item.hideTab));

        if (!currentRouteMeta) return;
        let { key } = currentRouteMeta;
        const { outlet: children, params = {} } = currentRouteMeta;

        if (!isEmpty(params)) {
            key = replaceDynamicParams(key, params);
        }
        const isExisted = tabs.find((item) => item.key === key);

        if (!isExisted) {
            setTabs((prev) => [
                ...prev,
                { ...currentRouteMeta, key, children, timeStamp: getTimeStamp() },
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRouteMeta]);
    const defaultValue: MultiTabsContextType = useMemo(
        () => ({
            tabs,
            activeTabRoutePath,
            setTabs,
            closeTab,
            closeOthersTab,
            refreshTab,
            closeAll,
            closeLeft,
            closeRight,
        }),
        [
            activeTabRoutePath,
            closeAll,
            closeLeft,
            closeOthersTab,
            closeRight,
            closeTab,
            refreshTab,
            tabs,
        ],
    );
    return (<MultiTabsContext.Provider value={defaultValue}>
        {children}
    </MultiTabsContext.Provider>);
}
export default MultiTabsProvider;