import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/study_material_model.dart';
import '../models/subject_model.dart';
import '../models/category_model.dart';
import '../models/user_model.dart';

class ApiService {
  static const String baseUrl = 'http://10.0.2.2:8080/api';

  // In-memory fallback mock dataset matching React Web 1:1
  static final List<SubjectModel> mockSubjects = [
    SubjectModel(id: 1, code: 'CS301', name: 'Database Management Systems', department: 'Computer Science & Engineering', semester: 5),
    SubjectModel(id: 2, code: 'CS302', name: 'Operating Systems', department: 'Computer Science & Engineering', semester: 5),
    SubjectModel(id: 3, code: 'CS401', name: 'Computer Networks', department: 'Computer Science & Engineering', semester: 6),
    SubjectModel(id: 4, code: 'CS201', name: 'Data Structures & Algorithms', department: 'Computer Science & Engineering', semester: 3),
    SubjectModel(id: 5, code: 'MA201', name: 'Discrete Mathematics & Graph Theory', department: 'Mathematics', semester: 3),
    SubjectModel(id: 6, code: 'CS405', name: 'Machine Learning & Neural Networks', department: 'Artificial Intelligence', semester: 7),
  ];

  static final List<CategoryModel> mockCategories = [
    CategoryModel(id: 1, name: 'Lecture Notes', slug: 'notes', description: 'Curated faculty and student notes.', icon: 'book'),
    CategoryModel(id: 2, name: 'Previous Year Papers (PYQ)', slug: 'pyq', description: 'Past 5-year university exam papers.', icon: 'file-text'),
    CategoryModel(id: 3, name: 'Lab Manuals & Code', slug: 'lab-manual', description: 'Experiment documentation & code.', icon: 'terminal'),
    CategoryModel(id: 4, name: 'Assignments & Solutions', slug: 'assignment', description: 'Weekly problem sets & answers.', icon: 'check-square'),
  ];

  static final List<StudyMaterialModel> mockMaterials = [
    StudyMaterialModel(
      id: 101,
      title: 'CS301 Unit 2 - Normalization & BCNF Solved Numerical Problems',
      description: 'Detailed handwritten notes by Prof. Mukherjee explaining 1NF, 2NF, 3NF, BCNF step-by-step with 15 previous university exam solved decomposition questions.',
      subject: mockSubjects[0],
      category: mockCategories[0],
      semester: 5,
      fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-dbms-unit2.pdf',
      fileSize: '3.8 MB',
      fileType: 'PDF',
      pageCount: 38,
      downloads: 1420,
      views: 4280,
      uploader: UserModel(id: 2, name: 'Dr. R. K. Mukherjee', email: 'faculty@campus.edu', role: 'FACULTY'),
      isVerified: true,
      createdAt: DateTime.now().subtract(const Duration(days: 15)),
      contentPreview: '1. FUNCTIONAL DEPENDENCIES\nX -> Y holds if equal X implies equal Y.\n\n2. 2NF, 3NF, BCNF DECOMPOSITIONS\nBCNF: For every X -> Y, X must be a superkey.',
    ),
    StudyMaterialModel(
      id: 102,
      title: 'CS302 CPU Scheduling Algorithms & Deadlock Prevention Cheatsheet',
      description: 'Complete formula sheet and Gantt chart walkthroughs for FCFS, SJF, Priority Scheduling, Round Robin, Banker\'s Algorithm, and Resource Allocation Graphs.',
      subject: mockSubjects[1],
      category: mockCategories[0],
      semester: 5,
      fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-os-scheduling.pdf',
      fileSize: '2.2 MB',
      fileType: 'PDF',
      pageCount: 24,
      downloads: 1180,
      views: 3590,
      uploader: UserModel(id: 1, name: 'Aarav Sharma', email: 'student@campus.edu', role: 'STUDENT'),
      isVerified: true,
      createdAt: DateTime.now().subtract(const Duration(days: 10)),
      contentPreview: 'CPU SCHEDULING ALGORITHMS\n1. FCFS: Non-preemptive.\n2. SJF: Minimum average waiting time.\n3. Round Robin: Time quantum slicing.',
    ),
    StudyMaterialModel(
      id: 103,
      title: 'CS301 DBMS End-Semester Question Papers (2021-2025 Solved)',
      description: 'Compilation of past 5 years university end-semester papers with typed model answer keys, ER diagram notations, and relational algebra queries.',
      subject: mockSubjects[0],
      category: mockCategories[1],
      semester: 5,
      fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-dbms-pyq-bundle.pdf',
      fileSize: '5.6 MB',
      fileType: 'PDF',
      pageCount: 62,
      downloads: 2890,
      views: 7410,
      uploader: UserModel(id: 2, name: 'Dr. R. K. Mukherjee', email: 'faculty@campus.edu', role: 'FACULTY'),
      isVerified: true,
      createdAt: DateTime.now().subtract(const Duration(days: 35)),
      contentPreview: 'SOLVED UNIVERSITY END-TERM PAPERS\nQ1: Explain ACID Properties with banking example.\nQ2: Compare B-Tree vs B+ Tree for database indices.',
    ),
    StudyMaterialModel(
      id: 104,
      title: 'CS201 Data Structures Lab Record - All 12 Experiments with C++ Code',
      description: 'Complete lab record containing verified code for Linked Lists, Stacks, Queues, Binary Search Trees, AVL rotations, and Dijkstra\'s Algorithm.',
      subject: mockSubjects[3],
      category: mockCategories[2],
      semester: 3,
      fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-dsa-lab-manual.pdf',
      fileSize: '4.1 MB',
      fileType: 'PDF',
      pageCount: 54,
      downloads: 2040,
      views: 5620,
      uploader: UserModel(id: 3, name: 'Priya Sundaram', email: 'priya.student@campus.edu', role: 'STUDENT'),
      isVerified: true,
      createdAt: DateTime.now().subtract(const Duration(days: 25)),
      contentPreview: 'LAB EXPERIMENT 1: SINGLY LINKED LIST\n#include <iostream>\nstruct Node { int val; Node* next; };',
    ),
  ];

