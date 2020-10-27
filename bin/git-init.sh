#!/bin/bash
cd ${0%/*}

# https://github.com/jht1493/icm-p5js-eggs
repo=icm-p5js-eggs
guser=jht1493

echo "Kill git history for https://github.com/$guser/${repo}"
exit 0

dest=../../$repo

if [ ! -e "$dest" ]; then
  echo "no $dest"
	exit 0
fi

cd $dest

rm -rf .git
git init
git add .
git commit -m 'init'
# git remote add origin git@github.com:$guser/${repo}.git
git remote add origin https://github.com/$guser/${repo}
git push --force --set-upstream origin master
