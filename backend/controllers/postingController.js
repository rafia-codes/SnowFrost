import { JOBVERIFY } from "@prisma/client";
import prisma from "../src/prisma.js";

export const create = async (req, res) => {
  const { title, desc, openings, postingType } = req.body;
  if (req.user.role != "RECRUITER")
    return res.status(403).json({ message: "Access not provided" });
  if (!title || !desc || !openings || !postingType)
    return res.status(400).json({ message: "Insufficient information" });
  const recruiter = await prisma.recruiter.findUnique({
    where:{
      userId: req.user.id,
    },
  });
  await prisma.posting.create({
    data: {
      recruiterId: recruiter.id,
      title,
      desc,
      openings,
      postingType,
    },
  });
  return res.status(200).json({ message: "Posting created successfully" });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { title, desc, openings, postingType } = req.body;
  if (req.user.role != "RECRUITER")
    return res.status(403).json({ message: "Access not provided" });
  if (!id) return res.status(400).json({ message: "Insufficient information" });
  if (openings !== undefined && openings < 1)
    return res.status(400).json({ message: "Min one opening should be there" });
  const post = await prisma.posting.findUnique({
    where: {
      id:Number(id),
    },
  });
  if (!post) return res.status(404).json({ message: "Posting not found" });
  const recruiter = await prisma.recruiter.findUnique({
    where: {
      userId: req.user.id,
    },
  });
  if (post.recruiterId != recruiter.id)
    return res.status(400).json({ message: "Access denied" });

  await prisma.posting.update({
    where: {
      id:Number(id),
    },
    data: {
      ...(title && { title }),
      ...(desc && { desc }),
      ...(openings > 0 && { openings }),
      ...(postingType && { postingType }),
    },
  });
  return res.status(200).json({ message: "Posting updated successfully" });
};

export const sendToPC = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Insufficient information" });
  if (req.user.role != "RECRUITER")
    return res.status(403).json({ message: "Access not provided" });
  const post = await prisma.posting.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!post) return res.status(404).json({ message: "Posting not found" });
  await prisma.posting.update({
    where: {
      id: Number(id),
    },
    data: {
      isVerified: JOBVERIFY.SUBMITTED,
    },
  });
  return res.status(200).json({ message: "Posting submitted successfully" });
};

export const closePosting = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Insufficient information" });
  if (req.user.role != "RECRUITER")
    return res.status(403).json({ message: "Access not provided" });
  const post = await prisma.posting.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!post) return res.status(404).json({ message: "Posting not found" });
  const recruiter = await prisma.recruiter.findUnique({
    where: {
      userId: req.user.id,
    },
  });
  if (post.recruiterId != recruiter.id)
    return res.status(400).json({ message: "Access denied" });
  await prisma.posting.update({
    where: {
      id: Number(id),
    },
    data: {
      isVerified: JOBVERIFY.CLOSED,
    },
  });
  return res.status(200).json({ message: "Posting closed successfully" });
};

export const verifyPosting = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Insufficient information" });
  if (req.user.role != "PCOORDINATOR")
    return res.status(403).json({ message: "Access not provided" });
  const post = await prisma.posting.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!post) return res.status(404).json({ message: "Posting not found" });
  await prisma.posting.update({
    where: {
      id: Number(id),
    },
    data: {
      isVerified: JOBVERIFY.VERIFIED,
    },
  });
  return res.status(200).json({ message: "Posting verified successfully" });
};

export const rejectPosting = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Insufficient information" });
  if (req.user.role != "PCOORDINATOR")
    return res.status(403).json({ message: "Access not provided" });
  const post = await prisma.posting.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!post) return res.status(404).json({ message: "Posting not found" });
  await prisma.posting.update({
    where: {
      id: Number(id),
    },
    data: {
      isVerified: JOBVERIFY.REJECTED,
    },
  });
  return res.status(200).json({ message: "Posting rejected successfully" });
};

export const apply = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Application not found" });
  if (req.user.role !== "STUDENT")
    return res.status(403).json({ message: "User must be a student" });
  const student = await prisma.student.findUnique({
    where: {
      userId: req.user.id,
    },
  });

  if (!student) return res.status(403).json({ message: "Student not found" });

  await prisma.application.create({
    data: {
      studentId: student.id,
      postingId: Number(id),
    },
  });
  return res.status(200).json({ message: "Applied successfully" });
};

export const show = async (req, res) => {
  const { status } = req.query;
  if (req.user.role == "RECRUITER") {
    const postings = await prisma.posting.findMany({
      where:{
        recruiterId :{
          where:{
            userId: req.user.id
          }
        }
      }
    });
  } else {
    const postings = await prisma.posting.findMany({
      where: {
        isVerified: status,
      },
    });
  }
  return res.status(200).json(postings);
};

export const viewApplicants = async (req, res) => {
  const { id } = req.params;
  if (req.user.role != "RECRUITER")
    return res.status(403).json({ message: "Access not provided" });
  if (!id) return res.status(400).json({ message: "Insufficient information" });
  const post = await prisma.posting.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!post) return res.status(404).json({ message: "Posting not found" });
  const applications = await prisma.application.findMany({
    where: {
      postingId: Number(id),
    },
  });
  return res.status(200).json(applications);
};

export const shortlistApp = async (req, res) => {
  const { id, applicationId } = req.params;
  if (req.user.role != "RECRUITER")
    return res.status(403).json({ message: "Access not provided" });
  if (!id || !applicationId)
    return res.status(400).json({ message: "Insufficient information" });
  const app = await prisma.application.findUnique({
    where: {
      id: Number(applicationId),
      postingId: Number(id),
    },
  });
  if (!app) return res.status(404).json({ message: "No such application" });
  await prisma.application.update({
    where: {
      id: Number(applicationId),
    },
    data: {
      status: ApplicationStatus.SHORTLISTED,
    },
  });
  return res.status(200).json({ message: "Candidate shortlisted for this posting" });
};

export const selectApp = async (req, res) => {
  const { id, applicationId } = req.params;
  if (req.user.role != "RECRUITER")
    return res.status(403).json({ message: "Access not provided" });
  if (!id || !applicationId)
    return res.status(400).json({ message: "Insufficient information" });
  const app = await prisma.application.findUnique({
    where: {
      id: Number(applicationId),
      postingId: Number(id),
    },
  });
  if (!app) return res.status(404).json({ message: "No such application" });
  await prisma.application.update({
    where: {
      id: Number(applicationId),
    },
    data: {
      status: ApplicationStatus.SELECTED,
    },
  });
  return res.status(200).json({ message: "Candidate selected for this posting" });
};
