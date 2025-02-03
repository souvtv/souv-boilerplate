import React, { useCallback } from 'react'
import { matchPath, Outlet, useNavigate } from 'react-router'
import {LayoutSettings} from 'souv-components'

export const ConfigLayout = ()=>{
    const navigate = useNavigate()

    const onCheckMatch = useCallback((path: string, end = true) => {
        const match = matchPath({ end, path }, window.location.pathname)
        return !!match
    }, [])
    
    return <LayoutSettings onNavigate={navigate} onCheckMatch={onCheckMatch} 
    primaryRoutes={[
        {
            label: "config1",
            path: "/settings",
        },
        {
            label: "config2",
            path: "/settings",
        },
        {
            label: "config3",
            path: "/settings",
        }
    ]}
    >
        <Outlet/>
    </LayoutSettings>
}
