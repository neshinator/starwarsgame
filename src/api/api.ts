const api = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url)
        if (response.ok){
            const data = await response.json()
            return data
        } else {
            console.log(`Fetch error: ${response.status} ${response.statusText}`)
        }
    } catch (e){
        console.log(`Fetch error: ${(e as Error).message}`)
    }
    return null as unknown as Promise<T>
}

export default api