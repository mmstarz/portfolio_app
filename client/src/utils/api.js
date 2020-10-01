let HOST;
if (process.env.NODE_ENV === "development") {
	HOST = "http://localhost:8080";
} else if (process.env.NODE_ENV === "production") {
	HOST = "http://demo.<yourdomainname>.com"; // actual website server url
}

export const makeFileURL = (url, token) => {
	if (token) {
		return HOST + url + `?access_token=${token}`;
	} else {
		return HOST + url;
	}
};
