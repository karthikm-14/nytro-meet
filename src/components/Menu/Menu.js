import React, { Fragment, useState, useEffect } from 'react'
import Header from './Header'
import List from './List'


const Menu = (props) => {
    
	const [userInfo, setUserInfo] = useState({})
	let [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        props.keycloak.loadUserInfo().then((userInfo) => {
            const fullName = userInfo.name.split(" ")
            document.userEmail = userInfo.email 
            let initial = (fullName.length === 1) ? 
                fullName[0].charAt(0) : 
                `${fullName[0].charAt(0)}${fullName[fullName.length - 1].charAt(0)}`
			setUserInfo({
                name: userInfo.name, 
                email: userInfo.email, 
                id: userInfo.sub,
				initial,
				roles: props.keycloak.tokenParsed.realm_access.roles
			})
			setIsLoading(false)
        })
    }, [props.keycloak])
    
    const logout = () => {
        props.keycloak.logout();
    }

    return (
        <Fragment>
            <aside className="aside aside-fixed">
                <div className="aside-header">
                    <a href="/" className="aside-logo">
                        <img className="logo"  src="/assets/images/horasis-logo.png" />
                    </a>
                    <a href="#" className="aside-menu-link">
                        <i data-feather="menu"></i>
                        <i data-feather="x"></i>
                    </a>
                </div>
                <div className="aside-body">
                    <div className="aside-loggedin">
                        {
                            !isLoading ? 
                                <Header logout={ logout } userInfo={ userInfo} /> :
                                null
                        }
                    </div>
                    <ul className="nav nav-aside">
                        {
                            !isLoading ?
                                <List userInfo={ userInfo} /> :
                                null
                        }
                    </ul>
                </div>
            </aside>
        </Fragment>
    )
}

export default Menu
