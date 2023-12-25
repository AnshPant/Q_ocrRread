import { useState, useEffect } from "react";
import {storage} from "../firebase"
import { ref,getStorage,  deleteObject , uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"
import React from 'react'
import Link from 'next/link'
import { db2 } from "../firebase";
import Image from "next/image"
import 'bootstrap/dist/css/bootstrap.css'
import showCoolAlert from './coolAlert';
import '../app/globals.css'
import {
  collection,
  
  addDoc,
} from "firebase/firestore";
import { stringify } from "querystring";


function upload(){
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
    const [DD, setDD] = useState('');
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
 
  const handleClick = () => {
    // Show loading state
    setLoading(true);

    // Disable the button
    setButtonDisabled(true);

    // Enable the button and hide loading state after 10 seconds
    setTimeout(() => {
      setButtonDisabled(false);
      setLoading(false);
    }, 10000); // 10 seconds in milliseconds
  };
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
    handleClick();
    const ele = await b();
   setDisplayedData(ele);
   setDD(stringify(ele));
   console.log("element is: ",ele);
  }



    return(
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">First Browse the Image and then Click on Upload Button</p>
        <figure class="max-w-lg">
          {/* <p>{url}</p> */}
  <Image class="h-auto max-w-full rounded-lg" src={url} alt="image description" width={600}
    height={400} />
  
</figure>
        <section>

{/* <input  type="file"> */}

<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={(event)=>{setImage(event.target.files[0])}} />
            <br></br>
            <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full" onClick = {a} >Upload image</button>
            {/* <button onClick = {pop} >alert</button> */}
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Wait for a while and then click Extract Details button. Image processing may required few minutes.</p>
            <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full" onClick = {chainSaw}  > Extract Details</button>
            
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
                  <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Fetching Results. Wait few more seconds.</p>
                  </div>
              )
            }
          {displayedData && (
        <div>
          
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">JSON data{DD}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Card Type: {displayedData.CardType}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Name: {displayedData.Name}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Last Name: {displayedData.Last_Name}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Identification Number: {displayedData.Identification_Number}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date of Issue: {displayedData.Date_of_issue}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date Of Expiry: {displayedData.Date_of_expiry}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date of Birth: {displayedData.Date_of_birth}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Click on upload button to store the details in database.</p>
          <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full" onClick = {sendd} >Upload Data</button>
        </div>
      )}
<p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Below are some other functionalities.</p>
<Link href="database">
          <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full" >
          Get sorted data
        </button></Link>
        <Link href="fetch">
        <button  className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">
          Fetch and Update data
        </button></Link>
          </div>
        </section>
        </main>
    )
}



export default upload ;
