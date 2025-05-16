import { useState, useEffect } from 'react';
import React from 'react';
import { NavLink } from 'react-router';
import logo from '@/assets/logo.svg';
import './NavigationMobile.css';
import { useGlobal } from '@/context/GlobalContext';

const NavigationMobile = ({ className }) => {
    const [isOpen, toggleOpen] = useState(false);
    const { data, loading } = useGlobal();
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => {
        toggleOpen(!isOpen);
    };

    const handleKeyDown = (event) => {
        if (event.code === 'Enter') {
            toggleMenu();
        }
    }

    const logoStyle = {
        height: '100%'
    }
    const imageStyle = {
        width: 'auto',
        height: '100%'
    }
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
            <div className={`navigation-mobile ${className}`}>
                <NavLink to='/' style={logoStyle} aria-label='link to homepage'>
                    <img src={logo} style={imageStyle} alt='logo'/>
                </NavLink>
                <div className={`navigation-mobile__hamburger ${isOpen ? 'navigation-mobile__hamburger--open' : ''}`}
                    onClick={toggleMenu}
                    onKeyDown={(e) => handleKeyDown(e)}
                    tabIndex={0}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`navigation-mobile__menu ${isOpen ? 'navigation-mobile__menu--active' : ''}`}>
                    <div className='navigation-mobile__overlay' onClick={toggleMenu}></div>
                    <div className='navigation-mobile__navlinks' role='menu'>
                        {primary.map((link, i) => {
                            if (link.external) {
                                return (<a key={`primary-${i}`}
                                    href={link.path} 
                                    target='_blank' 
                                    tabIndex={isOpen ? 0 : -1} 
                                    onClick={toggleMenu} 
                                    style={{ transitionDelay: `${i}00ms`}}
                                    role='menuitem'>{link.label}</a>)
                            } else {
                                return (<NavLink key={`primary-${i}`} 
                                    to={link.path} 
                                    tabIndex={isOpen ? 0 : -1} 
                                    onClick={toggleMenu} 
                                    style={{ transitionDelay: `${i}00ms`}}
                                    role='menuitem'>{link.label}</NavLink>)
                            }
                        })}
                        <span className='primary' style={{ transitionDelay: `${primary.length}00ms`}}>/</span>
                        {secondary.map((link, j)  => {
                            if (link.external) {
                                return (<a key={`secondary-${j}`} 
                                    href={link.path} 
                                    tabIndex={isOpen ? 0 : -1} 
                                    onClick={toggleMenu} 
                                    target='_blank' 
                                    style={{ transitionDelay: `${j+2}00ms`}}
                                    role='menuitem'>{link.label}</a>)
                            } else {
                                return (<NavLink key={`secondary-${j}`} 
                                    to={link.path} 
                                    tabIndex={isOpen ? 0 : -1} 
                                    onClick={toggleMenu} 
                                    style={{ transitionDelay: `${j+2}00ms`}}
                                    role='menuitem'>{link.label}</NavLink>)
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
  }
  
  export default NavigationMobile