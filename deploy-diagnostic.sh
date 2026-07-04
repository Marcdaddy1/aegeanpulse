#!/bin/bash
# Diagnostic commands for the aegeanpulse.com deployment investigation.
# Run this on the VPS (72.61.4.237) via SSH, then paste the full output back.

echo "===== 1. Is this running in Docker? ====="
docker ps -a 2>&1 | grep -i -E "aegean|next|node" || echo "(no matching containers — docker may not be used for this site, or command failed)"

echo ""
echo "===== 2. Docker images and their build times ====="
docker images 2>&1 | grep -i -E "aegean|next|node" || echo "(no matching images)"

echo ""
echo "===== 3. Find the actual site checkout on disk ====="
find / -maxdepth 6 -iname "aegeanpulse" -type d 2>/dev/null

echo ""
echo "===== 4. If found, check git state in that directory ====="
# Replace <path> with the result from step 3, or this will try a common guess:
for d in /root/aegeanpulse /home/*/aegeanpulse /var/www/aegeanpulse /opt/aegeanpulse; do
  if [ -d "$d/.git" ]; then
    echo "--- $d ---"
    cd "$d" && git log -1 --format="commit %h: %s (%ci)" && git status --short
  fi
done

echo ""
echo "===== 5. Is a Next.js process actually running, and since when? ====="
ps aux | grep -i "next\|node" | grep -v grep

echo ""
echo "===== 6. Is PM2 in use? ====="
which pm2 2>/dev/null && pm2 list 2>&1

echo ""
echo "===== 7. What's listening on port 3000? ====="
ss -tlnp 2>/dev/null | grep 3000 || netstat -tlnp 2>/dev/null | grep 3000
