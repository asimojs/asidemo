# change asset paths to relative as github pages are not served from root path
cat dist/index.html | sed 's/"\/assets/"\.\/assets/g' > dist/index2.html
mv dist/index2.html dist/index.html

# copy README
cp README.md dist/README.md
