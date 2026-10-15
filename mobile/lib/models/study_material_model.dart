import 'subject_model.dart';
import 'category_model.dart';
import 'user_model.dart';

class StudyMaterialModel {
  final int id;
  final String title;
  final String description;
  final SubjectModel subject;
  final CategoryModel category;
  final int semester;
  final String fileUrl;
  final String fileSize;
  final String fileType;
  final int pageCount;
  int downloads;
  int views;
  final UserModel uploader;
  final bool isVerified;
  final DateTime createdAt;
  final String? contentPreview;

  StudyMaterialModel({
    required this.id,
    required this.title,
    required this.description,
    required this.subject,
    required this.category,
    required this.semester,
    required this.fileUrl,
    required this.fileSize,
    required this.fileType,
    required this.pageCount,
    required this.downloads,
    required this.views,
    required this.uploader,
    required this.isVerified,
    required this.createdAt,
    this.contentPreview,
  });

  factory StudyMaterialModel.fromJson(Map<String, dynamic> json) {
    return StudyMaterialModel(
      id: json['id'] ?? 0,
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      subject: SubjectModel.fromJson(json['subject'] ?? {}),
      category: CategoryModel.fromJson(json['category'] ?? {}),
      semester: json['semester'] ?? 1,
      fileUrl: json['fileUrl'] ?? '',
      fileSize: json['fileSize'] ?? '2.5 MB',
      fileType: json['fileType'] ?? 'PDF',
      pageCount: json['pageCount'] ?? 10,
      downloads: json['downloads'] ?? 0,
      views: json['views'] ?? 0,
      uploader: UserModel.fromJson(json['uploader'] ?? {}),
      isVerified: json['isVerified'] ?? false,
      createdAt: json['createdAt'] != null
          ? DateTime.tryParse(json['createdAt']) ?? DateTime.now()
          : DateTime.now(),
      contentPreview: json['contentPreview'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'subject': subject.toJson(),
      'category': category.toJson(),
      'semester': semester,
      'fileUrl': fileUrl,
      'fileSize': fileSize,
      'fileType': fileType,
      'pageCount': pageCount,
      'downloads': downloads,
      'views': views,
      'uploader': uploader.toJson(),
      'isVerified': isVerified,
      'createdAt': createdAt.toIso8601String(),
      'contentPreview': contentPreview,
    };
  }
}
