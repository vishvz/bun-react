export function Contact() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1 className="text-5xl font-bold my-4 leading-tight">Contact</h1>
      <p className="text-lg mb-8">
        Get in touch with us!
      </p>
      <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
