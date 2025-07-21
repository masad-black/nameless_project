import Loader from "@/components/ui/loader";

const Chats = () => {
  const messages = [];

  const isLoading = false;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((message) => (
          <div key={message.id} className="space-y-4">
            {/* User Prompt - Right Side */}
            {message.prompt && (
              <div className="flex justify-end">
                <div className="max-w-[75%] bg-gray-100 rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                    {message.prompt}
                  </p>
                </div>
              </div>
            )}

            {/* AI Response - Left Side */}
            {message.response && (
              <div className="flex justify-start">
                <div className="max-w-[75%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">AI</span>
                    </div>
                    <span className="text-gray-600 text-xs font-medium">
                      Assistant
                    </span>
                  </div>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                      {message.response}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state when no messages */}
      {messages.length === 0 && (
        <div className="h-screen flex items-center justify-center">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">Start a conversation</p>
              <p className="text-sm">Type your message below to begin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
