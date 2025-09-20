


import { Flex, IconButton, Text } from '@radix-ui/themes';

import type { FC } from 'react';
import {

	PiEyeDuotone,
	PiGearDuotone,
	PiNotePencilDuotone,
	PiTrashDuotone,
} from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { ConfirmationDialog } from '../../utils/ConfirmDialog';
import { useDeleteTodoMutation } from '../../redux/todo/todoApi';

type TableActionProps = {
	id: string;
	searchParams?: { [key: string]: string | string[] | undefined };
	email?: string;
	mobileNumber?: string;
	slug?: string;
	preview?: boolean;
	previewEditPath: string;
	showEdit?: boolean;
	showDelete?: boolean;
	showConfig?: boolean;
	showDownload?: boolean;
	downloadId?: number;
	downloadFileName?: string;
	contactType?: string;

};

const TableActions: FC<TableActionProps> = ({
	id,
	searchParams,
	slug,
	
	mobileNumber,
	previewEditPath,
	preview = true,
	showEdit = true,
	showDelete = true,
	
	showConfig = false,

}) => {


     const[todoDeleteAPI, {isLoading, isError}] =useDeleteTodoMutation()

	const handleDelete = async () => {
	


		const confirmAction = async () => {
		

			try {
			      
                  const response= await todoDeleteAPI({id})
                  console.log(response)
                  if(response.data){
                        return {
					success: false,
					message: 'Delete successfully',
				};
                  }else{
                     	return {
						success: false,
						message: 'Failed to delete',
					};
                  }

				
			} catch (error) {
				if (error instanceof Error) {
					return {
						success: false,
						message: error.message,
					};
				}
				return {
					success: false,
					message: 'Delete failed with an unknown error',
				};
			}
		};

		ConfirmationDialog(
			'Confirm Delete',
			'Do you Really want to Delete?',
			confirmAction,
		);
	};

	

	return (
		<Flex gap='3'>
			{showConfig && (
				<Link
					to={`${previewEditPath}/${id}`}
					className='flex gap-1 text-purple-10'
				>
					<PiGearDuotone className='size-5' />
					<Text>Config</Text>
				</Link>
			)}
			{preview && (
				<Link
					to={`${
						slug
							? `${previewEditPath}/preview/${slug}`
							: mobileNumber
								? `${previewEditPath}/preview/${mobileNumber}`
								: `${previewEditPath}/preview/${id}`
					}`}
					className='flex gap-1 text-iris-10'
				>
					<PiEyeDuotone className='size-5' />
					<Text>Details</Text>
				</Link>
			)}
			{showEdit && (
				<Link
					to={`${
						slug
							? `${previewEditPath}/edit/${slug}`
							: `${previewEditPath}/edit/${slug}`
					}`}
					className='flex gap-1 text-orange-10'
				>
					<PiNotePencilDuotone className='size-5' />
					<Text>Edit</Text>
				</Link>
			)}
			{showDelete && (
				<IconButton variant='ghost' onClick={handleDelete}>
					<PiTrashDuotone className='size-5 text-crimson-10' />
				</IconButton>
			)}
			

		</Flex>
	);
};

export default TableActions;