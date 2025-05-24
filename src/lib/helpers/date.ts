export function convertDate(data: { date: string | Date }) {
	const date = new Date(data.date);
	if (isNaN(date.getTime())) return 'Tanggal tidak valid';

	return date.toLocaleDateString('id-ID', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}
