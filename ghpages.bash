# change asset paths to relative as github pages are not served from root path
cat dist/index.html | sed 's/"\/assets/"\.\/assets/g' > dist/index1.html
cat dist/index.html | sed 's/"\/assets/"\.\.\/assets/g' > dist/index2.html
cat dist/index.html | sed 's/"\/assets/"\.\.\/assets/g' > dist/index3.html


mv dist/index1.html dist/index.html

# create an index in the /team path to support refresh on sub-routes
mkdir -p dist/team
mv dist/index2.html dist/team/index.html

# create an index in the /tasks path to support refresh on sub-routes
mkdir -p dist/tasks
mv dist/index3.html dist/tasks/index.html

# copy README
cp README.md dist/README.md
