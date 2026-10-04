import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publicKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(){
  const db=createClient(url,publicKey);
  const {data,error}=await db.from("noor_contributions").select("id,type,sender_name,content,mood,meta,created_at").eq("is_hidden",false).order("created_at",{ascending:false}).limit(30);
  if(error)return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({data:data||[]});
}
export async function POST(req:Request){
  try{
    const body=await req.json();
    const type=String(body.type||"note");
    const allowed=["hug","flower","note","coffee","chocolate","teddy","sparkle","highfive","joke","song","escape"];
    if(!allowed.includes(type))return NextResponse.json({error:"Invalid gift"},{status:400});
    const content=String(body.content||"").trim().slice(0,1000);
    const sender=String(body.sender||"Anonymous").trim().slice(0,60)||"Anonymous";
    const mood=String(body.mood||"just-because").slice(0,40);
    const db=createClient(url,serviceKey);
    const {data,error}=await db.from("noor_contributions").insert({type,sender_name:sender,content,mood,meta:body.meta||{}}).select("id,type,sender_name,content,mood,meta,created_at").single();
    if(error)throw error;
    return NextResponse.json({data});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to send"},{status:500});}
}