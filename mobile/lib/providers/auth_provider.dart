import 'package:flutter/foundation.dart';
import '../models/user_model.dart';

class AuthProvider with ChangeNotifier {
  static final UserModel studentUser = UserModel(
    id: 1,
    name: 'Aarav Sharma',
    email: 'student@campus.edu',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    semester: 5,
  );

  static final UserModel facultyUser = UserModel(
    id: 2,
    name: 'Dr. R. K. Mukherjee',
    email: 'faculty@campus.edu',
    role: 'FACULTY',
    department: 'Computer Science & Engineering',
  );

  static final UserModel adminUser = UserModel(
    id: 3,
    name: 'Academic Administrator',
    email: 'admin@campus.edu',
    role: 'ADMIN',
    department: 'Dean Academic Affairs',
  );

  UserModel _currentUser = studentUser;
  String _jwtToken = 'demo_flutter_jwt_token_student';

  UserModel get user => _currentUser;
  String get token => _jwtToken;
  bool get isFaculty => _currentUser.role == 'FACULTY';
  bool get isAdmin => _currentUser.role == 'ADMIN';

  void switchRole(String role) {
    if (role == 'STUDENT') {
      _currentUser = studentUser;
      _jwtToken = 'demo_flutter_jwt_token_student';
    } else if (role == 'FACULTY') {
      _currentUser = facultyUser;
      _jwtToken = 'demo_flutter_jwt_token_faculty';
    } else if (role == 'ADMIN') {
      _currentUser = adminUser;
      _jwtToken = 'demo_flutter_jwt_token_admin';
    }
    notifyListeners();
  }

  Future<void> login(String email, String password) async {
    if (email.toLowerCase().contains('faculty')) {
      _currentUser = facultyUser;
    } else if (email.toLowerCase().contains('admin')) {
      _currentUser = adminUser;
    } else {
      _currentUser = studentUser;
    }
    notifyListeners();
  }
}
