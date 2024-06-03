import { auth } from "@/auth";
import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import Navbar from "@/components/global/Navbar";
import WordCard from "@/components/words-components/word-card";
import { db } from "@/lib/db";

export default async function Home() {
  const session = await auth();
  const user = session?.user;  
  if(!user) return;
  const cursor =0;
  const words = await db.words.findMany({    
    where: {
      userId: user?.id,
    },
    orderBy: {
      rating: {
        sort: "asc",
        nulls:"first"
      },
    },
  }); 
  console.log(words)

  const saveCard = async (id:number,userRating:number,qtyShown:number|null)=>{
    'use server'    
    var qty = 1;
    if(qtyShown) qty = qtyShown+1     

    
    
    await db.words.update({
      where:{
        id
      },
      data:{
        qtyShown:qty,
        userRating,
        rating:userRating*qty
      }
    })

  }
  return (
    <div>
      <Navbar />
      <WordCard words={words} saveCard={saveCard} />
    </div>
  );
}