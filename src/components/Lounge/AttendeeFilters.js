import React, { useState, useEffect } from 'react'
import API from '../../utils/api'


const AttendeeFilters = (props) => {

    const [specializationData, setSpecializationData] = useState(null)
    const [isSpecializationLoading, setIsSpecializationLoading] = useState(true)
    const [companyData, setCompanyData] = useState(null)
    const [isCompanyLoading, setIsCompanyLoading] = useState(true)

    useEffect(() => {
        getSpecializations()
        getCompanies()
    }, [])

    const getSpecializations = (specialization) => {
        API.get(`user/event/jhi-event-attendee-stats-by-position`)
            .then(response => {
                setSpecializationData(response.data)
                setIsSpecializationLoading(false)
            })
            .catch(response => console.log(response));
    }

    const getCompanies = () => {
        API.get(`user/event/jhi-event-attendee-stats-by-company?`)
            .then(response => {
                setCompanyData(response.data)
                setIsCompanyLoading(false)
            })
            .catch(response => console.log(response));
    }

    const specializationList = !isSpecializationLoading && specializationData.length ? 
                                    specializationData.map((specialization,i) => {
                                        let active = props.filterByPositionName === specialization.position ? 'active' : null;
                                        return  <div className={`${active} nav-link cursor-pointer`} onClick={ () => props.setFilterByPositionName(specialization.position) } key={i}>
                                                    <span>{ specialization.position }</span> <span className="badge">{ specialization.totalAttendees }</span>
                                                </div>
                                    }) :
                                    'No Specialization data!'

    const companyList = !isCompanyLoading && companyData.length ? 
                                    companyData.map((company,i) => {
                                        let active = props.filterByCompanyName === company.company ? 'active' : null;
                                        return  <div className={`${active} nav-link cursor-pointer`} onClick={ () => props.setFilterByCompanyName(company.company) } key={i}>
                                                    <span>{ company.company }</span> <span className="badge">{ company.totalAttendees }</span>
                                                </div>
                                    }) :
                                    'No Company data!'

    return (
        <div className="row row-xs pd-l-15">
            <div className="col-sm-6 col-md-4 col-lg-12 mg-t-40 mg-md-t-0">
                <h6 className="tx-13 tx-spacing-1 tx-uppercase tx-semibold mg-b-15">specialization</h6>

                <nav className="nav nav-classic tx-12 tx-semibold">
                    { 
                        !isSpecializationLoading ? 
                            specializationList :
                            'Loading...'
                    }
                </nav>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-12 mg-t-40 mg-md-t-0 mg-lg-t-40">
                <h6 className="tx-13 tx-spacing-1 tx-uppercase tx-semibold mg-b-15">company</h6>

                <nav className="nav nav-classic tx-12 tx-semibold">
                    { 
                        !isCompanyLoading ? 
                            companyList :
                            'Loading...'
                    }
                </nav>
            </div>
        </div>
    )
}

export default AttendeeFilters
