import { Table } from '@radix-ui/themes';
import type { ReactNode } from 'react';

type TableProps = {
	headerCells: string[];
	children: ReactNode;
};

const DTable = ({ headerCells, children }: TableProps) => {
	return (
		<Table.Root variant='surface'>
			<Table.Header>
				<Table.Row>
					{headerCells.map(cell => (
						<Table.ColumnHeaderCell
							key={crypto.randomUUID()}
							align='left'
							className='w-fit'
						>
							{cell}
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>

			<Table.Body>{children}</Table.Body>
		</Table.Root>
	);
};

export default DTable;