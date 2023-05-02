import React from 'react'
import axios from 'axios';

function DeleteCategory(categories,title) {

    let matchedCategory = categories.find((res) => res.title == title);
    const config = {
      headers: {
        id: matchedCategory.id,
      },
    };
    let encryptedId;
    axios
      .get("http://localhost:8080/api/v1/encryption", config)
      .then((res) => {
        encryptedId = res;
        const token = JSON.parse(sessionStorage.getItem("token"));
        axios
          .delete("http://localhost:8080/api/v1/category/delete-category", {
            headers: {
              token: token,
              category_id: encryptedId.data.data,
            },
          })
          .then((res) => {
            // setdeleteState(true)
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
      console.log('deleted from functio')
}

export {DeleteCategory}