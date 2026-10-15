// API Service with seamless Spring Boot backend integration
// and robust offline/mock fallback for standalone demonstrations.

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// Initial Seed Data for immediate standalone browser evaluation
const INITIAL_SUBJECTS = [
  { id: 1, code: 'CS301', name: 'Database Management Systems', department: 'Computer Science & Engineering', semester: 5 },
  { id: 2, code: 'CS302', name: 'Operating Systems', department: 'Computer Science & Engineering', semester: 5 },
  { id: 3, code: 'CS401', name: 'Computer Networks', department: 'Computer Science & Engineering', semester: 6 },
  { id: 4, code: 'CS201', name: 'Data Structures & Algorithms', department: 'Computer Science & Engineering', semester: 3 },
  { id: 5, code: 'MA201', name: 'Discrete Mathematics & Graph Theory', department: 'Mathematics', semester: 3 },
  { id: 6, code: 'CS405', name: 'Machine Learning & Neural Networks', department: 'Artificial Intelligence', semester: 7 }
];

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Lecture Notes', slug: 'notes', description: 'Curated faculty and student handwritten or typed classroom notes.', icon: 'book' },
  { id: 2, name: 'Previous Year Papers (PYQ)', slug: 'pyq', description: 'Past 5-year mid-term and end-term university examination question papers.', icon: 'file-text' },
  { id: 3, name: 'Lab Manuals & Code', slug: 'lab-manual', description: 'Experiment documentation, observation guides, and verified code implementations.', icon: 'terminal' },
  { id: 4, name: 'Assignments & Solutions', slug: 'assignment', description: 'Weekly assignment problem sets with verified solution breakdowns.', icon: 'check-square' }
];

