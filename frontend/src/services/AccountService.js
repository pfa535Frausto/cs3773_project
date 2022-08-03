import axios from 'axios';

const ACCOUNT_REST_API_URL = 'http://localhost:8080/api/v1/account';

class AccountService {

  /**
   * 
   * getAccount will search at the url http://localhost:8080/api/v1/account/users/{email}/password/{password}
   * for an account. It will return a 'promise' object that the caller will need to address.
   * 
   * @param email the email of the account
   * @param password the password of the account
   * @returns a promise object containing either the account or an AxiosError
   */
  async getAccount(email, password) {
    return axios.get(ACCOUNT_REST_API_URL + `/users/${email}/passwords/${password}`);
  }

  /**
   * getAccountByEmail will search at the url http://localhost:8080/api/v1/account/users/{email}
   * for an account. It will return a 'promise' object that the caller will need to address.
   * 
   * @param email email of the account
   * @returns a promise object containing either the account or an AxiosError
   */
  async getAccountByEmail(email) {
    return axios.get(ACCOUNT_REST_API_URL + `/accounts/${email}`);
  }

  /**
   * registerAccount sends a POST request to store new account info into the database.
   * 
   * @param email the email of the new account
   * @param password the password of the new account
   */
  async registerAccount(email, password) {
    axios.post(ACCOUNT_REST_API_URL + `/users/${email}/passwords/${password}/cards/12343243453`, {
      'email': email,
      'password': password
    });
  }
}

export default new AccountService();