import React, { useState, useEffect } from 'react'
import { X } from 'react-feather'


const OpenGraphPreview = (props) => {
    const [hybridGraph, setHybridGraph] = useState(props.ogResults.hybridGraph)

    useEffect(() => {
        props.setOgData(hybridGraph)
    }, [hybridGraph, props])

    const truncateDescription = (description) => {
        description = description || "";
        if(description.length < 125) {
          return description
        } else {
          description = description.slice(0, 123);
          description += '...';
          return description
        }
    };

    const splitLink = (url) => {
        return url.split('/')[2]
    }
    
    let { image, title, url, description } =  hybridGraph

    return (
        <div className="outerWrapperSmall bg-gray-100 wd-100p-f rounded">
            <a href={url} target="_blank" className="d-flex justify-content-center align-items-center pd-x-10">
                <div style={{flex: 1}} >
                    <div className="imgWrapperSmall">
                        <img className="responsiveImage" src={image} alt={ title }/>
                    </div>
                </div>
                <div className="textWrapperSmall">
                    <h6 className="tx-black tx-bold">{ title }</h6>
                    <p className="tx-gray-900 tx-14">{ truncateDescription(description) }</p>
                    <div className="tx-12 tx-primary ">
                        { splitLink(url) }
                    </div>
                </div>
            </a>
            <X className="pos-absolute r-10 z-index-10 t-10 bg-gray-500 rounded-50 pd-5 cursor-pointer" 
                size={30} 
                onClick={ props.clearOgData }
            />
        </div>
    )
}

export default OpenGraphPreview
