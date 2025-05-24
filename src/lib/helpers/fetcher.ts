
import axios from 'axios';

interface FetcherProps {
	url: string;
}
export async function fetcherGet({ url}: FetcherProps) {
	const response = (await axios.get(url));
	const data = response.data;
	return { data: data.data };
}
