import { Callout, Flex, Text, TextField } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { PiInfoDuotone } from 'react-icons/pi';
import { cn } from '../../utils/cn';



type LabeledInputProps = {
	label?: string;
	control: Control<any>;
	required?: boolean;
	type?:
		| 'number'
		| 'search'
		| 'time'
		| 'text'
		| 'hidden'
		| 'tel'
		| 'url'
		| 'email'
		| 'date'
		| 'datetime-local'
		| 'month'
		| 'password'
		| 'week'
		| undefined;
	name: string;
	min?: number;
	max?: number;
	placeholder: string;
	icon?: ReactNode;
	isDisabled?: boolean;
	isReadOnly?: boolean;
	size?: '1' | '2' | '3';
	error?: {
		message?: string;
	};
	onChange?: (value: string) => void;
	iconPosition?: 'left' | 'right';
	className?: string;
};

const LabeledInput = ({
	label,
	control,
	required = false,
	type = 'text',
	name,
	placeholder,
	icon,
	isDisabled = false,
	isReadOnly = false,
	min,
	max,
	size = '2',
	error,
	onChange,
	iconPosition = 'right',
	className,
	...rest
}: LabeledInputProps) => {
	return (
		<label className={cn('flex w-full flex-col gap-1', className)}>
			{label && (
				<Flex gap='1'>
					<Text as='label' size='2' weight='bold'>
						{label}
					</Text>
					{required && <Text color='ruby'>*</Text>}
				</Flex>
			)}

			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<TextField.Root
						type={type}
						value={field.value}
						min={min}
						max={max}
						onChange={e => {
							field.onChange(e);
							if (onChange) {
								onChange(e.target.value);
							}
						}}
						onBlur={field.onBlur}
						ref={field.ref}
						size={size}
						placeholder={placeholder}
						disabled={isDisabled}
						readOnly={isReadOnly}
						{...rest}
					>
						{icon && (
							<TextField.Slot side={iconPosition}> {icon}</TextField.Slot>
						)}
					</TextField.Root>
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

export default LabeledInput;