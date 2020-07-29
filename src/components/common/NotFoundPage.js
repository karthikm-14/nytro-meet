import React from 'react'
import { Link } from 'react-router-dom'


const NotFoundPage = () => {
    return (
        <div className="content ht-100v pd-0">
            <div className="content-body">
                <div className="container pd-x-0">
                    <h1 className="text-center">Page Not Found!</h1>
                    <p style={{textAlign:"center"}}>
                        <Link to="/">Go to Home </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
