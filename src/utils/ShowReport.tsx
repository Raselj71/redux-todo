import { Report } from 'notiflix/build/notiflix-report-aio';

const showReport = (
	type: 'Success' | 'Info' | 'Warning' | 'Error',
	title: string,
	message: string,
) => {
	Report.init({
		svgSize: '30px',
		zindex: 99,
	});

	switch (type) {
		case 'Success':
			Report.success(title, message, 'Okay');
			break;
		case 'Info':
			Report.info(title, message, 'Okay');
			break;
		case 'Warning':
			Report.warning(title, message, 'Okay');
			break;
		case 'Error':
			Report.failure(title, message, 'Okay');
			break;
		default:
			Report.info('Invalid', 'Invalid notification type', 'Okay');
	}
};

export default showReport;