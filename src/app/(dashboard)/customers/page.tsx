"use client"

import CustomerList from "@/modules/customers/components/customer-list";
import { useFetchCustomer } from "@/modules/customers/queries/fetch-customer-count";


 
const CustomersPage = () => {

  return ( 
    <div className="flex flex-col space-y-7 py-6 w-full" >
    <CustomerList />
  </div>
   );
}
 
export default CustomersPage;