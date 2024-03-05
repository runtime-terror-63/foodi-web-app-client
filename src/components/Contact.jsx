import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [queryType, setQueryType] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleQueryTypeChange = (e) => {
    setQueryType(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('User ID:', userId);
    console.log('Query Type:', queryType);
    console.log('Message:', message);
  };

  return (
    <div>
    

    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] to-100% py-28">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="w-full border-gray-300 rounded-md py-3 px-6 focus:outline-none focus:border-blue-400 shadow-sm"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border-gray-300 rounded-md py-3 px-6 focus:outline-none focus:border-blue-400 shadow-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userId" className="block text-gray-700 font-medium mb-2">User ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={handleUserIdChange}
              className="w-full border-gray-300 rounded-md py-3 px-6 focus:outline-none focus:border-blue-400 shadow-sm"
              placeholder="Enter your user ID"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="queryType" className="block text-gray-700 font-medium mb-2">Query Type</label>
            <select
              id="queryType"
              name="queryType"
              value={queryType}
              onChange={handleQueryTypeChange}
              className="w-full border-gray-300 rounded-md py-3 px-6 focus:outline-none focus:border-blue-400 shadow-sm"
            >
              <option value="">Select query type</option>
              <option value="order-related">Order Related</option>
              <option value="delivery-related">Delivery Related</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={message}
              onChange={handleMessageChange}
              className="w-full border-gray-300 rounded-md py-3 px-6 focus:outline-none focus:border-blue-400 shadow-sm"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white py-3 px-8 rounded-md hover:bg-blue-600 transition duration-300 shadow-md">Send</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Contact;
