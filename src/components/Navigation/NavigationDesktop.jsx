import { NavLink } from 'react-router';
import React from 'react';
import Logo from '@/assets/logo.svg?react';
// import Logo from '@/components/ui/Logo.jsx'
import './NavigationDesktop.css';
import { useGlobal } from '@/context/GlobalContext';

const logoStyle = {
    height: '100%'
}
const imageStyle = {
    width: 'auto',
    height: '100%'
}

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
            <div className={`navigation-desktop ${className}`}>
                <NavLink className='navigation-desktop__logo' to='/' style={logoStyle} aria-label='link to homepage'>
                    <Logo />
                </NavLink>
                <div className='navigation-desktop__navlinks' role='menu'>
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
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
  }
  
  export default NavigationDesktop