import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-center text-text mt-10">Contact Us</h1>
      <p className="text-lg text-center text-text mt-4">If you have any questions or feedback, please feel free to contact us.</p>
      <form className="flex flex-col items-center justify-center mt-8">
        <label htmlFor="name" className="text-lg text-text mb-2">Name:</label>
        <input type="text" id="name" name="name" className="w-full p-2 border border-gray-400 rounded-lg mb-4" />
        <label htmlFor="email" className="text-lg text-text mb-2">Email:</label>
        <input type="email" id="email" name="email" className="w-full p-2 border border-gray-400 rounded-lg mb-4" />
        <label htmlFor="message" className="text-lg text-text mb-2">Message:</label>
        <textarea id="message" name="message" rows="5" className="w-full p-2 border border-gray-400 rounded-lg mb-4"></textarea>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300">Send</button>
      </form>
    </div>
  );
};

export default Contact;