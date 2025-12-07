export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-2">Sign in</h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your email and password to access your account
        </p>

        <form className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-blue-600 text-sm">
              Forgot password?
            </a>
          </div>

          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

