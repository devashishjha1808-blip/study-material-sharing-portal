import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/app_colors.dart';
import '../providers/auth_provider.dart';
import '../providers/material_provider.dart';

class UploadScreen extends StatefulWidget {
  final VoidCallback onSuccess;

  const UploadScreen({Key? key, required this.onSuccess}) : super(key: key);

  @override
  State<UploadScreen> createState() => _UploadScreenState();
}

class _UploadScreenState extends State<UploadScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descController = TextEditingController();

  int? _selectedSubjectId;
  int? _selectedCategoryId;
  int _selectedSemester = 5;
  bool _isSubmitting = false;

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final matProvider = Provider.of<MaterialProvider>(context);

    if (_selectedSubjectId == null && matProvider.subjects.isNotEmpty) {
      _selectedSubjectId = matProvider.subjects[0].id;
    }
    if (_selectedCategoryId == null && matProvider.categories.isNotEmpty) {
      _selectedCategoryId = matProvider.categories[0].id;
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Upload Study Material'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Author banner
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                decoration: BoxDecoration(
                  color: AppColors.blue50,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.blue100),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Uploader: ${auth.user.name}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.blue700)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(color: AppColors.blue100, borderRadius: BorderRadius.circular(4)),
                      child: Text(auth.user.role, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.blue700)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Title Field
              const Text('Resource Title *', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _titleController,
                decoration: const InputDecoration(hintText: 'e.g. CS301 Unit 2 - Normalization & BCNF Solved Numerical Problems'),
                validator: (val) {
                  if (val == null || val.trim().isEmpty) return 'Title is required';
                  if (val.trim().length < 5) return 'Title must be at least 5 characters long';
                  return null;
                },
              ),
              const SizedBox(height: 14),

              // Subject Dropdown
              const Text('Course Subject *', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
              const SizedBox(height: 6),
              DropdownButtonFormField<int>(
                value: _selectedSubjectId,
                items: matProvider.subjects.map((sub) {
                  return DropdownMenuItem(value: sub.id, child: Text('[${sub.code}] ${sub.name}', overflow: TextOverflow.ellipsis));
                }).toList(),
                onChanged: (val) => setState(() => _selectedSubjectId = val),
              ),
              const SizedBox(height: 14),

              // Category & Semester Row
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Category *', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                        const SizedBox(height: 6),
                        DropdownButtonFormField<int>(
                          value: _selectedCategoryId,
                          items: matProvider.categories.map((cat) {
                            return DropdownMenuItem(value: cat.id, child: Text(cat.name));
                          }).toList>,
                          onChanged: (val) => setState(() => _selectedCategoryId = val),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Semester *', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                        const SizedBox(height: 6),
                        DropdownButtonFormField<int>(
                          value: _selectedSemester,
                          items: [1, 2, 3, 4, 5, 6, 7, 8].map((s) {
                            return DropdownMenuItem(value: s, child: Text('Semester $s'));
                          }).toList(),
                          onChanged: (val) => setState(() => _selectedSemester = val ?? 1),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // Description
              const Text('Description / Key Topics Covered', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _descController,
                maxLines: 3,
                decoration: const InputDecoration(hintText: 'Summarize key units, formulas, question numbers, or professors...'),
              ),
              const SizedBox(height: 16),

              // File attachment container
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.slate100,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.slate300),
                ),
                child: const Column(
                  children: [
                    Icon(Icons.picture_as_pdf, size: 32, color: AppColors.blue600),
                    SizedBox(height: 6),
                    Text('Attached Document: Lecture_Notes.pdf', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                    Text('Format: PDF • Size: 2.8 MB • Pages: 26', style: TextStyle(fontSize: 11, color: AppColors.slate500)),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Submit Button
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  onPressed: _isSubmitting
                      ? null
                      : () async {
                          if (!_formKey.currentState!.validate()) return;
                          setState(() => _isSubmitting = true);

                          try {
                            await matProvider.addMaterial(
                              title: _titleController.text.trim(),
                              description: _descController.text.trim().isEmpty
                                  ? 'No additional description provided.'
                                  : _descController.text.trim(),
                              subjectId: _selectedSubjectId!,
                              categoryId: _selectedCategoryId!,
                              semester: _selectedSemester,
                              currentUser: auth.user,
                              token: auth.token,
                            );

                            if (mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Study material successfully published!')),
                              );
                              widget.onSuccess();
                            }
                          } catch (e) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Error: $e')),
                            );
                          } finally {
                            if (mounted) setState(() => _isSubmitting = false);
                          }
                        },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.blue600,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  child: Text(
                    _isSubmitting ? 'Publishing...' : 'Publish to Academic Catalog',
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
