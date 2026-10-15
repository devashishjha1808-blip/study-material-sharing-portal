import 'package:flutter/foundation.dart';
import '../models/study_material_model.dart';
import '../models/subject_model.dart';
import '../models/category_model.dart';
import '../models/user_model.dart';
import '../services/api_service.dart';

class MaterialProvider with ChangeNotifier {
  List<StudyMaterialModel> _materials = [];
  List<SubjectModel> _subjects = [];
  List<CategoryModel> _categories = [];
  bool _isLoading = true;

  String _searchQuery = '';
  int? _selectedSemester;
  int? _selectedCategoryId;
  int? _selectedSubjectId;
  String _sortBy = 'recent'; // 'recent', 'downloads', 'views'

  List<StudyMaterialModel> get materials => _materials;
  List<SubjectModel> get subjects => _subjects;
  List<CategoryModel> get categories => _categories;
  bool get isLoading => _isLoading;

  String get searchQuery => _searchQuery;
  int? get selectedSemester => _selectedSemester;
  int? get selectedCategoryId => _selectedCategoryId;
  int? get selectedSubjectId => _selectedSubjectId;
  String get sortBy => _sortBy;

  MaterialProvider() {
    loadData();
  }

  Future<void> loadData() async {
    _isLoading = true;
    notifyListeners();

    try {
      final results = await Future.wait([
        ApiService.getMaterials(
          query: _searchQuery,
          semester: _selectedSemester,
          categoryId: _selectedCategoryId,
          subjectId: _selectedSubjectId,
        ),
        ApiService.getSubjects(),
        ApiService.getCategories(),
      ]);

      _materials = results[0] as List<StudyMaterialModel>;
      _subjects = results[1] as List<SubjectModel>;
      _categories = results[2] as List<CategoryModel>;

      _applySort();
    } catch (e) {
      debugPrint('Error loading materials: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void _applySort() {
    if (_sortBy == 'downloads') {
      _materials.sort((a, b) => b.downloads.compareTo(a.downloads));
    } else if (_sortBy == 'views') {
      _materials.sort((a, b) => b.views.compareTo(a.views));
    } else {
      _materials.sort((a, b) => b.createdAt.compareTo(a.createdAt));
    }
  }

  void setSearchQuery(String q) {
    _searchQuery = q;
    loadData();
  }

  void setSemester(int? sem) {
    _selectedSemester = sem;
    loadData();
  }

  void setCategory(int? catId) {
    _selectedCategoryId = catId;
    loadData();
  }

  void setSubject(int? subId) {
    _selectedSubjectId = subId;
    loadData();
  }

  void setSortBy(String s) {
    _sortBy = s;
    _applySort();
    notifyListeners();
  }

  Future<void> addMaterial({
    required String title,
    required String description,
    required int subjectId,
    required int categoryId,
    required int semester,
    required UserModel currentUser,
    required String token,
  }) async {
    final created = await ApiService.createMaterial(
      title: title,
      description: description,
      subjectId: subjectId,
      categoryId: categoryId,
      semester: semester,
      currentUser: currentUser,
      token: token,
    );

    _materials.insert(0, created);
    notifyListeners();
  }

  Future<void> deleteMaterial(int id, String token) async {
    await ApiService.deleteMaterial(id, token);
    _materials.removeWhere((m) => m.id == id);
    notifyListeners();
  }

  void incrementDownload(int id) {
    final idx = _materials.indexWhere((m) => m.id == id);
    if (idx != -1) {
      _materials[idx].downloads += 1;
      notifyListeners();
    }
  }
}
