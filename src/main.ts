import dayjs from "dayjs";
type birthday = string
async function getChefBirthday(id:number):Promise<birthday|null> {
  let recipRes:unknown ; 
  try {
    const ricetta = await fetch(`https://dummyjson.com/recipes/${id}`);
    recipRes = await ricetta.json()
    if (recipRes === null || typeof recipRes !== "object" ||! ("userId" in recipRes)) {
      throw new Error("data type non valido");
    }
  } catch (error) {
    if(error instanceof Error){
      console.log("errore nel recupero dei dati",error)
    }
    else {
      console.log("unknown error")
    }

  }

   let BirthdayDate : unknown ; 
   try {
        const user = recipRes as { userId: number };
        const chief = await fetch(`https://dummyjson.com/users/${user.userId}`);
        BirthdayDate = await chief.json();
            
   
   }catch (error) {
     if(error instanceof Error){
       console.log("errore nel recupero dei dati",error)
     }
     else {
       console.log("unknown error")
     }
 }
 if (
   BirthdayDate === null ||
   typeof BirthdayDate !== "object" ||
   !("birthDate" in BirthdayDate)
 ) {
  throw new Error ("non contiene il dato voluto")
 }
 const birthdateRes = (BirthdayDate as { birthDate : string }).birthDate;
   const ChiefBirthday = dayjs(birthdateRes).format("DD/MM/YYYY");
 return  ChiefBirthday 
}

 getChefBirthday(1)
   .then(birthday => {
     console.log("Data di nascita dello chef:", birthday);
   })
   .catch(error => {
     console.error("Errore:", error.message);
   });
