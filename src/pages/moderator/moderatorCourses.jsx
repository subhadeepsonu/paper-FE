import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
export default function ModeratorCourses() {
    const QueryCourse = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/course/my`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            return resp.data
        }
    })
    if (QueryCourse.isLoading) {
        return <div className="h-full fleex justify-center items-center w-full ">Loading...</div>
    }
    if (QueryCourse.isError) {
        return <div className="h-full fleex justify-center items-center w-full ">Error...</div>
    }
    return (
        <div className="min-h-screen w-full flex justify-center items-center ">
            {JSON.stringify(QueryCourse.data)}
        </div>
    );
}