  static Future<List<StudyMaterialModel>> getMaterials({
    String? query,
    int? subjectId,
    int? categoryId,
    int? semester,
  }) async {
    try {
      final uri = Uri.parse('$baseUrl/materials').replace(queryParameters: {
        if (query != null && query.isNotEmpty) 'query': query,
        if (subjectId != null) 'subjectId': subjectId.toString(),
        if (categoryId != null) 'categoryId': categoryId.toString(),
        if (semester != null) 'semester': semester.toString(),
      });

      final response = await http.get(uri).timeout(const Duration(seconds: 2));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        return data.map((e) => StudyMaterialModel.fromJson(e)).toList();
      }
    } catch (_) {}

    // Mock Fallback
    return mockMaterials.where((item) {
      if (subjectId != null && item.subject.id != subjectId) return false;
      if (categoryId != null && item.category.id != categoryId) return false;
      if (semester != null && item.semester != semester) return false;
      if (query != null && query.isNotEmpty) {
        final q = query.toLowerCase();
        final matchesTitle = item.title.toLowerCase().contains(q);
        final matchesDesc = item.description.toLowerCase().contains(q);
        final matchesSubject = item.subject.name.toLowerCase().contains(q) || item.subject.code.toLowerCase().contains(q);
        if (!matchesTitle && !matchesDesc && !matchesSubject) return false;
      }
      return true;
    }).toList();
  }

  static Future<List<SubjectModel>> getSubjects() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/subjects')).timeout(const Duration(seconds: 2));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        return data.map((e) => SubjectModel.fromJson(e)).toList();
      }
    } catch (_) {}
    return mockSubjects;
  }

  static Future<List<CategoryModel>> getCategories() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/categories')).timeout(const Duration(seconds: 2));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        return data.map((e) => CategoryModel.fromJson(e)).toList();
      }
    } catch (_) {}
    return mockCategories;
  }

  static Future<StudyMaterialModel> createMaterial({
    required String title,
    required String description,
    required int subjectId,
    required int categoryId,
    required int semester,
    required UserModel currentUser,
    required String token,
  }) async {
    final sub = mockSubjects.firstWhere((s) => s.id == subjectId, orElse: () => mockSubjects[0]);
    final cat = mockCategories.firstWhere((c) => c.id == categoryId, orElse: () => mockCategories[0]);

    final newDoc = StudyMaterialModel(
      id: DateTime.now().millisecondsSinceEpoch,
      title: title,
      description: description,
      subject: sub,
      category: cat,
      semester: semester,
      fileUrl: 'https://raw.githubusercontent.com/campus/assets/sample-notes.pdf',
      fileSize: '3.2 MB',
      fileType: 'PDF',
      pageCount: 22,
      downloads: 0,
      views: 1,
      uploader: currentUser,
      isVerified: currentUser.role == 'FACULTY' || currentUser.role == 'ADMIN',
      createdAt: DateTime.now(),
      contentPreview: 'ACADEMIC COURSEWORK: $title\nAuthor: ${currentUser.name} (${currentUser.role})\nVerified academic notes.',
    );

    mockMaterials.insert(0, newDoc);
    return newDoc;
  }

  static Future<void> deleteMaterial(int id, String token) async {
    mockMaterials.removeWhere((m) => m.id == id);
  }
}
