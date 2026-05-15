import os
import re

directory = r"d:\downloadd\Tugas Kampus\Semester 4\Full stack (pak Rena)\tes buat dipake Antigravity AI\Frontendd\src\halaman"

files = [
    ("DashboardHRD.jsx", r'(<header\s+className="hrd-navbar">)'),
    ("KelolaLowongan.jsx", r'(<div\s+className="kl-header-section">)'),
    ("DataPelamar.jsx", r'(<div\s+className="dpel-header-section">)'),
    ("BukaLowongan.jsx", r'(<header\s+className="bl-header">)'),
    ("Pengaturan.jsx", r'(<div\s+className="pengaturan-header">)'),
    ("PengaturanPencari.jsx", r'(<div\s+className="pengaturan-header">)')
]

hamburger_btn = '''
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>'''

for filename, pattern in files:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "mobile-menu-btn" not in content:
        # We need to make sure the container becomes flex row if it wasn't
        # Actually mobile-menu-btn is styled in CSS
        content = re.sub(pattern, r'\1' + hamburger_btn, content)
        
        # Also ensure isSidebarOpen state exists
        if "const [isSidebarOpen" not in content:
            comp_name = filename.replace(".jsx", "")
            main_func = re.compile(rf'(export default function\s+{comp_name}\s*\([^\)]*\)\s*{{)')
            def replacer(match):
                return match.group(1) + '\n  const [isSidebarOpen, setIsSidebarOpen] = useState(false);'
            content = main_func.sub(replacer, content)
            
        # Also ensure sidebar has dynamic class
        if "isSidebarOpen ? " not in content:
            aside_pattern = r'(<aside\s+className="([^"]*-sidebar[^"]*)")'
            content = re.sub(aside_pattern, r'<aside className={`\2 ${isSidebarOpen ? "sidebar-open" : ""}`}', content)
            
        # Also ensure overlay
        overlay = '''
        {isSidebarOpen && (
          <div 
            className="sidebar-overlay" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}'''
        if "sidebar-overlay" not in content:
            content = re.sub(r'(<aside)', overlay + r'\n        \1', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filename}")
