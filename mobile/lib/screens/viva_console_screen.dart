import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/app_colors.dart';
import '../providers/auth_provider.dart';
import '../services/firebase_service.dart';

class VivaConsoleScreen extends StatefulWidget {
  const VivaConsoleScreen({Key? key}) : super(key: key);

  @override
  State<VivaConsoleScreen> createState() => _VivaConsoleScreenState();
}

class _VivaConsoleScreenState extends State<VivaConsoleScreen> {
  String firebaseStatus = 'Ready to test';
  bool isTestingFirebase = false;

  void testFirebase() async {
    setState(() => isTestingFirebase = true);
    final res = await FirebaseService.signInWithFirebase('student@campus.edu', 'Password123!');
    setState(() {
      isTestingFirebase = false;
      firebaseStatus = 'Firebase Auth UID: ${res['uid']}\nStatus: ${res['status']}';
    });
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);

    final experiments = [
      {'num': 11, 'title': 'Flutter + Dart Basics', 'status': 'Ready', 'details': 'Scaffold, CustomScrollView, MaterialCard widgets'},
      {'num': 12, 'title': 'Flutter State Management', 'status': 'Ready', 'details': 'Provider with AuthProvider & MaterialProvider'},
      {'num': 13, 'title': 'Flutter + REST Integration', 'status': 'Ready', 'details': 'ApiService HTTP client with JSON mapping'},
      {'num': 14, 'title': 'Firebase Auth + Firestore', 'status': 'Ready', 'details': 'FirebaseService with Auth & Metadata sync'},
      {'num': 15, 'title': 'Final Integrated Project', 'status': 'Ready', 'details': 'End-to-end full stack React + Kotlin + Flutter'},
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Academic Viva & Mobile Experiments'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // JWT Inspection
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Mobile JWT Session Token', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.navy900)),
                    const SizedBox(height: 6),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(color: AppColors.navy900, borderRadius: BorderRadius.circular(6)),
                      child: Text(
                        auth.token,
                        style: const TextStyle(fontFamily: 'monospace', fontSize: 10, color: Color(0xFF38BDF8)),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text('Active User: ${auth.user.name} (${auth.user.role})', style: const TextStyle(fontSize: 12, color: AppColors.slate500)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 14),

            // Experiment 14: Firebase Demo Box
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Experiment 14: Firebase Auth & Firestore', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.navy900)),
                    const SizedBox(height: 6),
                    const Text('Demonstrates Firebase Authentication and Firestore synchronization for mobile clients.', style: TextStyle(fontSize: 12, color: AppColors.slate500)),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: isTestingFirebase ? null : testFirebase,
                      style: ElevatedButton.styleFrom(backgroundColor: AppColors.blue600),
                      child: Text(isTestingFirebase ? 'Testing...' : 'Test Firebase Sign-In Flow', style: const TextStyle(color: Colors.white, fontSize: 12)),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(color: AppColors.slate100, borderRadius: BorderRadius.circular(6)),
                      child: Text(firebaseStatus, style: const TextStyle(fontSize: 11, fontFamily: 'monospace')),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Experiments 11-15 Checklist
            const Text('Mobile Prescribed Experiments (11-15)', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.navy900)),
            const SizedBox(height: 8),

            for (final exp in experiments)
              Card(
                margin: const EdgeInsets.only(bottom: 8),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: AppColors.blue50,
                    child: Text('${exp['num']}', style: const TextStyle(color: AppColors.blue700, fontWeight: FontWeight.w700, fontSize: 12)),
                  ),
                  title: Text(exp['title'] as String, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                  subtitle: Text(exp['details'] as String, style: const TextStyle(fontSize: 11, color: AppColors.slate500)),
                  trailing: const Icon(Icons.check_circle, color: AppColors.verifiedEmerald, size: 18),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
