import React, { useEffect, useState } from 'react'

function useFetch(link) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    const getData = async () => {

        try {
            const res = await fetch(link)
            const value = await res.json();

            setData(value)
            setIsLoading(false)
        } catch (err) {
            setError(err.message)
        }

    }


    console.log(error)

    useEffect(() => {
        getData()
    }, [link])


    return { data, isLoading, error }
}

export default useFetch