// components/BottomSheetContext.tsx
import React, {createContext, useContext, useState} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {UUID} from 'crypto';

type PageType = 'page1' | 'page2' | string | null;

type SheetParams = {
    id?: UUID | string;
} | null;

type BottomSheetContextType = {
    openBottomSheet: (page: PageType, params?: SheetParams) => void;
    closeBottomSheet: () => void;
    isOpen: SharedValue<boolean>;
    activePage: PageType;
    params: SheetParams;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const useBottomSheet = () => {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error('useBottomSheet must be used within a BottomSheetProvider');
    }
    return context;
};

export const BottomSheetProvider = ({children}: { children: React.ReactNode }) => {
    const isOpen = useSharedValue(false);
    const [activePage, setActivePage] = useState<PageType>(null);
    const [params, setParams] = useState<SheetParams>(null); // État pour les paramètres

    const openBottomSheet = (page: PageType, newParams?: SheetParams) => {
        setActivePage(page);
        setParams(newParams || null);
        isOpen.set(true);
    };

    const closeBottomSheet = () => {
        isOpen.set(false);

        setTimeout(() => {
            setActivePage(null);
            setParams(null);
        }, 300);
    };

    return (
        <BottomSheetContext.Provider
            value={{isOpen, activePage, params, openBottomSheet, closeBottomSheet}} // Exposer params
        >
            {children}
        </BottomSheetContext.Provider>
    );
};