class SubjectModel {
  final int id;
  final String code;
  final String name;
  final String department;
  final int semester;

  SubjectModel({
    required this.id,
    required this.code,
    required this.name,
    required this.department,
    required this.semester,
  });

  factory SubjectModel.fromJson(Map<String, dynamic> json) {
    return SubjectModel(
      id: json['id'] ?? 0,
      code: json['code'] ?? '',
      name: json['name'] ?? '',
      department: json['department'] ?? '',
      semester: json['semester'] ?? 1,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'code': code,
      'name': name,
      'department': department,
      'semester': semester,
    };
  }
}
