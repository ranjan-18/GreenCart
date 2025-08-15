import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'

function SellerLogin() {
  const { isSeller, setIsSeller, navigate } = useAppContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    setIsSeller(true)
  }

  useEffect(() => {
    if (isSeller) {
      navigate('/seller')
    }
  }, [isSeller])

  return !isSeller && (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={onsubmitHandler}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <p className="text-3xl font-semibold text-center mb-8">
          Login <span className="text-primary">Seller</span>
        </p>

        <div className="mb-6">
          <p className="mb-1 font-medium">Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-3 outline-primary focus:border-primary focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>

        <div className="mb-6">
          <p className="mb-1 font-medium">Password</p>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-3 outline-primary focus:border-primary focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-3 rounded-lg hover:bg-primary-dark transition-colors shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default SellerLogin
