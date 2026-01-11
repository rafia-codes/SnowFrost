import { currStatus } from '@prisma/client';
import prisma from '../src/prisma.js';

export const applyNoc = async (req,res) => {
    const { type, companyName, role, ctc, offerLetterUrl } = req.body;
    if(!type)
        return res.status(400).json({ message: "NOC type is required" });
    if(!companyName)
        return res.status(400).json({ message: "Company name is required" });
    if(!role)
        return res.status(400).json({ message: "Role is required" });   
    if(!ctc)
        return res.status(400).json({ message: "CTC is required" });
    if(!offerLetterUrl)
        return res.status(400).json({ message: "Offer letter URL is required" });
    const stud = await prisma.student.findUnique({
        where:{
            id: req.user.id
        }
    });
    if(!stud) return res.status(404).json({message:'Student is not registered'});
    await prisma.nOC.create({
        data:{
            userId,
            type,
            companyName,
            role,
            ctc,
            offerLetterUrl
        }
    });
    return res.status(200).json({ message: "NOC applied successfully"});
}

export const show = async (req,res) => {
    const { q } = req.query;
    if(req.user.role != 'PCCORDINAtOR')
        return res.status(400).json({ message: "Access denied"});
    if(q){
        const nocs = await prisma.nOC.findMany({
            where:{
                isGranted: "PENDING"
            }
        })
    }else{
        const nocs = await prisma.nOC.findMany();
    }
    return res.status(200).json({ message: "NOCs fetched successfully"});
} 

export const approveNoc = async (req,res) => {
    const { id } = req.params;
    if(req.user.role != 'PCCORDINAtOR')
        return res.status(400).json({ message: "Access denied"});
    const noc = await prisma.nOC.findUnique({
        where:{
            id: Number(id)
        }
    });
    if(!noc) return res.status(404).json({ message: "NOC not found" });
    await prisma.nOC.update({
        where:{
            id: Number(id)
        },
        data:{
            isGranted: currStatus.APPROVED
        }
    });
    return res.status(200).json({ message: "NOC approved successfully"});
}

export const rejectNoc = async (req,res) => {
    const { id } = req.params;
    if(req.user.role != 'PCCORDINAtOR')
        return res.status(400).json({ message: "Access denied"});
    const noc = await prisma.nOC.findUnique({
        where:{
            id: Number(id)
        }
    });
    if(!noc) return res.status(404).json({ message: "NOC not found" });
    await prisma.nOC.update({
        where:{
            id: Number(id)
        },
        data:{
            isGranted: currStatus.REJECTED
        }
    });
    return res.status(200).json({ message: "NOC rejected successfully"});
}