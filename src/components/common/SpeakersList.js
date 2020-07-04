import React from 'react'
import { Link } from 'react-router-dom';
import SpeakerCardView from './SpeakerCardView';


const SpeakersList = (props) => {
    let speakers = [...props.speakers]
    let speakersCount = speakers.length
    if (speakersCount && props.cardView)
    {
        const items = speakers.map(attendee => {
            return <SpeakerCardView key={attendee.id} speaker={ attendee } />
        })
        speakers =  <div className="row row-xs">
                        { items }
                    </div>
    } else if (speakersCount && props.expand) {
        speakers = speakers.map(speaker => speaker.name)
        speakers = speakers.join(', ')
    } else if (speakersCount) {
        speakers = speakersCount > 1 ? 
                    (
                        props.redirect ? 
                        <Link to={`/lounge/speaker/${speakers[0].id}`}>
                            { speakers[0].name } and { speakersCount -1 } more
                        </Link> :
                        `${speakers[0].name} and ${speakersCount - 1} more`
                    ) : 
                    props.redirect ? 
                        <Link to={`/lounge/speaker/${speakers[0].id}`}>
                            { speakers[0].name }
                        </Link> :
                        speakers[0].name
    }
    return (
        speakers
    )
}

export default SpeakersList
