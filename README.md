# school-equipment-lending-portal (Group 39)
A full-stack School Equipment Lending Portal using React and [Node.js/Python/Java/.Net]. Features manual and AI-assisted (Copilot/Claude/Cursor) versions with user authentication, equipment management, borrowing/return, and dashboard. Includes API docs, DB schema, and reflection on manual vs. AI workflows.

## Repository Structure
- `manual/`: Codebase for the manually developed version.
- `ai-assisted/`: Codebase for the AI-assisted version.

## Setup Instructions
1. Clone the repository: HTTPS -> `git clone https://github.com/2024tm93083/school-equipment-lending-portal.git` or SSH -> `git clone git@github.com:2024tm93083/school-equipment-lending-portal.git`
2. Navigate to `manual/` or `ai-assisted/` for specific setup instructions (see respective READMEs).

# SE ZG503 – School Equipment Lending Portal (Group XX)

## Phase 1 – Manual Development
→ Folder: `/manual`

## Phase 2 – AI-Assisted Development  
→ Used **Grok + Claude** with 17 specific prompts  
→ Folder: `/ai-assisted`  
→ Enhancements: Analytics, History, Pagination, bcrypt, Joi, Auto-DB init

## Demo Video (2 versions side-by-side)
→ https://drive.google.com/drive/folders/108a6zxHmKaLJlJqVQKnkxQ9nBiiSD6xN?usp=d

## Documentation
→ API_Docs.md (Postman collection export)  
→ AI_Usage_Log.pdf (prompts + reflection + metrics table)

**Metrics Comparison (Manual vs AI Versions)**
AI helped by generating 70% of refactors, but I manually adjusted 30% for integration.

| Metric               | Manual Version | AI Version     | Notes/Reflection |
|----------------------|----------------|----------------|------------------|
| Development Time     | ~10 hours      | ~3 hours       | AI sped up refactoring and feature addition via prompts. |
| Lines of Code (LOC)  | ~500           | ~550           | AI added enhancements but optimized code structure. |
| Error Handling       | Basic (console logs) | Advanced (try-catch, Joi validation) | AI suggested consistent patterns, reducing bugs. |
| Features             | Core only (CRUD, requests) | Core + History, Analytics, Pagination, Hashing | AI prompted new ideas without deep manual research. |
| Code Readability     | Medium (callbacks) | High (async/await, comments) | AI modernized and documented code. |
| Security             | Low (plain passwords) | High (bcrypt, role-based auth) | AI integrated best practices. |
| Bugs Found in Testing| 4-6 (overlaps, auth) | 1-2 (minor SQL) | AI validation reduced issues. |
| Learning Outcome     | Hands-on basics | Faster iteration, deeper insights via debugging AI | AI complemented manual but required review. |