import React from 'react'


const SpeakersList = (props) => {
    let speakers = [...props.speakers]
    let speakersCount = speakers.length
    if (speakersCount && !props.expand)
    {
        speakers = speakersCount > 1 ? `${speakers[0].name} and ${speakersCount - 1} more` : speakers[0].name;
    } else if (speakersCount && props.expand) {
        speakers = speakers.map(speaker => speaker.name)
        speakers = speakers.join(', ')
    }
    return (
        speakers
    )
}

export default SpeakersList
