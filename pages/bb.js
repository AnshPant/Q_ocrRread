// file1.js
import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const FetchURL = () => {
  const [imgGet, setGet] = useState([]);
  const refff = ref(storage, 'images/');

  useEffect(() => {
    console.log("use effect started");
    listAll(refff).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setGet((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const valued = imgGet[0];
  console.log("bb ki value " + valued);
  return valued;
};

export default FetchURL;
