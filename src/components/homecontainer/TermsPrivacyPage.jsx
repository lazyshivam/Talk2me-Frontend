import React from 'react';

const TermsPrivacyPage = () => {
    return (
        <div className="container mx-auto bg-blue-400 text-white px-5 py-8">
            <h1 className="text-4xl font-bold mb-8">Terms of Use and Privacy Policy</h1>

            <div className="bg-white transition-transform transform hover:scale-105 text-blue-500 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Terms of Use</h2>
                <p className="text-gray-700 mb-4">
                    Welcome to VideoCall App. By accessing or using our app, you agree to comply with and
                    be bound by these Terms of Use.
                </p>
                {/* Add more terms content here */}
            </div>

            <div className="bg-white transition-transform transform hover:scale-105 text-blue-500 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                    Protecting your privacy is important to us. This Privacy Policy outlines how we collect,
                    use, and protect your personal information.
                </p>
                {/* Add more privacy policy content here */}
            </div>

            <div className="mt-8 text-white ">
                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <p className="mb-4">
                    If you have any questions or concerns about our Terms of Use or Privacy Policy, please
                    contact us at{' '}
                    <a href="mailto:shivamgoswami.ss.pp@gmail.com" className="text-yellow-500 hover:underline">
                    shivamgoswami.ss.pp@gmail.com
                    </a>
                    
                </p>
            </div>
        </div>
    );
};

export default TermsPrivacyPage;
