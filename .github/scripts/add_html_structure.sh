#!/bin/bash
mkdir -p html
for file in $(find ./html -type f -name '*.html'); do
  basename=$(basename "$file" .html)
  cat <<'EOF' > temp.html
<!DOCTYPE html>
<html>
<head>
  <title>$basename</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .sidebar { width: 200px; float: left; background: #f4f4f4; padding: 10px; height: 100vh; }
    .content { margin-left: 220px; padding: 20px; }
    footer { margin-top: 20px; text-align: center; background: #f4f4f4; padding: 10px; }
  </style>
</head>
<body>
  <div class="sidebar">
    <h2>Sidebar</h2>
    <p>Links or other content</p>
  </div>
  <div class="content">
    <h1>$basename</h1>
EOF
  cat "$file" >> temp.html
  cat <<'EOF' >> temp.html
  </div>
  <footer>
    <p>Footer content</p>
  </footer>
</body>
</html>
EOF
  mv temp.html "$file"
done
