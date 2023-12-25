
import { useState, useEffect } from "react";
import {storage} from "./firebase"
import { ref,getStorage,  deleteObject , uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"
import React from 'react'
import Link from 'next/link'
import { db2 } from "./firebase";
import showCoolAlert from './coolAlert';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function upload(){
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [flag, setF] = useState('');
    const [imgUpload  , setImage] = useState(null);
    const [imgGet  , setGet] = useState([]);
    const refff = ref(storage, 'images/');
    const [displayedData, setDisplayedData] = useState(null);
    function pop(){ 
      showCoolAlert('This is a custom message for the cool alert!');
    }
    const a = () =>{
        if(imgUpload==null) return ;
        const imageRef = ref(storage, `images/${imgUpload.name+v4()}`);     
        uploadBytes(imageRef, imgUpload).then(()=>{
          showCoolAlert("Image is getting uploaded in clouse bucket. Please wait, it may take a minute.");
        })
        setF(true)
        getU();

    };

  useEffect(()=>{
    
     
  },[]);

  const getU = async () => {
    console.log("data fetch request send: ");
    listAll(refff).then( (response)=>{
      response.items.forEach((item)=>{
           getDownloadURL(item).then((url)=>{
              setGet((prev)=>[...prev, url]);
          });
      });
      
      
  });
  }

  const usersCollectionRef = collection(db2, "ReadOC");

  
  const sendd = async () => {

    await addDoc(usersCollectionRef, { CardType : displayedData.CardType , Name: displayedData.Name,  Last_Name:displayedData.Last_Name ,Identification_Number  : displayedData.Identification_Number ,
      Date_of_issue  : displayedData.Date_of_issue, Date_of_expiry : displayedData.Date_of_expiry,  Date_of_birth:displayedData.Date_of_birth  });
      showCoolAlert("Succesfully Pushed :-) ");
  }
 
   
  const b = async () => {
    getU();
    setUrl(imgGet[0]);
    try {
      const response = await fetch('/api/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from the server:', data.Identification_Number);
      
      
      console.log("blah blah",name);
      console.log("nohoo",displayedData)
      if(data !==null){

        const storage = getStorage();
  
        const desertRef = ref(storage, url);
        
        
        deleteObject(desertRef).then(() => {
          alert("Note: We have deleted the image from CLOUD BUCKET :> For safety resons.");
        }).catch((error) => {
          
        });

      }
      return data ;
    } catch (error) {
      showCoolAlert("image getting processsed. If you have just uploaded the image. Please wait a minute.");
      console.error('Image getting processed please wait:', error);
    }
   
  };

  const chainSaw = async () => {
   const ele = await b();
   setDisplayedData(ele);

   console.log("element is: ",ele);
  }



    return(
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>First Browse the Image and then Click on Upload Button</p>
        
        <section>
            <input type="file" onChange={(event)=>{setImage(event.target.files[0])}} />
            <button onClick = {a} >Upload image</button>
            {/* <button onClick = {pop} >alert</button> */}
            <p>Wait for a while and then click Extract Details button. Image processing may required few minutes.</p>
            <button onClick = {chainSaw} > Extract Details</button>
            
          <div>
            {
              flag && !url && (
                <div>
                  Please wait a minute. We are processsing image for you.Then tap Extract Detail button.
                </div>
              )
            }
            {
              url && !displayedData && (
                <div>
                  <p>Extraction almost done. Try again in 10 Seconds</p>
                  </div>
              )
            }
          {displayedData && (
        <div>
          <p>Card Type: {displayedData.CardType}</p>
          <p>Name: {displayedData.Name}</p>
          <p>Last Name: {displayedData.Last_Name}</p>
          <p>Identification Number: {displayedData.Identification_Number}</p>
          <p>Date of Issue: {displayedData.Date_of_issue}</p>
          <p>Date Of Expiry: {displayedData.Date_of_expiry}</p>
          <p>Date of Birth: {displayedData.Date_of_birth}</p>
          <p>Click on upload button to store the details in database.</p>
          <button onClick = {sendd} >Upload Data</button>
        </div>
      )}
<p>Below are some other functionalities.</p>
<Link href="database">
          <button  >
          Get sorted data
        </button></Link>
        <Link href="fetch">
        <button  >
          Fetch and Update data
        </button></Link>
          </div>
        </section>
        </main>
    )
}



export default upload ;
