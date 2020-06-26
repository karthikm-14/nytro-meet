import React, { useState, useEffect, Fragment } from 'react'
import DateCardView from '../common/DateCardView'
import Search from '../common/Search'
import StageListView from './StageListView'
import API from '../../utils/api'


const Schedule = () => {

    const [data, setData] = useState(null)
    const [stages, setStages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [activeDate, setActiveDate] = useState(null) 
    let [stageLoading, setStageLoading] = useState(true) 

    const formatDate = (n) => {
        return n<10 ? '0'+n : n
    }

    useEffect(() => {
        let myDate = new Date();
        let date = myDate.getDate();
        let month = myDate.getMonth();
        let year = myDate.getFullYear();
        let fromToday = year + "-" + formatDate(month + 1) + "-" + formatDate(date);
        getData(fromToday)
        getStages(fromToday)
    }, [])

    const getData = (date) => {
        API.get(`user/jhi-events-schedule-stats`)
            .then(response => {
                setData(response.data)
                setActiveDate(date)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }

    const getStages = (date) => {
            setStageLoading(true)
            API.get(`user/jhi-live-events-by-date?start_date=${date}`)
                .then(response => {
                    setActiveDate(date)
                    setStages(response.data)
                    setStageLoading(false)
                })
                .catch(response => console.log(response));
    }

    return (
        <div className="content ht-100v pd-0">
            <Search />
            <div className="content-body">
                <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item active" aria-current="page">Schedule</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row row-xs">
                            <div className="col-12">
                                <h6 className="mg-b-10 tx-16 tx-normal">Full Schedule</h6>
                                
                                { isLoading ?
                                    <div className="row row-xs">
                                        <div className="col-sm-6 col-md-4 col-lg-3">
                                            <div className="bg-gray-400 rounded pos-relative ht-120">
                                                <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                                    <div className="line"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4 col-lg-3">
                                            <div className="bg-gray-400 rounded pos-relative ht-120">
                                                <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                                    <div className="line"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> :
                                    <DateCardView data={ data } activeDate={ activeDate } getStages={ (date) => getStages(date) } />
                                }
                            </div> 
                    </div>
                    { 
                        !stageLoading  ? 
                            <StageListView stages={ stages } /> 
                            : 
                            <div className="mg-t-35">
                                <div className="col-sm-6 col-md-4 col-lg-4 pd-0">
                                    <div className="bg-gray-400 rounded pos-relative ht-120">
                                        <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Schedule
