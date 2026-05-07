import apiRequest from "../config/api";

export const loginUser = async (email, password) => {
    // In a real app, this would validate credentials
    // For demo, we'll check if user exists in the database
    try {
        const users = await apiRequest("/users");
        const user = users.find(u => u.email === email);
        
        if (user && user.password === password) {
            return { success: true, user };
        }
        throw new Error("Invalid credentials");
    } catch (error) {
        throw new Error(error.message || "Login failed");
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const newUser = {
            id: Date.now(),
            name,
            email,
            password, // In production, this would be hashed
            isAdmin: false,
            createdAt: new Date().toISOString()
        };
        
        return await apiRequest("/users", {
            method: "POST",
            body: JSON.stringify(newUser),
        });
    } catch (error) {
        throw new Error(error.message || "Registration failed");
    }
};

export const verifyToken = async (token) => {
    // In a real app, verify JWT token validity
    return { valid: true };
};
