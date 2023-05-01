import axios from "axios";


function Encryption(customerId,setEncryptedId) {
  axios
    .get("http://localhost:8080/api/v1/encryption", {
      headers: {
        id: customerId,
      },
    })
    .then((res) => {
      setEncryptedId(res.data.data);
      // console.log(encryptedId);
    })
    .catch((error) => {
      console.log(error, "error");
    });
}
export default Encryption