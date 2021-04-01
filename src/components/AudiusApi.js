import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    const [track, setTrack] = useState(null)


    useEffect(() => {
        const fetchTrack = async () => {
            const host = await selectHost()
            const {data} = await axios.get(`${host}/v1/tracks/trending?limit=10`)
            .catch(err => console.log("Error! " + err))
                
            setTrack(data.data)
            
        }
        fetchTrack()
    }, [])

    return track && (
        <div>
            {track.map(t => (
                <div key={t.id}>
                <p>{t.title}</p>
                <img src={t.artwork['150x150']} alt=""/>
                </div>
            ))}
            {console.log(track)}
           
        </div>
    )
}


export default AudiusApi
