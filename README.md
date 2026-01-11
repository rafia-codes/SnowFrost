# PlaceFlow — Campus Internship & Placement Management System

## **Overview**
PlaceFlow is a campus-centric, role-based web platform designed to digitize and streamline the fragmented internship and placement workflow in colleges.
It replaces scattered WhatsApp messages, emails, PDFs, and spreadsheets with a single source of truth for students, placement cells, and recruiters.

The system covers the entire lifecycle — from verified job postings and student applications to selection, NOC approval, and automatic placement status — all in one transparent and accountable workflow.


---


## **Key Problem It Solves**

- Internship and placement notices scattered across WhatsApp, emails, and PDFs
- Manual resume collection and spreadsheet-based tracking
- Students missing deadlines or applying incorrectly
- Placement Cells spending time on admin work instead of career guidance
- Recruiters receiving unverified or inconsistent student data
- No reliable way to track placed vs unplaced students


---


## **Core Features (MVP)**

### **👨‍🎓 Students**
- Secure login with auto-created profile
- View only PC-verified job/internship postings
- One-click application to postings
- Track application status (Applied → Shortlisted → Selected)
- Separate NOC request for:
    - On-campus selections
    - Off-campus offers
- Upload offer letter for NOC approval


### **🏢 Placement Cell (PC)**
- Role-based, department-level access
- Verify and publish recruiter job postings
- Reject or close postings
- View applicants per posting
- Approve or reject NOC requests
- Automatic system-driven placement status
- No spreadsheets, no manual tracking

### **🧑‍💼 Recruiters**
- Create job/internship postings
- Submit postings for PC verification
- View applicants for their postings
- Shortlist and select candidates digitally
- Structured and transparent hiring workflow


---


## **Project Architecture**

### **Backend**

- **Framework**: Node.js + Express
- **ORM**: Prisma (v7)
- **Database**: SQLite (hackathon/demo)
- **Authentication**: JWT-based
- **Authorization**: Role-based (Student / Recruiter / Placement Cell)

### **Implemented API Endpoints (MVP)**

### **Authentication**
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

---


### **Postings**

- POST /api/postings — Create posting (Recruiter)
- PUT /api/postings/:id — Edit posting (Recruiter)
- POST /api/postings/:id/submit — Submit for PC verification
- POST /api/postings/:id/close — Close posting (when hired)

- POST /api/postings/:id/verify — Verify posting (PC)
- POST /api/postings/:id/reject — Reject posting (PC)

- GET /api/postings — View postings


---


### **Applications**

- POST /api/postings/:id/apply — Student applies to posting
- GET /api/postings/:id/applicants — View applicants of a posting
- POST /api/postings/:pid/applicants/:aid/shortlist - Shortlist candidates( Recruiter )
- POST /api/postings/:pid/applicants/:aid/select - Select candidates( Recruiter )


---


### **NOC (On-campus & Off-campus)**

- POST /api/noc — Student requests NOC
- GET /api/noc — View own NOC status
- POST /api/noc/:id/approve — PC approves NOC
- POST /api/noc/:id/reject — PC rejects NOC


---


## **Installation**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rafia-codes/SnowFrost
   cd SnowFrost/backend
   npm install
   ```

2. Run Server:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

---


## **Why PlaceFlow Is Different**

- Campus-policy driven, not a generic job portal
- PC-verified data ensures trust and accountability
- System-controlled placement status (no manual manipulation)
- Works for both on-campus and off-campus offers
- Designed specifically for public institutions with low budgets


---


## **Future Enhancements**

- Mentor approval layer for NOC
- Email & calendar notifications
- Analytics dashboards
- Alumni interview experience archive
- Resume–job auto-matching (AI-assisted)
- Cloud file storage (S3)


---


## **Conclusion**

PlaceFlow transforms internship and placement management from a chaotic, manual process into a transparent, digital, and policy-aligned workflow — benefiting students, placement cells, and recruiters alike.
