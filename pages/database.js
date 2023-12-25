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
  const [issue,setIssue] = useState('');
  const [Id,setId] = useState('');

  const [name,setName] = useState('');
  const [cardType,setcardType] = useState('');
  const [Lname,setLName] = useState('');
  
  const [DOB,setDOB] = useState('');
  
  const [expiry,setExpiry] = useState('');
  const [identity , setIdentity] = useState('');
  
  
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    };

    getUsers();
  }, []);
  function fetchByID(){
    function getObjectByIdentificationNumber(array, idToMatch) {
        let ggg = array.find(item => item.Identification_Number === idToMatch); 
        console.log("data fetched is",ggg);
        setName(ggg.Name);
        setLName(ggg.Last_Name);
        setDOB(ggg.Date_of_birth);
        setExpiry(ggg.Date_of_expiry);
        setIssue(ggg.Date_of_issue);
        setcardType(ggg.CardType);
        setIdentity(ggg.id);
        console.log(ggg.id);
        return ggg
      }
      getObjectByIdentificationNumber(displayedData,Id);
      }

      function fetchByIssue(){
        function getObjectByIdentificationNumber2(array, idToMatch) {
            let ggg = array.find(item => item.Date_of_issue === idToMatch); 
            console.log("data fetched is",ggg);
            setName(ggg.Name);
            setLName(ggg.Last_Name);
            setDOB(ggg.Date_of_birth);
            setExpiry(ggg.Date_of_expiry);
            setId(ggg.Identification_Number);
            setcardType(ggg.CardType);
            setIdentity(ggg.id);
            console.log(ggg.id);
            return ggg
          }
          getObjectByIdentificationNumber2(displayedData,issue);
          }
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div><div>
      
        { flag? <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400"><b>HISTORY (RECORDS) ! </b></p> : ""}
        {flag && displayedData && displayedData.map((user) => {
            return( <div key={user.Identification_Number}>
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Search by Identification Number: {user.Identification_Number}</p>
            <br></br>
            
          </div>)
        })}
      </div>
      <div>
      { !flag? <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400"><b>Displaying all records in sorted order </b></p> : ""}
        {!flag && eleee && eleee.map((user) => {
            return( <div key={user.Identification_Number}>
              
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Card Type: {user.CardType}</p>
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Name: {user.Name}</p>
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Last Name: {user.Last_Name}</p>
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Identification Number: {user.Identification_Number}</p>
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date of Issue: {user.Date_of_issue}</p>
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date Of Expiry: {user.Date_of_expiry}</p>
            <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date of Birth: {user.Date_of_birth}</p>
            <br></br>
            
          </div>)
        })}
      </div>

         {console.log(displayedData)}
         
         <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full m-4" onClick = {sortt} > View Complete Data Sorted by Identity Number</button>
         

         <div className="mb-4" >
      <label   htmlFor="identificationNumber">Identification Number:</label>
      <input value={Id} onChange={(e) => setId(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700" placeholder="" required />
    <button onClick = {fetchByID} className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full m-4">Display Data</button>
    </div>
    <div className="mb-4" >
      <label   htmlFor="dateOfIssue">Search by Date of Issue:</label>
      <input value={issue} onChange={(e) => setIssue(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700" placeholder="" required />
      <button onClick = {fetchByIssue} className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full m-4">Display Data</button>
    </div>
    {DOB && (
        <div>
          
          
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Card Type: {cardType}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Name: {name}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Last Name: {Lname}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Identification Number: {Id}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date of Issue: {issue}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date Of Expiry: {expiry}</p>
          <p className="mb-3 text-lg text-white md:text-xl dark:text-gray-400">Date of Birth: {DOB}</p>
        </div>

      )}
       <Link href="upload"><button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full" > Go Back</button></Link>
    </div>
    </main>
  )
}

export default viewDB