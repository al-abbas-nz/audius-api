import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StreamTrack from './StreamTrack'

const selectHost = async () => {
    const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
    const res = await fetch('https://api.audius.co')
        .catch(error => {
            console.log('Looks like there was a problem: \n', error)
        })
    const hosts = await res.json()
    return sample(hosts.data)
}


const AudiusApi = () => {
    const [tracks, setTracks] = useState(null)
    const [host, setHost] = useState(null)

    useEffect(() => {
        const fetchTrack = async () => {
            const selectedHost = await selectHost()
            const { data } = await axios.get(`${selectedHost}/v1/tracks/trending`)
            .catch(error => {
                console.log('Looks like there was a problem: \n', error)
            })        
            setHost(selectedHost)
            setTracks(data.data)
            
        }
        fetchTrack()
    }, [])

    return tracks && (
        <div>
            {tracks.map(t => (
                <div key={t.id}>
                <p>{t.title}</p>
                <img src={t.artwork['150x150']} alt=""/>
                <StreamTrack trackId={t.id} track={tracks} host={host} />
                </div>
            ))}
            {console.log(tracks)}
           
        </div>
    )
}


export default AudiusApi
