import React from "react";
import { Lock, ShieldCheck, KeyRound } from "lucide-react";
import {Title , Meta} from 'react-head'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
        <Title>Password Manager</Title>
        <Meta name="description" content="Password Manager" />
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Secure Your Passwords Easily
          </h1>
          <p className="text-lg md:text-xl mt-4 opacity-90">
            Store, manage, and autofill your passwords with top-grade encryption.
          </p>
          
          <Link to={'/user/signup'}>
          <button className="mt-8 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition cursor-pointer ">
            Get Started
          </button>
          </Link>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Our Password Manager?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex justify-center">
                <Lock size={48} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mt-4">
                Strong Encryption
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Your data is protected with industry-leading AES-256 encryption.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex justify-center">
                <ShieldCheck size={48} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mt-4">
                Secure Cloud Sync
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Access your passwords securely across all devices.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex justify-center">
                <KeyRound size={48} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mt-4">
                One-Click Autofill
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Autofill passwords on websites and apps with one click.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
        <p className="mt-3 opacity-90">Create your account and secure your digital life today.</p>

        <Link to={'/user/signup'}>
        <button className="mt-8 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition cursor-pointer ">
          Create Account
        </button>
        </Link>
      </section>

    </div>
    
    </>
  );
};

export default Home;
