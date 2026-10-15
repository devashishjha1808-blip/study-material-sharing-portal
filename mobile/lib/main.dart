import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'constants/app_colors.dart';
import 'constants/app_theme.dart';
import 'providers/auth_provider.dart';
import 'providers/material_provider.dart';
import 'screens/home_screen.dart';
import 'screens/subjects_screen.dart';
import 'screens/my_uploads_screen.dart';
import 'screens/upload_screen.dart';
import 'screens/viva_console_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CampusPortalApp());
}

class CampusPortalApp extends StatelessWidget {
  const CampusPortalApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => MaterialProvider()),
      ],
      child: MaterialApp(
        title: 'CampusPortal - Study Material Portal',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        home: const MainNavigationShell(),
      ),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({Key? key}) : super(key: key);

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final screens = [
      HomeScreen(
        onNavigateToUpload: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => UploadScreen(onSuccess: () => Navigator.pop(context)),
            ),
          );
        },
      ),
      SubjectsScreen(
        onSelectSubject: (subId) {
          final matProvider = Provider.of<MaterialProvider>(context, listen: false);
          matProvider.setSubject(subId);
          setState(() => _currentIndex = 0);
        },
      ),
      const MyUploadsScreen(),
      const VivaConsoleScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.white,
        selectedItemColor: AppColors.blue600,
        unselectedItemColor: AppColors.slate500,
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 11),
        unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w500, fontSize: 11),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.menu_book_outlined),
            activeIcon: Icon(Icons.menu_book),
            label: 'Browse',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school_outlined),
            activeIcon: Icon(Icons.school),
            label: 'Subjects',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.cloud_upload_outlined),
            activeIcon: Icon(Icons.cloud_upload),
            label: 'My Uploads',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.assessment_outlined),
            activeIcon: Icon(Icons.assessment),
            label: 'Viva & Exps',
          ),
        ],
      ),
    );
  }
}
