
import { Box, Callout, Flex, Select, Text } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { PiInfoDuotone } from 'react-icons/pi';
import { cn } from '../../utils/cn';

type LabeledSelectProps = {
	label: string;
	control: Control<any>;
	name: string;
	required?: boolean;
	size?: '1' | '2' | '3' | undefined;
	placeholder: string;
	isDisabled?: boolean;
	isReadonly?: boolean;
	error?: {
		message?: string;
	};
	onSelectChange?: (value: string) => void;
	className?: string;
	children: ReactNode;
};

const LabeledSelect = ({
	label,
	control,
	name,
	required = false,
	size = '2',
	placeholder,
	isDisabled = false,
	isReadonly = false,
	error,
	onSelectChange,
	className,
	children,
}: LabeledSelectProps) => {
	return (
		<Box className={cn('w-full', className)}>
			<Flex direction='column' gap='1'>
				<Flex gap='1'>
					<Text as='label' size='2' weight='bold'>
						{label}
					</Text>
					{required && <Text color='ruby'>*</Text>}
				</Flex>

				<Controller
					name={name}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select.Root
							size={size}
							value={value}
							disabled={isDisabled || isReadonly}
							onValueChange={selectedValue => {
								onChange(selectedValue);
								if (onSelectChange) {
									onSelectChange(selectedValue);
								}
							}}
						>
							<Select.Trigger
								placeholder={placeholder}
								className={isReadonly ? 'cursor-not-allowed' : ''}
							/>
							<Select.Content>
								<Select.Group>
									<Select.Label>{label}</Select.Label>
									{children}
								</Select.Group>
							</Select.Content>
						</Select.Root>
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
			</Flex>
		</Box>
	);
};

export default LabeledSelect;