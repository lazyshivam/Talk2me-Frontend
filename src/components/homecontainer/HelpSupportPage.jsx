import React from 'react';

const HelpSupportPage = () => {
    return (
       <div className="  ">
         <div className="bg-blue-400 h-screen py-12  px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-4xl text-white font-bold mb-8">Help and Support</h1>

                <div className="bg-white text-blue-500 rounded-lg shadow-lg p-6 mb-8 transition-transform transform hover:scale-105">
                    <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-700 mb-4">
                        Browse through our FAQs to find answers to common questions about using VideoCall App.
                    </p>
                    {/* List of frequently asked questions */}
                </div>

                <div className="bg-white text-blue-500 transition-transform transform hover:scale-105 rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">User Guides</h2>
                    <p className="text-gray-700 mb-4">
                        Access detailed user guides and tutorials on using different features of VideoCall App.
                    </p>
                    {/* Links to user guides */}
                </div>

                <div className="bg-white transition-transform transform hover:scale-105 text-blue-500 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
                    <p className="text-gray-700 mb-4">
                        If you still have questions or need assistance, please don't hesitate to contact our support team.
                    </p>
                    <p className="text-blue-500 hover:underline">
                        <a href="mailto:support@videocallapp.com">support@videocallapp.com</a>
                    </p>
                </div>
            </div>
        </div>
       </div>
    );
};

export default HelpSupportPage;
