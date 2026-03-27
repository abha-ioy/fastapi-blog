let currentUser = null;
let fetchPromise = null;


async function performUserFetch(token){
    try{
        const response = await fetch("/api/users/me", {
            method: "GET",
            headers: {"Authorization": "Bearer " + token}
        });

        if (response.ok) {
            currentUser = await response.json();

            return currentUser;
        }

    } catch (err){
        return null;

    } finally {
        fetchPromise = null;
    }

}

export async function getCurrentUser() {
    if (currentUser) {
	    return currentUser;
	}

    if (fetchPromise) {
        return fetchPromise;
    }

    const token = localStorage.getItem("access_token");

    if (!token){
        return null;
    }
    
    fetchPromise = performUserFetch(token);
    
    return fetchPromise;
}

export function logout(){
    localStorage.removeItem("access_token");
    currentUser = null;
    fetchPromise = null;
    window.location.href = "/";
}

export function getToken() {
    return localStorage.getItem("access_token");
}

export function setToken(token){
    return localStorage.setItem("access_token", token);
}

export function clearUserCache(){
    currentUser = null;
}