const INITIAL_MATERIALS = [
  {
    id: 101,
    title: 'CS301 Unit 2 - Normalization & BCNF Solved Numerical Problems',
    description: 'Detailed handwritten notes by Prof. Mukherjee explaining 1NF, 2NF, 3NF, BCNF step-by-step with 15 previous university exam solved decomposition questions.',
    subject: INITIAL_SUBJECTS[0],
    category: INITIAL_CATEGORIES[0],
    semester: 5,
    fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-dbms-unit2.pdf',
    fileSize: '3.8 MB',
    fileType: 'PDF',
    pageCount: 38,
    downloads: 1420,
    views: 4280,
    uploader: { id: 2, name: 'Dr. R. K. Mukherjee', email: 'faculty@campus.edu', role: 'FACULTY' },
    isVerified: true,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    contentPreview: `1. INTRODUCTION TO FUNCTIONAL DEPENDENCIES
A functional dependency X -> Y holds on relation R if whenever two tuples agree on attributes X, they must also agree on attributes Y.

2. SECOND NORMAL FORM (2NF)
A relation schema R is in 2NF if it is in 1NF and no non-prime attribute is partially dependent on any candidate key of R.

3. THIRD NORMAL FORM (3NF) & BCNF
A relation schema R is in 3NF if for every functional dependency X -> Y, either:
(a) X is a superkey of R, or
(b) Y is a prime attribute (part of some candidate key).

BCNF Condition: For every non-trivial FD X -> Y, X MUST be a superkey.
Solved Numerical #1: Decomposition of R(A, B, C, D) with FDs: {A -> B, B -> C, C -> D}`
  },
  {
    id: 102,
    title: 'CS302 CPU Scheduling Algorithms & Deadlock Prevention Cheatsheet',
    description: 'Complete formula sheet and Gantt chart walkthroughs for FCFS, SJF, Priority Scheduling, Round Robin, Banker\'s Algorithm, and Resource Allocation Graphs.',
    subject: INITIAL_SUBJECTS[1],
    category: INITIAL_CATEGORIES[0],
    semester: 5,
    fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-os-scheduling.pdf',
    fileSize: '2.2 MB',
    fileType: 'PDF',
    pageCount: 24,
    downloads: 1180,
    views: 3590,
    uploader: { id: 1, name: 'Aarav Sharma', email: 'student@campus.edu', role: 'STUDENT' },
    isVerified: true,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    contentPreview: `CPU SCHEDULING ALGORITHMS FORMULA & COMPARISON GUIDE

1. FIRST-COME, FIRST-SERVED (FCFS)
- Non-preemptive scheduling.
- Convoy Effect: Short processes behind long CPU burst process suffer long turnaround times.

2. SHORTEST JOB FIRST (SJF / SRTF)
- Minimizes average turnaround and waiting times.
- Preemptive variant is Shortest Remaining Time First (SRTF).

3. ROUND ROBIN (RR)
- Preemptive scheduling with a defined Time Quantum (q).
- If quantum is too small: context switch overhead degrades system throughput.
- If quantum is too large: degrades to FCFS.

4. BANKER'S ALGORITHM FOR DEADLOCK AVOIDANCE
- Safety Algorithm check: Need[i,j] = Max[i,j] - Allocation[i,j]`
  },
  {
    id: 103,
    title: 'CS301 DBMS End-Semester Question Papers (2021-2025 Solved)',
    description: 'Compilation of past 5 years university end-semester papers with typed model answer keys, ER diagram notations, and relational algebra queries.',
    subject: INITIAL_SUBJECTS[0],
    category: INITIAL_CATEGORIES[1],
    semester: 5,
    fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-dbms-pyq-bundle.pdf',
    fileSize: '5.6 MB',
    fileType: 'PDF',
    pageCount: 62,
    downloads: 2890,
    views: 7410,
    uploader: { id: 2, name: 'Dr. R. K. Mukherjee', email: 'faculty@campus.edu', role: 'FACULTY' },
    isVerified: true,
    createdAt: new Date(Date.now() - 35 * 86400000).toISOString(),
    contentPreview: `UNIVERSITY END-SEMESTER EXAM COMPILATION (SOLVED)

Q1 [10 Marks]: Explain the ACID properties of database transactions with real-world banking scenario examples.
Answer: Atomicity (All or nothing), Consistency (preserves invariants), Isolation (concurrency control), Durability (WAL logged to non-volatile disk).

Q2 [10 Marks]: Differentiate between B-Tree and B+ Tree indexing structures. Why do database engines prefer B+ Trees for range queries?
Answer: In B+ Trees, all actual data pointers reside strictly in the leaf nodes, which are linked together in a sequential doubly-linked list.`
  },
  {
    id: 104,
    title: 'CS201 Data Structures Lab Record - All 12 Experiments with C++ Code',
    description: 'Complete lab record containing verified code for Linked Lists, Stacks, Queues, Binary Search Trees, AVL rotations, and Dijkstra\'s Algorithm.',
    subject: INITIAL_SUBJECTS[3],
    category: INITIAL_CATEGORIES[2],
    semester: 3,
    fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-dsa-lab-manual.pdf',
    fileSize: '4.1 MB',
    fileType: 'PDF',
    pageCount: 54,
    downloads: 2040,
    views: 5620,
    uploader: { id: 3, name: 'Priya Sundaram', email: 'priya.student@campus.edu', role: 'STUDENT' },
    isVerified: true,
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    contentPreview: `EXPERIMENT 1: IMPLEMENTATION OF SINGLY LINKED LIST WITH INSERTION & DELETION
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head = nullptr;
    void insertFront(int val) {
        Node* n = new Node(val);
        n->next = head;
        head = n;
    }
};`
  },
  {
    id: 105,
    title: 'CS401 Computer Networks Subnetting & CIDR Calculation Guide',
    description: 'In-depth visual guide on VLSM, Classless Inter-Domain Routing (CIDR), IP packet fragmentation calculations, and Wireshark trace analysis.',
    subject: INITIAL_SUBJECTS[2],
    category: INITIAL_CATEGORIES[0],
    semester: 6,
    fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-cn-subnetting.pdf',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    pageCount: 30,
    downloads: 890,
    views: 2400,
    uploader: { id: 2, name: 'Dr. R. K. Mukherjee', email: 'faculty@campus.edu', role: 'FACULTY' },
    isVerified: true,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    contentPreview: `COMPUTER NETWORKING: IP ADDRESSING & SUBNETTING

1. IPv4 ADDRESS STRUCTURE
An IPv4 address consists of 32 bits arranged in 4 octets separated by dots.
Class A: 1.0.0.0 to 126.255.255.255 (/8)
Class B: 128.0.0.0 to 191.255.255.255 (/16)
Class C: 192.0.0.0 to 223.255.255.255 (/24)

2. VARIABLE LENGTH SUBNET MASKING (VLSM)
Example Problem: Subnet 192.168.10.0/24 to support four branch offices requiring 60, 28, 12, and 2 host addresses.`
  },
  {
    id: 106,
    title: 'MA201 Discrete Mathematics Graph Theory & Tree Traversal PYQ Set',
    description: 'Eulerian circuits, Hamiltonian paths, Planar graphs, chromatic number proofs, and tree recurrence relations solved questions.',
    subject: INITIAL_SUBJECTS[4],
    category: INITIAL_CATEGORIES[1],
    semester: 3,
    fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-discrete-maths.pdf',
    fileSize: '2.9 MB',
    fileType: 'PDF',
    pageCount: 36,
    downloads: 760,
    views: 1950,
    uploader: { id: 1, name: 'Aarav Sharma', email: 'student@campus.edu', role: 'STUDENT' },
    isVerified: false,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    contentPreview: `DISCRETE MATHEMATICS: GRAPH THEORY COMPILATION

Theorem (Euler's Formula): For any connected planar graph with V vertices, E edges, and F faces:
V - E + F = 2.

Handshaking Lemma: In any graph, sum of degrees of all vertices equals twice the number of edges:
Sum(deg(v)) = 2 * |E|.`
  },
  {
    id: 107,
    title: 'CS405 Machine Learning Assignment 3 - Backpropagation & CNN Implementation',
    description: 'Step-by-step mathematical derivation of gradient descent backpropagation in Multi-Layer Perceptrons and PyTorch MNIST classifier code.',
    subject: INITIAL_SUBJECTS[5],
    category: INITIAL_CATEGORIES[3],
    semester: 7,
    fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-ml-backprop.pdf',
    fileSize: '4.5 MB',
    fileType: 'PDF',
    pageCount: 42,
    downloads: 940,
    views: 2780,
    uploader: { id: 2, name: 'Dr. R. K. Mukherjee', email: 'faculty@campus.edu', role: 'FACULTY' },
    isVerified: true,
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    contentPreview: `ASSIGNMENT 3: ARTIFICIAL NEURAL NETWORKS & BACKPROPAGATION

1. CHAIN RULE OF CALCULUS FOR MULTI-LAYER PERCEPTRONS
Let loss function L = 1/2 * (y - y_hat)^2.
Weight update rule: w = w - eta * (dL / dw).

2. CONVOLUTIONAL NEURAL NETWORKS (CNN)
Convolution operation: S(i, j) = (I * K)(i, j) = sum_m sum_n I(i - m, j - n) K(m, n).`
  }
];

