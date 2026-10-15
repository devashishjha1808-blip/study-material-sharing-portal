import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/app_colors.dart';
import '../providers/material_provider.dart';

class SubjectsScreen extends StatelessWidget {
  final Function(int subjectId) onSelectSubject;

  const SubjectsScreen({Key? key, required this.onSelectSubject}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final matProvider = Provider.of<MaterialProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Academic Subjects'),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: matProvider.subjects.length,
        itemBuilder: (context, index) {
          final sub = matProvider.subjects[index];
          final count = matProvider.materials.where((m) => m.subject.id == sub.id).length;

          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: InkWell(
              borderRadius: BorderRadius.circular(12),
              onTap: () => onSelectSubject(sub.id),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppColors.navy900,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            sub.code,
                            style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppColors.slate100,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            'Semester ${sub.semester}',
                            style: const TextStyle(fontSize: 11, color: AppColors.navy700, fontWeight: FontWeight.w600),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Text(
                      sub.name,
                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.navy900),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      sub.department,
                      style: const TextStyle(fontSize: 12, color: AppColors.slate500),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '$count materials available',
                          style: const TextStyle(fontSize: 12, color: AppColors.blue600, fontWeight: FontWeight.w600),
                        ),
                        const Icon(Icons.arrow_forward_ios, size: 12, color: AppColors.slate500),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
