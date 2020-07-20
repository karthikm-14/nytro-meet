import React from 'react'

const Speakers = (props) => {
    const speakers = props.speakers.length && props.speakers.slice(0,3).map((email,i)  => {
        let speaker = email.replace(/(@.*$)/,'').replace(/(\..*$)/,'')
        return  speaker.charAt(0).toUpperCase() + speaker.slice(1) 
    })

    return (
        <div className="tx-white">
            { props.speakers.length > 3 ? (speakers.join(', ') + ' + ' + (props.speakers.length - 3) + ' more') : (speakers.join(', '))  }
        </div>
    )
}

export default Speakers
