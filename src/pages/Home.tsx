import React, { useState } from 'react'
import { useAppSelector } from '../redux/store'
import { Badge, Box,Button,Flex,Heading,Table,Text } from '@radix-ui/themes'
import { useGetTodosQuery } from '../redux/todo/todoApi'
import { Link } from 'react-router-dom';

import DTable from '../component/ui/Table';
import { getBadgeColor } from '../utils/getStatusBadge';
import TableActions from '../component/ui/TableAction';


 type QueryParams = {
  page: number;
  status: string;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};





function Home() {
   
   const [params, setParams] = useState<QueryParams>({
  page: 1,
  status: '',
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
});
   const auth= useAppSelector((state)=>state.auth)
   console.log("auth State",auth)

   const{isLoading, data, isError, error} = useGetTodosQuery(params)

   console.log(data?.data)


   const tableHeader=[
    
     'Title',
     'Status',
     'Priority',
     'Due Date',
     'Tags',
     'Action'
   ]

  return (
    <Box>
          <Text>Heading</Text>


      <Flex>

          <Button asChild>

             <Link to={'/app/todos/add'}>Add Todo</Link>
          </Button>
      </Flex>
      

        
      {
        !isError && 	<DTable headerCells={tableHeader}>

            {
              data?.data && data?.data?.length > 0 ? data?.data?.map((item)=>(
                <Table.Row key={ item.id} align={'center'}>
                    <Table.Cell>
                       {
                        item.title
                       }
                    </Table.Cell>

                    <Table.Cell>
                       {
                        <Badge color={getBadgeColor(item.status)}>
                            {  item.status}
                        </Badge>
                       }
                    </Table.Cell>
                      <Table.Cell>
                       {
                        item.priority
                       }
                    </Table.Cell>

                      <Table.Cell>
                       {
                        item.dueDate
                       }
                    </Table.Cell>

                      <Table.Cell>
                       {
                        item.tags
                       }
                    </Table.Cell>
                    <Table.Cell>
                      <TableActions id={item.id} previewEditPath='/preview' showEdit />
                    </Table.Cell>

                      
                </Table.Row>
              )) :
            (
							<Table.Row align='center'>
								<Table.Cell colSpan={tableHeader.length}>
									<Heading
										align='center'
										weight='bold'
										size='5'
										color='gray'
										my='4'
									>
										No Data Found
									</Heading>
								</Table.Cell>
							</Table.Row>
						)}
          
        </DTable>
      }
       
      

        
    </Box>
  )
}

export default Home