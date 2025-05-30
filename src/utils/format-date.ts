  export const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
  
    // Combine into desired format
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  };