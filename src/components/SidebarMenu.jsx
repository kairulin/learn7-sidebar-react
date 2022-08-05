import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion";
import { Routes, NavLink } from 'react-router-dom';

const SidebarMenu = ({ showAnimation, route, isOpen, setIsOpen }) => {

    const menuAnimation = {
        hidden: {
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren",
            }
        },
        show: {
            height: "auto",
            opacity: 1,
            transition: {
                duration: 0.3,
                when: "beforeChildren",
            }
        }
    }
    const menuItemAnimation = {
        hidden: (index) => ({
            padding: 0,
            x: "-100%",
            transition: {
                duration: (index + 1) * 0.1,
            }
        }),
        show: (index) => ({
            x: 0,
            transition: {
                duration: (index + 1) * 0.1,
            }
        })
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        setIsOpen(true)
    }
    useEffect(()=>{
        if(!isOpen){
            setIsMenuOpen(false)
        }
    },[isOpen])
    return (
        <>
            <div className="menu" onClick={toggleMenu}>
                <div className="menu_item">
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                        {isOpen && <motion.div initial="hidden" animate="show" exit="hidden" variants={showAnimation} className="link_text">{route.name}</motion.div>}
                    </AnimatePresence>
                </div>
                {isOpen && <motion.div animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}>
                    <FaAngleDown />
                </motion.div>}
            </div>
            <AnimatePresence>
                {isMenuOpen && <motion.div variants={menuAnimation} initial="hidden" animate="show" exit="hidden" className='menu_container'>
                    {route.subRoutes.map((subRoute, index) => (
                        <motion.div variants={menuItemAnimation} custom={index} key={index}>
                            <NavLink activeClassName="active" to={subRoute.path} className="link">
                                <div className="icon">{subRoute.icon}</div>
                                <AnimatePresence>
                                    {isOpen && <motion.div variants={showAnimation} className="link_text">{subRoute.name}</motion.div>}
                                </AnimatePresence>
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>}
            </AnimatePresence>
        </>

    )
}

export default SidebarMenu