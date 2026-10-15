import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/app_colors.dart';
import '../providers/auth_provider.dart';
import '../providers/material_provider.dart';
import '../widgets/document_preview_sheet.dart';

class MyUploadsScreen extends StatelessWidget {
  const MyUploadsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final matProvider = Provider.of<MaterialProvider>(context);

    final myItems = auth.isAdmin
        ? matProvider.materials
        : matProvider.materials.where((m) => m.uploader.email.toLowerCase() == auth.user.email.toLowerCase()).toList();

    return Scaffold(
      appBar: AppBar(
        title: Text(auth.isAdmin ? 'Admin Moderation' : 'My Uploaded Notes'),
      ),
      body: myItems.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.folder_open, size: 56, color: AppColors.slate300),
                  const SizedBox(height: 12),
                  const Text(
                    'No uploaded materials found',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppColors.navy900),
                  ),
                  const SizedBox(height: 6),
                  Text('Materials uploaded by ${auth.user.name} will appear here.', style: const TextStyle(color: AppColors.slate500, fontSize: 12)),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: myItems.length,
              itemBuilder: (context, index) {
                final item = myItems[index];

                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: Padding(
                    padding: const EdgeInsets.all(14),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppColors.navy900,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                item.subject.code,
                                style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w700),
                              ),
                            ),
                            Text('${item.downloads} downloads', style: const TextStyle(fontSize: 11, color: AppColors.blue600, fontWeight: FontWeight.w600)),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          item.title,
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.navy900),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${item.fileType} • ${item.fileSize} • Semester ${item.semester}',
                          style: const TextStyle(fontSize: 11, color: AppColors.slate500),
                        ),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            TextButton(
                              onPressed: () => DocumentPreviewSheet.show(context, item),
                              child: const Text('View', style: TextStyle(fontSize: 12)),
                            ),
                            TextButton(
                              onPressed: () async {
                                final confirm = await showDialog<bool>(
                                  context: context,
                                  builder: (ctx) => AlertDialog(
                                    title: const Text('Confirm Deletion'),
                                    content: Text('Delete "${item.title}"?'),
                                    actions: [
                                      TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
                                      ElevatedButton(
                                        onPressed: () => Navigator.pop(ctx, true),
                                        style: ElevatedButton.styleFrom(backgroundColor: AppColors.dangerRose),
                                        child: const Text('Delete', style: TextStyle(color: Colors.white)),
                                      ),
                                    ],
                                  ),
                                );
                                if (confirm == true) {
                                  await matProvider.deleteMaterial(item.id, auth.token);
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(content: Text('Material deleted successfully')),
                                  );
                                }
                              },
                              child: const Text('Delete', style: TextStyle(fontSize: 12, color: AppColors.dangerRose)),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}
