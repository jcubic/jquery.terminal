import os
import re

def replace_in_file(file_path, replacements):
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}, not found.")
        return
    
    with open(file_path, 'r', encoding='utf-8', newline='') as f:
        content = f.read()
    
    modified = False
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            modified = True
            print(f"Fixed {file_path}: {old[:20]}... -> {new[:20]}...")
    
    if modified:
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
    else:
        print(f"No match found in {file_path} for simple replacements")

def fix_lint(file_path):
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}, not found.")
        return
    
    with open(file_path, 'r', encoding='utf-8', newline='') as f:
        content = f.read()
    
    # regex to find function ( and replace with function(
    # but avoid replacing in comments or strings if possible
    # however, we only care about violations. 
    # ESLint rule space-before-function-paren "never"
    new_content = re.sub(r'function\s+\(', r'function(', content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(new_content)
        print(f"Fixed lint errors in {file_path}")
    else:
        print(f"No lint errors found in {file_path}")

# CHANGELOG.md duplicates and grammar
# Special handling for CHANGELOG.md because of duplicates
if os.path.exists('CHANGELOG.md'):
    with open('CHANGELOG.md', 'r', encoding='utf-8', newline='') as f:
        lines = f.readlines()
    
    new_lines = []
    seen_animation = False
    for line in lines:
        # fix line 3
        if 'echo command now echo a function' in line:
            line = line.replace('echo command now echo a function', 'echo command now echoes a function')
            line = line.replace('and they will appear', 'and it will appear')
        
        # fix line 5/7 and duplicates
        if 'animation callback now have terminal as context' in line or 'animation now have terminal as context' in line:
            if not seen_animation:
                line = '* terminal::animation callback now has terminal as context [#1020](https://github.com/jcubic/jquery.terminal/issues/1020)\n'
                seen_animation = True
            else:
                continue # Skip duplicate
        
        new_lines.append(line)
    
    with open('CHANGELOG.md', 'w', encoding='utf-8', newline='') as f:
        f.writelines(new_lines)
    print("Fixed CHANGELOG.md")

# Demo HTML typo
replace_in_file('examples/multiple-interpreters-demo.html', [
    ('multiply terminals demo', 'multiple terminals demo')
])

# Lint fixes for JS files
for js_file in ['js/xml_formatting.js', 'js/unix_formatting.js', 'js/less.js']:
    fix_lint(js_file)

print("All tasks completed.")
