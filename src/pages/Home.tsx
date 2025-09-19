import React, { useState } from 'react'
import { useAppSelector } from '../redux/store'
import { Box,Button,Flex,Text } from '@radix-ui/themes'
import { useGetTodosQuery } from '../redux/todo/todoApi'

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

  return (
    <Box>
          <Text>Heading</Text>


      <Flex>

          <Button>Add Todo</Button>
      </Flex>
      


      

        
    </Box>
  )
}

export default Home