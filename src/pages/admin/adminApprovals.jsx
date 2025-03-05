import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
export default function AdminApproval() {
    const QueryApproval = useQuery({
        queryKey: ["approvalLogs"],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/approval`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            return resp.data
        }
    })
    if (QueryApproval.isLoading) {
        return <div className="h-full fleex justify-center items-center w-full ">Loading...</div>
    }
    if (QueryApproval.isError) {
        return <div className="h-full fleex justify-center items-center w-full ">Error...</div>
    }
    return (
        <div className="min-h-screen w-full flex justify-center items-center ">
            {JSON.stringify(QueryApproval.data)}
        </div>
    );
}