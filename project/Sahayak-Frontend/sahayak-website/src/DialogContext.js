import React, { createContext, useContext, useState, useEffect } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
    const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
    const [isNotifDialogOpen, setNotifDialogOpen] = useState(false);


    const openLoginDialog = () => setLoginDialogOpen(true);
    const closeLoginDialog = () => setLoginDialogOpen(false);
    const openNotifDialog = () => setNotifDialogOpen(true);
    const closeNotifDialog = () => setNotifDialogOpen(false);


    return (
        <DialogContext.Provider value={{ isLoginDialogOpen, openLoginDialog, closeLoginDialog, isNotifDialogOpen, openNotifDialog, closeNotifDialog}}>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);
