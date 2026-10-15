import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/app_colors.dart';
import '../providers/auth_provider.dart';
import '../providers/material_provider.dart';
import '../widgets/material_card.dart';

class HomeScreen extends StatelessWidget {
  final VoidCallback onNavigateToUpload;

  const HomeScreen({Key? key, required this.onNavigateToUpload}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final matProvider = Provider.of<MaterialProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppColors.navy900,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.school, color: Colors.white, size: 18),
            ),
            const SizedBox(width: 8),
            const Text('CampusPortal'),
          ],
        ),
        actions: [
          // Role indicator & quick switcher
          PopupMenuButton<String>(
            tooltip: 'Switch Demo Role (Viva RBAC)',
            initialValue: auth.user.role,
            onSelected: (role) => auth.switchRole(role),
            itemBuilder: (context) => [
              const PopupMenuItem(value: 'STUDENT', child: Text('Role: Student')),
              const PopupMenuItem(value: 'FACULTY', child: Text('Role: Faculty')),
              const PopupMenuItem(value: 'ADMIN', child: Text('Role: Admin')),
            ],
            child: Container(
              margin: const EdgeInsets.only(right: 14),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.slate100,
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AppColors.slate200),
              ),
              child: Row(
                children: [
                  Text(
                    auth.user.role,
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.blue700),
                  ),
                  const Icon(Icons.arrow_drop_down, size: 16, color: AppColors.slate500),
                ],
              ),
            ),
          )
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () => matProvider.loadData(),
        child: CustomScrollView(
          slivers: [
            // Search Bar Header
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                child: TextField(
                  decoration: InputDecoration(
                    hintText: 'Search notes, PYQs, course codes...',
                    prefixIcon: const Icon(Icons.search, size: 20, color: AppColors.slate500),
                    suffixIcon: matProvider.searchQuery.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, size: 18),
                            onPressed: () => matProvider.setSearchQuery(''),
                          )
                        : null,
                  ),
                  onChanged: (val) => matProvider.setSearchQuery(val),
                ),
              ),
            ),

            // Semester Chips Row
            SliverToBoxAdapter(
              child: SizedBox(
                height: 44,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: [
                    _buildSemChip('All Semesters', matProvider.selectedSemester == null, () {
                      matProvider.setSemester(null);
                    }),
                    for (int s = 1; s <= 8; s++)
                      _buildSemChip('Sem $s', matProvider.selectedSemester == s, () {
                        matProvider.setSemester(matProvider.selectedSemester == s ? null : s);
                      }),
                  ],
                ),
              ),
            ),

            // Category Filter Pills
            SliverToBoxAdapter(
              child: SizedBox(
                height: 42,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: [
                    _buildCatPill('All Types', matProvider.selectedCategoryId == null, () {
                      matProvider.setCategory(null);
                    }),
                    for (final cat in matProvider.categories)
                      _buildCatPill(cat.name, matProvider.selectedCategoryId == cat.id, () {
                        matProvider.setCategory(matProvider.selectedCategoryId == cat.id ? null : cat.id);
                      }),
                  ],
                ),
              ),
            ),

            // Results count banner
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Text(
                  'Showing ${matProvider.materials.length} resources',
                  style: const TextStyle(fontSize: 12, color: AppColors.slate500, fontWeight: FontWeight.w600),
                ),
              ),
            ),

            // Materials List
            if (matProvider.isLoading)
              const SliverFillRemaining(
                child: Center(child: CircularProgressIndicator()),
              )
            else if (matProvider.materials.isEmpty)
              SliverFillRemaining(
                hasScrollBody: false,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.search_off_rounded, size: 48, color: AppColors.slate300),
                      const SizedBox(height: 12),
                      const Text(
                        'No matching materials found',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppColors.navy900),
                      ),
                      const SizedBox(height: 6),
                      const Text('Try adjusting your search query or semester filters.', style: TextStyle(color: AppColors.slate500, fontSize: 12)),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: onNavigateToUpload,
                        style: ElevatedButton.styleFrom(backgroundColor: AppColors.blue600),
                        child: const Text('Upload this Resource', style: TextStyle(color: Colors.white)),
                      ),
                    ],
                  ),
                ),
              )
            else
              SliverPadding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final item = matProvider.materials[index];
                      return MaterialCardWidget(
                        material: item,
                        onDownload: () {
                          matProvider.incrementDownload(item.id);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Downloading ${item.title}...')),
                          );
                        },
                      );
                    },
                    childCount: matProvider.materials.length,
                  ),
                ),
              ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: onNavigateToUpload,
        backgroundColor: AppColors.blue600,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.upload_file),
        label: const Text('Upload Note', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
    );
  }

  Widget _buildSemChip(String label, bool isSelected, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(right: 6),
      child: ChoiceChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (_) => onTap(),
        selectedColor: AppColors.navy900,
        labelStyle: TextStyle(
          color: isSelected ? Colors.white : AppColors.navy700,
          fontSize: 11,
          fontWeight: FontWeight.w600,
        ),
        backgroundColor: AppColors.slate100,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: isSelected ? AppColors.navy900 : AppColors.slate200),
        ),
      ),
    );
  }

  Widget _buildCatPill(String label, bool isSelected, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(right: 6),
      child: ChoiceChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (_) => onTap(),
        selectedColor: AppColors.blue50,
        labelStyle: TextStyle(
          color: isSelected ? AppColors.blue700 : AppColors.slate500,
          fontSize: 11,
          fontWeight: FontWeight.w600,
        ),
        backgroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
          side: BorderSide(color: isSelected ? AppColors.blue600 : AppColors.slate200),
        ),
      ),
    );
  }
}
