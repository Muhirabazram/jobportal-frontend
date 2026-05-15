import os
import re
directory = r"d:\downloadd\Tugas Kampus\Semester 4\Full stack (pak Rena)\tes buat dipake Antigravity AI\Frontendd\src\halaman"
files_to_process = ["DashboardHRD.jsx"]
for filename in files_to_process:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Inject isSidebarOpen state
    if "const [isSidebarOpen, setIsSidebarOpen]" not in content:
        content = re.sub(r'(const navigate = useNavigate\(\);?)', 
                         r'\1\n  const [isSidebarOpen, setIsSidebarOpen] = useState(false);', 
                         content, count=1)
    
    # 2. Inject hamburger button into Navbar
    nav_pattern = r'(<nav\s+className="[^"]*-navbar[^"]*">)'
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
    
    if "mobile-menu-btn" not in content:
        content = re.sub(nav_pattern, r'\1' + hamburger_btn, content)
    
    # 3. Add dynamic class to sidebar
    aside_pattern = r'(<aside\s+className="([^"]*-sidebar[^"]*)")'
    if "isSidebarOpen ? " not in content:
        content = re.sub(aside_pattern, r'<aside className={`\2 ${isSidebarOpen ? "sidebar-open" : ""}`}', content)
        
    # 4. Add overlay
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
    
    print(f"Processed {filename}")