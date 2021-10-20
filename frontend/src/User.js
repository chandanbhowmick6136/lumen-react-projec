import axios from "axios";

/**
 * Class responsable to make the user requests and handle localStorage
 */
class User {

    static getMe = () => {
        return new Promise((resolve, reject) => {
            
            // config.headers.token = "invalidOne";
            axios.get('http://lumen-rest-api/api/users',{headers: {'Authorization':"Bearer "+localStorage.getItem("userToken")} }).then((response) => {
                var result = response.data.filter(function(r) { return r["email"] == localStorage.getItem("userEmail") })[0]||'No record found';
                resolve(result);
            }).catch((error) => {
                let message = "Error trying to access server";
                if (error.response) {
                    if (error.response.status === 400) {
                        // invalid token
                        localStorage.clear();
                        this.props.history.push("/login");
                        message = null;
                    }
                } else if (error.message) {
                    message = error.message;
                }
                // Show error to user
                if (message)
                    alert(message);
            });
        });
    };

    static hasUser = () => {
        return localStorage.getItem("userToken");
    };

    
    static register = (data) => {
        return new Promise((resolve, reject) => {
            // Validate fields
            let error = null;
            if (!data.email || !data.password)
                error = "You must type your email and password";
            else if (data.name == '')
                error = "Please type a valid name";
            else if (!validateEmail(data.email))
                error = "Please type a valid email address";
            else if (data.password.length < 4)
                error = "The password are so short";

            // Some error?
            if (error) {
                reject(error);
                return;
            }

            axios.post('http://lumen-rest-api/api/register', data).then((response) => {
                localStorage.setItem("userToken", response.data.access_token);
                localStorage.setItem("userEmail", data.email);
                resolve(response.data);
            }).catch((error) => {
                let message = "Error trying to access server";
                if (error.response && error.response.data.error) {
                    message = error.response.data.error;
                }
                reject(message);
            });
        });
    }

    static authenticate = (data) => {
        return new Promise((resolve, reject) => {
            // Validate fields
            let error = null;
            if (!data.email || !data.password)
                error = "You must type your email and password";
            else if (!validateEmail(data.email))
                error = "Please type a valid email address";
            else if (data.password.length < 4)
                error = "The password are so short";

            // Some error?
            if (error) {
                reject(error);
                return;
            }

            axios.post('http://lumen-rest-api/api/login', data).then((response) => {
                localStorage.setItem("userToken", response.data.access_token);
                localStorage.setItem("userEmail", data.email);
                resolve(response.data);
            }).catch((error) => {
                let message = "Error trying to access server";
                if (error.response && error.response.data.error) {
                    message = error.response.data.error;
                }
                reject(message);
            });
        });
    }

    static logout = () => {
        localStorage.clear();
    }
}

// Simple email validate function
const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export default User;