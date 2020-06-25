import React, { Fragment, useEffect, useState } from 'react'
import { HelpCircle } from 'react-feather'
import API from '../../utils/api'
import Moment from 'react-moment'
import ScrollArea from 'react-scrollbar'


const AskAQuestion = (props) => {

    const [questionsList, setQuestionsList] = useState([])
    let [questionAsked, setQuestionAsked] = useState('')
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getQuestions(props.bridge.id)
    }, [props.bridge])

    const getQuestions = (id) => {
        API.get(`user/jhi-event-stream-questions-for-stream/${id}`)
            .then(response => {
                setQuestionsList(response.data)
                setQuestionAsked('')
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }

    const postQuestion = () => {
        let date = new Date().toISOString()
        API.post('user/jhi-event-stream-questions', {
            "email": document.userEmail,
            "question": questionAsked,
            "isApproved":true,
            "approvedDate":date,
            "questionDate":date,
            "askedOn":{
                "id": props.bridge.id
            }
        })
        .then(response => {
            if(response.status === 201 && response.statusText === 'Created') {
                getQuestions(props.bridge.id)
            }
        })
        .catch(response => console.log(response));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(questionAsked.trim() !== '' && document.userEmail) {
            postQuestion()
        }
    }

    const list = !isLoading && questionsList.length && questionsList.map(item => {
        let { id, email, question, questionDate } = item
        return  <li key={id} className="bg-gray-800 pd-10 rounded mg-t-20 tx-medium text-center tx-white">
                    <p>{ question }</p>
                    <p className="tx-12">
                        <span>{ email }</span> 
                        <span className="tx-10 tx-gray-300 mg-l-10"><Moment format="LT">{ questionDate }</Moment></span>
                    </p>
                </li>
    })

    return (
        <Fragment>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active bg-gray-900-f bd-none-f tx-white-f tx-bold pd-25-f" id="ask-question-tab" data-toggle="tab" href="#ask-question" role="tab" aria-controls="ask-question" aria-selected="true"><HelpCircle className="mg-r-10 tx-18" /> Ask a Question</a>
                </li>
            </ul>
            <div className="tab-content bd bd-gray-300 bg-gray-900 bd-t-0 pd-0" id="myTabContent">
                <div className="tab-pane fade show active" id="ask-question" role="tabpanel" aria-labelledby="ask-question-tab">
                    <div className="tx-gray-500 text-center tx-12 tx-semibold pd-t-20">
                        <span>Ask a question to the speaker.</span>
                        <p>Questions will appear here.</p>
                    </div>
                    <ScrollArea className="ht-400" >
                        <ul className="list-unstyled pd-l-20 pd-r-20">
                            { 
                                !isLoading ? 
                                    (
                                        questionsList.length ? 
                                            list :
                                            <div className="ht-300 d-flex align-items-center justify-content-center tx-bold">
                                                No Questions asked.
                                            </div>
                                    ) 
                                : 
                                <div className="ht-300 d-flex align-items-center justify-content-center">
                                    <div className="spinner-grow" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>  
                            }
                            
                        </ul>
                    </ScrollArea>
                    {
                        !isLoading && props.bridge.meetingStatus === 'started' && props.bridge.streamStatus === 'started' ?
                            <form onSubmit={handleSubmit} className="card-footer mg-t-10">
                                <label className="mg-0">
                                    <input
                                    className="bd-none tx-white outline-none background-none border-0"
                                    type="text"
                                    value={ questionAsked }
                                    placeholder='Type Here...'
                                    onChange={e => setQuestionAsked(e.target.value)}
                                    />
                                </label>
                            </form> :
                            null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default AskAQuestion
