import axios from "axios";
import toast from "svelte-french-toast";

let transaction = '';

export const snapToken = async (productId : string) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/order/pay`,
				{ productId },
				{
					withCredentials: true
				}
			);
			const data = response.data
			transaction = data.data.transaction;

			if (response.status === 200 && transaction) {
				window?.snap?.pay(transaction, {
					onSuccess: () => {
						toast.success('pembayaran Selesai');
					},
					onPending: () => {
						toast.loading('Menunggu Pembayaran');
					},
					onError: () => {
						toast.error('Pembayaran gagal');
					},
					onClose: () => {
						toast('Pembayaran di tutup');
					}
				});
			}
		} catch (error) {
			toast.error(`Error server: ${error}`);
		}
	};