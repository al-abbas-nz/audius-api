import React, { useEffect, useState } from 'react'

const selectHost = async () => {
    const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
    const res = await fetch('https://api.audius.co')
        .catch(error => {
            console.log('Looks like there was a problem: \n', error);
        })
    const hosts = await res.json()
    return sample(hosts.data)
}
selectHost()
const AudiusApi = () => {
    const [track, setTrack] = useState(null)

    useEffect(() => {
        const fetchTrack = async () => {
            const host = await selectHost()
            const res = await fetch(`${host}/v1/tracks/trending?klimit=1&timeRange=week`)
            const json = await res.json()
            const topTrack = json.data[0]
            setTrack(topTrack)
        }
        fetchTrack()
    }, [])
    return track && (
        <div>
           <h1>{track.title}</h1>
        </div>
    )
}

export default AudiusApi
