'use client';
import { Confirm } from 'notiflix';
import { enqueueSnackbar } from 'notistack';
import showReport from './ShowReport';



function initConfirm() {
	Confirm.init({
		borderRadius: '7px',
		titleColor: '#54E4EC',
		messageColor: '#f9f7f7',
		backgroundColor: '#072b38',
		okButtonBackground: '#e2e9ee',
		okButtonColor: '#072b38',
		cancelButtonBackground: '#30aab1',
	});
}

export const ConfirmationDialog = async (
	title: string,
	message: string,
	confirmAction: () => Promise<{
		success: boolean;
		message?: string;
	}>,
	cancelAction?: () => void,
) => {
	initConfirm();
	Confirm.show(
		title,
		message,
		'No',
		'Yes',
		() => {
			if (cancelAction) {
				cancelAction();
			}
		}, // You can handle the "No" case here if needed
		async () => {
			try {
				const responseData = await confirmAction();

				if (responseData.success) {
					enqueueSnackbar(responseData.message || 'Operation Successful', {
						anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
						autoHideDuration: 3000,
						variant: 'success',
					});
				} else {
					showReport(
						'Error',
						'Failed',
						responseData.message || 'There was an error',
					);
				}
			} catch (error) {
				if (error instanceof Error) {
					showReport('Error', 'Operation Failed', error.message);
				} else {
					showReport(
						'Error',
						'Failed',
						'operation failed with an unknown error',
					);
				}
			}
		},
		{},
	);
};