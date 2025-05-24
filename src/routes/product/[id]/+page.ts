/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetcherGet } from '$lib/helpers/fetcher.js';

export async function load({params}) {
    try {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const {data} = await fetcherGet({url : `${baseUrl}/product/${params.id}`})

    return {
        product: data.product || {}, 
        category : data.category || [],
    }
    } catch (error) {
     return {product : null}
    }
}