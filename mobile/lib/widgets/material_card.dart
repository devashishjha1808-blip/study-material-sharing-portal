import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../models/study_material_model.dart';
import 'document_preview_sheet.dart';

class MaterialCardWidget extends StatelessWidget {
  final StudyMaterialModel material;
  final VoidCallback onDownload;

  const MaterialCardWidget({
    Key? key,
    required this.material,
    required this.onDownload,
  }) : super(key: key);

  Color _getCategoryBg() {
    switch (material.category.slug) {
      case 'notes': return AppColors.tagNotesBg;
      case 'pyq': return AppColors.tagPyqBg;
      case 'lab-manual': return AppColors.tagLabBg;
      case 'assignment': return AppColors.tagAssignmentBg;
      default: return AppColors.tagNotesBg;
    }
  }

  Color _getCategoryTextColor() {
    switch (material.category.slug) {
      case 'notes': return AppColors.tagNotesText;
      case 'pyq': return AppColors.tagPyqText;
      case 'lab-manual': return AppColors.tagLabText;
      case 'assignment': return AppColors.tagAssignmentText;
      default: return AppColors.tagNotesText;
    }
  }

  Color _getCategoryBorder() {
    switch (material.category.slug) {
      case 'notes': return AppColors.tagNotesBorder;
      case 'pyq': return AppColors.tagPyqBorder;
      case 'lab-manual': return AppColors.tagLabBorder;
      case 'assignment': return AppColors.tagAssignmentBorder;
      default: return AppColors.tagNotesBorder;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 14),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => DocumentPreviewSheet.show(context, material),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top Badges Row
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: _getCategoryBg(),
                          border: Border.parseBorderRadius(1) != null ? Border.all(color: _getCategoryBorder()) : null,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          material.category.name.toUpperCase(),
                          style: TextStyle(
                            color: _getCategoryTextColor(),
                            fontSize: 10,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 0.4,
                          ),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.slate100,
                          border: Border.all(color: AppColors.slate200),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          'Sem ${material.semester}',
                          style: const TextStyle(
                            color: AppColors.navy700,
                            fontSize: 10,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                    decoration: BoxDecoration(
                      color: AppColors.navy900,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      material.subject.code,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        fontFamily: 'monospace',
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              // Title
              Text(
                material.title,
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: AppColors.navy900,
                  height: 1.3,
                ),
              ),
              const SizedBox(height: 4),

              // Subject name
              Text(
                material.subject.name,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppColors.slate500,
                ),
              ),
              const SizedBox(height: 8),

              // Description
              Text(
                material.description,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 12.5,
                  color: AppColors.navy600,
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 12),

              // File Meta Strip
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.slate50,
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: AppColors.slate100),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.picture_as_pdf, size: 14, color: AppColors.slate500),
                    const SizedBox(width: 4),
                    Text(
                      '${material.fileType} • ${material.fileSize}',
                      style: const TextStyle(fontSize: 11, color: AppColors.slate500),
                    ),
                    const SizedBox(width: 12),
                    Text(
                      '${material.pageCount} pages',
                      style: const TextStyle(fontSize: 11, color: AppColors.slate500),
                    ),
                    const Spacer(),
                    const Icon(Icons.download_rounded, size: 14, color: AppColors.slate500),
                    const SizedBox(width: 2),
                    Text(
                      '${material.downloads}',
                      style: const TextStyle(fontSize: 11, color: AppColors.slate500, fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              const Divider(height: 1, color: AppColors.slate100),
              const SizedBox(height: 10),

              // Footer: Uploader & Actions
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 14,
                        backgroundColor: AppColors.navy700,
                        child: Text(
                          material.uploader.name.isNotEmpty ? material.uploader.name[0] : 'U',
                          style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                material.uploader.name,
                                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.navy900),
                              ),
                              if (material.isVerified) ...[
                                const SizedBox(width: 3),
                                const Icon(Icons.verified, size: 13, color: AppColors.verifiedEmerald),
                              ]
                            ],
                          ),
                          Text(
                            material.uploader.role,
                            style: const TextStyle(fontSize: 10, color: AppColors.slate500),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      OutlinedButton(
                        onPressed: () => DocumentPreviewSheet.show(context, material),
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 0),
                          minimumSize: const Size(60, 30),
                          side: const BorderSide(color: AppColors.slate200),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                        ),
                        child: const Text('Preview', style: TextStyle(fontSize: 11, color: AppColors.navy900)),
                      ),
                      const SizedBox(width: 6),
                      ElevatedButton(
                        onPressed: onDownload,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.blue600,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 0),
                          minimumSize: const Size(60, 30),
                          elevation: 0,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.download_rounded, size: 12),
                            SizedBox(width: 2),
                            Text('Get', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
