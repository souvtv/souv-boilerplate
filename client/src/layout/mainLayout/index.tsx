import { HStack } from '@chakra-ui/react'
import { Avatar } from '@client/components/ui/avatar'
import { ColorModeButton } from '@client/components/ui/color-mode'
import React, { useCallback } from 'react'
import { matchPath, Outlet, useNavigate } from 'react-router'
import {LayoutApp} from 'souv-components'

export const MainLayout = ()=>{
    const navigate = useNavigate()

    const onCheckMatch = useCallback((path: string, end = true) => {
        const match = matchPath({ end, path }, window.location.pathname)
        return !!match
    }, [])
      
    return <LayoutApp appName='Boilerplate' headerContent={<HeaderContent/>} 
    onCheckMatch={onCheckMatch}
    onNavigate={navigate}
    primaryRoutes={[
    {
        path:'/',
        label: "Home",
    },
    {
        path:'/hello',
        label: "Hello",
    }
    ]} 
    secondaryRoutes={[
    {
        path:'/settings',
        label:'Config'
    }]}
    >
        <Outlet/>
    </LayoutApp>
}

const HeaderContent = ()=>{
    return <HStack width={'full'} justify={'end'}>
        
        <ColorModeButton/>

        <Avatar src={''} />
    </HStack> 
}
