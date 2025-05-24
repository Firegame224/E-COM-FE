import { fetcherGet } from "$lib/helpers/fetcher";

export async function load() {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const {data} = await fetcherGet({url : `${baseUrl}/product`})

    return {product : data}
}
