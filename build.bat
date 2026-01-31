@echo off
cd /d "m:\GPP_work\GPP\Blog_platform_with_MDX&SDO"
call npm run build
call node scripts/generate-sitemap.js
call node scripts/generate-rss.js
