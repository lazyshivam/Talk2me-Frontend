import React from 'react';

const importAll = (r) => {
    return r.keys().map(r);
  };
const images = importAll(require.context('../../profile_image', false, /\.(jpg|jpeg|png|gif)$/));
const developers = [
    { name: 'John Doe', role: 'Frontend Developer', bio: 'Passionate about crafting user-friendly interfaces.', image:images[0] },
    { name: 'Jane Smith', role: 'Backend Developer', bio: 'Loves solving complex server-side challenges.', image:images[1] },
    { name: 'Alex Johnson', role: 'Product Manager', bio: 'Focused on delivering exceptional user experiences.', image:images[2] },
    { name: 'Emma Williams', role: 'UI/UX Designer', bio: 'Bringing creativity and aesthetics to every design.', image:images[3] },
    { name: 'Hermione Johnson', role: 'Product Manager', bio: 'Focused on delivering exceptional user experiences.', image:images[4] },
   
    // Add more developer profiles here
];


const DeveloperAndTeamPage = () => {
    console.log(images)
    return (
        <div className="bg-blue-400 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl text-white font-bold mb-8">Developers and Team</h1>

                <div className="grid grid-cols-2 gap-6">
                    {developers.map((developer, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                            <img src={developer.image} alt={developer.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                            <h3 className="text-lg text-blue-500 font-semibold mb-2">{developer.name}</h3>
                            <p className="text-gray-700 mb-1">{developer.role}</p>
                            <p className="text-gray-600">{developer.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DeveloperAndTeamPage;
