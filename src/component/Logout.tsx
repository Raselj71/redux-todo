import { Avatar, Button, Flex, Popover, } from '@radix-ui/themes'
import React from 'react'
import { useAppDispatch } from '../redux/store'
import { logout } from '../redux/auth/authSlice'
import { redirect, } from 'react-router-dom'

function Logout() {

   const dispatch=useAppDispatch()
    const handLogut=()=>{
        dispatch(logout())
        redirect('/login')
    }


  return (
  <Popover.Root  >
	<Popover.Trigger>
		<Button variant="ghost">
			<Avatar
				size={{
                    initial:'2',
                    lg:'3'
                }}
				src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
				fallback="A"
				radius="full"
			/>
			
		</Button>
	</Popover.Trigger>
	<Popover.Content width="360px">
		<Flex gap="3">
			<Button className='w-full!' onClick={handLogut}>
                 Logout
            </Button>
		</Flex>
	</Popover.Content>
</Popover.Root>

  )
}

export default Logout