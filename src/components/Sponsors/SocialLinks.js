import React from 'react'
import { Facebook, Linkedin, Twitter } from 'react-feather';

const SocialLinks = (props) => {

    const links = props.links.map(link => {
        if(link.keyName === 'linkedin') {
            return <li key={link.id}><i className="fab fa-linkedin mg-r-10 tx-18" ></i><a href={link.keyValue} target="_blank">{link.entityName}</a></li>
        } else if(link.keyName === 'facebook') {
            return  <li key={link.id}><i className="fab fa-facebook mg-r-10 tx-18"></i><a href={link.keyValue} target="_blank">{link.entityName}</a></li>
        } else if(link.keyName === 'twitter') {
            return  <li key={link.id}><i className="fab fa-twitter mg-r-10 tx-18" ></i><a href={link.keyValue} target="_blank">{link.entityName}</a></li>
        }
    });

    return (
        <div className="col-sm-6 col-md-5 col-lg-12 mg-t-20">
            <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Social Links</label>
            <ul className="list-unstyled profile-info-list">
                { links }
            </ul>
        </div>
    )
}

export default SocialLinks
