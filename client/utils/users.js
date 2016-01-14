
export const getUserFromStorage = () => {
	return localStorage.getItem('user') || false;
};
