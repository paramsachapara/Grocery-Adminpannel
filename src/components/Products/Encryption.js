import axios from "axios";

function Encryption(productId, setEncryptedId) {
  axios
    .get("http://localhost:8080/api/v1/encryption", {
      headers: {
        id: productId,
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
export default Encryption;
