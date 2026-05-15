import os
import re
directory = r"d:\downloadd\Tugas Kampus\Semester 4\Full stack (pak Rena)\tes buat dipake Antigravity AI\Frontendd\src\halaman"
files_to_process = [
    "DashboardPencari.jsx", "LowonganSaya.jsx", "LowonganDisimpan.jsx", 
    "LamaranTerkirim.jsx", "MenungguReview.jsx", "Wawancara.jsx", 
    "LamaranDitolak.jsx", "PengaturanPencari.jsx", "DashboardHRD.jsx", 
    "KelolaLowongan.jsx", "DataPelamar.jsx", "Pengaturan.jsx", "BukaLowongan.jsx"
]
for filename in files_to_process:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    comp_name = filename.replace(".jsx", "")
    # BerandaHRD.jsx is actually DashboardHRD.jsx, DataPelamar is DataPelamar, etc.
    
    # We want to make sure the main component has `isSidebarOpen`
    # Match: export default function CompName() {
    main_func_pattern = re.compile(rf'(export default function\s+{comp_name}\s*\([^\)]*\)\s*{{)')
    
    def replacer(match):
        block = match.group(1)
        return block + '\n  const [isSidebarOpen, setIsSidebarOpen] = useState(false);'
    
    # Check if we already injected it in the main component.
    # We can just remove ALL 'const [isSidebarOpen, setIsSidebarOpen] = useState(false);' globally first,
    # and then re-inject it safely in the main function.
    content = content.replace("const [isSidebarOpen, setIsSidebarOpen] = useState(false);", "")
    
    # Re-inject
    content = main_func_pattern.sub(replacer, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Fixed state in {filename}")
