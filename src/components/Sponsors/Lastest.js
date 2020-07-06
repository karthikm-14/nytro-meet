import React, { useState, useEffect } from 'react'
import API from '../../utils/api'
import Moment from 'react-moment'
import SpeakersList from '../common/SpeakersList'


const Latest = (props) => {

    let [isLoading, setIsLoading] = useState(true)
    let [data, setData] = useState(null)

    useEffect(() => {
        API.get(`user/jhi-event-sponsor-posts-for-sponsor?sponsor_id=${props.id}`)
            .then(response => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }, [props.id])

    const list = !isLoading && data.length && data.map(activity => {

        let {id, createdDate, shortDescription, longDescription, articleImage, articleTitle, articleCategory, articleDescription} = activity

        return  <div className="card mg-t-20" key={id}>
                    <div className="card-body pd-20 pd-lg-25 bd-gray-100 rounded bd">
                        <div className="media align-items-center mg-b-20">
                            <div className="avatar avatar-online">
                                <img src={ props.icon ? props.icon : 'https://via.placeholder.com/500' } className="rounded-circle img-fit-contain-f" alt={ props.name } />
                            </div>
                            <div className="media-body pd-l-15">
                                <h6 className="mg-b-3">{ props.name }</h6>
                                <span className="d-block tx-13 tx-color-03 tx-semibold">{ props.website }</span>
                            </div>
                            <span className="d-none d-sm-block tx-12 tx-color-03 align-self-start"><Moment fromNow>{createdDate}</Moment></span>
                        </div>
                        <p className="tx-white tx-14 tx-normal">{ longDescription }</p>
                        <p className="tx-white tx-14 tx-normal">{ shortDescription }</p>
                        <div className="bg-gray-800 rounded pd-10">
                            <div className="media">
                                <img src={ articleImage } className="wd-200 rounded mg-r-20" alt="" />
                                <div className="media-body">
                                    <h5 className="mg-b-15 tx-14">{ articleTitle }</h5>
                                    <p>{ articleCategory }</p>
                                    { articleDescription }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    })

    return (
        <div>
            <h6 className="tx-16 tx-spacing-1 tx-bold mg-b-0">Latest</h6>
            { !isLoading ? (data.length ? list : <div className="mg-t-50 tx-16">No Activity!</div>) : <div className="mg-t-50">Loading...</div> }
            
        </div>
    )
}

export default Latest
