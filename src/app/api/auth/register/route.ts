import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { error } from "console";
  
export async function POST(request:NextRequest){
  try {
  const {email,password}=  await request.json()
  if (!email  || !password){
    return NextResponse.json({error:"email and password are required"},{status:400})
  }
  await connectToDatabase()
  const existingUser = await User.findOne({email})
  if (existingUser){
      return NextResponse.json({error:"User already exists"},{status:400})

  }
  await User.create({email,password})
    return NextResponse.json({message:"User created Sucessfully"},{status:201})
    
  } catch (error) {
    console.error(error);
    
      return NextResponse.json({error:"Internal server error"},{status:500})
    
  }
}