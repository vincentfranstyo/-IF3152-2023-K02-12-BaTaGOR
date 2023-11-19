import Link from "next/link";
import Image from "next/image"

const SignInForm = () => {
    return (
      <div className="relative flex flex-col items-center justify-center  overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <div className="mb-2 justify-center items-center flex">
            <Image 
								alt="Logo"
								src="/assets/icons/football.png"
								width={40}
								height={40}
								className="rounded-full object-contain"
							/>
          </div>
          <h1 className="text-3xl font-bold text-center blue_gradient">BaTaGOR</h1>
          <form className="mt-6">
            
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <br></br>
            <div className="mt-2">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-gray-600">
                Login
              </button>
            </div>
          </form>
  
          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    );
  }

export default SignInForm