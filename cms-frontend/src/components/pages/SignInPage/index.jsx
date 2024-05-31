import { useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Input from "@/components/shared/Input";
import { useRouter } from "next/router";
import cookies from "js-cookie"
import Checkbox from "@/components/shared/Checkbox";

const SignInPage = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const router = useRouter()
    const [error, setError] = useState('')

    const onSubmit = async () => {
        if(!emailRef.current.value || !passwordRef.current.value) {
            return setError("Fill all required fields!")
        }

        const body = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            const { data } = await axios.post("/api/auth/sign-in", body)

            localStorage.setItem("authToken", data.token)
            cookies.set("authToken", data.token)
            await router.replace("/")

        } catch (e) {
            setError(e.response?.data?.error)
        }
    }

    return (
        <section className="h-screen w-full flex items-center bg-slate-950 justify-center">
            <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                <div
                    className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                    <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                        Sign In
                    </h3>
                </div>
                <div className="flex flex-col gap-4 p-6">
                    <Input inputRef={emailRef} label="Email" />
                    <Input inputRef={passwordRef} label="Password" type="password" />
                    <div className="-ml-2.5">
                        <Checkbox labelClassName="text-gray-700" label="Remember me" />
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <button
                        onClick={onSubmit}
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Sign In
                    </button>

                    {error ? (
                        <p className="flex justify-center mt-6 font-sans text-sm text-red-400 antialiased font-light leading-normal text-inherit">
                            {error}
                        </p>
                    ) : null}

                    <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                        Don't have an account?
                        <Link href="/auth/sign-up" className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SignInPage