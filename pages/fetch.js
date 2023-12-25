import React from 'react'
import Link from 'next/link'
import {useEffect,useState}from 'react'
import {db2} from '../firebase'
import showCoolAlert from './coolAlert';
import 'bootstrap/dist/css/bootstrap.css'
import '../app/globals.css'
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc ,
  doc,
} from "firebase/firestore";//


function viewDB() {

  const [displayedData, setUsers] = useState([]);
  const [eleee, setEle] = useState([]);
  const [flag, setF] = useState(true);
  const usersCollectionRef = collection(db2,"ReadOC") ;
  const [name,setName] = useState('');
  const [cardType,setcardType] = useState('');
  const [Lname,setLName] = useState('');
  const [Id,setId] = useState('');
  const [DOB,setDOB] = useState('');
  const [issue,setIssue] = useState('');
  const [expiry,setExpiry] = useState('');
  const [identity , setIdentity] = useState('');
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    
  }, []);

  const updatee = async() =>{
      try{
        const cityRef = doc(db2, 'ReadOC', identity);
        setDoc(cityRef, 
        { CardType : cardType , Name: name,  Last_Name:Lname ,Identification_Number  : Id ,
            Date_of_issue  : issue, Date_of_expiry : expiry,  Date_of_birth:DOB  }
        , { merge: true });
        showCoolAlert("update successful");
    }
    catch(error){
        console.log(error);
    }
  
  }
  
  function fetchh(){
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div max-w-md mx-auto p-4>
        <p className="mb-4">Enter Identification_Number and click fetch result</p>

        <p className="mb-4">You may edit the details and then utilise update button. It updates using identificationNumber as standand.</p>

      <div className="form-container">
  
  
    
    <div  className="mb-4" >
      <label   htmlFor="cardType">Card Type:</label>
      <input value={cardType} onChange={(e) => setcardType(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700"  placeholder="" required />
    </div>

    <div className="mb-4" >
      <label   htmlFor="name">Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700" placeholder="" required />
    </div>

    <div className="mb-4"  >
      <label   htmlFor="lastName">Last Name:</label>
      <input value={Lname} onChange={(e) => setLName(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700" placeholder="" required />
    </div>

    <div className="mb-4" >
      <label   htmlFor="identificationNumber">Identification Number:</label>
      <input value={Id} onChange={(e) => setId(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700" placeholder="" required />
    </div>

    <div className="mb-4" >
      <label   htmlFor="dateOfIssue">Date of Issue:</label>
      <input value={issue} onChange={(e) => setIssue(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700" placeholder="" required />
    </div>

    <div  className="mb-4">
      <label   htmlFor="dateOfExpiry">Date Of Expiry:</label>
      <input value={expiry} onChange={(e) => setExpiry(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700" placeholder="" required />
    </div>

    <div className="mb-4" >
      <label   htmlFor="dateOfBirth">Date of Birth:</label>
      <input value={DOB} onChange={(e) => setDOB(e.target.value)} type="text" id="name" className="block text-sm font-medium text-gray-700" placeholder="" required />
    </div>
 
    <button onClick = {fetchh} className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">Fetch Data</button>
    <button onClick = {updatee} className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full" >Update Data</button>
    <Link href="upload" ><button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full" > Go Back</button></Link>
     
</div>
       
    </div>
    </main>
  )
}

export default viewDB