import React, { useState, useEffect } from 'react'
import API from '../../utils/api'


const ProfileFilters = (props) => {

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
                                        return  <div onClick={ () => props.getAttendeesData({'by':'jobPosition','text':specialization.position}) } key={i} className="nav-link">
                                                    <span>{ specialization.position }</span> <span className="badge">{ specialization.totalAttendees }</span>
                                                </div>
                                    }) :
                                    'No Specialization data!'

    const companyList = !isCompanyLoading && companyData.length ? 
                                    companyData.map((company,i) => {
                                        return  <div onClick={ () => props.getAttendeesData({'by':'compnay','text':company.company}) } key={i} className="nav-link">
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

export default ProfileFilters
