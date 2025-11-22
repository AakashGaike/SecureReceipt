# SecureReceipt

SecureReceipt is a full-stack application designed to generate and verify digital receipts using cryptographic hashing, digital signatures, and a simple blockchain for tamper detection.

## Project Overview

The project enables:
- Secured receipt generation with validation
- Cryptographic hashing (SHA-256)
- RSA-based digital signing for authenticity
- Blockchain storage of receipt hashes
- Receipt verification via upload or QR scan
- Modern animated UI for presentation and demo
- Toast notifications + smooth UX

## Tech Stack

### Frontend
| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| React + TypeScript    | Front-end UI                  |
| Tailwind CSS          | Styling and layout            |
| Framer Motion         | UI animations and transitions |
| Axios                 | API communication             |
| jsQR                  | QR code scanning and decoding |
| React Router          | Navigation                    |
| Lucide-React          | Icons                         |
| Custom Toast Provider | Notifications                 |

### Backend
| Technology               | Purpose                        |
| ------------------------ | ------------------------------ |
| Flask (Python)           | Backend API                    |
| Flask-CORS               | Frontend-Backend communication |
| PyCryptodome             | RSA signing & verification     |
| SHA-256 (hashlib)        | Hashing receipts               |
| Custom Simple Blockchain | Integrity + immutability       |
| JSON storage             | Temporary receipt DB           |
| Gunicorn                 | Production deployment          |
| Render                   | Hosting backend service        |

## Project Structure

- **backend/**: Flask application, API routes, and blockchain logic.
  - `app.py`: Entry point.
  - `simple_blockchain.py`: Custom blockchain implementation.
  - `routes/`: API endpoints.
- **frontend/**: React application (Vite).
  - `src/components`: UI components (Toast, AnimatedCard, etc.).
  - `src/pages`: Application pages.
- **smart_contract/**: Solidity contracts (`SecureReceipt.sol`).
- **keys/**: RSA keys (`public.pem`, `private.pem`).

## Key Files
- `simple_blockchain.py`: Implements `Block` and `SimpleBlockchain` classes.
- `backend/app.py`: Flask app initialization and blueprint registration.
- `frontend/src/components/ToastProvider.tsx`: Custom notification system.
