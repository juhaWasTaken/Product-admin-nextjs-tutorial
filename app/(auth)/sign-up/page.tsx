import Logo from "@/components/logo";
import { Metadata } from "next";
import SignUpForm from "./components/sign-up.form";

export const metadata: Metadata = {
    title: "Sing Up",
    description: "Sign up to create your product list"
}

const SignUp = () => {
    return (
        <div className="flex justify-center items-center md:h-[95vh] md:px-10 lg:px-26">
            <div className="container h-[85vh] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

                {/* ================== FORM ================== */}
                <div className="pt-10 lg:p-8 flex items-center md:h-[70vh]">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                        <SignUpForm />
                    </div>
                </div>
                {/* ================== IMAGE ================== */}
                <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
                    <div className="bg-auth absolute inset-0"></div>
                    <Logo />

                    <div className="relative z-20 mt-auto">
                        <p className="tex">
                            {"This web application helps me to make my life easy."}
                        </p>
                        <footer className="text-sm">Carlos Gallaga</footer>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default SignUp;