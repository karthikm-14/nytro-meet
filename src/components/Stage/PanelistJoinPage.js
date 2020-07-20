import React, { useEffect, useState } from 'react'
import { screenRecorder } from './screenRecorder';
import Moment from 'react-moment';
import { ArrowLeftCircle, ArrowLeft } from 'react-feather';
import API from '../../utils/api';
import Speakers from './Speakers';


const PanelistJoinPage = (props) => {

    const [camera, setCamera] = useState(true)
    const [audio, setAudio] = useState(true)
    const [audioBtnActive, setAudioBtnActive] = useState(false)
    const [cameraBtnActive, setCameraBtnActive] = useState(false)
    const [joinedSpeakers, setJoinedSpeakers] = useState([])
    const [loadingSpeakers, setLoadingSpeakers] = useState(true)

    useEffect(() => {
        document.getElementsByClassName('aside aside-fixed')[0].classList.add('d-none')
        document.getElementsByClassName('content')[0].classList.add('mg-l-0-f')
        if(camera) {
            screenRecorder()
            
        } else {
            document.getElementById('btn-stop-recording').click()
        }
        return () => {
            document.getElementById('btn-stop-recording').click()
            document.getElementsByClassName('aside aside-fixed')[0].classList.remove('d-none')
            document.getElementsByClassName('content')[0].classList.remove('mg-l-0-f')
        }
    }, [camera, props.keycloak])

    useEffect(() => {
        const interval = setInterval(() => {
            API.get(`/user/jhi-event-bridge-live-panelists/${props.joinSessionDetails.bridgeId}`)
            .then(response => {
                setJoinedSpeakers(response.data)
                setLoadingSpeakers(false)
            })
            .catch(response => console.log(response));
        }, 3000);
        return () => clearInterval(interval);
    }, [props.joinSessionDetails.bridgeId])

    const logJoinedActivity = () => {
        let date = new Date().toISOString()
        API.post('user/jhi-event-bridge-activities', {
            "activityName": "JOINED_SESSION",
            "activityBy": document.userEmail,
            "activityTime": date,
            "activityBridge": {"id": props.joinSessionDetails.bridgeId}, "activityType" : "EVENT_STREAM"
        })
        .then(response => {
            // setActivityId(response.data.id)
        })
        props.setIsPanelistJoinPage(false)
    }

    return (
        <div>
            <div className="aside-header pos-absolute t-0 wd-100p l-0 bd-b">
                <a href="/" className="aside-logo">
                    <img className="logo"  src="/assets/images/horasis-logo.png" />
                </a>
            </div>
            <div>
                <p className="pos-absolute rounded-50 tx-gray-300 bg-gray-700 pd-15 cursor-pointer" onClick={ () => props.setIsPanelistJoinPage(false) }>
                    <ArrowLeft size={25} />
                </p>
                <div className="mg-x-auto wd-700">
                    <div className="mn-ht-450 overflow-hidden pos-relative mg-t-100-f">
                        <div className=" bg-black-9 rounded-10 pos-absolute overflow-hidden wd-100p ht-100p">
                            <div className="pos-absolute z-index-10 d-flex align-items-center justify-content-center b-50 wd-100p">
                                <div className={`${ audioBtnActive ? 'bg-gray-500' : '' } ${ audio ? '' : 'bg-danger' } tx-20 mg-x-10 bd-white bd  pd-20 rounded-50 cursor-pointer wd-50 ht-50 d-flex align-items-center justify-content-center`} 
                                    onClick={ () => setAudio(!audio) }
                                    onMouseEnter={ () => setAudioBtnActive(true) }
                                    onMouseLeave={ () => setAudioBtnActive(false) }
                                >
                                    <i className={`tx-white fas ${ audio ? 'fa-microphone' : 'fa-microphone-slash' }`}></i>
                                </div>
                                <div className={`${ cameraBtnActive ? 'bg-gray-500' : '' } ${ camera ? '' : 'bg-danger' } tx-20 mg-x-10 bd-white bd  pd-20 rounded-50 cursor-pointer wd-50 ht-50 d-flex align-items-center justify-content-center`} 
                                    onClick={ () => setCamera(!camera) }
                                    onMouseEnter={ () => setCameraBtnActive(true) }
                                    onMouseLeave={ () => setCameraBtnActive(false) }
                                >
                                    <i className={`tx-white fas ${ camera ? 'fa-video' : 'fa-video-slash' }`}></i>
                                </div>
                                <button id="btn-stop-recording" className="d-none">Stop recording</button>
                            </div>
                            <video controls playsInline className={`${camera ? 'd-block': 'd-none'} pos-absolute wd-100p ht-100p`} id="panelist-join-options"
                            src=""></video>
                        </div>
                    </div>
                    <div className="d-block">
                        <div className="d-flex justify-content-between mg-t-30 tx-bold tx-white">
                            <h5>{ props.joinSessionDetails.title }</h5>
                            <Moment format="LT">{ props.joinSessionDetails.date }</Moment>
                        </div>
                    </div>
                    <div className="d-flex mg-y-20">
                        <span className="tx-16 tx-bold mg-r-15">Speakers</span>
                        {
                            loadingSpeakers ?
                                '...' :
                                (
                                    joinedSpeakers.length ?
                                        <Speakers 
                                            speakers={ joinedSpeakers }
                                        />:
                                        'No Panelist joined!'
                                )
                        }
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <a onClick={ logJoinedActivity } href={`https://meet.nytro.ai/nytro_event/join_meeting.php?user_name=${props.joinSessionDetails.name}&user_email=${props.joinSessionDetails.email}&meeting_token=${props.joinSessionDetails.meetingToken}&return_url=${window.location.origin}&audio=${audio}&video=${camera}`} target="_blank" className="b-20 ">
                            <button className="btn btn-sm pd-15 btn-primary tx-12 tx-bold wd-100">
                                Join
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PanelistJoinPage
