import { NavLink } from 'react-router';
import React from 'react';
import './NavigationDesktop.css';
import { useGlobal } from '@/context/GlobalContext';
import ThemeToggle from '../ui/ThemeToggle/ThemeToggle';

const NavigationDesktop = ({ className }) => {
    const { data, loading } = useGlobal();

    if (!loading) {
        let { primary, secondary } = []
        data.navigation.forEach(link => {
            if (link.navId === 'primary') {
                primary = [...link.link]
            } else if (link.navId === 'secondary') {
                secondary = [...link.link]
            }
        })

        return (
            <div className={`navigation-desktop ${className}`} role='menu'>
                {primary.map((link, i) => {
                    if (link.external) {
                        return (<a key={`primary-${i}`} href={link.path} target='_blank' role='menuitem'>{link.label}</a>)
                    } else {
                        return (<NavLink key={`primary-${i}`} to={link.path} role='menuitem'>{link.label}</NavLink>)
                    }
                })}
                <span className='primary'>/</span>
                {secondary.map((link, i)  => {
                    if (link.external) {
                        return (<a key={`secondary-${i}`} href={link.path} target='_blank' role='menuitem'>{link.label}</a>)
                    } else {
                        return (<NavLink key={`secondary-${i}`} to={link.path} role='menuitem'>{link.label}</NavLink>)
                    }
                })}
                <ThemeToggle />
            </div>
        )
    } else {
        return (<></>)
    }
  }
  
  export default NavigationDesktop