import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
export default function AdminUsers() {
    const QueryUsers = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/user`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            return resp.data
        }
    })
    if (QueryUsers.isLoading) {
        return <div className="h-full fleex justify-center items-center w-full ">Loading...</div>
    }
    if (QueryUsers.isError) {
        return <div className="h-full fleex justify-center items-center w-full ">Error...</div>
    }
    return (
        <div className="min-h-screen w-full flex justify-center items-center ">
            {JSON.stringify(QueryUsers.data)}
        </div>
    );
}