// In-Memory simulated persistence store
let mockMaterials = [...INITIAL_MATERIALS];
let mockSubjects = [...INITIAL_SUBJECTS];
let mockCategories = [...INITIAL_CATEGORIES];

export const ApiService = {
  // Check if live backend is online
  async checkBackendHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1500) });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Study Materials
  async getMaterials({ query = '', subjectId = null, categoryId = null, semester = null } = {}) {
    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (subjectId) params.append('subjectId', subjectId);
      if (categoryId) params.append('categoryId', categoryId);
      if (semester) params.append('semester', semester);

      const res = await fetch(`${API_BASE}/materials?${params.toString()}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {
      // Backend not running, fallback to mock store
    }

    // Filter mock data locally
    return mockMaterials.filter(item => {
      if (subjectId && item.subject.id !== Number(subjectId)) return false;
      if (categoryId && item.category.id !== Number(categoryId)) return false;
      if (semester && item.semester !== Number(semester)) return false;
      if (query) {
        const q = query.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSubject = item.subject.name.toLowerCase().includes(q) || item.subject.code.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSubject) return false;
      }
      return true;
    });
  },

  async getMaterialById(id) {
    try {
      const res = await fetch(`${API_BASE}/materials/${id}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    const found = mockMaterials.find(m => m.id === Number(id));
    if (found) {
      found.views += 1;
      return { ...found };
    }
    throw new Error('Material not found');
  },

  async createMaterial(data, token, currentUser) {
    try {
      const res = await fetch(`${API_BASE}/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const subject = mockSubjects.find(s => s.id === Number(data.subjectId)) || mockSubjects[0];
    const category = mockCategories.find(c => c.id === Number(data.categoryId)) || mockCategories[0];

    const newMaterial = {
      id: Date.now(),
      title: data.title,
      description: data.description || 'No additional description provided.',
      subject,
      category,
      semester: Number(data.semester),
      fileUrl: data.fileUrl || 'https://raw.githubusercontent.com/campus/assets/sample-notes.pdf',
      fileSize: data.fileSize || '3.2 MB',
      fileType: data.fileType || 'PDF',
      pageCount: data.pageCount || 18,
      downloads: 0,
      views: 1,
      uploader: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role
      },
      isVerified: currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN',
      createdAt: new Date().toISOString(),
      contentPreview: `ACADEMIC DOCUMENT: ${data.title.toUpperCase()}
Subject: ${subject.name} (${subject.code})
Uploaded by: ${currentUser.name} (${currentUser.role})

${data.description || 'Detailed coursework and reference problems.'}
- Comprehensive topic coverage with equations, diagrams, and proof steps.`
    };

    mockMaterials.unshift(newMaterial);
    return newMaterial;
  },

  async updateMaterial(id, data, token) {
    try {
      const res = await fetch(`${API_BASE}/materials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const index = mockMaterials.findIndex(m => m.id === Number(id));
    if (index !== -1) {
      mockMaterials[index] = { ...mockMaterials[index], ...data };
      return mockMaterials[index];
    }
    throw new Error('Material not found for update');
  },

  async deleteMaterial(id, token) {
    try {
      const res = await fetch(`${API_BASE}/materials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    mockMaterials = mockMaterials.filter(m => m.id !== Number(id));
    return { message: `Material #${id} deleted successfully.` };
  },

  async incrementDownload(id) {
    try {
      const res = await fetch(`${API_BASE}/materials/${id}/download`, { method: 'POST', signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const found = mockMaterials.find(m => m.id === Number(id));
    if (found) {
      found.downloads += 1;
      return { ...found };
    }
  },

  // Subjects & Categories
  async getSubjects() {
    try {
      const res = await fetch(`${API_BASE}/subjects`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {}
    return mockSubjects;
  },

  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {}
    return mockCategories;
  }
};
