import React from 'react'
import Link from 'next/link'
import {useEffect,useState}from 'react'
import {db2} from '../firebase'
import 'bootstrap/dist/css/bootstrap.css'
import '../app/globals.css'
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";//


function viewDB() {

  const [displayedData, setUsers] = useState([]);
  const [eleee, setEle] = useState([]);
  const [flag, setF] = useState(true);
  const usersCollectionRef = collection(db2,"ReadOC") ;
  
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    };

    getUsers();
  }, []);

  function sortt(){
    var ff = !flag;
    console.log("displayedData",displayedData);
    setF(ff);
    var eleObj = displayedData ;
    setEle(eleObj);
    eleObj.sort((a, b) => a.Identification_Number.localeCompare(b.Identification_Number));
    console.log("Sorted: ",eleObj);
// Print the sorted array (optional)

  }

  return (
    <div><div>
        {flag && displayedData && displayedData.map((user) => {
            return( <div key={user.Identification_Number}>
              <p><b>Following is the data in unsorted format. Click sort button to sort it.</b></p>
            <p>Card Type: {user.CardType}</p>
            <p>Name: {user.Name}</p>
            <p>Last Name: {user.Last_Name}</p>
            <p>Identification Number: {user.Identification_Number}</p>
            <p>Date of Issue: {user.Date_of_issue}</p>
            <p>Date Of Expiry: {user.Date_of_expiry}</p>
            <p>Date of Birth: {user.Date_of_birth}</p>
            <br></br>
            
          </div>)
        })}
      </div>
      <div>
        {!flag && eleee && eleee.map((user) => {
            return( <div key={user.Identification_Number}>
              <p><b>Following is the data in sorted format.  </b></p>
            <p>Card Type: {user.CardType}</p>
            <p>Name: {user.Name}</p>
            <p>Last Name: {user.Last_Name}</p>
            <p>Identification Number: {user.Identification_Number}</p>
            <p>Date of Issue: {user.Date_of_issue}</p>
            <p>Date Of Expiry: {user.Date_of_expiry}</p>
            <p>Date of Birth: {user.Date_of_birth}</p>
            <br></br>
            
          </div>)
        })}
      </div>

         {console.log(displayedData)}
         
         <button onClick = {sortt} > View in Sorted Details</button>
         <Link href="upload"><button  > Go Back</button></Link>

       
    </div>
  )
}

export default viewDB