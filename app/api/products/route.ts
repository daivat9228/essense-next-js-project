import { NextResponse } from 'next/server'; 
import seedData from '@/data/seed-perfumes.json';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return NextResponse.json(seedData);
}