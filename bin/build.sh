#!/bin/bash
cd 'packages';
for file in `ls -F | grep "/$"`; do
	cd $file;
  echo $file;
  `npm run build`;
  cd ..;
done