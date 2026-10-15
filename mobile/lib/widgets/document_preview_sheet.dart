import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../models/study_material_model.dart';

class DocumentPreviewSheet extends StatefulWidget {
  final StudyMaterialModel material;

  const DocumentPreviewSheet({Key? key, required this.material}) : super(key: key);

  static void show(BuildContext context, StudyMaterialModel material) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => DocumentPreviewSheet(material: material),
    );
  }

  @override
  State<DocumentPreviewSheet> createState() => _DocumentPreviewSheetState();
}

class _DocumentPreviewSheetState extends State<DocumentPreviewSheet> {
  int currentPage = 1;

  @override
  Widget build(BuildContext context) {
    final m = widget.material;

    return Container(
      height: MediaQuery.of(context).size.height * 0.88,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          // Drag handle
          Container(
            margin: const EdgeInsets.symmetric(vertical: 10),
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: AppColors.slate300,
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          // Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppColors.navy900,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              m.subject.code,
                              style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w700),
                            ),
                          ),
                          const SizedBox(width: 6),
                          Text('Semester ${m.semester}', style: const TextStyle(fontSize: 11, color: AppColors.slate500)),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        m.title,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.navy900),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: AppColors.slate500),
                  onPressed: () => Navigator.pop(context),
                )
              ],
            ),
          ),
          const Divider(height: 1, color: AppColors.slate200),

          // Toolbar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            color: AppColors.slate50,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Page $currentPage of ${m.pageCount}',
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.navy700),
                ),
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.chevron_left, size: 20),
                      onPressed: currentPage > 1 ? () => setState(() => currentPage--) : null,
                    ),
                    IconButton(
                      icon: const Icon(Icons.chevron_right, size: 20),
                      onPressed: currentPage < m.pageCount ? () => setState(() => currentPage++) : null,
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Document Sheet Body
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: AppColors.slate300),
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: const [
                    BoxShadow(color: Color(0x0F000000), blurRadius: 8, offset: Offset(0, 4)),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Watermark
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '${m.subject.name} (${m.subject.code})',
                          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.slate500),
                        ),
                        const Text(
                          'VERIFIED COURSE NOTES',
                          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.blue600),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    const Divider(color: AppColors.navy900, thickness: 1.5),
                    const SizedBox(height: 12),

                    Text(
                      m.title,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.navy900),
                    ),
                    const SizedBox(height: 10),

                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColors.blue50,
                        border: const Border(left: BorderSide(color: AppColors.blue600, width: 3)),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        m.description,
                        style: const TextStyle(fontSize: 12, color: AppColors.navy800, fontStyle: FontStyle.italic),
                      ),
                    ),
                    const SizedBox(height: 16),

                    Text(
                      m.contentPreview ??
                          '1. CORE ACADEMIC TOPICS\nDetailed explanations, step-by-step algorithms, solved derivations, and previous university examination questions.\n\n2. COMPLEXITY & EQUATIONS\nO(V + E) graph traversal with recursive proofs and boundary state tests.',
                      style: const TextStyle(fontSize: 12.5, height: 1.6, color: AppColors.navy800),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Download CTA bar
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: SizedBox(
                width: double.infinity,
                height: 46,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Downloading ${m.title} (${m.fileSize})...')),
                    );
                  },
                  icon: const Icon(Icons.download_rounded, color: Colors.white),
                  label: Text(
                    'Download ${m.fileType} (${m.fileSize})',
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.blue600,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
