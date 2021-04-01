import React, { useCallback, useEffect, useState } from 'react'

const StreamTrack = ({trackId, track, host}) => {
const [audio, setAudio] = useState(null)

    useEffect(() => {
        if(track) {
            const streamUrl = `${host}/v1/tracks/${trackId}/stream`
            const audio = new Audio(streamUrl)
            setAudio(audio)
        }
    }, [track])

    const onPlay = useCallback(() => {
        if (audio) {
            audio.play()
        }
    }, [audio])

    return (
        <div>
            <p>{trackId}</p>
            <button
            text='Play Track'
            onClick={onPlay}>Play Track</button>
        </div>
    )
}

export default StreamTrack
