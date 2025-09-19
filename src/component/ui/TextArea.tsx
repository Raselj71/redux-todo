import { Callout, Text, TextArea } from '@radix-ui/themes';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { PiInfoDuotone } from 'react-icons/pi';

type LabeledTextAreaProps = {
	label?: string;
	control: Control<any>;
	size: '1' | '2' | '3' | undefined;
	name: string;
	required?: boolean;
	isReadOnly?: boolean;
	placeholder: string;
	columns?: number;
	error?: {
		message?: string;
	};
	className?: string;
};

const LabeledTextArea = ({
	label,
	control,
	required = false,
	isReadOnly = false,
	size,
	name,
	placeholder,
	columns = 3,
	error,
	className,
}: LabeledTextAreaProps) => {
	return (
		<label>
			{label && (
				<Text as='label' size='2' mb='2' weight='bold'>
					{label}
					{required && <span className='text-red-9'> *</span>}
				</Text>
			)}

			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<TextArea
						{...field}
						size={size}
						resize={'vertical'}
						placeholder={placeholder}
						readOnly={isReadOnly}
						className={`border border-gray-a-6 outline-hidden ring-0 ${className}`}
						cols={columns}
					/>
				)}
			/>

			{error && (
				<Callout.Root variant='soft' size='1' mt='2' color='red'>
					<Callout.Icon>
						<PiInfoDuotone />
					</Callout.Icon>
					<Callout.Text>{error.message}</Callout.Text>
				</Callout.Root>
			)}
		</label>
	);
};

export default LabeledTextArea;