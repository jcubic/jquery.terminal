import os

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
            print(f"Fixed {file_path}: {old} -> {new}")
    
    if modified:
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
    else:
        print(f"No match found in {file_path}")

# CONTRIBUTING.md
replace_in_file('CONTRIBUTING.md', [
    ('confirmationfrom', 'confirmation from'),
    ('resovled', 'resolved')
])

# README.md
replace_in_file('README.md', [
    ('In contrast to library that', 'In contrast to a library that'),
    ('ASNSI Art used by this project', '### ANSI Art used by this project')
])

# templates/README.in
replace_in_file('templates/README.in', [
    ('In contrast to library that', 'In contrast to a library that'),
    ('ASNSI Art used by this project', '### ANSI Art used by this project')
])

# CHANGELOG.md
replace_in_file('CHANGELOG.md', [
    ('randerHandler', 'renderHandler'),
    ('github.com/jcubic/jquery.terminal/issues/7690', 'github.com/jcubic/jquery.terminal/issues/690'),
    ('finalize throwed exception', 'finalize threw exception')
])

# templates/Makefile.in
replace_in_file('templates/Makefile.in', [
    ('publish-guthub: .github.token', 'publish-github: .github.token'),
    ('publish lint tscheck publish-guthub emoji', 'publish lint tscheck publish-github emoji')
])

# examples/multiple-interpreters-demo.html
replace_in_file('examples/multiple-interpreters-demo.html', [
    ('"This is example of using mysql', '"This is an example of using mysql')
])
