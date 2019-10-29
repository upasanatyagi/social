// //hooks lesson
//
// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// ReactDOM.render(<Countries />, document.querySelector("main"));
// import axios from "./axios";
// //useEffect helps with ajax request, for life cycle method
// function Countries() {
//     const [countries, setCountries] = useState([
//         "Germany",
//         "Albania",
//         "Thailand",
//         "China!"
//     ]);
//
//     const [userInput, setUserInput] = useState("");
//     //useEffect will run when the component mount and whenever we change state(so whenever we change userInput or countries),[]helps only to run on componenrdidmount
//     // console.log("useEffect is running");
//
//     useEffect(() => {
//         // if ignore is false, then that means the response i am getting from axios is good andi want to use it
//         let ignore = false;
//         (async () => {
//             console.log("userInput", userInput);
//             const { data } = await axios.get(
//                 `https://flame-egg.glitch.me/?q=${userInput}`
//             );
//             console.log("data", data);
//             if(!ignore){
//                 setCountries(data);
//             }else{
//                 console.log('ignored!!');
//             }
//         })();
//
//         return () => {
//             ignore = true;
//             console.log("clean up", userInput);
//         };
//     }, [userInput]);
//
//     return (
//         <div>
//             <ul>
//                 {countries.map(country => (
//                     <li key={country}>{country}</li>
//                 ))}
//             </ul>
//             <input
//                 name="user-input"
//                 type="text"
//                 onChange={e => setUserInput(e.target.value)}
//             />
//         </div>
//     );
// }
//
// // ReactDOM.render(<Hello />, document.querySelector("main"));
//
// // function Hello() {
// //     const [name, setName] = useState("World");
// //     const [last, setLast] = useState("Garg");
// //     setName("Lucky");
// //     setLast("Puppy");
// //     return (
// //         <div>
// //             <h1>
// //                 Hello,{name}
// //                 {last}!
// //             </h1>
// //             <input type="text" onChange={e => setName(e.target.value)} />
// //             <input type="text" onChange={e => setLast(e.target.value)} />
// //         </div>
// //     );
// // }
//
// //1.hooks can only
