export const getNavigationClass = (isActive: boolean) =>
  isActive
    ? 'text-amber-300 underline'
    : 'hover:text-amber-300 hover:underline';
