export function formatDate(date: unknown) {
  let dateObj: Date;
  if (date instanceof Date) dateObj = date;
  else dateObj = new Date(date as string);
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}