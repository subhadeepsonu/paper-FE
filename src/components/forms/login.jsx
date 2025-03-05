import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { BASEURL } from "../../utils/constant";
import { toast } from "sonner";
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const MutateLogin = useMutation({
        mutationFn: async () => {
            const resp = await axios.post(`${BASEURL}/user/login`, getValues())
            return resp.data
        }, onSuccess: (data) => {
            toast.success("Login successful")
            localStorage.setItem("token", data.token)
            localStorage.setItem("role", data.role)
            const role = data.role
            console.log(role)
            navigate(`/${role.toLowerCase()}/dashboard`)
        }
        ,
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    return (
        <div className="h-96 w-96 bg-white rounded-lg ">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit(MutateLogin.mutate)
            } className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="w-full p-2 border rounded"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full p-2 border rounded"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={MutateLogin.isLoading}
                >
                    {MutateLogin.isLoading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}
