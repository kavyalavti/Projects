import React, { useEffect, useState } from "react";
import EditProfile from '../components/EditProfile';
import ProfileDetails from '../components/ProfileDetails';
import { API_BASE_URL } from '../config';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    console.error("Error fetching user profile:", data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleProfileUpdate = (updatedUser) => {
        setUser(updatedUser);
        setEditMode(false);
    };

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-8">
            {editMode ? (
                <EditProfile
                    userData={user}
                    onSave={handleProfileUpdate}
                    setEditMode={setEditMode}
                />
            
            ) : (
                <ProfileDetails
                    user={user}
                    onEdit={() => setEditMode(true)}
                />
            )}
        </div>
    );
};

export default Profile;
