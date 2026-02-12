import os

files = [
    'js/unix_formatting.js',
    'js/xml_formatting.js',
    'js/less.js'
]

for file_path in files:
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}, not found.")
        continue
    
    with open(file_path, 'r', encoding='utf-8', newline='') as f:
        lines = f.readlines()
    
    modified = False
    for i in range(min(20, len(lines))):
        if 'This is example of' in lines[i]:
            lines[i] = lines[i].replace('This is example of', 'This is an example of')
            modified = True
            print(f"Fixed {file_path} at line {i+1}")
            break
    
    if modified:
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.writelines(lines)
    else:
        print(f"No match found in {file_path}")
