export const getBadgeColor = (
  status: string,
): 'gray' | 'blue' | 'green' | 'yellow' | 'orange' | 'red' | 'purple' => {
  switch (status) {
    case 'todo':
      return 'gray';
    case 'in_progress':
      return 'blue'; 
    case 'done':
      return 'green'; 
    default:
      return 'gray';
  }
};
